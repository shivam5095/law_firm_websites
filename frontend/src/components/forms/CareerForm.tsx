'use client';

import { useState } from 'react';
import { submitCareerApplication } from '@/lib/api';
import Link from 'next/link';

export function CareerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    dateOfBirth: '',
    lawSchool: '',
    course: '',
    currentYear: '',
    graduationYear: '',
    cgpa: '',
    internshipMode: 'Office',
    duration: '4 Weeks',
    startDate: '',
    endDate: '',
    previousExperience: '',
    motivation: '',
    additionalInformation: '',
    consent: false,
    honeypot: '', // Honeypot spam defense
  });

  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [otherSkills, setOtherSkills] = useState('');

  // Files state
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [writingSample, setWritingSample] = useState<File | null>(null);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const availableAreas = [
    'Banking & Finance',
    'Debt Restructuring',
    'Arbitration & Dispute Resolution',
    'Project & Infrastructure Disputes',
    'Commercial Disputes',
    'Insolvency & Financial Distress',
  ];

  const availableSkills = [
    'Legal Research',
    'Legal Drafting',
    'Arbitration',
    'Corporate / Commercial Law',
    'Banking & Finance',
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (name === 'consent' && fieldErrors['consent']) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next['consent'];
        return next;
      });
    }
  };

  const handleAreaChange = (area: string) => {
    setAreasOfInterest((prev) => {
      const next = prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area];
      if (fieldErrors['areasOfInterest'] && next.length > 0) {
        setFieldErrors((errs) => {
          const updated = { ...errs };
          delete updated['areasOfInterest'];
          return updated;
        });
      }
      return next;
    });
  };

  const handleSkillChange = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const validateFile = (file: File, isRequired = false): string | null => {
    if (!file) {
      return isRequired ? 'This file is required.' : null;
    }
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !allowedExtensions.includes(extension)) {
      return 'File must be a PDF, DOC, or DOCX document.';
    }
    
    if (file.size > 5 * 1024 * 1024) {
      return 'File size cannot exceed 5 MB.';
    }
    
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileSetter: (f: File | null) => void, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    fileSetter(file);

    // Clear file error if valid
    if (file) {
      const error = validateFile(file);
      if (error) {
        setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
      } else {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[fieldName];
          return next;
        });
      }
    } else if (fieldName === 'resume') {
      setFieldErrors((prev) => ({ ...prev, resume: 'CV / Resume file is required.' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setFieldErrors({});

    // Client-side validations
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) errors.email = 'Email Address is required.';
    if (!formData.phone.trim()) errors.phone = 'Phone Number is required.';
    if (!formData.city.trim()) errors.city = 'City is required.';
    if (!formData.state.trim()) errors.state = 'State is required.';
    if (!formData.lawSchool.trim()) errors.lawSchool = 'Law School name is required.';
    if (!formData.course.trim()) errors.course = 'Current course description is required.';
    if (!formData.currentYear.trim()) errors.currentYear = 'Current Year / Semester is required.';
    if (areasOfInterest.length === 0) errors.areasOfInterest = 'Select at least one Area of Interest.';
    if (!formData.startDate) errors.startDate = 'Preferred Start Date is required.';
    if (!formData.endDate) errors.endDate = 'Preferred End Date is required.';
    if (!formData.motivation.trim()) errors.motivation = 'Why do you want to intern statement is required.';
    if (!formData.consent) errors.consent = 'You must confirm the accuracy of information.';

    if (!resume) {
      errors.resume = 'Resume / CV file is required.';
    } else {
      const resumeErr = validateFile(resume, true);
      if (resumeErr) errors.resume = resumeErr;
    }

    if (coverLetter) {
      const clErr = validateFile(coverLetter);
      if (clErr) errors.coverLetter = clErr;
    }

    if (writingSample) {
      const wsErr = validateFile(writingSample);
      if (wsErr) errors.writingSample = wsErr;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      // Build FormData
      const submission = new FormData();
      submission.append('fullName', formData.fullName);
      submission.append('email', formData.email);
      submission.append('phone', formData.phone);
      submission.append('city', formData.city);
      submission.append('state', formData.state);
      if (formData.dateOfBirth) submission.append('dateOfBirth', formData.dateOfBirth);
      submission.append('lawSchool', formData.lawSchool);
      submission.append('course', formData.course);
      submission.append('currentYear', formData.currentYear);
      if (formData.graduationYear) submission.append('graduationYear', formData.graduationYear);
      if (formData.cgpa) submission.append('cgpa', formData.cgpa);
      submission.append('areasOfInterest', JSON.stringify(areasOfInterest));
      submission.append('internshipMode', formData.internshipMode);
      submission.append('duration', formData.duration);
      submission.append('startDate', formData.startDate);
      submission.append('endDate', formData.endDate);
      if (formData.previousExperience) submission.append('previousExperience', formData.previousExperience);
      
      const allSkills = [...skills];
      if (otherSkills.trim()) allSkills.push(otherSkills.trim());
      submission.append('skills', JSON.stringify(allSkills));
      
      submission.append('motivation', formData.motivation);
      if (formData.additionalInformation) submission.append('additionalInformation', formData.additionalInformation);
      if (formData.honeypot) submission.append('honeypot', formData.honeypot);

      // Files
      if (resume) submission.append('resume', resume);
      if (coverLetter) submission.append('coverLetter', coverLetter);
      if (writingSample) submission.append('writingSample', writingSample);

      const response = await submitCareerApplication(submission);
      if (response.success) {
        setReferenceId(response.data.id);
      } else {
        setSubmitError(response.message || 'Failed to submit application.');
      }
    } catch (err: any) {
      if (err.errors && Array.isArray(err.errors)) {
        const backendErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          backendErrors[e.field] = e.message;
        });
        setFieldErrors(backendErrors);
        setSubmitError('Please correct the validation errors in the form.');
      } else {
        setSubmitError(err.message || 'An error occurred during submission. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (referenceId) {
    return (
      <div className="bg-white border border-charcoal-100 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-navy-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-navy-900 mb-4">Application Submitted</h3>
        <p className="text-charcoal-600 mb-6 leading-relaxed">
          Thank you for your interest in our chambers. Your internship application has been successfully received and is currently under review by our recruitment committee.
        </p>
        <div className="bg-ivory-50 border border-charcoal-100 py-3 px-6 rounded mb-8 inline-block">
          <span className="text-xs text-charcoal-500 uppercase tracking-widest block mb-1">
            Application Reference ID
          </span>
          <span className="font-mono text-navy-900 font-semibold tracking-wider text-sm select-all">
            {referenceId}
          </span>
        </div>
        <div>
          <button
            onClick={() => {
              setReferenceId(null);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                city: '',
                state: '',
                dateOfBirth: '',
                lawSchool: '',
                course: '',
                currentYear: '',
                graduationYear: '',
                cgpa: '',
                internshipMode: 'Office',
                duration: '4 Weeks',
                startDate: '',
                endDate: '',
                previousExperience: '',
                motivation: '',
                additionalInformation: '',
                consent: false,
                honeypot: '',
              });
              setAreasOfInterest([]);
              setSkills([]);
              setOtherSkills('');
              setResume(null);
              setCoverLetter(null);
              setWritingSample(null);
            }}
            className="inline-block bg-navy-900 hover:bg-gold-600 hover:text-navy-950 text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors duration-300"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-charcoal-100/60 p-8 md:p-12 shadow-sm max-w-4xl mx-auto space-y-12 text-navy-900">
      
      {/* Honeypot anti-spam field (hidden from users) */}
      <div className="hidden">
        <label htmlFor="honeypot">Leave this field blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleTextChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
          <p className="font-semibold">Submission Error</p>
          <p>{submitError}</p>
        </div>
      )}

      {/* 1. PERSONAL INFORMATION */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          1. Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="fullName">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.fullName ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. Rahul Sharma"
            />
            {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.email ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. rahul@example.com"
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="phone">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.phone ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. +91 9876543210"
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleTextChange}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 text-charcoal-700"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="city">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.city ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. Prayagraj"
            />
            {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="state">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.state ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. Uttar Pradesh"
            />
            {fieldErrors.state && <p className="text-red-500 text-xs mt-1">{fieldErrors.state}</p>}
          </div>
        </div>
      </div>

      {/* 2. ACADEMIC INFORMATION */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          2. Academic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="lawSchool">
              Law School / University *
            </label>
            <input
              type="text"
              id="lawSchool"
              name="lawSchool"
              required
              value={formData.lawSchool}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.lawSchool ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. National Law School of India University (NLSIU)"
            />
            {fieldErrors.lawSchool && <p className="text-red-500 text-xs mt-1">{fieldErrors.lawSchool}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="course">
              Current Course *
            </label>
            <input
              type="text"
              id="course"
              name="course"
              required
              value={formData.course}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.course ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. 5-Year B.A. LL.B. (Hons.)"
            />
            {fieldErrors.course && <p className="text-red-500 text-xs mt-1">{fieldErrors.course}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="currentYear">
              Current Year / Semester *
            </label>
            <input
              type="text"
              id="currentYear"
              name="currentYear"
              required
              value={formData.currentYear}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 ${
                fieldErrors.currentYear ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="e.g. 4th Year / 8th Semester"
            />
            {fieldErrors.currentYear && <p className="text-red-500 text-xs mt-1">{fieldErrors.currentYear}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="graduationYear">
              Expected Graduation Year
            </label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleTextChange}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30"
              placeholder="e.g. 2027"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="cgpa">
              CGPA / Percentage
            </label>
            <input
              type="text"
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleTextChange}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30"
              placeholder="e.g. 7.82 / 10.0 or 78%"
            />
          </div>
        </div>
      </div>

      {/* 3. PROFESSIONAL INFORMATION */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          3. Professional Information
        </h3>
        
        <div className="space-y-6">
          <div>
            <span className="block text-xs uppercase tracking-widest font-semibold mb-3">
              Areas of Interest *
            </span>
            <div id="areasOfInterest" className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableAreas.map((area) => (
                <label key={area} className="flex items-start text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={areasOfInterest.includes(area)}
                    onChange={() => handleAreaChange(area)}
                    className="mt-1 mr-3 h-4 w-4 accent-gold-600 rounded"
                  />
                  <span className="text-charcoal-700 leading-tight">{area}</span>
                </label>
              ))}
            </div>
            {fieldErrors.areasOfInterest && <p className="text-red-500 text-xs mt-2">{fieldErrors.areasOfInterest}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="internshipMode">
                Preferred Internship Mode *
              </label>
              <select
                id="internshipMode"
                name="internshipMode"
                value={formData.internshipMode}
                onChange={handleTextChange}
                className="w-full border border-charcoal-200 px-4 py-3 text-sm bg-white focus:outline-none focus:border-gold-500"
              >
                <option value="Office">Physical (Office Chambers)</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="duration">
                Preferred Internship Duration *
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleTextChange}
                className="w-full border border-charcoal-200 px-4 py-3 text-sm bg-white focus:outline-none focus:border-gold-500"
              >
                <option value="4 Weeks">4 Weeks (1 Month)</option>
                <option value="8 Weeks">8 Weeks (2 Months)</option>
                <option value="12 Weeks">12 Weeks (3 Months)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="startDate">
                Preferred Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleTextChange}
                className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-charcoal-700 bg-ivory-50/30 ${
                  fieldErrors.startDate ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
                }`}
              />
              {fieldErrors.startDate && <p className="text-red-500 text-xs mt-1">{fieldErrors.startDate}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="endDate">
                Preferred End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleTextChange}
                className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-charcoal-700 bg-ivory-50/30 ${
                  fieldErrors.endDate ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
                }`}
              />
              {fieldErrors.endDate && <p className="text-red-500 text-xs mt-1">{fieldErrors.endDate}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* 4. EXPERIENCE & SKILLS */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          4. Experience & Skills
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="previousExperience">
              Previous Internship / Work Experience
            </label>
            <textarea
              id="previousExperience"
              name="previousExperience"
              rows={4}
              value={formData.previousExperience}
              onChange={handleTextChange}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 leading-relaxed"
              placeholder="Outline your previous internships, chambers or law firms you have assisted, court exposures, and key tasks accomplished."
            ></textarea>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-widest font-semibold mb-3">
              Skills
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSkills.map((skill) => (
                <label key={skill} className="flex items-center text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="mr-3 h-4 w-4 accent-gold-600 rounded"
                  />
                  <span className="text-charcoal-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="otherSkills">
              Other Skills
            </label>
            <input
              type="text"
              id="otherSkills"
              value={otherSkills}
              onChange={(e) => setOtherSkills(e.target.value)}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30"
              placeholder="e.g. Legal Databases (Manupatra, SCC Online), Article Writing, Languages spoken"
            />
          </div>
        </div>
      </div>

      {/* 5. STATEMENT OF MOTIVATION */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          5. Statement of Motivation
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="motivation">
              Why do you want to intern with us? *
            </label>
            <textarea
              id="motivation"
              name="motivation"
              required
              rows={5}
              value={formData.motivation}
              onChange={handleTextChange}
              className={`w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 leading-relaxed ${
                fieldErrors.motivation ? 'border-red-400 focus:border-red-400' : 'border-charcoal-200'
              }`}
              placeholder="Explain how an internship at our chambers aligns with your academic goals and career objectives. Highlight specific areas of our practice that interest you."
            ></textarea>
            {fieldErrors.motivation && <p className="text-red-500 text-xs mt-1">{fieldErrors.motivation}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2" htmlFor="additionalInformation">
              Additional Information
            </label>
            <textarea
              id="additionalInformation"
              name="additionalInformation"
              rows={3}
              value={formData.additionalInformation}
              onChange={handleTextChange}
              className="w-full border border-charcoal-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 bg-ivory-50/30 leading-relaxed"
              placeholder="Any publication details, academic accolades, writing samples context, or special information you'd like to share."
            ></textarea>
          </div>
        </div>
      </div>

      {/* 6. UPLOAD DOCUMENTS */}
      <div>
        <h3 className="font-heading text-xl text-navy-900 border-b border-charcoal-100 pb-3 mb-6">
          6. Upload Documents (PDF, DOC, DOCX - Max 5 MB each)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div id="resume">
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2">
              Resume / CV *
            </label>
            <div className="relative border border-charcoal-200 p-4 bg-ivory-50/20 text-center">
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setResume, 'resume')}
                className="w-full text-xs text-charcoal-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-gold-600 cursor-pointer"
              />
              {resume && <p className="text-xs text-navy-900 mt-2 font-medium truncate">{resume.name}</p>}
            </div>
            {fieldErrors.resume && <p className="text-red-500 text-xs mt-1">{fieldErrors.resume}</p>}
          </div>

          <div id="coverLetter">
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2">
              Cover Letter (Optional)
            </label>
            <div className="relative border border-charcoal-200 p-4 bg-ivory-50/20 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setCoverLetter, 'coverLetter')}
                className="w-full text-xs text-charcoal-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-gold-600 cursor-pointer"
              />
              {coverLetter && <p className="text-xs text-navy-900 mt-2 font-medium truncate">{coverLetter.name}</p>}
            </div>
            {fieldErrors.coverLetter && <p className="text-red-500 text-xs mt-1">{fieldErrors.coverLetter}</p>}
          </div>

          <div id="writingSample">
            <label className="block text-xs uppercase tracking-widest font-semibold mb-2">
              Writing Sample (Optional)
            </label>
            <div className="relative border border-charcoal-200 p-4 bg-ivory-50/20 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setWritingSample, 'writingSample')}
                className="w-full text-xs text-charcoal-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-gold-600 cursor-pointer"
              />
              {writingSample && <p className="text-xs text-navy-900 mt-2 font-medium truncate">{writingSample.name}</p>}
            </div>
            {fieldErrors.writingSample && <p className="text-red-500 text-xs mt-1">{fieldErrors.writingSample}</p>}
          </div>

        </div>
      </div>

      {/* 7. CONSENT & SUBMISSION */}
      <div className="pt-6 border-t border-charcoal-100">
        <div id="consent" className="mb-8">
          <label className="flex items-start text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleCheckboxChange}
              className="mt-1 mr-3 h-4 w-4 accent-gold-600 rounded"
            />
            <span className="text-charcoal-700 leading-tight">
              I confirm that the information provided by me is accurate and may be used for the purpose of evaluating my application. *
            </span>
          </label>
          {fieldErrors.consent && <p className="text-red-500 text-xs mt-2">{fieldErrors.consent}</p>}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs text-charcoal-500">
            * Indicates a required field. Files are processed securely.
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto bg-navy-900 hover:bg-gold-600 text-white hover:text-navy-950 font-semibold uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300 ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </div>
      </div>
    </form>
  );
}
