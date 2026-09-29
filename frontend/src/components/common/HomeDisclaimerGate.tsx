'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { firm } from '@/data/firm';

const ACCEPTANCE_KEY = 'maurya-bci-disclaimer-accepted';

export function HomeDisclaimerGate({
    children,
    disclaimer,
}: {
    children: ReactNode;
    disclaimer: ReactNode;
}) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isAccepted, setIsAccepted] = useState(false);
    const acceptButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isHomePage || isAccepted) return;

        try {
            if (window.sessionStorage.getItem(ACCEPTANCE_KEY) === 'true') {
                setIsAccepted(true);
                return;
            }
        } catch {
            // Keep the gate active when session storage is unavailable.
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        acceptButtonRef.current?.focus();

        const containFocus = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
            }
            if (event.key === 'Tab') {
                event.preventDefault();
                acceptButtonRef.current?.focus();
            }
        };

        document.addEventListener('keydown', containFocus);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', containFocus);
        };
    }, [isAccepted, isHomePage]);

    const acceptDisclaimer = () => {
        try {
            window.sessionStorage.setItem(ACCEPTANCE_KEY, 'true');
        } catch {
            // The current page can still continue after explicit acceptance.
        }
        setIsAccepted(true);
    };

    return (
        <>
            <div inert={isHomePage && !isAccepted} aria-hidden={isHomePage && !isAccepted}>
                {children}
            </div>
            {isHomePage && !isAccepted && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/85 px-4 py-6 backdrop-blur-sm">
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="bci-disclaimer-title"
                        className="flex max-h-[min(90vh,760px)] w-full max-w-2xl flex-col border border-gold-500/50 bg-ivory-50 shadow-2xl"
                    >
                        <header className="border-b border-charcoal-200 px-6 py-5 md:px-8">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">{firm.name}</p>
                            <h1 id="bci-disclaimer-title" className="mt-2 font-heading text-2xl font-semibold text-navy-950">
                                Bar Council of India Disclaimer
                            </h1>
                        </header>
                        <div className="overflow-y-auto px-6 py-5 md:px-8 md:py-6">
                            {disclaimer}
                        </div>
                        <footer className="border-t border-charcoal-200 px-6 py-4 md:px-8">
                            <button
                                ref={acceptButtonRef}
                                type="button"
                                onClick={acceptDisclaimer}
                                className="min-h-12 w-full bg-navy-900 px-6 py-3 text-sm font-semibold text-ivory-100 transition-colors hover:bg-navy-800 focus-visible:outline-gold-500"
                            >
                                I accept the above
                            </button>
                        </footer>
                    </section>
                </div>
            )}
        </>
    );
}