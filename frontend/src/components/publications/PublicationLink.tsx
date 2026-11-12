import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Publication } from '@/data/publications';

export function PublicationLink({ publication, children, className }: {
  publication: Publication;
  children: ReactNode;
  className?: string;
}) {
  if (!publication.url) return <span className={className}>{children}</span>;

  return (
    <a href={publication.url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ExternalLink aria-hidden="true" className="ml-2 inline size-4 shrink-0 align-[-2px]" />
    </a>
  );
}
