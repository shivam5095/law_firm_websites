import { firm } from '@/data/firm';
import { Phone, Mail } from 'lucide-react';
import { getPhoneUrl } from '@/lib/utils';

export function TopBar() {
  return (
    <div className="top-info-bar min-h-11 bg-navy-950 text-ivory-300 border-b border-navy-800 text-[11px] px-4 md:px-6 lg:px-8">
      <div className="top-info-inner max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="top-info-contact ml-auto flex min-w-0 items-center justify-end gap-2">
          <a
            href={getPhoneUrl(firm.phone)}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-ivory-300 hover:text-gold-400"
          >
            <Phone size={11} className="text-gold-400" />
            <span>{firm.phone}</span>
          </a>
          <span className="hidden lg:inline text-navy-700">|</span>
          <a
            href={`mailto:${firm.email}`}
            className="flex min-w-0 items-center gap-1.5 truncate text-ivory-300 hover:text-gold-400"
          >
            <Mail size={11} className="text-gold-400" />
            <span className="truncate">{firm.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
