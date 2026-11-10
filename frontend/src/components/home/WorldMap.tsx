'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mapLocations, type MapLocation } from './WorldMapLocations';
// @ts-expect-error d3-geo is installed without optional DefinitelyTyped declarations.
import { geoNaturalEarth1, geoPath } from 'd3-geo';
// @ts-expect-error topojson-client is installed without optional DefinitelyTyped declarations.
import { feature } from 'topojson-client';
import mapData from './world-map-data.json';

const WIDTH = 1000;
const HEIGHT = 500;
const LOOP_SECONDS = 16;
type Point = [number, number];
type Camera = { x: number; y: number; scale: number };
type Star = { x: number; y: number; core: number; inner: number; outer: number; speed: number; phase: number; big: boolean };

const world = mapData.topology as never;
const rawCountries = feature(world, (mapData.topology as unknown as { objects: { countries: never } }).objects.countries);
const countries = {
  ...rawCountries,
  features: [
    ...rawCountries.features.filter((country: { id?: string | number }) => !['356', '010'].includes(String(country.id).padStart(3, '0'))),
    mapData.indiaPerspective,
  ],
};

const projection = geoNaturalEarth1().fitExtent([[0, 0], [WIDTH, HEIGHT]], countries);
const project = (location: MapLocation): Point => projection([location.lng, location.lat]) ?? [0, 0];
const points = mapLocations.map(project);
const paths = geoPath(projection);
const countriesPath = paths(countries) ?? '';
const hubPoint = points[0];
const delhi = hubPoint;
const dubai = points[12];
const betweenDelhiAndDubai: Point = [(delhi[0] + dubai[0]) / 2, (delhi[1] + dubai[1]) / 2];
const gulfCenter: Point = projection([70, 22]) ?? betweenDelhiAndDubai;

function seededStars(): Star[] {
  let seed = 0x5a17c9e3;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const result: Star[] = [];
  let attempts = 0;
  while (result.length < 40 && attempts < 5000) {
    attempts += 1;
    const x = 16 + random() * (WIDTH - 32);
    const y = 16 + random() * (HEIGHT - 32);
    if (points.some(([px, py]) => Math.hypot(px - x, py - y) < 18)) continue;
    const big = result.length < 14;
    const core = big ? 0.37 + random() * 0.37 : 0.27 + random() * 0.31;
    result.push({
      x,
      y,
      core,
      inner: core * (1.7 + random()),
      outer: core * (2 + random() * 1.5),
      speed: 0.5 + random() * 1.1,
      phase: random() * Math.PI * 2,
      big,
    });
  }
  return result;
}

const stars = seededStars();

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function mix(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function cameraAt(time: number): Camera {
  const frames: { time: number; center: Point; scale: number }[] = [
    { time: 0, center: delhi, scale: 5 },
    { time: 2.2, center: delhi, scale: 5 },
    { time: 5, center: betweenDelhiAndDubai, scale: 2.6 },
    { time: 7, center: gulfCenter, scale: 1.7 },
    { time: 10.5, center: [WIDTH / 2, HEIGHT / 2], scale: 1 },
    { time: 14, center: [WIDTH / 2, HEIGHT / 2], scale: 1 },
    { time: 16, center: delhi, scale: 5 },
  ];
  const frameIndex = frames.findIndex((frame) => frame.time >= time);
  if (frameIndex <= 0) return { x: delhi[0], y: delhi[1], scale: 5 };
  const from = frames[frameIndex - 1];
  const to = frames[frameIndex];
  const amount = easeInOutCubic((time - from.time) / (to.time - from.time));
  return {
    x: mix(from.center[0], to.center[0], amount),
    y: mix(from.center[1], to.center[1], amount),
    scale: mix(from.scale, to.scale, amount),
  };
}

function arcTiming(index: number) {
  if (index < 6) return { start: 2.2 + index * 0.2, duration: 1.2 };
  if (index < 10) return { start: 7 + (index - 6) * 0.5, duration: 2.2 };
  return { start: 5 + (index - 10) * 0.2, duration: 1.6 };
}

function arcPath(from: Point, to: Point, lift: number, offsetX: number) {
  const controlX = (from[0] + to[0]) / 2 + offsetX;
  const controlY = (from[1] + to[1]) / 2 - lift;
  return `M${from[0]},${from[1]} Q${controlX},${controlY} ${to[0]},${to[1]}`;
}

function getArcShape(location: MapLocation, index: number) {
  const target = points[index + 1];
  const height = location.arcAltitude * (index >= 6 && index < 10 ? 250 : 155);
  const usaOffset = index === 6 ? -18 : index === 7 ? -8 : index === 8 ? 10 : index === 9 ? 22 : 0;
  return arcPath(hubPoint, target, height, usaOffset);
}

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loopStartRef = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clock, setClock] = useState({ loop: 0, continuous: 0 });

  const toggleMotionPreference = useCallback((event: MediaQueryListEvent) => setReducedMotion(event.matches), []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    query.addEventListener('change', toggleMotionPreference);
    return () => query.removeEventListener('change', toggleMotionPreference);
  }, [toggleMotionPreference]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) {
      loopStartRef.current = null;
      return;
    }
    let frameId = 0;
    const animate = (now: number) => {
      if (loopStartRef.current === null) loopStartRef.current = now;
      const start = loopStartRef.current;
      const elapsed = Math.max(0, now - start);
      setClock({ loop: (elapsed / 1000) % LOOP_SECONDS, continuous: now / 1000 });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, reducedMotion]);

  const time = reducedMotion ? 10.5 : clock.loop;
  const baseCamera = useMemo(() => reducedMotion ? { x: WIDTH / 2, y: HEIGHT / 2, scale: 1 } : cameraAt(time), [reducedMotion, time]);
  const camera = { ...baseCamera, scale: baseCamera.scale * (isMobile ? 2 / 3 : 1) };
  const transform = `translate(${WIDTH / 2 - camera.x * camera.scale} ${HEIGHT / 2 - camera.y * camera.scale}) scale(${camera.scale})`;
  const fade = reducedMotion ? 1 : time < 14 ? 1 : Math.max(0, 1 - (time - 14) / 2);
  const continuous = reducedMotion ? 0 : clock.continuous;
  const drawStates = useMemo(() => mapLocations.slice(1).map((location, index) => {
    if (reducedMotion) return { progress: 1, dot: 1 };
    const { start, duration } = arcTiming(index);
    const progress = Math.max(0, Math.min(1, (time - start) / duration));
    const arrived = start + duration;
    const dot = Math.max(0, Math.min(1, (time - arrived) / 0.32));
    return { progress, dot };
  }), [reducedMotion, time]);

  return (
    <section className="mapSection" aria-label="Our Global Reach">
      <div className="mapContainer">
        <header className="mapHeading">
          <h2>Our Global Reach</h2>
          <span aria-hidden="true" />
        </header>
        <div ref={mapRef} className="mapCard">
          <svg className="mapSvg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated world map showing Maurya & Co. presence from Delhi across India and internationally">
            <defs>
              <radialGradient id="mapOcean" cx="48%" cy="42%" r="78%">
                <stop offset="0%" stopColor="#14243B" />
                <stop offset="100%" stopColor="#0B1426" />
              </radialGradient>
              <filter id="routeGlow" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation={1.2 / camera.scale} result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {mapLocations.slice(1).map((location, index) => {
                const target = points[index + 1];
                return (
                  <linearGradient key={location.name} id={`route-${index}`} gradientUnits="userSpaceOnUse" x1={hubPoint[0]} y1={hubPoint[1]} x2={target[0]} y2={target[1]}>
                    <stop offset="0%" stopColor="#E0B955" />
                    <stop offset="100%" stopColor={index < 6 ? '#F2E6C8' : '#E8D3A0'} />
                  </linearGradient>
                );
              })}
            </defs>
            <rect width={WIDTH} height={HEIGHT} fill="url(#mapOcean)" />
            <g transform={transform}>
              <path d={countriesPath} fill="#5F6B7C" fillOpacity=".78" stroke="rgba(255,255,255,.22)" strokeWidth={0.65 / camera.scale} />

              <g pointerEvents="none" aria-hidden="true">
                {stars.map((star, index) => {
                  const wave = (Math.sin(continuous * star.speed + star.phase) + 1) / 2;
                  const coreOpacity = 0.6 + wave * 0.4;
                  const innerOpacity = 0.2 + wave * 0.3;
                  const outerOpacity = 0.08 + wave * 0.2;
                  const sparkleHalf = 1.06 + wave * 1.44;
                  return (
                    <g key={index}>
                      <circle cx={star.x} cy={star.y} r={(star.outer * (0.86 + wave * 0.14)) / camera.scale} fill="#7FB2FF" opacity={outerOpacity} />
                      <circle cx={star.x} cy={star.y} r={(star.inner * (0.9 + wave * 0.1)) / camera.scale} fill="#BBD8FF" opacity={innerOpacity} />
                      {star.big && <path d={`M${star.x - sparkleHalf / camera.scale},${star.y} H${star.x + sparkleHalf / camera.scale} M${star.x},${star.y - sparkleHalf / camera.scale} V${star.y + sparkleHalf / camera.scale}`} fill="none" stroke="#D9E9FF" strokeWidth={0.37 / camera.scale} strokeLinecap="round" opacity={0.25 + wave * 0.6} />}
                      <circle cx={star.x} cy={star.y} r={star.core / camera.scale} fill="#fff" opacity={coreOpacity} />
                    </g>
                  );
                })}
              </g>

              <g fill="none" strokeLinecap="round" pointerEvents="none" aria-hidden="true">
                {mapLocations.slice(1).map((location, index) => {
                  const state = drawStates[index];
                  const routeOpacity = state.progress * fade;
                  const pulseEnabled = state.progress >= 1 && time < 14 && !reducedMotion;
                  const pulse = (continuous * (0.12 + (index % 5) * 0.018) + index * 0.13) % 1;
                  const strokeWidth = 1.5 / camera.scale;
                  const path = getArcShape(location, index);
                  return (
                    <g key={location.name}>
                      <path d={path} pathLength="1" stroke={`url(#route-${index})`} strokeWidth={strokeWidth} strokeDasharray="1" strokeDashoffset={1 - state.progress} opacity={routeOpacity} filter="url(#routeGlow)" />
                      {pulseEnabled && <path d={path} pathLength="1" stroke="#fff" strokeWidth={2 / camera.scale} strokeDasharray={`${0.022} .978`} strokeDashoffset={-pulse} opacity={0.95 * fade} filter="url(#routeGlow)" />}
                    </g>
                  );
                })}
              </g>

              <g pointerEvents="none" aria-hidden="true">
                {mapLocations.slice(1).map((location, index) => {
                  const [x, y] = points[index + 1];
                  const state = drawStates[index];
                  const scaleIn = 0.48 + state.dot * 0.52;
                  const opacity = state.dot * fade;
                  const pulse = reducedMotion ? 0.5 : (Math.sin(continuous * 1.35 + index * 0.73) + 1) / 2;
                  return (
                    <g key={location.name} transform={`translate(${x} ${y}) scale(${scaleIn / camera.scale})`} opacity={opacity}>
                      <circle r={8 + pulse * 1.4} fill="#E9F2FF" opacity={0.1 + pulse * 0.08} />
                      <circle r={5.2 + pulse * 0.6} fill="#C7DFFF" opacity={0.22 + pulse * 0.12} />
                      <circle r="3.2" fill="#fff" />
                    </g>
                  );
                })}
                {[0, 1, 2].map((ring) => {
                  const phase = ((continuous * 0.48 + ring / 3) % 1);
                  return <circle key={ring} cx={hubPoint[0]} cy={hubPoint[1]} r={(5 + phase * 13) / camera.scale} fill="none" stroke="#E0B955" strokeWidth={1.15 / camera.scale} opacity={reducedMotion ? 0.24 : 0.8 * (1 - phase)} />;
                })}
                <circle cx={hubPoint[0]} cy={hubPoint[1]} r={4 / camera.scale} fill="#E0B955" />
                <circle cx={hubPoint[0]} cy={hubPoint[1]} r={7 / camera.scale} fill="#E0B955" opacity=".22" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .mapSection{padding:56px 24px;background:#fff;color:#14243B;border-top:1px solid rgba(20,36,59,.08)}
        .mapContainer{width:100%;max-width:80rem;margin:0 auto}
        .mapHeading{text-align:center;margin:0 auto 26px;max-width:900px}
        .mapHeading h2{font-family:var(--font-heading),Georgia,serif;font-size:clamp(28px,3.5vw,42px);line-height:1.08;font-weight:600;color:#14243B;margin:0}
        .mapHeading span{display:block;width:64px;height:2px;background:#B89548;margin:15px auto 13px}
        .mapHeading p{font-size:15px;line-height:1.65;color:#5B6475;margin:0}
        .mapCard{width:100%;aspect-ratio:2/1;overflow:hidden;border-radius:18px;border:1px solid rgba(20,36,59,.15);background:radial-gradient(ellipse at center,#14243B 0%,#0B1426 100%);box-shadow:0 24px 60px rgba(11,20,38,.25)}
        .mapSvg{display:block;width:100%;height:100%;touch-action:pan-y}
        @media(max-width:639px){.mapSection{padding:32px 16px}.mapHeading{margin-bottom:20px}.mapHeading p{font-size:13px}.mapCard{aspect-ratio:4/3}}
      `}</style>
    </section>
  );
}
