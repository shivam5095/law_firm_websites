export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-ivory-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-charcoal-200 border-t-gold-500 rounded-full animate-spin"></div>
        <p className="mt-4 font-heading text-navy-800 tracking-wider">LOADING</p>
      </div>
    </div>
  );
}
