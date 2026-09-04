import { firm } from '@/data/firm';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getPhoneUrl } from '@/lib/utils';

export function TopBar() {
  return (
    <div className="hidden lg:block bg-navy-950 text-ivory-300 border-b border-navy-800 text-[11px] py-1.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-gold-400 font-medium">
            <MapPin size={12} className="text-gold-400" />
            <span>Noida Hub • Delhi NCR</span>
          </span>
          <span className="text-navy-700">|</span>
          <span className="text-ivory-400">Supreme Court, High Courts, NCLT, DRT & Arbitration</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={getPhoneUrl(firm.phone)}
            className="flex items-center gap-1.5 text-ivory-300 hover:text-gold-400 transition-colors"
          >
            <Phone size={11} className="text-gold-400" />
            <span>{firm.phone}</span>
          </a>
          <span className="text-navy-700">|</span>
          <a
            href={`mailto:${firm.email}`}
            className="flex items-center gap-1.5 text-ivory-300 hover:text-gold-400 transition-colors"
          >
            <Mail size={11} className="text-gold-400" />
            <span>{firm.email}</span>
          </a>
          <span className="text-navy-700">|</span>
          <span className="text-ivory-400">{firm.officeHours}</span>
        </div>
      </div>
    </div>
  );
}
