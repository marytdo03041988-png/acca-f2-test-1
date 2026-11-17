import { ExamAttemptRecord } from '../types/exam';

const STORAGE_KEY = 'acca_f2_test_attempts_daw_thida_oo';

export function getSavedAttempts(): ExamAttemptRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read attempts from localStorage:', err);
    return [];
  }
}

export function saveExamAttempt(attempt: ExamAttemptRecord): void {
  try {
    const existing = getSavedAttempts();
    const updated = [attempt, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save attempt to localStorage:', err);
  }
}

export function clearSavedAttempts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear attempts:', err);
  }
}
