import React, { useState, useMemo } from 'react';
import { Lecturer, LecturerStatus } from '../types/database';
import { StatusBadge } from './ui/StatusBadge';
import { AvatarInitial } from './ui/AvatarInitial';
import { Search, MapPin, Users, ArrowLeft, Radio, Filter, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface StudentViewProps {
  lecturers: Lecturer[];
  onBack: () => void;
  isRealtimeActive: boolean;
}

export const StudentView: React.FC<StudentViewProps> = ({
  lecturers,
  onBack,
  isRealtimeActive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LecturerStatus>('All');

  const filteredLecturers = useMemo(() => {
    return lecturers.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.room.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [lecturers, searchQuery, statusFilter]);

  const counts = useMemo(() => {
    return {
      all: lecturers.length,
      available: lecturers.filter((l) => l.status === 'Available').length,
      busy: lecturers.filter((l) => l.status === 'Busy').length,
      unavailable: lecturers.filter((l) => l.status === 'Not Available').length,
    };
  }, [lecturers]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header / Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Faculty Availability Directory</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time status of university lecturers for student consultations.
          </p>
        </div>

        {/* Live sync badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-center shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Radio className="w-3.5 h-3.5 text-emerald-600" />
          <span>Live Realtime • No Refresh Needed</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by lecturer name or room number (e.g. Ravi, C204)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>

          <button
            type="button"
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'All'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('Available')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'Available'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Available ({counts.available})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('Busy')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'Busy'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Busy ({counts.busy})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('Not Available')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'Not Available'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <XCircle className="w-3 h-3" />
            <span>Not Available ({counts.unavailable})</span>
          </button>
        </div>
      </div>

      {/* Lecturer List View: Clean card / table list */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header (hidden on mobile, shown on sm+) */}
        <div className="hidden sm:grid sm:grid-cols-12 px-6 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <div className="col-span-6">Faculty Name</div>
          <div className="col-span-3 text-center">Current Status</div>
          <div className="col-span-3 text-right">Office Room</div>
        </div>

        {/* Lecturer Rows */}
        {filteredLecturers.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredLecturers.map((lec) => (
              <div
                key={lec.id}
                className="p-4 sm:px-6 sm:py-4 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* Name Column */}
                <div className="sm:col-span-6 flex items-center gap-3.5">
                  <AvatarInitial name={lec.name} size="md" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {lec.name}
                    </h3>
                    <p className="text-xs text-slate-500 sm:hidden flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Room {lec.room}</span>
                    </p>
                  </div>
                </div>

                {/* Status Column */}
                <div className="sm:col-span-3 flex sm:justify-center">
                  <StatusBadge status={lec.status} size="md" />
                </div>

                {/* Room Column */}
                <div className="hidden sm:flex sm:col-span-3 items-center justify-end gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Room {lec.room}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              No faculty found
            </h3>
            <p className="text-xs text-slate-500">
              No lecturers match your query "{searchQuery}". Try searching another name or reset filters.
            </p>
          </div>
        )}
      </div>

      {/* Directory Summary Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>Showing {filteredLecturers.length} of {lecturers.length} faculty members</span>
        <span>Alphabetically ordered</span>
      </div>
    </div>
  );
};
