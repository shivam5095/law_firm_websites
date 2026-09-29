import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { firm } from '@/data/firm';

interface FirmLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'compact';
  theme?: 'light' | 'dark';
  href?: string;
}

export function FirmLogo({
  className,
  variant = 'full',
  theme = 'light',
  href = '/',
}: FirmLogoProps) {
  const isDarkTheme = theme === 'dark';

  const logoContent = (
    <div className={cn('inline-flex items-center gap-3 group select-none', className)}>
      <div className="relative flex items-center justify-center shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-navy-950 shadow-md transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo/firm-monogram.svg"
          alt=""
          width={48}
          height={48}
          className="w-full h-full"
          priority
        />
      </div>

      {/* Brand Typography */}
      {variant !== 'emblem' && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-heading font-bold text-lg md:text-xl tracking-tight leading-none transition-colors',
              isDarkTheme
                ? 'text-ivory-100 group-hover:text-gold-300'
                : 'text-navy-950 group-hover:text-navy-800'
            )}
          >
            {firm.name}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-[1px] w-2.5 bg-gold-500/80"></span>
            <span
              className={cn(
                'text-[9px] md:text-[10px] font-semibold tracking-[0.04em] leading-tight',
                isDarkTheme ? 'text-gold-400' : 'text-gold-600'
              )}
            >
              {firm.tagline}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={firm.name}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
