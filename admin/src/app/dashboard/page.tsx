'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { 
  Calendar, 
  Mail, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  matterType: string;
  preferredMode: string;
  preferredDate: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
}

export default function DashboardOverview() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [consResponse, contactsResponse] = await Promise.all([
          adminApi.get('/admin/consultations'),
          adminApi.get('/admin/contacts'),
        ]);

        if (consResponse.success) setConsultations(consResponse.data);
        if (contactsResponse.success) setContacts(contactsResponse.data);
      } catch (err: any) {
        console.error(err);
        setErrorMsg('Failed to load dashboard metrics. Verify database connections and try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-navy-800 animate-spin mb-4" />
        <p className="text-charcoal-500 font-medium">Aggregating metrics...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-red-50 text-red-600 border border-red-200 p-6 flex items-start gap-4 max-w-2xl">
        <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-lg mb-1">Server Error</h3>
          <p className="text-sm">{errorMsg}</p>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalConsultations = consultations.length;
  const newConsultations = consultations.filter((c) => c.status === 'NEW').length;
  const inProgressConsultations = consultations.filter((c) => c.status === 'IN_PROGRESS').length;
  const closedConsultations = consultations.filter((c) => c.status === 'CLOSED').length;
  const totalContacts = contacts.length;
  const newContacts = contacts.filter((c) => c.status === 'NEW').length;

  const recentCons = consultations.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-navy-800 font-medium">Dashboard Overview</h1>
        <p className="text-charcoal-500 text-sm mt-1">Central management for client inquiries and schedule requests.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Consultations */}
        <div className="bg-white border border-slate-200 p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-charcoal-500 font-medium uppercase tracking-wider block">Total Consultations</span>
            <span className="text-3xl font-semibold text-navy-800 mt-2 block">{totalConsultations}</span>
          </div>
          <div className="bg-navy-50 text-navy-800 p-3 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: New Consultations */}
        <div className="bg-white border border-slate-200 p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-charcoal-500 font-medium uppercase tracking-wider block">New Requests</span>
            <span className="text-3xl font-semibold text-gold-600 mt-2 block">{newConsultations}</span>
          </div>
          <div className="bg-amber-50 text-amber-600 p-3 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white border border-slate-200 p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-charcoal-500 font-medium uppercase tracking-wider block">In Progress</span>
            <span className="text-3xl font-semibold text-sky-600 mt-2 block">{inProgressConsultations}</span>
          </div>
          <div className="bg-sky-50 text-sky-600 p-3 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Total Contact Messages */}
        <div className="bg-white border border-slate-200 p-6 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-charcoal-500 font-medium uppercase tracking-wider block">Contact Submissions</span>
            <span className="text-3xl font-semibold text-emerald-600 mt-2 block">{totalContacts} <span className="text-xs font-normal text-charcoal-500">({newContacts} new)</span></span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Consultations */}
        <div className="bg-white border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-navy-800">Recent Consultation Requests</h3>
            <Link href="/dashboard/consultations" className="text-xs text-navy-700 hover:text-gold-600 font-semibold underline">
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            {recentCons.length === 0 ? (
              <div className="p-8 text-center text-charcoal-500 text-sm">No consultation requests submitted yet.</div>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                    <th className="p-4">Name</th>
                    <th className="p-4">Matter</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentCons.map((con) => (
                    <tr key={con.id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{con.name}</td>
                      <td className="p-4 text-slate-600">{con.matterType}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          con.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                          con.status === 'CONTACTED' ? 'bg-indigo-100 text-indigo-800' :
                          con.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {con.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-navy-800">Recent Contact Messages</h3>
            <Link href="/dashboard/contacts" className="text-xs text-navy-700 hover:text-gold-600 font-semibold underline">
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center text-charcoal-500 text-sm">No contact messages submitted yet.</div>
            ) : (
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                    <th className="p-4">Name</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{contact.name}</td>
                      <td className="p-4 text-slate-600 truncate max-w-[150px]">{contact.subject}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          contact.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                          contact.status === 'CONTACTED' ? 'bg-indigo-100 text-indigo-800' :
                          contact.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
