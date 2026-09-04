'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAuthToken, clearAuthToken } from '@/lib/api';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Mail, 
  LogOut, 
  Scale, 
  Menu, 
  X,
  UserCheck,
  Briefcase
} from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Consultations', href: '/dashboard/consultations', icon: CalendarDays },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Mail },
  { name: 'Career Applications', href: '/dashboard/careers', icon: Briefcase },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('Administrator');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('admin_user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            setAdminName(user.name || 'Administrator');
          } catch (_) {}
        }
      }
    }
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.replace('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-navy-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-navy-800 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <Scale className="w-6 h-6 text-gold-400" />
          <span className="font-serif text-lg tracking-tight font-medium">Maurya Law Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        md:translate-x-0 md:static md:h-screen shrink-0 shadow-xl
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-navy-800 flex items-center space-x-3">
            <Scale className="w-8 h-8 text-gold-400 shrink-0" />
            <div>
              <h2 className="font-serif text-lg font-medium leading-none tracking-tight">Maurya Law Chambers</h2>
              <span className="text-xs text-gold-400 tracking-widest uppercase mt-1 inline-block">Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-150 rounded-sm
                    ${isActive 
                      ? 'bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/10 font-semibold' 
                      : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-navy-800 space-y-3 bg-navy-950">
          <div className="flex items-center space-x-3 px-2">
            <div className="bg-navy-800 p-2 rounded-full text-gold-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-white truncate">{adminName}</p>
              <p className="text-xs text-slate-400">Authorized Agent</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 rounded-sm transition-colors duration-150"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen relative">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <span>Security Session Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-slate-700 text-sm font-medium">
            Welcome, <span className="text-navy-800 font-semibold">{adminName}</span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity"
        />
      )}
    </div>
  );
}
