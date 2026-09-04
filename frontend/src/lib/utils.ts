import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getWhatsAppUrl(number: string, message?: string): string {
  const clean = number.replace(/[^0-9]/g, '');
  const msg = message ? `&text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${clean}?${msg}`;
}

export function getPhoneUrl(number: string): string {
  return `tel:${number.replace(/\s/g, '')}`;
}

export function getEmailUrl(email: string, subject?: string): string {
  const subj = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${subj}`;
}
