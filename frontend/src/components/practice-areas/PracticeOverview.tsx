import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './PracticeOverview.module.css';

interface PracticeOverviewProps {
  label: string;
  icon: ReactNode;
  title: string;
  intro: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  children?: ReactNode;
}

export function PracticeOverview({ label, icon, title, intro, image, imageWidth, imageHeight, imageAlt, children }: PracticeOverviewProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            <div className={styles.label}>
              {icon}
              <span>{label}</span>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>{intro}</p>
          </div>
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width:900px) 45vw, 100vw"
            className={styles.image}
          />
        </div>
        {children && <div className={styles.remainingCopy}>{children}</div>}
      </div>
    </section>
  );
}
