import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Printer,
  RotateCcw,
  Building,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { EmailDeliveryInfo, ExamAttemptRecord } from '../types/exam';

interface ResultsScreenProps {
  result: ExamAttemptRecord;
  emailDelivery: EmailDeliveryInfo;
  onRetryEmail: () => void;
  onRetakeExam: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  emailDelivery,
  onRetryEmail,
  onRetakeExam,
}) => {
  const timeMins = Math.floor(result.timeSpentSeconds / 60);
  const timeSecs = result.timeSpentSeconds % 60;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16">
      {/* Top Banner */}
      <div className="bg-[#002B49] text-white py-3 px-4 shadow-sm no-print">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">
              ACCA F2 Examination Result
            </span>
          </div>
          <div className="text-amber-300 font-semibold text-xs">
            Daw Thida Oo Training center Internal test purpose
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 pt-8">
        <div className="bg-white rounded-lg border border-slate-300 p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              DAW THIDA OO TRAINING CENTER
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              Daw Thida Oo Training center Internal test purpose
            </p>
            <h2 className="text-sm sm:text-base font-semibold text-slate-800 pt-1">
              ACCA F2 Management Accounting (FMA) — Score Statement
            </h2>
          </div>

          {/* Student Info and Score Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-medium">Candidate Name:</span>
                <span className="font-bold text-slate-900 text-base">{result.studentName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-medium">Student ID Number:</span>
                <span className="font-bold text-slate-900 font-mono-numbers">{result.studentId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-medium">Completed At:</span>
                <span className="text-slate-800 font-medium">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-500 font-medium">Time Taken:</span>
                <span className="font-mono-numbers text-slate-800 font-semibold">
                  {timeMins}m {timeSecs}s
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-500 font-medium">Passing Benchmark:</span>
                <span className="font-medium text-slate-700 font-mono-numbers">50% (35 / 70 marks)</span>
              </div>
            </div>

            {/* Score Box */}
            <div
              className={`md:col-span-5 p-6 rounded-lg border text-center flex flex-col items-center justify-center ${
                result.passed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}
            >
              <div className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-1">
                Total Score
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-mono-numbers tracking-tight my-1 text-slate-900">
                {result.totalScore}{' '}
                <span className="text-xl sm:text-2xl font-semibold text-slate-500">/ {result.maxScore}</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono-numbers text-slate-700">
                {result.percentage}%
              </div>
              <div className="mt-3">
                {result.passed ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-700 text-white text-xs font-bold tracking-wider uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PASSED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-red-700 text-white text-xs font-bold tracking-wider uppercase">
                    <XCircle className="w-4 h-4" />
                    <span>NOT PASSED</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Automatic Email Delivery Status */}
          {emailDelivery.status === 'sending' && (
            <div className="p-3.5 rounded-md border border-blue-200 bg-blue-50 text-blue-900 text-xs flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-blue-700 animate-spin shrink-0" />
              <span>
                Sending your official score automatically to Daw Thida Oo Training Center...
              </span>
            </div>
          )}

          {emailDelivery.status === 'sent' && (
            <div className="p-3.5 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Result automatically sent.</span>{' '}
                Your official score has been emailed to{' '}
                <strong>{emailDelivery.recipient || 'mary.tdo03041988@gmail.com'}</strong>. No further action is required.
              </div>
            </div>
          )}

          {emailDelivery.status === 'failed' && (
            <div className="p-3.5 rounded-md border border-amber-300 bg-amber-50 text-amber-950 text-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 flex-1 min-w-[200px]">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Automatic email delivery notice:</span>{' '}
                  {emailDelivery.message || 'Your score was saved locally. You can print your summary or retry auto-send.'}
                </div>
              </div>
              <button
                type="button"
                onClick={onRetryEmail}
                className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Auto-Send</span>
              </button>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Summary</span>
            </button>

            <button
              onClick={onRetakeExam}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#002B49] hover:bg-[#001d32] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
