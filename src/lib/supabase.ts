import { createClient } from '@supabase/supabase-js';
import { Database, Lecturer, INITIAL_LECTURERS } from '../types/database';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Check if credentials look like a valid Supabase project
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('smartsync-lecturer') && // placeholder
  !supabaseAnonKey.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

const STORAGE_KEY = 'smart_lecturer_availability_data_v1';

// Seed or retrieve local storage lecturers
export function getLocalLecturers(): Lecturer[] {
  if (typeof window === 'undefined') return INITIAL_LECTURERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LECTURERS));
      return INITIAL_LECTURERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LECTURERS));
    return INITIAL_LECTURERS;
  } catch {
    return INITIAL_LECTURERS;
  }
}

export function saveLocalLecturers(lecturers: Lecturer[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lecturers));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}
