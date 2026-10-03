import React, { useState } from 'react';
import { useLecturers } from './hooks/useLecturers';
import { Header } from './components/Header';
import { RoleSelector } from './components/RoleSelector';
import { LecturerDashboard } from './components/LecturerDashboard';
import { StudentView } from './components/StudentView';
import { IotDisplay } from './components/IotDisplay';
import { AdminPanel } from './components/AdminPanel';
import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

export type AppView = 'role-selector' | 'lecturer' | 'student' | 'iot' | 'admin';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('role-selector');
  const {
    lecturers,
    isLoading,
    error,
    isRealtimeActive,
    updateStatus,
    addLecturer,
    updateLecturer,
    deleteLecturer,
    resetToSeeds,
  } = useLecturers();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Toast notifications container */}
      <Toaster position="top-right" richColors closeButton />

      {/* Main Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        isRealtimeActive={isRealtimeActive}
      />

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading && lecturers.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-slate-500">
              Loading faculty directory and synchronizing realtime...
            </p>
          </div>
        ) : (
          <>
            {currentView === 'role-selector' && (
              <RoleSelector
                onSelectRole={setCurrentView}
                lecturers={lecturers}
              />
            )}

            {currentView === 'lecturer' && (
              <LecturerDashboard
                lecturers={lecturers}
                onUpdateStatus={updateStatus}
                onBack={() => setCurrentView('role-selector')}
              />
            )}

            {currentView === 'student' && (
              <StudentView
                lecturers={lecturers}
                onBack={() => setCurrentView('role-selector')}
                isRealtimeActive={isRealtimeActive}
              />
            )}

            {currentView === 'iot' && (
              <IotDisplay
                lecturers={lecturers}
                onBack={() => setCurrentView('role-selector')}
                isRealtimeActive={isRealtimeActive}
              />
            )}

            {currentView === 'admin' && (
              <AdminPanel
                lecturers={lecturers}
                onAddLecturer={addLecturer}
                onUpdateLecturer={updateLecturer}
                onDeleteLecturer={deleteLecturer}
                onResetSeeds={resetToSeeds}
                onBack={() => setCurrentView('role-selector')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Smart Multi-Lecturer Availability Display System • IoT + Mobile Prototype</span>
          <div className="flex items-center gap-4">
            <span>Vite 5 + React 18 + Supabase Realtime</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
