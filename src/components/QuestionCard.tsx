import React from 'react';
import { Question, QuestionOption, StudentAnswer } from '../types/exam';

interface QuestionCardProps {
  question: Question;
  shuffledOptions: QuestionOption[];
  currentAnswer: StudentAnswer | undefined;
  onSelectOption: (optionId: string) => void;
  onUpdateMultiTaskAnswer: (partId: string, value: string | number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  shuffledOptions,
  currentAnswer,
  onSelectOption,
  onUpdateMultiTaskAnswer,
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden text-slate-800">
      {/* Question Header Strip */}
      <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#002B49] text-white text-[11px] font-bold px-2.5 py-1 rounded">
            {question.section}
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {question.chapter}
          </span>
        </div>
        <div className="text-xs font-bold text-slate-700 font-mono-numbers">
          {question.marks} Marks
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          {question.title}
        </h2>

        {/* Scenario Text */}
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-md border border-slate-200">
          {question.scenario}
        </div>

        {/* Financial Table (if present) */}
        {question.tableData && (
          <div className="overflow-x-auto my-4 border border-slate-300 rounded bg-white shadow-xs">
            {question.tableData.title && (
              <div className="bg-slate-200 px-4 py-2 font-bold text-xs text-slate-800 border-b border-slate-300">
                {question.tableData.title}
              </div>
            )}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-semibold">
                  {question.tableData.headers.map((header, idx) => (
                    <th key={idx} className="px-4 py-2.5 border-r last:border-r-0 border-slate-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono-numbers">
                {question.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 border-r last:border-r-0 border-slate-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Main Question Text */}
        <div className="text-sm font-semibold text-slate-900 py-1">
          {question.questionText}
        </div>

        {/* Response Area: Single-choice (Section A) */}
        {question.type === 'single-choice' && (
          <div className="space-y-3 pt-2">
            {shuffledOptions.map((opt, index) => {
              const isSelected = currentAnswer?.selectedOptionId === opt.id;
              const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <label
                  key={opt.id}
                  onClick={() => onSelectOption(opt.id)}
                  className={`flex items-start gap-3.5 p-3.5 rounded-md border cursor-pointer transition select-none ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                      : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center h-5 mt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-400 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 leading-normal">
                    <span className="font-bold text-slate-900 mr-2">{optionLabel}.</span>
                    <span>{opt.text}</span>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Response Area: Multi-task (Section B: Q26 & Q27) */}
        {question.type === 'multi-task' && question.multiTaskParts && (
          <div className="space-y-5 pt-2">
            {question.multiTaskParts.map((part) => {
              const currentVal = currentAnswer?.multiTaskAnswers?.[part.id];

              return (
                <div
                  key={part.id}
                  className="p-4 rounded-md border border-slate-300 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#002B49]">
                      {part.label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 font-mono-numbers">
                      {part.marks} Marks
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700">
                    {part.prompt}
                  </p>

                  {/* Dropdown type */}
                  {part.type === 'dropdown' && part.options && (
                    <div className="pt-1">
                      <select
                        value={currentVal || ''}
                        onChange={(e) => onUpdateMultiTaskAnswer(part.id, e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 cursor-pointer"
                      >
                        <option value="">-- Select an option --</option>
                        {part.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Number Input type */}
                  {part.type === 'number-input' && (
                    <div className="pt-1 flex items-center gap-3">
                      <div className="relative max-w-xs w-full">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-mono-numbers text-sm font-semibold">
                          $
                        </span>
                        <input
                          type="text"
                          value={currentVal || ''}
                          onChange={(e) => {
                            // Allow digits, minus, and dot
                            const clean = e.target.value.replace(/[^0-9.-]/g, '');
                            onUpdateMultiTaskAnswer(part.id, clean);
                          }}
                          placeholder="e.g. 296000"
                          className="w-full pl-8 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded font-mono-numbers focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500">
                        (Whole number without commas)
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
