import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './PracticeCallout.module.css';

interface PracticeCalloutProps {
  title: string;
  text: string;
  consultHref: string;
  phoneLabel: string;
  phoneHref: string;
}

export function PracticeCallout({ title, text, consultHref, phoneLabel, phoneHref }: PracticeCalloutProps) {
  return (
    <aside className={styles.callout}>
      <span className={styles.tab} aria-hidden="true" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <div className={styles.actions}>
        <Link href={consultHref} className={`${styles.button} ${styles.consultButton}`}>
          <span>Request consultation</span>
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
        <a
          href={phoneHref}
          aria-label={`Call Maurya & Co. on ${phoneLabel}`}
          className={`${styles.button} ${styles.phoneButton}`}
        >
          {`Call ${phoneLabel}`}
        </a>
      </div>
    </aside>
  );
}
