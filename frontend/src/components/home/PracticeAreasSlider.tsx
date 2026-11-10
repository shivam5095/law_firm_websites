'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { practiceAreas } from '@/data/practiceAreas';
import styles from './PracticeAreasSlider.module.css';

const AUTOPLAY_PX_PER_SECOND = 50;
const ARROW_DURATION_MS = 600;
const RESUME_DELAY_MS = 1500;
const TRACK_GAP = 16;

type PauseReasons = { hovered: boolean; dragging: boolean };
type Movement = { from: number; to: number; startedAt: number | null; duration: number };
type Drag = { pointerId: number; startX: number; startOffset: number; moved: boolean };

function PracticeAreaSlide({ area }: { area: (typeof practiceAreas)[number] }) {
  return (
    <article data-practice-card className={styles.card}>
      <Link
        href={`/practice-areas/${area.slug}`}
        aria-label={`${area.title} practice area`}
        className={styles.imageLink}
      >
        <Image
          src={area.image}
          alt={area.title}
          width={1600}
          height={900}
          sizes="(max-width: 639px) min(88vw, calc(100vw - 3.5rem)), (max-width: 1279px) min(700px, 72vw), (max-width: 1599px) calc(50vw - 40px), 700px"
          className={styles.image}
          draggable={false}
        />
      </Link>
    </article>
  );
}

export function PracticeAreasSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const periodRef = useRef(0);
  const activeIndexRef = useRef(0);
  const movementRef = useRef<Movement | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const pauseReasonsRef = useRef<PauseReasons>({ hovered: false, dragging: false });
  const reducedMotionRef = useRef(false);
  const inViewRef = useRef(false);
  const pageVisibleRef = useRef(true);
  const resumePendingRef = useRef(false);
  const suspendedAtRef = useRef<number | null>(null);
  const animateFrameRef = useRef<(now: number) => void>(() => {});
  const frameRef = useRef(0);
  const lastFrameRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncAnimationRef = useRef<(() => void) | null>(null);
  const snapDraggedClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback((offset: number) => {
    const period = periodRef.current;
    if (!period || !practiceAreas.length) return;
    const stride = period / practiceAreas.length;
    const nextIndex = Math.floor(offset / stride) % practiceAreas.length;
    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  }, []);

  const applyOffset = useCallback((requestedOffset: number) => {
    const period = periodRef.current;
    const track = trackRef.current;
    if (!period || !track) return;
    const normalized = ((requestedOffset % period) + period) % period;
    offsetRef.current = normalized;
    track.style.transform = `translate3d(${-normalized}px, 0, 0)`;
    updateActiveIndex(normalized);
  }, [updateActiveIndex]);

  const syncAnimation = useCallback(() => {
    const shouldRun = inViewRef.current
      && pageVisibleRef.current
      && (!reducedMotionRef.current || movementRef.current !== null)
      && ((!pauseReasonsRef.current.hovered && !pauseReasonsRef.current.dragging && !resumePendingRef.current) || movementRef.current !== null);
    if (shouldRun && !frameRef.current) {
      const suspendedMovement = movementRef.current;
      if (suspendedAtRef.current !== null && suspendedMovement && suspendedMovement.startedAt !== null) {
        suspendedMovement.startedAt += performance.now() - suspendedAtRef.current;
      }
      suspendedAtRef.current = null;
      lastFrameRef.current = 0;
      frameRef.current = window.requestAnimationFrame((now) => animateFrameRef.current(now));
    } else if (!shouldRun && frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      lastFrameRef.current = 0;
      suspendedAtRef.current = performance.now();
    }
  }, []);

  function animateFrame(now: number) {
    frameRef.current = 0;
    const period = periodRef.current;
    if (!period || !inViewRef.current || !pageVisibleRef.current) return;

    const movement = movementRef.current;
    if (movement) {
      if (movement.startedAt === null) movement.startedAt = now;
      const progress = movement.duration === 0 ? 1 : Math.min(1, (now - movement.startedAt) / movement.duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      applyOffset(movement.from + (movement.to - movement.from) * eased);
      if (progress >= 1) {
        movementRef.current = null;
        applyOffset(movement.to);
      }
    } else if (!reducedMotionRef.current && !pauseReasonsRef.current.hovered && !pauseReasonsRef.current.dragging) {
      const elapsed = lastFrameRef.current ? Math.min(now - lastFrameRef.current, 50) : 0;
      applyOffset(offsetRef.current + elapsed * AUTOPLAY_PX_PER_SECOND / 1000);
    }

    lastFrameRef.current = now;
    const keepRunning = movementRef.current !== null
      || (!reducedMotionRef.current && !pauseReasonsRef.current.hovered && !pauseReasonsRef.current.dragging && !resumePendingRef.current);
    if (keepRunning && inViewRef.current && pageVisibleRef.current) {
      frameRef.current = window.requestAnimationFrame((time) => animateFrameRef.current(time));
    }
  }

  useEffect(() => {
    syncAnimationRef.current = syncAnimation;
    animateFrameRef.current = animateFrame;
  });

  const setPauseReason = (reason: keyof PauseReasons, paused: boolean) => {
    pauseReasonsRef.current[reason] = paused;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    if (paused) {
      resumePendingRef.current = false;
      syncAnimationRef.current?.();
      return;
    }
    if (pauseReasonsRef.current.hovered || pauseReasonsRef.current.dragging) {
      syncAnimationRef.current?.();
      return;
    }
    resumePendingRef.current = true;
    syncAnimationRef.current?.();
    resumeTimerRef.current = setTimeout(() => {
      resumePendingRef.current = false;
      syncAnimationRef.current?.();
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!section || !viewport || !firstGroup) return;

    const updatePeriod = () => {
      const nextPeriod = firstGroup.offsetWidth + TRACK_GAP;
      if (!nextPeriod) return;
      periodRef.current = nextPeriod;
      applyOffset(offsetRef.current);
      syncAnimationRef.current?.();
    };
    updatePeriod();

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionPreference.matches;
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches && movementRef.current) {
        const target = movementRef.current.to;
        movementRef.current = null;
        applyOffset(target);
      }
      syncAnimationRef.current?.();
    };
    motionPreference.addEventListener('change', handleMotionPreference);

    pageVisibleRef.current = !document.hidden;
    const handleVisibility = () => {
      pageVisibleRef.current = !document.hidden;
      syncAnimationRef.current?.();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      syncAnimationRef.current?.();
    }, { threshold: 0.01 });
    observer.observe(section);

    const resizeObserver = new ResizeObserver(updatePeriod);
    resizeObserver.observe(firstGroup);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      frameRef.current = 0;
    };
  }, [applyOffset]);

  const moveByCard = (direction: -1 | 1) => {
    const period = periodRef.current;
    if (!period || !practiceAreas.length) return;
    const stride = period / practiceAreas.length;
    const currentIndex = activeIndexRef.current;
    const nextIndex = (currentIndex + direction + practiceAreas.length) % practiceAreas.length;
    let from = offsetRef.current;
    let to = nextIndex * stride;
    if (direction > 0 && currentIndex === practiceAreas.length - 1) to = period;
    if (direction < 0 && currentIndex === 0) {
      from += period;
      to = period - stride;
    }
    movementRef.current = {
      from,
      to,
      startedAt: null,
      duration: reducedMotionRef.current ? 0 : ARROW_DURATION_MS,
    };
    syncAnimationRef.current?.();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!periodRef.current || event.button !== 0) return;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    movementRef.current = null;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPauseReason('dragging', true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = drag.startX - event.clientX;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (drag.moved) applyOffset(drag.startOffset + delta);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (drag.moved) {
      snapDraggedClickRef.current = true;
      setTimeout(() => { snapDraggedClickRef.current = false; }, 0);
      const stride = periodRef.current / practiceAreas.length;
      const target = Math.round(offsetRef.current / stride) * stride;
      movementRef.current = {
        from: offsetRef.current,
        to: target,
        startedAt: null,
        duration: reducedMotionRef.current ? 0 : 260,
      };
    }
    setPauseReason('dragging', false);
    syncAnimationRef.current?.();
  };

  return (
    <section
      ref={sectionRef}
      id="dossier-slider"
      aria-labelledby="practice-areas-heading"
      className={`relative isolate w-full overflow-hidden bg-[#070D1F] text-white ${styles.section}`}
      onMouseEnter={() => setPauseReason('hovered', true)}
      onMouseLeave={() => setPauseReason('hovered', false)}
    >
      <div className={styles.background} aria-hidden="true">
        <div className={styles.baseLayer} />
        <div className={styles.blueGlow} />
        <div className={styles.goldGlow} />
        <div className={styles.blueBeams}>
          <i /><i /><i />
        </div>
        <div className={styles.goldBeams}>
          <i /><i /><i />
        </div>
      </div>
      <div className={styles.content}>
        <header className="w-full px-4 pt-9 pb-2 text-center sm:px-8 sm:pt-10 sm:pb-3 lg:px-14 lg:pt-12 lg:pb-[10px]">
          <h2 id="practice-areas-heading" className="font-heading text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-4xl">
            Areas of Practice
          </h2>
          <div className="mx-auto mt-4 mb-4 h-px w-24 bg-gold-500" />
        </header>

        <div
          ref={viewportRef}
          className={styles.viewport}
          aria-label="Practice areas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClickCapture={(event) => {
            if (!snapDraggedClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div ref={trackRef} className={styles.track}>
            {Array.from({ length: 2 }, (_, groupIndex) => (
              <div
                key={groupIndex}
                ref={groupIndex === 0 ? firstGroupRef : undefined}
                className={styles.group}
                aria-hidden={groupIndex === 1 ? true : undefined}
                inert={groupIndex === 1 ? true : undefined}
              >
                {practiceAreas.map((area) => (
                  <PracticeAreaSlide key={`${groupIndex}-${area.slug}`} area={area} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={() => moveByCard(-1)} className={styles.arrowButton} aria-label="Previous practice area">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Slide {activeIndex + 1} of {practiceAreas.length}
          </span>
          <button type="button" onClick={() => moveByCard(1)} className={styles.arrowButton} aria-label="Next practice area">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
