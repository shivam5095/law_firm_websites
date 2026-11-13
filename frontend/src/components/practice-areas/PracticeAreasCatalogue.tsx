import Image from 'next/image';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { practiceAreas } from '@/data/practiceAreas';
import styles from './PracticeAreasCatalogue.module.css';

export function PracticeAreasCatalogue() {
  return (
    <section className={styles.section} aria-labelledby="practice-areas-list-title">
      <h2 id="practice-areas-list-title" className={styles.sectionTitle}>Our Practice Areas</h2>
      <div className={styles.grid}>
        {practiceAreas.map((area) => {
          // @ts-expect-error Icon names are selected from the lucide icon registry in practice-area data.
          const Icon = LucideIcons[area.icon] || LucideIcons.Scale;

          return (
            <Link
              key={area.id}
              href={`/practice-areas/${area.slug}`}
              aria-label={`View ${area.title} practice`}
              className={styles.card}
            >
              <Image
                src="/images/logo/maurya&co-logo.png"
                alt=""
                width={1328}
                height={1184}
                aria-hidden="true"
                className={styles.watermark}
                sizes="150px"
              />
              <Icon size={46} strokeWidth={1.4} aria-hidden="true" />
              <span className={styles.cardTitle}>{area.title}</span>
              <span className={styles.cardDescription}>{area.shortDescription}</span>
              <ul className={styles.services} aria-label={`${area.title} services`}>
                {area.services.slice(0, 4).map((service) => <li key={service}>{service}</li>)}
              </ul>
              <span className={styles.hint}>View practice</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
