import type { Metadata } from 'next';
import Image from 'next/image';
import { FirmOverview } from '@/components/FirmOverview';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us | Premium Indian Law Firm',
  description: 'Learn about our philosophy, areas of practice, professional approach, and our team of legal experts.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-heading">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Maurya & Co. boardroom"
          fill
          priority
          sizes="100vw"
          quality={80}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 id="about-heading" className={styles.heroTitle}>
            <span className={styles.wordAbout}>About</span>{' '}
            <span className={styles.wordThe}>the</span>{' '}
            <span className={styles.wordFirm}>Firm</span>
          </h1>
          <div className={styles.heroRule} aria-hidden="true" />
          <p className={styles.heroDescription}>
            A premier legal practice dedicated to excellence, integrity, and achieving exceptional outcomes for our clients.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <FirmOverview />
          <div className={styles.philosophy}>
            <h2 className={styles.sectionHeading}>Our Philosophy</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              We believe that effective legal counsel requires more than just a mastery of the law;
              it demands a deep understanding of our clients&apos; business objectives and industry dynamics.
              Our philosophy is rooted in proactive risk management, ethical practice, and relentless advocacy.
            </p>
            <ul className={styles.valuesList}>
              <li><span className={styles.valueMark}>✦</span><span><strong>Excellence:</strong> Delivering the highest quality of legal service.</span></li>
              <li><span className={styles.valueMark}>✦</span><span><strong>Integrity:</strong> Upholding the highest ethical standards in all our dealings.</span></li>
              <li><span className={styles.valueMark}>✦</span><span><strong>Innovation:</strong> Crafting creative solutions to novel legal challenges.</span></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
