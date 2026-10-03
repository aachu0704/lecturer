import React, { useState } from 'react';
import { Lecturer, LecturerStatus } from '../types/database';
import { StatusBadge } from './ui/StatusBadge';
import { AvatarInitial } from './ui/AvatarInitial';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Edit2,
  Check,
  X,
  ArrowLeft,
  Users,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminPanelProps {
  lecturers: Lecturer[];
  onAddLecturer: (name: string, room: string, status?: LecturerStatus) => Promise<Lecturer>;
  onUpdateLecturer: (id: string, updates: Partial<Pick<Lecturer, 'name' | 'room' | 'status'>>) => Promise<void>;
  onDeleteLecturer: (id: string) => Promise<void>;
  onResetSeeds: () => Promise<void>;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lecturers,
  onAddLecturer,
  onUpdateLecturer,
  onDeleteLecturer,
  onResetSeeds,
  onBack,
}) => {
  // Form State for Adding
  const [newName, setNewName] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newStatus, setNewStatus] = useState<LecturerStatus>('Available');
  const [isAdding, setIsAdding] = useState(false);

  // Inline Editing State: track which lecturer ID is currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [editStatus, setEditStatus] = useState<LecturerStatus>('Available');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete Confirmation State: track which lecturer is queued for deletion
  const [deleteCandidate, setDeleteCandidate] = useState<Lecturer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle Add Lecturer
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error('Lecturer name is required');
      return;
    }

    try {
      setIsAdding(true);
      const added = await onAddLecturer(newName, newRoom, newStatus);
      toast.success(`Added "${added.name}" successfully!`, {
        description: `Assigned to Room ${added.room} as ${added.status}.`,
      });
      setNewName('');
      setNewRoom('');
      setNewStatus('Available');
    } catch (err: any) {
      toast.error('Failed to add lecturer', {
        description: err?.message || 'Please check your connection.',
      });
    } finally {
      setIsAdding(false);
    }
  };

  // Start Inline Editing
  const startEditing = (lec: Lecturer) => {
    setEditingId(lec.id);
    setEditName(lec.name);
    setEditRoom(lec.room);
    setEditStatus(lec.status);
  };

  // Cancel Inline Editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditRoom('');
  };

  // Save Inline Edit
  const saveInlineEdit = async (id: string) => {
    if (!editName.trim()) {
      toast.error('Lecturer name cannot be empty');
      return;
    }

    try {
      setIsSavingEdit(true);
      await onUpdateLecturer(id, {
        name: editName.trim(),
        room: editRoom.trim() || 'TBD',
        status: editStatus,
      });
      toast.success(`Updated "${editName}" successfully!`);
      setEditingId(null);
    } catch (err: any) {
      toast.error('Failed to update lecturer', {
        description: err?.message || 'Please try again.',
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;

    try {
      setIsDeleting(true);
      await onDeleteLecturer(deleteCandidate.id);
      toast.success(`Deleted "${deleteCandidate.name}" from database.`);
      setDeleteCandidate(null);
    } catch (err: any) {
      toast.error('Failed to delete lecturer', {
        description: err?.message || 'Please try again.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Reset to default seed dataset
  const handleResetSeeds = async () => {
    try {
      await onResetSeeds();
      toast.success('Directory reset to default 7 seed lecturers!');
    } catch (err: any) {
      toast.error('Failed to reset dataset', {
        description: err?.message || 'Please try again.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
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
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Faculty Directory Management
            </h2>
            {/* Lecturer Count Pill */}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {lecturers.length} Total Lecturers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Create new faculty members, edit room numbers or statuses inline, and manage permissions.
          </p>
        </div>

        {/* Reset seeds button */}
        <button
          onClick={handleResetSeeds}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-xs self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Default Seeds</span>
        </button>
      </div>

      {/* Add Lecturer Card Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add New Faculty Member
            </h3>
            <p className="text-xs text-slate-500">
              Enter name, room assignment, and initial availability status.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Name Field */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Rajesh Kumar"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white"
              required
            />
          </div>

          {/* Room Field */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Office Room
            </label>
            <input
              type="text"
              placeholder="e.g. C204"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          {/* Status Field */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as LecturerStatus)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={isAdding}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isAdding ? 'Adding...' : 'Add'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Lecturer Table with Inline Edit & Delete */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-12 sm:col-span-5">Lecturer Name</div>
          <div className="col-span-12 sm:col-span-2">Room</div>
          <div className="col-span-12 sm:col-span-3">Status</div>
          <div className="col-span-12 sm:col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {lecturers.map((lec) => {
            const isEditing = editingId === lec.id;

            return (
              <div
                key={lec.id}
                className={`p-4 sm:px-6 sm:py-4 transition-colors ${
                  isEditing
                    ? 'bg-blue-50/40 dark:bg-blue-950/20'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                }`}
              >
                {isEditing ? (
                  /* Inline Editing Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-blue-400 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Lecturer Name"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={editRoom}
                        onChange={(e) => setEditRoom(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-blue-400 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Room (e.g. C204)"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as LecturerStatus)}
                        className="w-full px-3 py-1.5 rounded-lg border border-blue-400 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                      >
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="Not Available">Not Available</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={isSavingEdit}
                        onClick={() => saveInlineEdit(lec.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                        title="Save changes"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Normal View Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5 flex items-center gap-3">
                      <AvatarInitial name={lec.name} size="sm" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {lec.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 sm:hidden">
                          Room {lec.room}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:block sm:col-span-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        {lec.room}
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <StatusBadge status={lec.status} size="sm" />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => startEditing(lec)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        title="Edit inline"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteCandidate(lec)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                        title="Delete lecturer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal / Dialog */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Confirm Removal
                </h4>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete this faculty member?
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              <p className="font-bold text-slate-900 dark:text-white">
                {deleteCandidate.name}
              </p>
              <p className="text-slate-500">
                Office: Room {deleteCandidate.room} • Status: {deleteCandidate.status}
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This action will remove the lecturer from the database and immediately sync across all student views and connected IoT displays.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
