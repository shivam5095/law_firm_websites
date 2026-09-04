'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi, downloadAdminFile } from '@/lib/api';
import { Briefcase, Eye, Download, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  lawSchool: string;
  course: string;
  currentYear: string;
  areasOfInterest: string[];
  internshipMode: string;
  duration: string;
  startDate: string;
  status: string;
  createdAt: string;
}

export default function CareersDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const statusColors: Record<string, string> = {
    SUBMITTED: 'bg-blue-50 text-blue-700 border-blue-200',
    UNDER_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
    SHORTLISTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    INTERVIEW: 'bg-purple-50 text-purple-700 border-purple-200',
    ACCEPTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
    WITHDRAWN: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams: string[] = [];
      if (statusFilter) queryParams.push(`status=${statusFilter}`);
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      
      const query = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const response = await adminApi.get(`/admin/careers${query}`);
      
      if (response.success) {
        setApplications(response.data);
      } else {
        setError(response.message || 'Failed to fetch applications.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading candidates list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the internship application of ${name}? This will permanently delete their database record and files.`)) {
      return;
    }

    try {
      const response = await adminApi.delete(`/admin/careers/${id}`);
      if (response.success) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
      } else {
        alert(response.message || 'Failed to delete application.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred during deletion.');
    }
  };

  const handleDownloadResume = async (id: string, name: string) => {
    try {
      const cleanName = name.replace(/\s+/g, '_');
      await downloadAdminFile(`/admin/careers/${id}/resume`, `${cleanName}_Resume.pdf`);
    } catch (err: any) {
      alert(err.message || 'Could not download resume. File might be missing on server.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-slate-900">Career Applications</h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage law student internship applications.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search candidates, law schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-700"
          />
          <button
            type="submit"
            className="bg-navy-800 text-white font-medium px-4 py-2 rounded text-sm hover:bg-navy-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex gap-3 w-full md:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-navy-700"
          >
            <option value="">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>

          {(search || statusFilter) && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                // Direct fetch since state values won't update synchronously in time for immediate call
                setTimeout(() => fetchApplications(), 0);
              }}
              className="text-xs text-red-500 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Main Table / Grid */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-navy-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm font-medium">Loading candidate files...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center max-w-sm mx-auto">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-800 text-lg">No internship applications yet.</h3>
            <p className="text-slate-500 text-sm mt-1">When students apply, their details and CV submissions will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Applicant</th>
                  <th className="py-4 px-6">Law School</th>
                  <th className="py-4 px-6">Course & Year</th>
                  <th className="py-4 px-6">Areas of Interest</th>
                  <th className="py-4 px-6">Start Date</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{app.fullName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{app.email}</div>
                      <div className="text-xs text-slate-500">{app.phone}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800 max-w-xs truncate">
                      {app.lawSchool}
                    </td>
                    <td className="py-4 px-6">
                      <div>{app.course}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{app.currentYear}</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {app.areasOfInterest.slice(0, 2).map((area) => (
                          <span key={area} className="inline-block bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded">
                            {area}
                          </span>
                        ))}
                        {app.areasOfInterest.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-semibold px-1">
                            +{app.areasOfInterest.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {new Date(app.startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      <div className="text-[11px] text-slate-500 mt-0.5">{app.duration} ({app.internshipMode})</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block border text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        statusColors[app.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/careers/${app.id}`}
                          title="View application details"
                          className="p-1.5 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        
                        <button
                          onClick={() => handleDownloadResume(app.id, app.fullName)}
                          title="Download Resume"
                          className="p-1.5 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(app.id, app.fullName)}
                          title="Delete application"
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
