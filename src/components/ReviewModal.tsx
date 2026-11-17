import React from 'react';
import { X, AlertTriangle, CheckCircle2, Circle, Flag, ArrowRight, Loader2 } from 'lucide-react';
import { Question, StudentAnswer } from '../types/exam';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFinal: () => void;
  questions: Question[];
  answers: Record<number, StudentAnswer>;
  onSelectQuestion: (index: number) => void;
  timeRemainingSeconds: number;
  isSubmitting?: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitFinal,
  questions,
  answers,
  onSelectQuestion,
  timeRemainingSeconds,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  const isQuestionAnswered = (q: Question): boolean => {
    const ans = answers[q.id];
    if (!ans) return false;
    if (q.type === 'single-choice') return !!ans.selectedOptionId;
    if (q.type === 'multi-task' && q.multiTaskParts) {
      if (!ans.multiTaskAnswers) return false;
      return Object.keys(ans.multiTaskAnswers).length > 0;
    }
    return false;
  };

  const isQuestionFlagged = (q: Question): boolean => {
    return !!answers[q.id]?.isFlagged;
  };

  const answeredCount = questions.filter(isQuestionAnswered).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = questions.filter(isQuestionFlagged).length;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-300">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#002B49] text-white flex items-center justify-between rounded-t-lg">
          <div>
            <h3 className="font-bold text-sm tracking-wide">
              ACCA Exam Final Review Screen
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Verify your question status before submitting
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="p-5 overflow-y-auto space-y-4">
          {unansweredCount > 0 ? (
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-md text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">
                  You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}!
                </p>
                <p className="text-amber-800 mt-0.5">
                  Any unanswered questions will receive 0 marks. Time remaining:{' '}
                  <strong className="font-mono-numbers">{formatTime(timeRemainingSeconds)}</strong>.
                  You can click on any unanswered question below to return and complete it.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-md text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">
                  All 27 questions have answers recorded!
                </p>
                <p className="text-emerald-800 mt-0.5">
                  You have answered every question. You can review any flagged questions ({flaggedCount}) or confirm final submission to view your total score and send your result automatically.
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded bg-blue-50 border border-blue-200">
              <div className="text-base font-bold text-blue-700 font-mono-numbers">
                {answeredCount} / {questions.length}
              </div>
              <div className="text-[11px] text-blue-600 font-medium mt-0.5">Answered</div>
            </div>

            <div className="p-3 rounded bg-amber-50 border border-amber-200">
              <div className="text-base font-bold text-amber-700 font-mono-numbers">
                {unansweredCount}
              </div>
              <div className="text-[11px] text-amber-600 font-medium mt-0.5">Unanswered</div>
            </div>

            <div className="p-3 rounded bg-slate-100 border border-slate-200">
              <div className="text-base font-bold text-slate-700 font-mono-numbers">
                {flaggedCount}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Flagged</div>
            </div>
          </div>

          {/* Question List Table */}
          <div className="border border-slate-200 rounded max-h-56 overflow-y-auto divide-y divide-slate-100 text-xs">
            {questions.map((q, idx) => {
              const answered = isQuestionAnswered(q);
              const flagged = isQuestionFlagged(q);

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(idx);
                    onClose();
                  }}
                  className="px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold font-mono-numbers text-slate-900 w-8">
                      Q{q.id}
                    </span>
                    <span className="text-slate-600 text-[11px] line-clamp-1 max-w-[260px] sm:max-w-sm">
                      {q.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono-numbers">
                      {q.marks}m
                    </span>
                    {flagged && (
                      <span className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold bg-amber-100 px-1.5 py-0.5 rounded">
                        <Flag className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Flagged
                      </span>
                    )}
                    {answered ? (
                      <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Answered
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
                        <Circle className="w-3.5 h-3.5" />
                        Incomplete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-400 rounded bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Return to Exam
          </button>

          <button
            disabled={isSubmitting}
            onClick={onSubmitFinal}
            className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-xs font-bold shadow transition cursor-pointer flex items-center gap-2 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Done — Submit Exam</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
