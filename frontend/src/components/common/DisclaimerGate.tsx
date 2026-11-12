'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

const FIRM_NAME = 'Maurya & Co.';
const DISCLAIMER_VERSION = '1';
const STORAGE_KEY = 'mc_disclaimer_v1';
const LEGAL_PATHS = new Set(['/terms-of-use', '/privacy-policy']);

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function DisclaimerGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLegalPage = LEGAL_PATHS.has(pathname);
  const [isReady, setIsReady] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLButtonElement>(null);
  const isOpen = isReady && !isAccepted && !isLegalPage;

  useEffect(() => {
    let accepted = false;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (
          typeof parsed === 'object' && parsed !== null &&
          'accepted' in parsed && parsed.accepted === true &&
          'version' in parsed && parsed.version === DISCLAIMER_VERSION
        ) {
          accepted = true;
        }
      }
    } catch {
      // If storage is unavailable or malformed, ask for consent in this session.
    }
    const readyTimer = window.setTimeout(() => {
      setIsAccepted(accepted);
      setIsReady(true);
    }, 0);
    return () => window.clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (isDeclined ? reviewRef.current : acceptRef.current)?.focus();

    const containFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', containFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', containFocus);
    };
  }, [isOpen, isDeclined]);

  const acceptDisclaimer = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, version: DISCLAIMER_VERSION }));
    } catch {
      // Explicit acceptance still allows the current visit to continue.
    }
    setIsAccepted(true);
    setIsDeclined(false);
  }, []);

  return (
    <>
      <div inert={isOpen} aria-hidden={isOpen || undefined}>
        {isLegalPage && (
          <aside className="border-b border-gold-500/40 bg-ivory-100 px-4 py-2 text-center text-xs text-charcoal-700 sm:text-sm">
            This website is subject to the{' '}
            <Link href="/" className="font-semibold text-navy-800 underline decoration-gold-500 underline-offset-2 hover:text-gold-600">
              View Disclaimer
            </Link>
          </aside>
        )}
        {children}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end bg-black/55" onClick={(event) => event.stopPropagation()}>
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="disclaimer-heading"
            className="flex max-h-[85vh] w-full flex-col border-t border-gold-500/50 bg-ivory-50 shadow-2xl"
          >
            <header className="shrink-0 border-b border-charcoal-200 px-5 py-4 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">{FIRM_NAME}</p>
              <h1 id="disclaimer-heading" className="mt-1 font-heading text-2xl font-semibold text-navy-950 sm:text-3xl">Disclaimer</h1>
            </header>

            {!isDeclined ? (
              <>
                <div className="disclaimer-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-charcoal-700 sm:px-8 sm:py-5">
                  <div className="space-y-4">
                    <p>This website has been prepared solely to provide general information about {FIRM_NAME}, Advocates and Legal Consultants, and its practice. The information is drawn from sources that are otherwise publicly available. Reasonable care has been taken to keep it accurate and current; however, {FIRM_NAME} does not accept responsibility for any reliance placed on it and shall not be liable for any loss or damage arising from any inaccuracy in, or omission from, the information, or from its interpretation. Readers are advised to verify the information independently with qualified professionals.</p>
                    <p>This website is not intended to advertise or solicit work and does not seek to create, or invite, an advocate-client relationship. Links on this website are provided only to give access to basic information about {FIRM_NAME} and to share the firm&apos;s writing and thought leadership. Nothing on this website or on any linked page should be treated as legal advice or as a legal reference. Readers should not act on any content here and should consult a qualified legal professional in the relevant jurisdiction to understand its impact on them.</p>
                    <p>Please do not use the consultation or contact forms on this website to send confidential, commercially sensitive or privileged information. Any such information is shared at the sender&apos;s own risk until an engagement has been confirmed in writing.</p>
                    <p>This website uses cookies to improve its usability and your experience. By continuing to use it without changing your browser privacy settings, you agree to the use of cookies.</p>
                  </div>
                  <p className="mt-4 border-t border-charcoal-200 pt-3 text-sm">
                    <Link href="/terms-of-use" className="font-medium text-navy-800 underline decoration-gold-500 underline-offset-2 hover:text-gold-600">Terms of Use</Link>
                    {' and '}
                    <Link href="/privacy-policy" className="font-medium text-navy-800 underline decoration-gold-500 underline-offset-2 hover:text-gold-600">Privacy Policy</Link>
                  </p>
                </div>
                <footer className="flex shrink-0 flex-col items-center justify-end gap-3 border-t border-charcoal-200 bg-ivory-50 px-5 py-4 sm:flex-row sm:px-8">
                  <button ref={acceptRef} type="button" onClick={acceptDisclaimer} className="h-11 w-full max-w-[150px] bg-navy-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-gold-500 sm:w-[150px]">Accept</button>
                  <button type="button" onClick={() => setIsDeclined(true)} className="h-11 w-full max-w-[150px] border border-navy-900 px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-ivory-200 focus-visible:outline-2 focus-visible:outline-gold-500 sm:w-[150px]">Decline</button>
                </footer>
              </>
            ) : (
              <div className="px-5 py-6 sm:px-8">
                <p className="text-base leading-relaxed text-charcoal-700">You need to accept the disclaimer to continue using this website.</p>
                <div className="mt-6 flex flex-col items-center justify-end gap-3 sm:flex-row">
                  <button ref={reviewRef} type="button" onClick={() => setIsDeclined(false)} className="h-11 w-full max-w-[150px] border border-navy-900 px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-ivory-200 focus-visible:outline-2 focus-visible:outline-gold-500 sm:w-[150px]">Review Disclaimer</button>
                  <button type="button" onClick={() => { window.location.href = 'https://www.google.com'; }} className="h-11 w-full max-w-[150px] bg-navy-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-gold-500 sm:w-[150px]">Leave Site</button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
      <style jsx global>{`
        .disclaimer-scrollbar { scrollbar-width: thin; scrollbar-color: var(--color-gold-500) var(--color-ivory-100); }
        .disclaimer-scrollbar::-webkit-scrollbar { width: 6px; }
        .disclaimer-scrollbar::-webkit-scrollbar-track { background: var(--color-ivory-100); }
        .disclaimer-scrollbar::-webkit-scrollbar-thumb { background: var(--color-gold-500); }
      `}</style>
    </>
  );
}
