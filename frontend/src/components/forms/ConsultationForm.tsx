'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultationSchema, type ConsultationFormData } from '@/lib/validations';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { api } from '@/lib/api';

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      preferredMode: 'Office',
      matterType: 'Banking & Finance'
    }
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await api.post('/consultations', data);
      setIsSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMsg(error.message || 'An error occurred while submitting the form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-ivory-50 border border-gold-400/30 p-8 text-center flex flex-col items-center justify-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-gold-500" />
        <h3 className="font-heading text-2xl text-navy-900">Request Submitted</h3>
        <p className="text-charcoal-700 max-w-md">
          Thank you for reaching out. We have received your consultation request and our team will get back to you shortly to confirm the appointment.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm font-medium text-navy-600 hover:text-navy-900 underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-charcoal-700">Full Name</label>
          <input
            id="name"
            {...register('name')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors",
              errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700">Phone</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors",
              errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors",
              errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="matterType" className="block text-sm font-medium text-charcoal-700">Nature of Matter</label>
          <select
            id="matterType"
            {...register('matterType')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors bg-white",
              errors.matterType ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
          >
            <option value="Banking & Finance">Banking & Finance</option>
            <option value="Debt Restructuring">Debt Restructuring</option>
            <option value="Arbitration & Dispute Resolution">Arbitration & Dispute Resolution</option>
            <option value="Project & Infrastructure Disputes">Project & Infrastructure Disputes</option>
            <option value="Commercial Disputes">Commercial Disputes</option>
            <option value="Insolvency & Financial Distress">Insolvency & Financial Distress</option>
            <option value="Other">Other</option>
          </select>
          {errors.matterType && <p className="text-red-600 text-sm mt-1">{errors.matterType.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal-700 mb-2">Preferred Consultation Mode</label>
          <div className="flex flex-wrap gap-4">
            {['Office', 'Phone', 'Video'].map((mode) => (
              <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value={mode}
                  {...register('preferredMode')}
                  className="w-4 h-4 text-navy-600 border-charcoal-300 focus:ring-navy-600"
                />
                <span className="text-sm text-charcoal-800">{mode}</span>
              </label>
            ))}
          </div>
          {errors.preferredMode && <p className="text-red-600 text-sm mt-1">{errors.preferredMode.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="preferredDate" className="block text-sm font-medium text-charcoal-700">Preferred Date (Optional)</label>
          <input
            id="preferredDate"
            type="date"
            {...register('preferredDate')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors",
              errors.preferredDate ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700">Brief Description</label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={cn(
            "w-full border rounded-sm px-4 py-3 outline-none transition-colors resize-y",
            errors.message ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
          )}
          placeholder="Please provide a brief overview of your matter..."
        ></textarea>
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('consent')}
            className="mt-1 w-4 h-4 text-navy-600 border-charcoal-300 focus:ring-navy-600 rounded-sm"
          />
          <span className="text-sm text-charcoal-700 leading-relaxed">
            I understand that submitting this form does not create an advocate-client relationship. Information provided will be kept confidential but we request you not to share any highly sensitive or confidential information until a formal engagement is established.
          </span>
        </label>
        {errors.consent && <p className="text-red-600 text-sm mt-1">{errors.consent.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-navy-900 text-white hover:bg-navy-800 px-8 py-3.5 rounded-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request Consultation'
        )}
      </button>
    </form>
  );
}
