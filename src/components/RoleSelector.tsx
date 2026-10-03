import React from 'react';
import { UserCheck, Users, Cpu, ShieldCheck, ArrowRight, Activity, MapPin, Sparkles } from 'lucide-react';
import { Lecturer } from '../types/database';

interface RoleSelectorProps {
  onSelectRole: (role: 'lecturer' | 'student' | 'iot' | 'admin') => void;
  lecturers: Lecturer[];
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole, lecturers }) => {
  const availableCount = lecturers.filter((l) => l.status === 'Available').length;
  const busyCount = lecturers.filter((l) => l.status === 'Busy').length;

  const roleCards = [
    {
      id: 'lecturer' as const,
      title: 'Lecturer Dashboard',
      subtitle: 'Faculty Status Control',
      description: 'Quickly select your profile and broadcast your availability with one tap.',
      icon: UserCheck,
      gradient: 'from-blue-500 to-indigo-600',
      borderHover: 'hover:border-blue-400 group-hover:shadow-blue-500/10',
      badgeText: 'Quick Update',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'student' as const,
      title: 'Student View',
      subtitle: 'Live Campus Directory',
      description: 'Find faculty members, room numbers, and current status in real time with instant search.',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      borderHover: 'hover:border-emerald-400 group-hover:shadow-emerald-500/10',
      badgeText: 'Live Directory',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'iot' as const,
      title: 'IoT ESP32 Display',
      subtitle: 'Hardware Panel Simulation',
      description: 'Simulated corridor OLED/LCD screen with scanlines, glowing text, and live room ticker.',
      icon: Cpu,
      gradient: 'from-cyan-500 to-blue-600',
      borderHover: 'hover:border-cyan-400 group-hover:shadow-cyan-500/10',
      badgeText: 'ESP32 Device',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: 'admin' as const,
      title: 'Admin Panel',
      subtitle: 'Faculty Registry & CRUD',
      description: 'Add new lecturers, edit room numbers or statuses inline, and manage records.',
      icon: ShieldCheck,
      gradient: 'from-purple-500 to-violet-600',
      borderHover: 'hover:border-purple-400 group-hover:shadow-purple-500/10',
      badgeText: 'Management',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner with Campus Image */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-200/50 dark:shadow-none">
        {/* Campus Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80"
            alt="University Campus Architecture"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-blue-950/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Hybrid IoT + Web Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Lecturer Availability
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-6">
            Smart Multi-Lecturer Availability Display System — linking web dashboards with simulated ESP32 corridor digital signage via real-time synchronization.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <Users className="w-4 h-4 text-blue-300" />
              <span>{lecturers.length} Total Faculty</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{availableCount} Available Now</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{busyCount} Busy</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-300">
              <Activity className="w-4 h-4 text-cyan-300" />
              <span>Live Realtime Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Title */}
      <div className="text-center sm:text-left space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Select Your Role
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Choose a role to experience the interactive prototype from different perspectives.
        </p>
      </div>

      {/* 4 Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {roleCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onSelectRole(card.id)}
              className={`group relative text-left bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${card.borderHover}`}
            >
              <div>
                {/* Header row in card */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeClass}`}>
                    {card.badgeText}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  {card.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="flex items-center text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Enter {card.title.split(' ')[0]} View</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
