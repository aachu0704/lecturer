import React, { useState, useEffect } from 'react';
import { Lecturer, LecturerStatus } from '../types/database';
import { StatusBadge } from './ui/StatusBadge';
import { AvatarInitial } from './ui/AvatarInitial';
import { CheckCircle2, Clock, XCircle, MapPin, Sparkles, UserCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface LecturerDashboardProps {
  lecturers: Lecturer[];
  onUpdateStatus: (id: string, status: LecturerStatus) => Promise<void>;
  onBack: () => void;
}

export const LecturerDashboard: React.FC<LecturerDashboardProps> = ({
  lecturers,
  onUpdateStatus,
  onBack,
}) => {
  // Remember selected lecturer in state
  const [selectedLecturerId, setSelectedLecturerId] = useState<string>(() => {
    return lecturers[0]?.id || '';
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedLecturerId && lecturers.length > 0) {
      setSelectedLecturerId(lecturers[0].id);
    }
  }, [lecturers, selectedLecturerId]);

  const currentLecturer = lecturers.find((l) => l.id === selectedLecturerId) || lecturers[0];

  const handleStatusChange = async (status: LecturerStatus) => {
    if (!currentLecturer) return;
    if (currentLecturer.status === status) {
      toast.info(`Status is already "${status}"`);
      return;
    }

    try {
      setIsUpdating(true);
      await onUpdateStatus(currentLecturer.id, status);
      toast.success(`${currentLecturer.name} is now ${status}!`, {
        description: `Room ${currentLecturer.room} updated across all devices.`,
      });
    } catch (err: any) {
      toast.error('Failed to update status', {
        description: err?.message || 'Please try again.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const statusOptions: {
    status: LecturerStatus;
    label: string;
    description: string;
    icon: typeof CheckCircle2;
    activeClass: string;
    idleClass: string;
    ringClass: string;
  }[] = [
    {
      status: 'Available',
      label: 'Available',
      description: 'In office & open for student consultations',
      icon: CheckCircle2,
      activeClass:
        'bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 ring-4 ring-emerald-300 dark:ring-emerald-800 scale-[1.02]',
      idleClass:
        'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
      ringClass: 'border-emerald-500',
    },
    {
      status: 'Busy',
      label: 'Busy',
      description: 'In a meeting, lecture, or grading — do not disturb',
      icon: Clock,
      activeClass:
        'bg-amber-500 text-white shadow-xl shadow-amber-500/30 ring-4 ring-amber-300 dark:ring-amber-800 scale-[1.02]',
      idleClass:
        'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40',
      ringClass: 'border-amber-500',
    },
    {
      status: 'Not Available',
      label: 'Not Available',
      description: 'Out of campus or off-duty for the day',
      icon: XCircle,
      activeClass:
        'bg-rose-600 text-white shadow-xl shadow-rose-600/30 ring-4 ring-rose-300 dark:ring-rose-800 scale-[1.02]',
      idleClass:
        'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-400 border-2 border-rose-300 dark:border-rose-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40',
      ringClass: 'border-rose-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Navigation bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Faculty Portal Mode</span>
        </div>
      </div>

      {/* Profile Selector Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Faculty Profile Selection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select your name from the staff directory to control your live office presence.
            </p>
          </div>

          {/* Lecturer Dropdown Selector */}
          <div className="w-full sm:w-72">
            <label htmlFor="lecturer-select" className="sr-only">
              Choose Lecturer
            </label>
            <select
              id="lecturer-select"
              value={selectedLecturerId}
              onChange={(e) => setSelectedLecturerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer shadow-xs"
            >
              {lecturers.map((lec) => (
                <option key={lec.id} value={lec.id}>
                  {lec.name} ({lec.room}) — {lec.status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Active Lecturer Card */}
        {currentLecturer && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AvatarInitial name={currentLecturer.name} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {currentLecturer.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 mt-1">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Room {currentLecturer.room}
                  </span>
                  <span>•</span>
                  <span>ID: {currentLecturer.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-slate-400">Current Status:</span>
              <StatusBadge status={currentLecturer.status} size="lg" />
            </div>
          </div>
        )}
      </div>

      {/* Instant Action: Three Big Color-Coded Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Update Availability Status</span>
          </h3>
          <span className="text-xs text-slate-500">Tap to instantly broadcast</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusOptions.map((opt) => {
            const isSelected = currentLecturer?.status === opt.status;
            const Icon = opt.icon;

            return (
              <button
                key={opt.status}
                type="button"
                disabled={isUpdating}
                onClick={() => handleStatusChange(opt.status)}
                className={`relative p-6 rounded-2xl transition-all duration-200 text-left flex flex-col justify-between group active:scale-95 cursor-pointer disabled:opacity-50 ${
                  isSelected ? opt.activeClass : opt.idleClass
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : opt.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-700'
                          : opt.status === 'Busy'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {isSelected && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                        Active
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold tracking-tight mb-1">{opt.label}</h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {opt.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-semibold">
                  <span>{isSelected ? 'Currently Selected' : 'Set as Current'}</span>
                  {isSelected ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  ) : (
                    <span>➔</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Helpful Tips Card */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 text-blue-900 dark:text-blue-300 text-xs sm:text-sm flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">Real-time IoT + Student Sync</p>
          <p className="text-xs text-blue-800/80 dark:text-blue-300/80">
            Whenever you click any status button above, the update is instantly written to the database and streamed to the <strong>Student View</strong> and corridor <strong>IoT ESP32 Display Panel</strong> without refreshing.
          </p>
        </div>
      </div>
    </div>
  );
};
