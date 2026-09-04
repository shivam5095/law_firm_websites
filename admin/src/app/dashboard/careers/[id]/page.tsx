'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi, downloadAdminFile } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Download, RefreshCw, CheckCircle, Calendar, Shield } from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  dateOfBirth: string | null;
  lawSchool: string;
  course: string;
  currentYear: string;
  graduationYear: number | null;
  cgpa: string | null;
  areasOfInterest: string[];
  internshipMode: string;
  duration: string;
  startDate: string;
  endDate: string;
  previousExperience: string | null;
  skills: string[];
  motivation: string;
  additionalInformation: string | null;
  resumePath: string;
  resumeOriginalName: string;
  coverLetterPath: string | null;
  writingSamplePath: string | null;
  status: string;
  createdAt: string;
}

export default function CareerApplicationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const statuses = [
    'SUBMITTED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'INTERVIEW',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN',
  ];

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.get(`/admin/careers/${id}`);
      if (response.success) {
        setApplication(response.data);
      } else {
        setError(response.message || 'Failed to load application details.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading candidate files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setUpdating(true);
      setSuccessMsg(null);
      const response = await adminApi.patch(`/admin/careers/${id}/status`, { status: newStatus });
      if (response.success) {
        setApplication((prev) => prev ? { ...prev, status: newStatus } : null);
        setSuccessMsg(`Application status updated to ${newStatus.replace('_', ' ')}.`);
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        alert(response.message || 'Failed to update status.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred while updating status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = async (docType: 'resume' | 'cover-letter' | 'writing-sample', defaultName: string) => {
    try {
      await downloadAdminFile(`/admin/careers/${id}/${docType}`, defaultName);
    } catch (err: any) {
      alert(err.message || 'Document file missing on server.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this application and its files? This action is irreversible.')) {
      return;
    }

    try {
      const response = await adminApi.delete(`/admin/careers/${id}`);
      if (response.success) {
        router.push('/dashboard/careers');
      } else {
        alert(response.message || 'Failed to delete application.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred during deletion.');
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-navy-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Loading candidate files...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Link href="/dashboard/careers" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-navy-950 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 text-red-700 flex flex-col gap-2 shadow-sm">
          <h3 className="font-semibold text-lg">Error Loading Candidate Profile</h3>
          <p>{error || 'Application not found.'}</p>
        </div>
      </div>
    );
  }

  const cleanName = application.fullName.replace(/\s+/g, '_');

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-800 pb-20">
      
      {/* Header and Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Link href="/dashboard/careers" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-navy-950 gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>
          <h1 className="font-serif text-3xl font-medium text-slate-900">{application.fullName}</h1>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Applied on {new Date(application.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            className="border border-red-200 text-red-600 bg-white hover:bg-red-50 text-xs uppercase tracking-widest font-semibold px-4 py-2.5 transition-colors"
          >
            Delete File
          </button>
        </div>
      </div>

      {/* Main Grid: Info Cards and Status Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Detail blocks (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Personal Info */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Email Address</p>
                <a href={`mailto:${application.email}`} className="text-navy-900 font-medium hover:underline">
                  {application.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Phone Number</p>
                <a href={`tel:${application.phone}`} className="text-navy-900 font-medium hover:underline">
                  {application.phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Current Location</p>
                <p className="font-medium text-slate-800">{application.city}, {application.state}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Date of Birth</p>
                <p className="font-medium text-slate-800">
                  {application.dateOfBirth 
                    ? new Date(application.dateOfBirth).toLocaleDateString('en-IN', { dateStyle: 'medium' })
                    : 'Not specified'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Profile */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Academic Background
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Law School / University</p>
                <p className="font-medium text-slate-900 text-base">{application.lawSchool}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Course Description</p>
                <p className="font-medium text-slate-800">{application.course}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Current Year / Semester</p>
                <p className="font-medium text-slate-800">{application.currentYear}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Expected Graduation Year</p>
                <p className="font-medium text-slate-800">{application.graduationYear || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">CGPA / Percentage</p>
                <p className="font-medium text-slate-800">{application.cgpa || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Experience & Skills */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Professional Experience & Skills
            </h3>
            <div className="space-y-6 text-sm">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Areas of Interest</p>
                <div className="flex flex-wrap gap-2">
                  {application.areasOfInterest.map((area) => (
                    <span key={area} className="bg-navy-50 text-navy-800 px-3 py-1 rounded-sm text-xs font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill) => (
                    <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-sm text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Previous Experience Details</p>
                <div className="bg-slate-50 border border-slate-150 p-4 rounded text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                  {application.previousExperience || 'No previous experience declared.'}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Statement of Purpose */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Statement of Motivation
            </h3>
            <div className="text-sm space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Why do you want to intern with us?</p>
                <div className="bg-slate-50 border border-slate-150 p-6 rounded text-slate-800 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                  {application.motivation}
                </div>
              </div>
              
              {application.additionalInformation && (
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Additional Information Provided</p>
                  <div className="text-slate-700 bg-slate-50 border border-slate-150 p-4 rounded text-sm leading-relaxed whitespace-pre-line">
                    {application.additionalInformation}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Status and uploads controls (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card A: Internship Mode and Duration */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4 text-sm">
            <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Internship Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Mode</p>
                <p className="font-semibold text-slate-800">{application.internshipMode} (Chambers)</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Requested Duration</p>
                <p className="font-semibold text-slate-800">{application.duration}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Start Date</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(application.startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">End Date</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(application.endDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Application Workflow Status */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Status Management
            </h3>
            
            {successMsg && (
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <p>{successMsg}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">
                  Transition Status
                </label>
                <div className="relative">
                  <select
                    disabled={updating}
                    value={application.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-navy-700 disabled:opacity-60"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  {updating && (
                    <div className="absolute right-3 top-3">
                      <RefreshCw className="w-4 h-4 animate-spin text-navy-800" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card C: Secure Document Downloads */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4 text-sm">
            <h3 className="font-serif text-base font-semibold text-slate-900 border-b border-slate-100 pb-2">
              Uploaded Documents
            </h3>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-2 border border-slate-200">
              <Shield className="w-4 h-4 text-navy-800 shrink-0" />
              <span>Restricted private downloads. Requires admin authentication.</span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Resume / CV *</p>
                <button
                  onClick={() => handleDownload('resume', `${cleanName}_Resume.pdf`)}
                  className="w-full flex items-center justify-between border border-slate-200 hover:border-navy-700 p-2.5 rounded text-left transition-colors"
                >
                  <span className="truncate text-xs font-medium text-slate-700 max-w-[180px]">
                    {application.resumeOriginalName}
                  </span>
                  <Download className="w-4 h-4 text-navy-800 shrink-0" />
                </button>
              </div>

              {application.coverLetterPath && (
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Cover Letter</p>
                  <button
                    onClick={() => handleDownload('cover-letter', `${cleanName}_CoverLetter.pdf`)}
                    className="w-full flex items-center justify-between border border-slate-200 hover:border-navy-700 p-2.5 rounded text-left transition-colors"
                  >
                    <span className="truncate text-xs font-medium text-slate-700 max-w-[180px]">
                      View Cover Letter
                    </span>
                    <Download className="w-4 h-4 text-navy-800 shrink-0" />
                  </button>
                </div>
              )}

              {application.writingSamplePath && (
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Writing Sample</p>
                  <button
                    onClick={() => handleDownload('writing-sample', `${cleanName}_WritingSample.pdf`)}
                    className="w-full flex items-center justify-between border border-slate-200 hover:border-navy-700 p-2.5 rounded text-left transition-colors"
                  >
                    <span className="truncate text-xs font-medium text-slate-700 max-w-[180px]">
                      View Writing Sample
                    </span>
                    <Download className="w-4 h-4 text-navy-800 shrink-0" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
