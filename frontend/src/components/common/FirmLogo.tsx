import React from 'react';
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
      {/* Emblem Crest */}
      <div className="relative flex items-center justify-center shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-sm bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-gold-500/50 shadow-md p-1.5 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-gold-400 drop-shadow-sm"
        >
          {/* Subtle Outer Frame */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="2"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <rect
            x="5.5"
            y="5.5"
            width="37"
            height="37"
            rx="1"
            stroke="url(#goldGradient)"
            strokeWidth="0.8"
            opacity="0.9"
          />

          {/* Central Pillar / Sceptre */}
          <path
            d="M24 8V38"
            stroke="url(#goldGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="24" cy="8" r="2.2" fill="url(#goldGradient)" />

          {/* Crossbeam of Justice */}
          <path
            d="M13 15.5H35"
            stroke="url(#goldGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Left Balance Scale */}
          <path
            d="M13 15.5L8.5 24H17.5L13 15.5Z"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            fill="url(#goldSubtle)"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 24C8.5 26.5 10.5 28 13 28C15.5 28 17.5 26.5 17.5 24"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
          />

          {/* Right Balance Scale */}
          <path
            d="M35 15.5L30.5 24H39.5L35 15.5Z"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            fill="url(#goldSubtle)"
            strokeLinejoin="round"
          />
          <path
            d="M30.5 24C30.5 26.5 32.5 28 35 28C37.5 28 39.5 26.5 39.5 24"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
          />

          {/* Base Pedestal */}
          <path
            d="M18 38H30"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M15 41H33"
            stroke="url(#goldGradient)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#996515" />
            </linearGradient>
            <linearGradient id="goldSubtle" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="1" stopColor="#996515" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
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
                'text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.2em] leading-tight',
                isDarkTheme ? 'text-gold-400' : 'text-gold-600'
              )}
            >
              Advocates & Legal Consultants
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
