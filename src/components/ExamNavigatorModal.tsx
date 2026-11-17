import React, { useState } from 'react';
import { X, CheckCircle2, Circle, Flag, ArrowRight } from 'lucide-react';
import { Question, StudentAnswer } from '../types/exam';

interface ExamNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, StudentAnswer>;
  onSelectQuestion: (index: number) => void;
}

export const ExamNavigatorModal: React.FC<ExamNavigatorModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentQuestionIndex,
  answers,
  onSelectQuestion,
}) => {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  if (!isOpen) return null;

  const isQuestionAnswered = (q: Question): boolean => {
    const ans = answers[q.id];
    if (!ans) return false;
    if (q.type === 'single-choice') {
      return !!ans.selectedOptionId;
    }
    if (q.type === 'multi-task' && q.multiTaskParts) {
      if (!ans.multiTaskAnswers) return false;
      // Consider answered if at least one part is answered, or all parts
      const answeredParts = Object.keys(ans.multiTaskAnswers).length;
      return answeredParts > 0;
    }
    return false;
  };

  const isQuestionFlagged = (q: Question): boolean => {
    return !!answers[q.id]?.isFlagged;
  };

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'unanswered') return !isQuestionAnswered(q);
    if (filter === 'flagged') return isQuestionFlagged(q);
    return true;
  });

  const totalAnswered = questions.filter(isQuestionAnswered).length;
  const totalFlagged = questions.filter(isQuestionFlagged).length;
  const totalUnanswered = questions.length - totalAnswered;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col border border-slate-300">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between rounded-t-lg">
          <div>
            <h3 className="font-semibold text-sm tracking-wide">
              ACCA Exam Item Navigator — 27 Questions
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Select any question to jump directly to it
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status summary & Filter tabs */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <strong className="text-slate-900 font-mono-numbers">{totalAnswered}</strong> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <Circle className="w-4 h-4 text-slate-400" />
              <strong className="text-slate-900 font-mono-numbers">{totalUnanswered}</strong> Unanswered
            </span>
            <span className="flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-amber-500 fill-amber-500" />
              <strong className="text-slate-900 font-mono-numbers">{totalFlagged}</strong> Flagged
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded text-[11px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (27)
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                filter === 'unanswered' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unanswered ({totalUnanswered})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                filter === 'flagged' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flagged ({totalFlagged})
            </button>
          </div>
        </div>

        {/* Question Grid / Table */}
        <div className="p-5 overflow-y-auto max-h-[58vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {filteredQuestions.map((q) => {
              const qIndex = questions.findIndex((item) => item.id === q.id);
              const isCurrent = qIndex === currentQuestionIndex;
              const answered = isQuestionAnswered(q);
              const flagged = isQuestionFlagged(q);

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(qIndex);
                    onClose();
                  }}
                  className={`p-2.5 rounded border text-left flex flex-col justify-between transition relative ${
                    isCurrent
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30'
                      : answered
                      ? 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                      : 'border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 font-mono-numbers">
                      Q{q.id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {q.marks}m
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-600 line-clamp-1 mb-1.5 font-medium">
                    {q.chapter.replace('Accounting for ', '')}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-slate-500">
                      {q.section}
                    </span>
                    <div className="flex items-center gap-1">
                      {flagged && (
                        <Flag className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                      {answered ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-300" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between rounded-b-lg">
          <span className="text-[11px] text-slate-500">
            Total Questions: 27 | Passing benchmark: 50% (35/70 marks)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition"
          >
            Close Navigator
          </button>
        </div>
      </div>
    </div>
  );
};
