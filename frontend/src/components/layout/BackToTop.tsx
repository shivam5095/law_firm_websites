'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const scrollToTop = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, 0);
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex size-11 shrink-0 items-center justify-center border border-gold-400 text-gold-300 transition-colors hover:bg-gold-500 hover:text-navy-950 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
        >
            <ArrowUp aria-hidden="true" size={18} />
        </button>
    );
}