import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Publication } from '@/data/publications';

export function PublicationLink({
  publication,
  children,
  className,
}: {
  publication: Publication;
  children: ReactNode;
  className?: string;
}) {
  const content = (
    <>
      {children}
      {publication.externalUrl && (
        <ExternalLink aria-hidden="true" className="ml-2 inline size-4 shrink-0 align-[-2px]" />
      )}
    </>
  );

  if (publication.externalUrl) {
    return (
      <a
        href={publication.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`/insights/${publication.slug}`} className={className}>
      {content}
    </Link>
  );
}
