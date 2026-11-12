import { ExternalLink } from 'lucide-react';
import type { Publication } from '@/data/publications';

export function PublicationCard({ publication }: { publication: Publication }) {
  const isAmazonBook = publication.publication.includes('Amazon');
  const readLabel = isAmazonBook ? 'View on Amazon' : `Read on ${publication.publication}`;

  return (
    <article className="group flex h-full flex-col border border-charcoal-100 bg-white p-8 transition-colors hover:border-gold-300">
      <div className="mb-4 flex items-center justify-between gap-4 text-sm text-charcoal-500">
        <span className="font-medium text-gold-600">{publication.publication}</span>
        <span className="shrink-0">{publication.dateLabel}</span>
      </div>
      <h3 className="mb-4 font-heading text-xl text-navy-900 transition-colors group-hover:text-gold-600">
        {publication.url ? (
          <a href={publication.url} target="_blank" rel="noopener noreferrer" aria-label={`${publication.title} (opens in new tab)`}>
            {publication.title}
            <ExternalLink aria-hidden="true" className="ml-2 inline size-4 align-[-2px]" />
          </a>
        ) : publication.title}
      </h3>
      {publication.excerpt && (
        <p className="mb-6 line-clamp-3 text-charcoal-600">{publication.excerpt}</p>
      )}
      {publication.url && (
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${publication.title} on ${publication.publication} (opens in new tab)`}
          className="mt-auto flex items-center pt-2 text-sm font-medium text-navy-900 transition-colors group-hover:text-gold-600"
        >
          {readLabel}
          <ExternalLink aria-hidden="true" className="ml-2 size-4 shrink-0" />
        </a>
      )}
    </article>
  );
}
