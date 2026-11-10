import Image from 'next/image';
import { firm } from '@/data/firm';
import styles from './FirmOverview.module.css';

type FirmOverviewProps = {
  headingLevel?: 'h2' | 'h3';
  surface?: 'about' | 'home';
  variant?: 'collage';
  showCabinImage?: boolean;
};

export function FirmOverview({ headingLevel: Heading = 'h2', surface = 'about', variant, showCabinImage = true }: FirmOverviewProps) {
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
          {(surface === 'about' || variant === 'collage') && showCabinImage ? (
            <div className="relative isolate mx-auto aspect-[7/6] w-full max-w-[520px]">
              <div className="absolute -right-[14px] top-[14px] -z-10 h-[62%] w-[86%] border border-[#b08d3c]/55" aria-hidden="true" />
              <div className="absolute right-0 top-0 h-[62%] w-[86%] overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="/images/about/about-reception.jpeg"
                  alt="Maurya & Co. reception with the gold M logo"
                  fill
                  sizes="(max-width: 767px) 86vw, (max-width: 1023px) 43vw, 448px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[62%] w-[46%] bg-white p-2.5 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/images/about/about-cabin.jpeg"
                    alt="Partner's cabin with a horse painting and chair"
                    fill
                    sizes="(max-width: 767px) 46vw, (max-width: 1023px) 23vw, 239px"
                    className="object-cover object-[72%_center]"
                  />
                </div>
              </div>
            </div>
          ) : (
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
          )}
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
