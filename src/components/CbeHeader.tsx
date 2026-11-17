import React, { useState } from 'react';
import { Calculator, Grid, BookOpen, Flag, Clock, Eye, EyeOff } from 'lucide-react';

interface CbeHeaderProps {
  studentName: string;
  studentId: string;
  timeRemainingSeconds: number;
  onOpenCalculator: () => void;
  onOpenNavigator: () => void;
  onOpenFormulae: () => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export const CbeHeader: React.FC<CbeHeaderProps> = ({
  studentName,
  studentId,
  timeRemainingSeconds,
  onOpenCalculator,
  onOpenNavigator,
  onOpenFormulae,
  isFlagged,
  onToggleFlag,
  currentQuestionNumber,
  totalQuestions,
}) => {
  const [showTimer, setShowTimer] = useState(true);

  // Format time HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemainingSeconds < 300; // < 5 mins

  return (
    <header className="bg-[#002B49] text-white border-b-2 border-[#001c30] select-none sticky top-0 z-40 shadow-sm">
      {/* Top Banner Row */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 text-xs">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 px-2 py-0.5 text-white font-bold tracking-wider text-[11px] rounded-xs uppercase">
            ACCA CBE
          </div>
          <span className="font-semibold text-slate-100 hidden sm:inline">
            F2 Management Accounting
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-amber-300 font-medium tracking-wide text-[11px] sm:text-xs">
            Daw Thida Oo Training center Internal test purpose
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-200 text-xs">
          <div>
            Candidate: <span className="font-semibold text-white">{studentName}</span>
            <span className="text-slate-400 ml-1.5 font-mono-numbers">({studentId})</span>
          </div>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-[#0a3556]">
        {/* Left: Question Counter & Flag toggle */}
        <div className="flex items-center gap-3">
          <div className="text-xs sm:text-sm font-semibold tracking-wide">
            Question <span className="font-mono-numbers text-sky-300">{currentQuestionNumber}</span> of{' '}
            <span className="font-mono-numbers">{totalQuestions}</span>
          </div>

          <button
            onClick={onToggleFlag}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer border ${
              isFlagged
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Flag question for review later"
          >
            <Flag
              className={`w-3.5 h-3.5 ${
                isFlagged ? 'text-amber-400 fill-amber-400' : 'text-slate-400'
              }`}
            />
            <span className="hidden xs:inline">
              {isFlagged ? 'Flagged for Review' : 'Flag for Review'}
            </span>
          </button>
        </div>

        {/* Right: Tools & Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Timer Display */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono-numbers font-bold ${
              isTimeCritical
                ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                : 'bg-slate-900/60 border-slate-700 text-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Time Left: {showTimer ? formatTime(timeRemainingSeconds) : '••:••:••'}</span>
            <button
              onClick={() => setShowTimer(!showTimer)}
              className="text-slate-400 hover:text-white ml-1 p-0.5 rounded"
              title={showTimer ? 'Hide timer' : 'Show timer'}
            >
              {showTimer ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          </div>

          {/* Calculator Button */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium text-slate-100 transition cursor-pointer"
            title="Open Pearson VUE Exam Calculator"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {/* Formula Sheet Button */}
          <button
            onClick={onOpenFormulae}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium text-slate-100 transition cursor-pointer"
            title="View ACCA F2 Standard Formulae"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Formulae</span>
          </button>

          {/* Navigator Button */}
          <button
            onClick={onOpenNavigator}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
            title="View all 27 questions list"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Navigator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
