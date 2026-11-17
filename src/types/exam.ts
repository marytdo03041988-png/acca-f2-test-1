export type Chapter =
  | 'Accounting for Material'
  | 'Accounting for Labor'
  | 'Accounting for Overheads'
  | 'Absorption and Marginal Costing'
  | 'Job, Batch and Services Costing';

export type QuestionSection = 'Section A' | 'Section B';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MultiTaskSubQuestion {
  id: string;
  label: string;
  prompt: string;
  type: 'dropdown' | 'number-input' | 'radio';
  options?: { id: string; label: string }[];
  correctAnswer: string | number;
  tolerance?: number;
  marks: number;
  explanation: string;
}

export interface TableData {
  title?: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface Question {
  id: number;
  section: QuestionSection;
  chapter: Chapter;
  marks: number;
  title: string;
  scenario: string;
  tableData?: TableData;
  questionText: string;
  type: 'single-choice' | 'multi-task';
  options?: QuestionOption[];
  correctOptionId?: string;
  multiTaskParts?: MultiTaskSubQuestion[];
  explanation: string;
  workingSteps?: string[];
}

export interface StudentAnswer {
  selectedOptionId?: string;
  multiTaskAnswers?: Record<string, string | number>;
  isFlagged?: boolean;
}

export interface ChapterPerformance {
  chapter: Chapter;
  scored: number;
  total: number;
  percentage: number;
}

export interface ExamAttemptRecord {
  id: string;
  studentName: string;
  studentId: string;
  studentEmail?: string;
  timestamp: string;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  chapterScores: Record<Chapter, { scored: number; total: number; percentage: number }>;
  answers: Record<number, StudentAnswer>;
}

export type EmailDeliveryStatus = 'idle' | 'sending' | 'sent' | 'failed';

export interface EmailDeliveryInfo {
  status: EmailDeliveryStatus;
  recipient?: string;
  reason?: string;
  message?: string;
}

export interface QuestionResultSummary {
  id: number;
  title: string;
  chapter: Chapter;
  marksAwarded: number;
  maxMarks: number;
  isCorrect: boolean;
  userSummary: string;
  correctSummary: string;
}

export interface SubmitResultPayload {
  studentName: string;
  studentId: string;
  studentEmail?: string;
  submittedAt: string;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  sourceMode: string;
  chapterScores: Record<Chapter, { scored: number; total: number; percentage: number }>;
  questionSummary: QuestionResultSummary[];
}
