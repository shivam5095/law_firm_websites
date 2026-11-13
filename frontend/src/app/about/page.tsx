import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './about.module.css';

const heroSubtitle = 'A firm founded on one idea. Every client deserves counsel who is present, honest and accountable, from the first conversation to the last.';

export const metadata: Metadata = {
  title: 'About the Firm',
  description: heroSubtitle,
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
          <p className={styles.heroDescription}>{heroSubtitle}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <section className={styles.beginningGrid} aria-labelledby="why-we-began">
            <div className={styles.readingColumn}>
              <h2 id="why-we-began" className={styles.sectionHeading}>Why We Began</h2>
              <div className={styles.goldRule} aria-hidden="true" />
              <p className={styles.bodyCopy}>
                Maurya &amp; Co. began with something our founder saw again and again in his years working on lending disputes, arbitrations and restructurings. Clients came to a lawyer only after the damage was done. When they did, they were often passed from desk to desk, never quite sure who was responsible for their matter or what the honest outcome would be.
              </p>
              <p className={styles.bodyCopy}>
                The firm was founded to change that experience. We believe a client should know where they stand, what it will cost and what is realistic before the first notice is ever sent. We believe the person who gives the advice should be the person who stands behind it. And we believe the best legal work often prevents a dispute rather than wins one. Every part of how Maurya &amp; Co. is built follows from these three convictions.
              </p>
            </div>
            <div className={styles.receptionFrame}>
              <Image
                src="/images/about/about-reception.jpeg"
                alt="Maurya & Co. office reception"
                fill
                sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1279px) 42vw, 560px"
                quality={95}
                className={styles.receptionImage}
              />
            </div>
          </section>

          <section className={styles.textSection} aria-labelledby="why-co">
            <h2 id="why-co" className={styles.sectionHeading}>Why ‘&amp; Co.’</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              A firm can carry a person’s name without being limited to one person. “Maurya” is a personal promise of accountability. “&amp; Co.” is the larger intention, a company of counsel and an institution built to outlast any single matter. We are a firm of advocates and legal consultants, not a set of chambers, because our clients need more than a voice in court. They need advisers who stay with them before, during and after the dispute.
            </p>
          </section>

          <section className={styles.textSection} aria-labelledby="law-meets-strategy">
            <h2 id="law-meets-strategy" className={styles.sectionHeading}>Where Law Meets Strategy.</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              Our tagline is not a slogan, it is a working method. The law tells you what is permitted. Strategy tells you what is wise. Most problems need both, in the right order. We first understand what a client is trying to protect or build, and then choose the law, the forum and the timing that serve it. Our emblem, the M held within an unbroken ring, carries the same idea. Every matter is held whole, from the first call to the final outcome.
            </p>
          </section>

          <section className={styles.textSection} aria-labelledby="rooted-in-kashi">
            <h2 id="rooted-in-kashi" className={styles.sectionHeading}>Rooted in Kashi</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              Our founder grew up in Varanasi, one of the oldest living cities in the world, where knowledge has passed from teacher to student for centuries. Along its river, the ghats descend to the water as wide stone steps, open to everyone who comes, whoever they are. That is the standard we hold ourselves to. A family protecting one home and a group managing a portfolio worth hundreds of crores climb the same steps to the same counsel, and receive the same seriousness. Kashi teaches a quieter lesson too. Patience and plain speaking are forms of respect, and we practise both.
            </p>
          </section>
        </div>

        <section className={styles.valuesBand} aria-labelledby="values-heading">
          <div className={styles.contentContainer}>
            <h2 id="values-heading" className={`${styles.sectionHeading} ${styles.valuesHeading}`}>
              Clarity. Honesty. Accountability.
            </h2>
            <div className={`${styles.goldRule} ${styles.centeredRule}`} aria-hidden="true" />
            <div className={styles.valuesGrid}>
              <article className={styles.valueCard}>
                <h3 className={styles.cardHeading}>Clarity before cost.</h3>
                <p className={styles.bodyCopy}>
                  Before a client commits a single rupee, they should understand the problem, the options and the likely outcome. We give that picture at the start, in plain language.
                </p>
              </article>
              <article className={styles.valueCard}>
                <h3 className={styles.cardHeading}>Honesty before comfort.</h3>
                <p className={styles.bodyCopy}>
                  We tell clients what is realistic, even when it is not what they hoped to hear. Advice that only reassures is advice that eventually costs more.
                </p>
              </article>
              <article className={styles.valueCard}>
                <h3 className={styles.cardHeading}>Accountability until the matter is closed.</h3>
                <p className={styles.bodyCopy}>
                  Every mandate is led personally by our founder, and responsibility never changes hands. The person who takes the first call is the person who sees it through.
                </p>
              </article>
            </div>
            <p className={styles.fourthDuty}>
              Beneath all three sits a fourth duty we never relax. Discretion is owed to every client, whatever the size of the matter.
            </p>
          </div>
        </section>

        <div className={styles.contentContainer}>
          <section className={styles.textSection} aria-labelledby="balance-sheet">
            <h2 id="balance-sheet" className={styles.sectionHeading}>Where the Law Meets the Balance Sheet</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              Our practice brings together banking and finance, restructuring and insolvency, arbitration and dispute resolution, regulatory law under the RBI and SEBI frameworks, project and infrastructure, and cross-border matters. Alongside these, we advise on structured, acquisition and mezzanine finance, real estate and family settlements, international trade and startup matters. These are not separate departments. They are the disciplines that real problems cross, often at the same time. Because they sit under one roof, a client never has to tell the same story twice, or hire a second adviser to explain what the first one missed.
            </p>
          </section>

          <section className={styles.textSection} aria-labelledby="teach-practise">
            <h2 id="teach-practise" className={styles.sectionHeading}>We Teach What We Practise</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              Our founder lectures at universities and contributes to legal curriculum as a special invitee to a university Board of Studies. He was appointed an arbitrator for the Asia Pacific Vis Pre-Moot 2026, judging rounds of the Willem C. Vis International Commercial Arbitration Moot. He is a published author, his writing on Indian banking regulation, insolvency and structured finance appears regularly in legal publications, and one of his research projects was honoured and launched by Shri M. Venkaiah Naidu, then Vice President of India. Teaching demands that the law be explained from first principles, and every client receives advice built on that same foundation. Sharing knowledge openly is also a discipline. It keeps our own thinking honest and current.
            </p>
          </section>

          <section className={styles.textSection} aria-labelledby="kashi-world">
            <h2 id="kashi-world" className={styles.sectionHeading}>From Kashi to the World</h2>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.bodyCopy}>
              From Noida, New Delhi and Varanasi, we act for clients across India, for Non-Resident Indian families, and for businesses whose interests reach the United States, Singapore, Malaysia, Japan and the wider Asia-Pacific. Our founder has appeared as an independent expert on Indian law before a Superior Court in the State of Georgia, USA, and works alongside foreign counsel wherever a matter crosses borders. He trained in negotiation, mediation and conflict management with the United States Institute of Peace, and in international arbitration with the Chartered Institute of Arbitrators, London. When a dispute spans jurisdictions, the law of the place where the asset sits decides what can actually be enforced. That clarity is what we bring to clients and counsel overseas, in English and in Hindi.
            </p>
          </section>
        </div>
      </section>

      <section className={styles.closingQuote}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteRule} aria-hidden="true" />
          <blockquote className={styles.quoteText}>
            “A client’s trust is the largest asset we will ever be asked to protect.”
          </blockquote>
          <p className={styles.quoteAttribution}>Anand Kumar Maurya, Founder and Principal Advocate</p>
        </div>
      </section>
    </main>
  );
}
