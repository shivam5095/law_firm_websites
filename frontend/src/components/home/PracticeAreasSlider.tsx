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

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);

  const moveByCard = (direction: -1 | 1) => {
    const target = viewportRef.current?.querySelectorAll<HTMLElement>('[data-practice-card]')[activeIndex + direction];
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
      >
        {practiceAreas.map((area) => (
          <PracticeAreaSlide key={area.slug} area={area} />
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => moveByCard(-1)}
          disabled={activeIndex === 0}
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
          disabled={activeIndex === practiceAreas.length - 1}
          className={styles.arrowButton}
          aria-label="Next practice area"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
