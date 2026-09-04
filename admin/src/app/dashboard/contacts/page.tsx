'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { 
  Loader2, 
  Search, 
  Trash2, 
  Eye, 
  X,
  Filter
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
}

export default function ContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Selected message for details view modal
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  
  // Confirmation states
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  async function fetchMessages() {
    try {
      setLoading(true);
      setErrorMsg('');
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await adminApi.get(`/admin/contacts?${params.toString()}`);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to fetch contact messages.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const response = await adminApi.patch(`/admin/contacts/${id}/status`, { status: newStatus });
      if (response.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: response.data.status } : m))
        );
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg((prev) => prev ? { ...prev, status: response.data.status } : null);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      const response = await adminApi.delete(`/admin/contacts/${deleteId}`);
      if (response.success) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteId));
        if (selectedMsg && selectedMsg.id === deleteId) {
          setSelectedMsg(null);
        }
        setDeleteId(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete message.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-navy-800 font-medium">Contact Messages</h1>
          <p className="text-charcoal-500 text-sm mt-1">Review general and media inquiries submitted via contact forms.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, subject..."
            className="w-full pl-10 pr-24 py-2.5 border border-charcoal-200 focus:outline-none focus:ring-1 focus:ring-navy-700"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          <button
            type="submit"
            className="absolute right-2 top-1.5 px-4 py-1.5 bg-navy-800 text-white text-xs font-semibold hover:bg-navy-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2.5 px-4 border border-charcoal-200 bg-white text-sm focus:outline-none text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Messages Table */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-navy-800 animate-spin mb-4" />
            <p className="text-slate-500">Querying request logs...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            No contact messages found matching your current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <th className="p-4">Sender</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{msg.name}</p>
                        <p className="text-xs text-slate-500">{msg.email}{msg.phone ? ` · ${msg.phone}` : ''}</p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700 truncate max-w-[200px]">
                      {msg.subject}
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        msg.status === 'NEW' ? 'bg-amber-100 text-amber-800' :
                        msg.status === 'CONTACTED' ? 'bg-indigo-100 text-indigo-800' :
                        msg.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedMsg(msg)}
                        className="inline-flex p-2 text-slate-600 hover:text-navy-800 hover:bg-slate-100 rounded-sm"
                        title="View Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(msg.id)}
                        className="inline-flex p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 bg-navy-800 text-white flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium">Inquiry Details</h2>
              <button onClick={() => setSelectedMsg(null)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Sender Name</span>
                  <p className="font-semibold text-navy-800 mt-1">{selectedMsg.name}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Subject</span>
                  <p className="font-semibold text-gold-600 mt-1">{selectedMsg.subject}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Email Address</span>
                  <p className="mt-1">{selectedMsg.email}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Phone Number</span>
                  <p className="mt-1">{selectedMsg.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Received Date</span>
                  <p className="mt-1">
                    {new Date(selectedMsg.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'long',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Message Details</span>
                <div className="bg-slate-50 border border-slate-100 p-4 mt-2 text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedMsg.message}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-3">Adjust Status</span>
                <div className="flex flex-wrap gap-2">
                  {['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'].map((status) => (
                    <button
                      key={status}
                      disabled={actionLoading}
                      onClick={() => handleStatusChange(selectedMsg.id, status)}
                      className={`px-4 py-2 text-xs font-semibold transition-colors rounded-none ${
                        selectedMsg.status === status
                          ? 'bg-navy-800 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedMsg(null)}
                className="px-6 py-2 border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Delete Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white max-w-md w-full border border-slate-200 p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-semibold text-navy-800 mb-3">Confirm Deletion</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to permanently delete this contact message? This action is irreversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                disabled={actionLoading}
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={actionLoading}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition-colors flex items-center justify-center"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
