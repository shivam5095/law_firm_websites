'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Upload } from 'lucide-react';
import { practiceAreas } from '@/data/practiceAreas';
import { submitCareerApplication } from '@/lib/api';

const inputClass = 'w-full border border-charcoal-200 rounded-sm px-4 py-3 outline-none transition-colors focus:border-navy-600 focus:ring-1 focus:ring-navy-600';

export function CareerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resumeName, setResumeName] = useState('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const form = event.currentTarget;
        const formData = new FormData(form);
        const resume = formData.get('resume');
        if (!(resume instanceof File) || resume.size === 0) {
            setErrorMessage('Please attach your resume.');
            setIsSubmitting(false);
            return;
        }
        if (resume.size > 4 * 1024 * 1024) {
            setErrorMessage('Resume must be 4 MB or smaller.');
            setIsSubmitting(false);
            return;
        }

        try {
            await submitCareerApplication(formData);
            setIsSuccess(true);
            form.reset();
            setResumeName('');
        } catch (error) {
            const message = error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
                ? error.message
                : 'We could not submit your application. Please try again.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="border border-gold-400/40 bg-white p-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-gold-600" />
                <h3 className="font-heading text-2xl text-navy-900">Application received</h3>
                <p className="mt-2 text-sm text-charcoal-600">Thank you for your interest. Our team will review your details and contact you if there is a suitable opportunity.</p>
                <button type="button" onClick={() => setIsSuccess(false)} className="mt-5 text-sm font-semibold text-navy-800 underline underline-offset-4">Send another application</button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {errorMessage && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-charcoal-700">
                    <span>Full Name</span>
                    <input name="fullName" type="text" autoComplete="name" required minLength={2} className={inputClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-charcoal-700">
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" required className={inputClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-charcoal-700">
                    <span>Phone</span>
                    <input name="phone" type="tel" autoComplete="tel" required minLength={10} className={inputClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-charcoal-700">
                    <span>Practice Area of Interest</span>
                    <select name="practiceArea" required defaultValue="" className={`${inputClass} bg-white`}>
                        <option value="" disabled>Select a practice area</option>
                        {practiceAreas.map((area) => <option key={area.id} value={area.title}>{area.title}</option>)}
                    </select>
                </label>
            </div>
            <label className="block space-y-2 text-sm font-medium text-charcoal-700">
                <span>Message / Brief Background</span>
                <textarea name="message" rows={4} required minLength={10} maxLength={3000} className={`${inputClass} resize-y`} placeholder="A brief introduction and what you hope to work on..." />
            </label>
            <div className="space-y-2">
                <span className="block text-sm font-medium text-charcoal-700">Resume (PDF, DOC, or DOCX, max 4 MB)</span>
                <label className="flex min-h-12 cursor-pointer items-center gap-3 border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-700 hover:border-navy-600">
                    <Upload size={17} className="shrink-0 text-gold-700" />
                    <span className="truncate">{resumeName || 'Choose a file'}</span>
                    <input
                        name="resume"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        onChange={(event) => setResumeName(event.target.files?.[0]?.name || '')}
                    />
                </label>
            </div>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-700">
                <input name="consent" type="checkbox" value="true" required className="mt-1 h-4 w-4 shrink-0 accent-navy-800" />
                <span>I consent to Maurya &amp; Co. using the information and resume I have provided to assess this application and contact me about opportunities.</span>
            </label>
            <input name="honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-navy-900 px-8 py-3.5 font-medium text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" />Submitting...</> : 'Submit Application'}
            </button>
        </form>
    );
}