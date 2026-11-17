import React from 'react';
import { ChevronLeft, ChevronRight, CheckSquare } from 'lucide-react';

interface CbeFooterProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenReview: () => void;
  isAnswered: boolean;
  marks: number;
}

export const CbeFooter: React.FC<CbeFooterProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onOpenReview,
  isAnswered,
  marks,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <footer className="bg-slate-200 border-t border-slate-300 px-4 py-3 select-none sticky bottom-0 z-30 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Previous & Next navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition ${
              isFirst
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-400 shadow-xs active:scale-98 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition ${
              isLast
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-400 shadow-xs active:scale-98 cursor-pointer'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Marks and status */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800 font-mono-numbers">
            {marks} {marks === 1 ? 'mark' : 'marks'}
          </span>
          <span>·</span>
          <span>
            {isAnswered ? (
              <span className="text-blue-700 font-medium">● Answer recorded</span>
            ) : (
              <span className="text-slate-500">○ Not yet answered</span>
            )}
          </span>
        </div>

        {/* Right: End Exam / Review Button */}
        <div>
          <button
            onClick={onOpenReview}
            className="flex items-center gap-2 px-5 py-2 rounded bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold tracking-wide shadow transition cursor-pointer active:scale-98"
          >
            <CheckSquare className="w-4 h-4 text-sky-400" />
            <span>Review &amp; Done</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
