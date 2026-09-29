import { Briefcase, Mail } from 'lucide-react';

export default function CareersInboxPage() {
    const careersEmail = process.env.NEXT_PUBLIC_CAREERS_EMAIL || 'anandkrmaurya13@gmail.com';

    return (
        <section className="max-w-3xl space-y-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-700">Recruitment</p>
                <h1 className="mt-2 font-serif text-2xl font-medium text-slate-900 md:text-3xl">Careers Inbox</h1>
            </div>
            <div className="border border-slate-200 bg-white p-6 md:p-8">
                <Briefcase className="mb-5 h-8 w-8 text-gold-700" />
                <h2 className="font-serif text-xl text-slate-900">Applications are delivered by email</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                    Each application arrives at the recruitment inbox with the applicant&apos;s details and resume attached. No applicant documents or personal information are stored in this admin portal.
                </p>
                <div className="mt-6 flex items-start gap-3 border-t border-slate-100 pt-5 text-sm text-slate-700">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-navy-800" />
                    <span>{careersEmail}</span>
                </div>
            </div>
        </section>
    );
}