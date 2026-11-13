import Image from 'next/image';
import { Great_Vibes } from 'next/font/google';
import { firm } from '@/data/firm';
import styles from './FirmOverview.module.css';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

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
            {surface === 'home' ? (
              <>
                <p className={`${styles.calligraphyLabel} ${greatVibes.className}`}>Firm Overview</p>
                <Heading className={styles.sectionHeading}>Counsel that sees the whole board.</Heading>
              </>
            ) : (
              <>
                <Heading className={styles.sectionHeading}>Firm Overview</Heading>
                <p className={styles.firmName}>{firm.name}</p>
                <p className={styles.tagline}>{firm.tagline}</p>
              </>
            )}
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              {surface === 'home'
                  ? <><span className={styles.emphasizedFirmName}>Maurya &amp; Co.</span>{' was founded on a simple belief. The most valuable thing a client brings to a lawyer is not a file, it is trust, and every decision we make is measured against it. We are a firm of advocates and legal consultants advising businesses, promoters, investors, financial institutions and families, in India and abroad, wherever capital, assets and reputation meet the law.'}</>
                : 'Our firm is a leading Indian legal practice recognized for its depth of knowledge, strategic thinking, and unwavering commitment to client success. We represent a diverse range of clients, including domestic and international corporations, financial institutions, and high-net-worth individuals across complex legal matters.'}
            </p>
            <p className={styles.bodyCopy}>
              {surface === 'home'
                ? 'Our roots are in Varanasi, a city where knowledge has passed from teacher to student for centuries, and that inheritance shapes how we work. We think from first principles, we speak plainly, and we tell clients what is realistic before we tell them what is possible. Every mandate, whatever its size, is led personally by our founder from the first conversation to the final outcome. From Noida, New Delhi and Varanasi, we act on matters across India, the United States and the Asia-Pacific.'
                : 'With a focus on corporate law, dispute resolution, intellectual property, and real estate, we combine rigorous legal analysis with commercial acumen to deliver pragmatic solutions.'}
            </p>
          </div>
          {(surface === 'about' || variant === 'collage') && showCabinImage ? (
            <div className="relative isolate mx-auto aspect-[7/6] w-full max-w-[32.5rem]">
              <div className="absolute -right-[0.875rem] top-[0.875rem] -z-10 h-[62%] w-[86%] border border-[#b08d3c]/55" aria-hidden="true" />
              <div className="absolute right-0 top-0 h-[62%] w-[86%] overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="/images/about/about-reception.jpeg"
                  alt="Maurya & Co. reception with the gold M logo"
                  width={1600}
                  height={900}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div className={`${styles.cabinCard} absolute bottom-0 left-0 bg-white p-2.5 shadow-2xl`}>
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/images/about/about-cabin.jpeg"
                    alt="Partner's cabin with a horse painting and chair"
                    width={1600}
                    height={900}
                    unoptimized
                    className="h-full w-full object-cover object-center"
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
