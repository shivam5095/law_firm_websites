import { primaryPhone } from '@/config/contact';
import { PracticeCallout } from './PracticeCallout';
import styles from './PracticeHero.module.css';

interface PracticeHeroProps {
  title: string;
  subtitle: string;
  quote?: string;
  slug: string;
}

export function PracticeHero({ title, subtitle, quote, slug }: PracticeHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {quote && <blockquote className={styles.quote}>{quote}</blockquote>}
        </div>
        <PracticeCallout
          title="Consult on this area"
          text="Call us or request a consultation."
          consultHref={`/consultation?area=${slug}`}
          phoneLabel={primaryPhone}
          phoneHref={`tel:${primaryPhone.replace(/\D/g, '')}`}
        />
      </div>
    </section>
  );
}
