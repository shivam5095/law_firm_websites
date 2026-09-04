import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-ivory-50 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="font-heading text-6xl text-navy-900 mb-6">404</h1>
        <div className="w-16 h-1 bg-gold-500 mx-auto mb-8" />
        <h2 className="font-heading text-3xl text-navy-800 mb-4">Page Not Found</h2>
        <p className="text-charcoal-600 text-lg mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="inline-block bg-navy-900 hover:bg-navy-800 text-white font-medium px-8 py-4 transition-colors uppercase tracking-wider text-sm"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
