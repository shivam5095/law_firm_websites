'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
// @ts-expect-error The packages ship JavaScript; their optional DefinitelyTyped packages are unavailable offline.
import { geoEquirectangular, geoPath } from 'd3-geo';
// @ts-expect-error The packages ship JavaScript; their optional DefinitelyTyped packages are unavailable offline.
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

type MapPoint = { name: string; lat: number; lng: number };

// Names are kept for maintainers and assistive context; they are never painted on the map.
const points: MapPoint[] = [
  { name: 'Delhi', lat: 28.6139, lng: 77.209 },
  { name: 'Kuwait City', lat: 29.3759, lng: 47.9774 },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Gujarat (Vadodara)', lat: 22.3072, lng: 73.1812 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Uttar Pradesh (Kanpur)', lat: 26.4499, lng: 80.3319 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Malaysia (Kuala Lumpur)', lat: 3.139, lng: 101.6869 },
  { name: 'Indonesia (Makassar)', lat: -5.1477, lng: 119.4327 },
  { name: 'Atlanta, USA', lat: 33.749, lng: -84.388 },
  { name: 'Georgia, USA (Macon)', lat: 32.8407, lng: -83.6324 },
  { name: 'Florida, USA (Orlando)', lat: 28.5383, lng: -81.3792 },
  { name: 'California, USA', lat: 36.7783, lng: -119.4179 },
];

const showNameOnHover = false;
const W = 1000;
const H = 540;
const countries = feature(world as never, (world as unknown as { objects: { countries: never } }).objects.countries);
const projection = geoEquirectangular().fitExtent([[4, 4], [W - 4, H - 4]], countries);
const countryPath = geoPath(projection);

const stars = Array.from({ length: 76 }, (_, i) => ({
  x: ((i * 137.508 + 19) % 997) + 1,
  y: ((i * 83.137 + 11) % 523) + 8,
  delay: (i * 0.71) % 6,
  duration: 2 + ((i * 1.37) % 4),
  radius: i % 9 === 0 ? 1.35 : 0.8,
}));

function arcPath(from: number[], to: number[], distance: number) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const lift = Math.min(110, Math.max(10, distance * 0.28));
  const cx = (from[0] + to[0]) / 2;
  const cy = (from[1] + to[1]) / 2 - lift;
  return `M ${from[0]} ${from[1]} Q ${cx} ${cy} ${to[0]} ${to[1]}`;
}

export default function WorldMap() {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const positions = useMemo(() => points.map((p) => projection([p.lng, p.lat]) ?? [0, 0]), []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(card);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMotion);
    };
  }, []);

  const origin = positions[0];
  void showNameOnHover;

  return (
    <section ref={cardRef} className="mapCard" role="img" aria-label="World map showing Maurya & Co. network from Delhi to India, Kuwait, UAE, Malaysia, Indonesia and the USA">
      <svg className="mapSvg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="mapOcean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#071428" />
            <stop offset="57%" stopColor="#102d50" />
            <stop offset="100%" stopColor="#1d4770" />
          </linearGradient>
          <radialGradient id="warmGlow"><stop stopColor="#b66d49" stopOpacity=".22"/><stop offset="1" stopColor="#b66d49" stopOpacity="0"/></radialGradient>
          <filter id="dotGlow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width={W} height={H} fill="url(#mapOcean)" />
        <ellipse cx="65" cy="500" rx="390" ry="220" fill="url(#warmGlow)" />
        {stars.map((star, i) => <circle key={i} className={visible && !reducedMotion ? 'star twinkle' : 'star'} cx={star.x} cy={star.y} r={star.radius} style={{ animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }} />)}
        <path d={countryPath(countries) ?? undefined} fill="#d4e0e8" fillOpacity=".29" stroke="#f3f6f8" strokeOpacity=".34" strokeWidth=".65" vectorEffect="non-scaling-stroke" />
        {points.slice(1).map((point, i) => {
          const to = positions[i + 1];
          const distance = Math.hypot(to[0] - origin[0], to[1] - origin[1]);
          const d = arcPath(origin, to, distance);
          const delay = i * 150;
          return <g key={point.name}>
            <path d={d} fill="none" stroke="#f8f7f2" strokeOpacity=".52" strokeWidth="1" pathLength="1" className={visible && !reducedMotion ? 'route draw' : 'route'} style={{ animationDelay: `${delay}ms` }} />
            {visible && !reducedMotion && <path d={d} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" pathLength="1" className="glint" style={{ animationDelay: `${1.9 + i * 0.35}s`, animationDuration: `${4 + (i % 5) * 0.7}s` }} />}
            <circle cx={to[0]} cy={to[1]} r="3.2" fill="#f8fbff" filter="url(#dotGlow)" className={visible && !reducedMotion ? 'destination dotIn' : 'destination'} style={{ animationDelay: `${delay + 1300}ms` }} />
          </g>;
        })}
        <circle cx={origin[0]} cy={origin[1]} r="9" fill="none" stroke="#d6ab58" strokeWidth="1.5" className={visible && !reducedMotion ? 'originRing pulse' : 'originRing'} />
        <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#dfb45e" filter="url(#dotGlow)" />
      </svg>
      <style jsx>{`
        .mapCard{position:relative;width:100%;aspect-ratio:1.85/1;overflow:hidden;border-radius:16px;background:#071428;isolation:isolate}
        .mapSvg{display:block;width:100%;height:100%}
        .star{fill:#fff;opacity:.48}.twinkle{animation:twinkle ease-in-out infinite alternate}
        .route{stroke-dasharray:1;stroke-dashoffset:0}.draw{stroke-dashoffset:1;animation:draw 1.35s cubic-bezier(.22,.65,.3,1) forwards}
        .glint{stroke-dasharray:.04 .96;stroke-dashoffset:1;opacity:0;filter:drop-shadow(0 0 3px #fff);animation:travel linear infinite}
        .destination{opacity:1}.dotIn{opacity:0;transform-box:fill-box;transform-origin:center;animation:dotIn .45s ease-out forwards}
        .originRing{opacity:.7;transform-box:fill-box;transform-origin:center}.pulse{animation:pulse 2.6s ease-out infinite}
        @keyframes draw{to{stroke-dashoffset:0}}@keyframes travel{0%{stroke-dashoffset:1;opacity:0}8%{opacity:.95}70%{opacity:.85}100%{stroke-dashoffset:0;opacity:0}}
        @keyframes dotIn{to{opacity:1;transform:scale(1)}}@keyframes pulse{0%{transform:scale(.7);opacity:.9}100%{transform:scale(2.6);opacity:0}}
        @keyframes twinkle{from{opacity:.16}to{opacity:.82}}
        @media(max-width:640px){.destination{r:2.5px}.glint{stroke-width:1.5}.mapSvg>g:nth-of-type(3n+1) .glint,.mapSvg>g:nth-of-type(3n+2) .glint{display:none}}
        @media(prefers-reduced-motion:reduce){.twinkle,.draw,.glint,.pulse,.dotIn{animation:none!important;opacity:1;stroke-dashoffset:0;transform:none}}
      `}</style>
    </section>
  );
}
