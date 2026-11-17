import React, { useState } from 'react';
import {
  Clock,
  Award,
  BookOpen,
  Calculator,
  Download,
  History,
  AlertCircle,
  FileCheck2,
  GraduationCap,
} from 'lucide-react';
import { ExamAttemptRecord } from '../types/exam';

interface InstructionScreenProps {
  onStartExam: (studentName: string, studentId: string) => void;
  pastAttempts: ExamAttemptRecord[];
  onDownloadOfflineHtml: () => void;
  isDownloadingHtml: boolean;
}

export const InstructionScreen: React.FC<InstructionScreenProps> = ({
  onStartExam,
  pastAttempts,
  onDownloadOfflineHtml,
  isDownloadingHtml,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMessage('Please enter your full Candidate Name before starting the exam.');
      return;
    }
    if (!studentId.trim()) {
      setErrorMessage('Please enter your Student ID Number before starting the exam.');
      return;
    }
    setErrorMessage('');
    onStartExam(studentName.trim(), studentId.trim());
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
      {/* Top Banner */}
      <div className="bg-[#002B49] text-white py-3 px-4 border-b-4 border-amber-400 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">
              ACCA Computer-Based Examination (CBE) Simulator
            </span>
          </div>
          <div className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded text-xs tracking-wide">
            Daw Thida Oo Training center Internal test purpose
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full p-4 sm:p-6 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Instructions and Syllabus Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-lg border border-slate-300 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                <div className="bg-blue-600 text-white p-2 rounded">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    ACCA F2 — Management Accounting
                  </h1>
                  <p className="text-xs text-slate-600">
                    Comprehensive Practice Examination · Authentic Exam Format
                  </p>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 mb-5 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Official Center Notice:</span> This examination portal is configured for{' '}
                  <strong>Daw Thida Oo Training center Internal test purpose</strong>. No sign-in is required. Upon clicking Done, your total score and pass status are shown immediately and your full graded result is automatically sent to Daw Thida Oo Training Center.
                </div>
              </div>

              {/* Exam Rules & Structure */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <h3 className="font-bold text-slate-900 text-sm">Exam Specifications &amp; Instructions</h3>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Total Questions:</strong> 27 Questions in total.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Section A (Q1 – Q25):</strong> 25 objective test questions, carrying <strong>2 marks each</strong> (50 marks).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Section B (Q26 &amp; Q27):</strong> 2 multi-task case scenarios, carrying <strong>10 marks each</strong> (20 marks).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Total Marks &amp; Passing Mark:</strong> Total 70 marks. The passing benchmark is <strong>50% (35/70 marks)</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Time Allowed:</strong> <strong>90 Minutes (1 hour 30 mins)</strong>. The countdown begins immediately once you click the Start button.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Answer Randomization:</strong> Question answer options are randomized for authentic examination practice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>Tools Provided:</strong> Built-in <strong>Pearson VUE Exam Calculator</strong>, Item Navigator, and ACCA Formula Sheet.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Syllabus Areas Covered */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-2.5">
                  Tested Syllabus Chapters:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    1. Accounting for Material (EOQ, Levels, FIFO/AVCO)
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    2. Accounting for Labor (Bonus, Overtime, Turnover)
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    3. Accounting for Overheads (OAR, Under/Over absorption)
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    4. Absorption and Marginal Costing &amp; Reconciliation
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200 sm:col-span-2">
                    5. Job, Batch and Services Costing (EBQ, Transport, Hospital)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Candidate Entry & Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Candidate Login Box */}
            <div className="bg-white rounded-lg border-2 border-[#002B49] p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
                <FileCheck2 className="w-5 h-5 text-blue-700" />
                <h2 className="font-bold text-base text-slate-900">
                  Candidate Verification
                </h2>
              </div>

              <form onSubmit={handleStart} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-md flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Maung Aung Thu"
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student ID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. TDO-2026-F2-042"
                    className="w-full px-3.5 py-2.5 rounded border border-slate-300 text-sm font-mono-numbers focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white text-slate-900 font-medium"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Used for score tracking, local progress recording, and official test certificate.
                  </p>
                </div>

                {/* Mandatory Start Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#002B49] hover:bg-[#001d32] text-white font-bold text-sm rounded shadow-md transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Start Examination (90 Minutes)</span>
                </button>
              </form>
            </div>

            {/* Utility Card: Progress Tracker & Standalone Download */}
            <div className="bg-white rounded-lg border border-slate-300 p-4 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Student Practice Tools</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  {pastAttempts.length} Previous {pastAttempts.length === 1 ? 'Attempt' : 'Attempts'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Past Attempts Button */}
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center justify-center gap-1.5 p-2.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-700 font-semibold transition cursor-pointer"
                >
                  <History className="w-4 h-4 text-blue-600" />
                  <span>Score History ({pastAttempts.length})</span>
                </button>

                {/* Download Standalone HTML Button */}
                <button
                  type="button"
                  onClick={onDownloadOfflineHtml}
                  disabled={isDownloadingHtml}
                  className="flex items-center justify-center gap-1.5 p-2.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-700 font-semibold transition cursor-pointer"
                  title="Download standalone offline HTML file with responsive mobile layout"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>{isDownloadingHtml ? 'Generating...' : 'Download HTML'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center leading-normal">
                Downloadable HTML operates 100% offline on any phone or desktop without internet.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-200 border-t border-slate-300 py-3 px-4 text-center text-xs text-slate-600">
        <div>
          Daw Thida Oo Training center Internal test purpose · ACCA F2 Management Accounting (FMA)
        </div>
      </footer>

      {/* Past Attempts Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[80vh] flex flex-col border border-slate-300">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-400" />
                <h3 className="font-semibold text-sm">
                  Local Progress Tracker — Past Test Attempts
                </h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              {pastAttempts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No previous attempts recorded on this device yet. Complete your first test to see your score progression!
                </div>
              ) : (
                pastAttempts.map((att, idx) => (
                  <div
                    key={att.id || idx}
                    className="p-3.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {att.studentName} ({att.studentId})
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {new Date(att.timestamp).toLocaleString()} · Time:{' '}
                        {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-bold font-mono-numbers ${
                          att.passed ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {att.totalScore} / {att.maxScore} ({att.percentage}%)
                      </div>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 ${
                          att.passed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {att.passed ? 'PASSED' : 'NOT PASSED'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex justify-end rounded-b-lg">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
