'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { practiceAreas } from '@/data/practiceAreas';
import styles from './PracticeAreasSlider.module.css';

function PracticeAreaSlide({ area }: { area: (typeof practiceAreas)[number] }) {
  return (
    <article data-practice-card className={styles.card}>
      <Link
        href={`/practice-areas/${area.slug}`}
        aria-label={`${area.title} practice area`}
        className={styles.imageLink}
      >
        <div className={styles.imageFrame}>
          <Image
            src={area.image}
            alt={area.title}
            fill
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), 960px"
            className={styles.image}
          />
        </div>
      </Link>
    </article>
  );
}

export function PracticeAreasSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const pauseReasonsRef = useRef({ hovered: false, touching: false, focused: false });
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updatePosition = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('[data-practice-card]'));
    if (!cards.length) return;

    const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex % practiceAreas.length);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionPreference.matches;
    const period = () => firstGroup.offsetWidth + 16;
    const centerCarousel = () => {
      viewport.scrollLeft = period();
      updatePosition();
    };
    centerCarousel();
    const resizeObserver = new ResizeObserver(centerCarousel);
    resizeObserver.observe(firstGroup);

    let frameId = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      if (!previousTime) previousTime = time;
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;
      const currentViewport = viewportRef.current;
      const currentGroup = firstGroupRef.current;
      if (!currentViewport || !currentGroup) return;

      if (!reducedMotionRef.current && !pausedRef.current) {
        currentViewport.scrollLeft += elapsed * 0.024;
        const currentPeriod = currentGroup.offsetWidth + 16;
        while (currentViewport.scrollLeft < currentPeriod) currentViewport.scrollLeft += currentPeriod;
        while (currentViewport.scrollLeft >= currentPeriod * 2) currentViewport.scrollLeft -= currentPeriod;
      }
      frameId = window.requestAnimationFrame(animate);
    };
    const startAnimation = () => {
      if (!frameId) {
        previousTime = 0;
        frameId = window.requestAnimationFrame(animate);
      }
    };
    const stopAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) stopAnimation();
      else startAnimation();
    };
    if (!motionPreference.matches) startAnimation();
    motionPreference.addEventListener('change', handleMotionPreference);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, [updatePosition]);

  const updatePauseState = () => {
    const reasons = pauseReasonsRef.current;
    pausedRef.current = reasons.hovered || reasons.touching || reasons.focused;
  };

  const moveByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('[data-practice-card]'));
    const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    const closestIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
      const closestCenter = cards[closest].getBoundingClientRect().left + cards[closest].clientWidth / 2;
      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? index : closest;
    }, 0);
    const target = cards[closestIndex + direction];
    if (!target) return;

    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <section
      id="dossier-slider"
      aria-labelledby="practice-areas-heading"
      className="w-full overflow-hidden bg-[#070E1A] text-white"
    >
      <header className="w-full px-4 pt-10 pb-6 text-center sm:px-8 sm:pt-14 sm:pb-8 lg:px-14 lg:pt-20 lg:pb-10">
        <h2 id="practice-areas-heading" className="font-heading text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
          Areas of Practice
        </h2>
        <div className="mx-auto my-4 h-px w-24 bg-gold-500" />
      </header>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onScroll={updatePosition}
        aria-label="Practice areas"
        onMouseEnter={() => { pauseReasonsRef.current.hovered = true; updatePauseState(); }}
        onMouseLeave={() => { pauseReasonsRef.current.hovered = false; updatePauseState(); }}
        onTouchStart={() => { pauseReasonsRef.current.touching = true; updatePauseState(); }}
        onTouchEnd={() => { pauseReasonsRef.current.touching = false; updatePauseState(); }}
        onTouchCancel={() => { pauseReasonsRef.current.touching = false; updatePauseState(); }}
        onFocusCapture={() => { pauseReasonsRef.current.focused = true; updatePauseState(); }}
        onBlurCapture={(event) => {
          pauseReasonsRef.current.focused = event.currentTarget.contains(event.relatedTarget as Node | null);
          updatePauseState();
        }}
      >
        {Array.from({ length: 3 }, (_, groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? firstGroupRef : undefined}
            className={styles.group}
            aria-hidden={groupIndex !== 1 ? true : undefined}
            inert={groupIndex !== 1 ? true : undefined}
          >
            {practiceAreas.map((area) => (
              <PracticeAreaSlide key={`${groupIndex}-${area.slug}`} area={area} />
            ))}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => moveByCard(-1)}
          className={styles.arrowButton}
          aria-label="Previous practice area"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {activeIndex + 1} of {practiceAreas.length}
        </span>
        <button
          type="button"
          onClick={() => moveByCard(1)}
          className={styles.arrowButton}
          aria-label="Next practice area"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
