import Image from 'next/image';
import { firm } from '@/data/firm';
import styles from './FirmOverview.module.css';

type FirmOverviewProps = {
  headingLevel?: 'h2' | 'h3';
  surface?: 'about' | 'home';
};

export function FirmOverview({ headingLevel: Heading = 'h2', surface = 'about' }: FirmOverviewProps) {
  const content = (
    <div className={styles.overviewGrid}>
          <div className={styles.overviewText}>
            <Heading className={styles.sectionHeading}>Firm Overview</Heading>
            <p className={styles.firmName}>{firm.name}</p>
            <p className={styles.tagline}>{firm.tagline}</p>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              Our firm is a leading Indian legal practice recognized for its depth of knowledge,
              strategic thinking, and unwavering commitment to client success. We represent a diverse
              range of clients, including domestic and international corporations, financial institutions,
              and high-net-worth individuals across complex legal matters.
            </p>
            <p className={styles.bodyCopy}>
              With a focus on corporate law, dispute resolution, intellectual property, and real estate,
              we combine rigorous legal analysis with commercial acumen to deliver pragmatic solutions.
            </p>
          </div>
          <div className={styles.receptionFrame}>
            <Image
              src="/images/about/about-reception.jpeg"
              alt="Maurya & Co. reception"
              width={1600}
              height={900}
              sizes={surface === 'home'
                ? '(max-width: 1023px) calc(100vw - 3rem), (max-width: 1279px) calc(47.6vw - 72px), 537px'
                : '(max-width: 1023px) 100vw, (max-width: 1280px) 48vw, 560px'}
              className={styles.receptionImage}
            />
          </div>
    </div>
  );

  if (surface === 'about') return content;

  return (
    <section className={styles.homeSection}>
      <div className={styles.homeContainer}>
        {content}
      </div>
    </section>
  );
}
