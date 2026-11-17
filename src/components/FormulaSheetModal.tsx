import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-300">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h3 className="font-semibold text-sm tracking-wide">
              ACCA F2 Management Accounting — Standard Formula Sheet & Tables
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Section 1: Economic Order Quantity & Batch Quantity */}
          <div className="border border-slate-200 rounded p-4 bg-slate-50/70">
            <h4 className="font-bold text-sm text-slate-900 mb-2">1. Inventory Control Formulae</h4>
            <div className="space-y-3 font-mono-numbers text-xs">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">Economic Order Quantity (EOQ):</span>
                <p className="mt-1 text-slate-800 font-semibold">EOQ = √[(2 × Co × D) / Ch]</p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                  Where: Co = Cost per order, D = Annual demand, Ch = Annual holding cost per unit
                </p>
              </div>

              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">Economic Batch Quantity (EBQ):</span>
                <p className="mt-1 text-slate-800 font-semibold">EBQ = √[(2 × Co × D) / (Ch × (1 - D/R))]</p>
                <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                  Where: R = Annual production rate (replenishment rate)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-sans">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900">Reorder Level:</span>
                  <p className="text-slate-700 mt-0.5">Maximum usage × Maximum lead time</p>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900">Minimum Level (Buffer):</span>
                  <p className="text-slate-700 mt-0.5">Reorder level - (Average usage × Average lead time)</p>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900">Maximum Level:</span>
                  <p className="text-slate-700 mt-0.5">Reorder level + Reorder qty - (Min usage × Min lead time)</p>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="font-bold text-slate-900">Average Inventory:</span>
                  <p className="text-slate-700 mt-0.5">Buffer inventory + (Order quantity / 2)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Labor & Bonus Formulas */}
          <div className="border border-slate-200 rounded p-4 bg-slate-50/70">
            <h4 className="font-bold text-sm text-slate-900 mb-2">2. Labor Remuneration & Turnover</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-white rounded border border-slate-200 font-mono-numbers">
                <span className="font-bold text-slate-900 font-sans">Rowan Bonus Scheme:</span>
                <p className="mt-1 text-slate-800 font-semibold">
                  Bonus = (Time Saved / Time Allowed) × Time Taken × Basic Hourly Rate
                </p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono-numbers">
                <span className="font-bold text-slate-900 font-sans">Halsey Bonus Scheme (50%):</span>
                <p className="mt-1 text-slate-800 font-semibold">
                  Bonus = 50% × Time Saved × Basic Hourly Rate
                </p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">Labor Turnover Rate (Replacement method):</span>
                <p className="mt-1 text-slate-800">
                  (Number of replacements / Average workforce during period) × 100%
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Overheads & Cost Behavior */}
          <div className="border border-slate-200 rounded p-4 bg-slate-50/70">
            <h4 className="font-bold text-sm text-slate-900 mb-2">3. Overheads & Absorption</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">Predetermined Overhead Absorption Rate (OAR):</span>
                <p className="mt-1 text-slate-800">Budgeted overheads / Budgeted activity level</p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">Under/Over Absorption:</span>
                <p className="mt-1 text-slate-800">Absorbed overhead (Actual hours × OAR) - Actual overhead incurred</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  If Absorbed &gt; Actual: Over-absorbed (credit to P&amp;L). If Absorbed &lt; Actual: Under-absorbed (debit to P&amp;L).
                </p>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-bold text-slate-900">High-Low Method:</span>
                <p className="mt-1 text-slate-800">
                  Variable cost per unit = (Cost at high activity - Cost at low activity) / (High activity units - Low activity units)
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Marginal vs Absorption Costing */}
          <div className="border border-slate-200 rounded p-4 bg-slate-50/70">
            <h4 className="font-bold text-sm text-slate-900 mb-2">4. Profit Reconciliation Rule</h4>
            <div className="p-2 bg-white rounded border border-slate-200">
              <p className="font-semibold text-slate-900">
                Absorption Profit - Marginal Profit = (Closing Inventory - Opening Inventory) × Fixed OAR per unit
              </p>
              <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1 text-[11px]">
                <li>When Production &gt; Sales (Inventory rises): Absorption Profit &gt; Marginal Profit</li>
                <li>When Sales &gt; Production (Inventory falls): Marginal Profit &gt; Absorption Profit</li>
                <li>When Production = Sales (Inventory constant): Absorption Profit = Marginal Profit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold transition"
          >
            Close Formula Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
