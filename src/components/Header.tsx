import React from 'react';
import { Home, Radio, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'role-selector' | 'lecturer' | 'student' | 'iot' | 'admin';
  onNavigate: (view: 'role-selector' | 'lecturer' | 'student' | 'iot' | 'admin') => void;
  isRealtimeActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isRealtimeActive,
}) => {
  const viewTitles: Record<string, string> = {
    'role-selector': 'System Portal',
    lecturer: 'Lecturer Dashboard',
    student: 'Student Live Directory',
    iot: 'IoT ESP32 Display Panel',
    admin: 'Administrator Hub',
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div
          onClick={() => onNavigate('role-selector')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Lecturer Availability
              </h1>
              <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                IoT Hybrid
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {viewTitles[currentView] || 'Realtime Availability System'}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Realtime Status Indicator */}
          <div
            title={isRealtimeActive ? 'Realtime sync active' : 'Connecting to realtime...'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Radio className="w-3 h-3 hidden xs:inline-block" />
            <span className="hidden sm:inline">Realtime Live</span>
          </div>

          {/* Home / Role Switcher Button */}
          {currentView !== 'role-selector' && (
            <button
              onClick={() => onNavigate('role-selector')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-xs"
            >
              <Home className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>Switch Role</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
