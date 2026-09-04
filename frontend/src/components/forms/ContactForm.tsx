'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { api } from '@/lib/api';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await api.post('/contact', data);
      setIsSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMsg(error.message || 'An error occurred while sending your message. Please try again or contact us directly via email or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-ivory-50 border border-gold-400/30 p-8 text-center flex flex-col items-center justify-center space-y-4 h-full min-h-[400px]">
        <CheckCircle2 className="w-12 h-12 text-gold-500" />
        <h3 className="font-heading text-2xl text-navy-900">Message Sent</h3>
        <p className="text-charcoal-700 max-w-md">
          Thank you for reaching out to us. We have received your message and will respond as soon as possible.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm font-medium text-navy-600 hover:text-navy-900 underline underline-offset-4"
        >
          Send another message
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700">Phone (Optional)</label>
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

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-charcoal-700">Subject</label>
          <input
            id="subject"
            {...register('subject')}
            className={cn(
              "w-full border rounded-sm px-4 py-3 outline-none transition-colors",
              errors.subject ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            )}
            placeholder="How can we help you?"
          />
          {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700">Message</label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={cn(
            "w-full border rounded-sm px-4 py-3 outline-none transition-colors resize-y",
            errors.message ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-charcoal-200 focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
          )}
          placeholder="Please write your message here..."
        ></textarea>
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-navy-900 text-white hover:bg-navy-800 px-8 py-3.5 rounded-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
