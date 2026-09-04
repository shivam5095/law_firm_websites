'use client';

import React, { useState } from 'react';
import { Landmark, ShieldCheck, Building, Scale, ArrowUpRight, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ClientEntity {
  name: string;
  shortName: string;
  category: 'bank' | 'nbfc';
  badge: string;
  accentColor: string;
  bgLight: string;
  tagline: string;
  matters: string[];
}

const clientsData: ClientEntity[] = [
  // Commercial & Multinational Banks
  {
    name: 'State Bank of India',
    shortName: 'SBI',
    category: 'bank',
    badge: 'Public Sector Banking Giant',
    accentColor: '#1E40AF',
    bgLight: 'bg-blue-50/70 border-blue-200/60',
    tagline: 'Largest Public Sector Bank in India',
    matters: ['DRT & SARFAESI Actions', 'NPA Recovery Proceedings', 'Consortium Security Review'],
  },
  {
    name: 'HDFC Bank',
    shortName: 'HDFC',
    category: 'bank',
    badge: 'Leading Private Sector Bank',
    accentColor: '#1E3A8A',
    bgLight: 'bg-slate-50 border-slate-200',
    tagline: 'Premier Banking & Financial Conglomerate',
    matters: ['Commercial Litigation', 'Facility Documentation', 'Corporate Debt Recovery'],
  },
  {
    name: 'ICICI Bank',
    shortName: 'ICICI',
    category: 'bank',
    badge: 'Multinational Banking Flagship',
    accentColor: '#C2410C',
    bgLight: 'bg-amber-50/70 border-amber-200/60',
    tagline: 'Major Private Financial Institution',
    matters: ['Insolvency & Bankruptcy (IBC)', 'High-Value Summary Suits', 'Commercial Contracts'],
  },
  {
    name: 'Axis Bank',
    shortName: 'AXIS',
    category: 'bank',
    badge: 'Premier Commercial Bank',
    accentColor: '#9D174D',
    bgLight: 'bg-rose-50/70 border-rose-200/60',
    tagline: 'Leading Private Commercial Bank',
    matters: ['Stressed Asset Resolution', 'Debt Restructuring', 'Secured Asset Realization'],
  },
  {
    name: 'Kotak Mahindra Bank',
    shortName: 'KOTAK',
    category: 'bank',
    badge: 'Leading Financial Conglomerate',
    accentColor: '#DC2626',
    bgLight: 'bg-red-50/60 border-red-200/60',
    tagline: 'Premier Commercial & Retail Banking',
    matters: ['Section 9 Interim Relief', 'Commercial Arbitration', 'Asset Recovery Strategy'],
  },
  {
    name: 'IndusInd Bank',
    shortName: 'INDUSIND',
    category: 'bank',
    badge: 'New-Generation Commercial Bank',
    accentColor: '#9A3412',
    bgLight: 'bg-orange-50/70 border-orange-200/60',
    tagline: 'Universal Banking Institution',
    matters: ['Vehicle & Equipment Finance Disputes', 'Contract Enforcement', 'Commercial Arbitration'],
  },
  {
    name: 'IDFC FIRST Bank',
    shortName: 'IDFC FIRST',
    category: 'bank',
    badge: 'Universal Commercial Bank',
    accentColor: '#881337',
    bgLight: 'bg-pink-50/60 border-pink-200/60',
    tagline: 'Infrastructure & Retail Banking',
    matters: ['Infrastructure Lending Disputes', 'Summary Claims', 'Negotiable Instruments Act (NI 138)'],
  },
  {
    name: 'American Express',
    shortName: 'AMEX',
    category: 'bank',
    badge: 'Global Financial Services Giant',
    accentColor: '#0284C7',
    bgLight: 'bg-sky-50/70 border-sky-200/60',
    tagline: 'Multinational Financial Corporation',
    matters: ['Cross-Border Claims', 'Consumer Credit Enforcement', 'Commercial Arbitration'],
  },
  {
    name: 'HSBC Bank',
    shortName: 'HSBC',
    category: 'bank',
    badge: 'Multinational Banking Corporation',
    accentColor: '#B91C1C',
    bgLight: 'bg-stone-50 border-stone-200',
    tagline: 'Global Banking & Financial Services',
    matters: ['Trade Finance Disputes', 'International Commercial Recovery', 'Cross-Border Jurisdiction'],
  },

  // Premier NBFCs & Financial Conglomerates
  {
    name: 'Aditya Birla Capital',
    shortName: 'ABC',
    category: 'nbfc',
    badge: 'Premier NBFC Conglomerate',
    accentColor: '#B45309',
    bgLight: 'bg-amber-50/60 border-amber-200/60',
    tagline: 'Universal Financial Solutions Group',
    matters: ['Structured Corporate Lending', 'Debt Restructuring & OTS', 'Security Enforcement'],
  },
  {
    name: 'Bajaj Finance',
    shortName: 'BAJAJ',
    category: 'nbfc',
    badge: 'Leading Retail & Corporate NBFC',
    accentColor: '#1E3A8A',
    bgLight: 'bg-blue-50/60 border-blue-200/60',
    tagline: 'India\'s Largest Diversified NBFC',
    matters: ['High-Volume Debt Recovery', 'Arbitration Awards Execution', 'Commercial Tribunal Advocacy'],
  },
  {
    name: 'Tata Capital',
    shortName: 'TATA',
    category: 'nbfc',
    badge: 'Flagship Financial Services',
    accentColor: '#1D4ED8',
    bgLight: 'bg-indigo-50/60 border-indigo-200/60',
    tagline: 'Tata Group Financial Enterprise',
    matters: ['Commercial Facility Disputes', 'Secured Asset Recovery', 'Pre-Litigation Settlement'],
  },
  {
    name: 'Poonawalla Fincorp',
    shortName: 'POONAWALLA',
    category: 'nbfc',
    badge: 'Specialized Enterprise NBFC',
    accentColor: '#047857',
    bgLight: 'bg-emerald-50/60 border-emerald-200/60',
    tagline: 'Innovative Retail & MSME Financing',
    matters: ['MSME Credit Enforcement', 'Tribunal Representation', 'Arbitral Award Enforcement'],
  },
  {
    name: 'MoneyView',
    shortName: 'MONEYVIEW',
    category: 'nbfc',
    badge: 'Digital Lending & FinTech Leader',
    accentColor: '#059669',
    bgLight: 'bg-teal-50/60 border-teal-200/60',
    tagline: 'FinTech Credit & Lending Platform',
    matters: ['Digital Lending Compliance', 'Default Recovery Mechanisms', 'Dispute Resolution'],
  },
];

export function ClientsRepresentedSection() {
  const [filter, setFilter] = useState<'all' | 'bank' | 'nbfc'>('all');

  const filteredClients = clientsData.filter((client) => {
    if (filter === 'all') return true;
    return client.category === filter;
  });

  return (
    <section className="py-20 md:py-28 bg-white border-b border-charcoal-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-charcoal-100 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 mb-2">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>Institutional Casework &amp; Client Representation</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-950 font-bold tracking-tight">
              Banks &amp; Financial Institutions Represented
            </h2>
            <p className="text-charcoal-600 text-sm md:text-base max-w-3xl mt-3 leading-relaxed">
              Strategic counsel, debt recovery, and dispute resolution for premier scheduled commercial banks, 
              multinational banking giants, and leading non-banking financial corporations (NBFCs) across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-ivory-100 rounded-sm border border-charcoal-200 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'all'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              All Entities ({clientsData.length})
            </button>
            <button
              onClick={() => setFilter('bank')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'bank'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              Banks ({clientsData.filter((c) => c.category === 'bank').length})
            </button>
            <button
              onClick={() => setFilter('nbfc')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'nbfc'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              NBFCs &amp; FinTech ({clientsData.filter((c) => c.category === 'nbfc').length})
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-ivory-50 border border-charcoal-200/80 rounded-sm">
          <div className="border-r last:border-0 border-charcoal-200/80 pr-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">₹500+ Cr.</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Handled in Claims &amp; Restructuring
            </div>
          </div>
          <div className="border-r last:border-0 border-charcoal-200/80 px-2 md:px-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">14+ Entities</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Leading Banks &amp; Premier NBFCs
            </div>
          </div>
          <div className="border-r last:border-0 border-charcoal-200/80 px-2 md:px-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">DRT &amp; NCLT</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Tribunal &amp; High Court Advocacy
            </div>
          </div>
          <div className="pl-2 md:pl-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">Pan-India</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Multi-Jurisdiction Recovery Network
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredClients.map((client) => (
            <div
              key={client.name}
              className={cn(
                'group relative p-6 rounded-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between bg-white',
                client.bgLight
              )}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center font-heading font-bold text-xs text-white shadow-xs shrink-0"
                    style={{ backgroundColor: client.accentColor }}
                  >
                    {client.shortName.slice(0, 4)}
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-charcoal-500 bg-white/90 px-2 py-0.5 border border-charcoal-200 rounded-xs">
                    {client.badge}
                  </span>
                </div>

                {/* Name & Tagline */}
                <h3 className="font-heading text-lg font-bold text-navy-950 group-hover:text-gold-700 transition-colors">
                  {client.name}
                </h3>
                <p className="text-xs text-charcoal-500 mt-1 mb-4">
                  {client.tagline}
                </p>

                {/* Key Matters Handled */}
                <div className="space-y-1.5 pt-3 border-t border-charcoal-200/60">
                  <span className="text-[10px] uppercase font-semibold text-charcoal-600 tracking-wider block mb-1">
                    Representative Focus:
                  </span>
                  {client.matters.map((matter, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-charcoal-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                      <span>{matter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-charcoal-200/60 flex items-center justify-between text-xs font-semibold text-navy-800">
                <span className="text-[11px] text-charcoal-500 font-normal">
                  {client.category === 'bank' ? 'Commercial Bank' : 'Financial Services'}
                </span>
                <Link
                  href="/practice-areas/banking-finance"
                  className="inline-flex items-center gap-1 text-gold-700 hover:text-navy-950 transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Council Compliance Disclaimer Note */}
        <div className="mt-8 p-4 bg-ivory-50 border border-charcoal-200 text-xs text-charcoal-500 leading-relaxed rounded-sm">
          <strong className="text-navy-900 font-medium">Informational Disclaimer: </strong>
          The institutional names listed above represent corporate banks and non-banking financial entities for which the advocate and chambers have undertaken legal assignments, litigation, tribunal representation, facility documentation, or advisory matters. In adherence to the Bar Council of India rules, this compilation is intended strictly for factual informational reference and does not constitute advertisement or solicitation of legal business.
        </div>
      </div>
    </section>
  );
}
