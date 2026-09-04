'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-ivory-50 px-6">
      <div className="text-center max-w-2xl bg-white p-12 border border-charcoal-200 shadow-sm">
        <h2 className="font-heading text-3xl text-navy-900 mb-6">An Unexpected Error Occurred</h2>
        <div className="w-12 h-1 bg-gold-500 mx-auto mb-6" />
        <p className="text-charcoal-600 mb-10">
          We apologize for the inconvenience. Our technical team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-navy-900 hover:bg-navy-800 text-white font-medium px-8 py-3 transition-colors uppercase tracking-wider text-sm"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="bg-white border border-navy-900 text-navy-900 hover:bg-navy-50 font-medium px-8 py-3 transition-colors uppercase tracking-wider text-sm flex items-center justify-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
