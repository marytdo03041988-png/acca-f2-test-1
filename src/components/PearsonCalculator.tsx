import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Move } from 'lucide-react';

interface PearsonCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PearsonCalculator: React.FC<PearsonCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [awaitingNextOperand, setAwaitingNextOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [formulaPreview, setFormulaPreview] = useState('');

  // Floating drag position
  const [position, setPosition] = useState({ x: 40, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 40,
    posY: 80,
  });

  // Handle keyboard inputs
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        performOperation(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        performEquals();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, display, previousValue, operation, awaitingNextOperand]);

  if (!isOpen) return null;

  const inputDigit = (digit: string) => {
    if (awaitingNextOperand) {
      setDisplay(digit);
      setAwaitingNextOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (awaitingNextOperand) {
      setDisplay('0.');
      setAwaitingNextOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setAwaitingNextOperand(false);
    setFormulaPreview('');
  };

  const handleClearEntry = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (awaitingNextOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay((-val).toString());
    }
  };

  const performSqrt = () => {
    const val = parseFloat(display);
    if (val < 0) {
      setDisplay('Error');
      return;
    }
    const result = Math.sqrt(val);
    setDisplay(Number(result.toFixed(8)).toString());
    setFormulaPreview(`√(${val})`);
    setAwaitingNextOperand(true);
  };

  const performPercent = () => {
    const val = parseFloat(display);
    if (previousValue !== null && operation) {
      const percentage = (previousValue * val) / 100;
      setDisplay(percentage.toString());
    } else {
      setDisplay((val / 100).toString());
    }
  };

  const performReciprocal = () => {
    const val = parseFloat(display);
    if (val === 0) {
      setDisplay('Cannot divide by zero');
      return;
    }
    const result = 1 / val;
    setDisplay(Number(result.toFixed(8)).toString());
    setFormulaPreview(`1/(${val})`);
    setAwaitingNextOperand(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setFormulaPreview(`${inputValue} ${nextOp}`);
    } else if (operation) {
      if (awaitingNextOperand) {
        setOperation(nextOp);
        setFormulaPreview(`${previousValue} ${nextOp}`);
        return;
      }
      const result = calculate(previousValue, inputValue, operation);
      const formatted = Number(result.toFixed(8));
      setPreviousValue(formatted);
      setDisplay(formatted.toString());
      setFormulaPreview(`${formatted} ${nextOp}`);
    }

    setAwaitingNextOperand(true);
    setOperation(nextOp);
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      const formatted = Number(result.toFixed(8));
      setFormulaPreview(`${previousValue} ${operation} ${inputValue} =`);
      setDisplay(formatted.toString());
      setPreviousValue(null);
      setOperation(null);
      setAwaitingNextOperand(true);
    }
  };

  // Memory functions
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => {
    setDisplay(memory.toString());
    setAwaitingNextOperand(true);
  };
  const memoryStore = () => setMemory(parseFloat(display) || 0);
  const memoryAdd = () => setMemory((prev) => prev + (parseFloat(display) || 0));
  const memorySubtract = () => setMemory((prev) => prev - (parseFloat(display) || 0));

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 300, dragRef.current.posX + dx)),
        y: Math.max(10, Math.min(window.innerHeight - 420, dragRef.current.posY + dy)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className="w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden select-none"
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        className="bg-slate-800 px-3 py-2 border-b border-slate-700 flex items-center justify-between cursor-move text-white"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
          <Move className="w-3.5 h-3.5 text-slate-400" />
          <span>Pearson VUE Exam Calculator</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            title="Close calculator"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-3 bg-slate-950">
        {/* LCD Screen */}
        <div className="bg-slate-900 border border-slate-800 rounded p-2.5 mb-2.5 text-right font-mono-numbers">
          <div className="text-[11px] text-slate-400 h-4 truncate">
            {memory !== 0 && <span className="text-amber-400 mr-2 font-semibold">M</span>}
            {formulaPreview}
          </div>
          <div className="text-2xl font-bold text-white tracking-wider truncate">
            {display}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-5 gap-1 text-xs">
          {/* Row 1: Memory */}
          <button
            onClick={memoryClear}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            MC
          </button>
          <button
            onClick={memoryRecall}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            MR
          </button>
          <button
            onClick={memoryStore}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            MS
          </button>
          <button
            onClick={memoryAdd}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            M+
          </button>
          <button
            onClick={memorySubtract}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            M-
          </button>

          {/* Row 2 */}
          <button
            onClick={handleBackspace}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium active:scale-95 transition"
          >
            ←
          </button>
          <button
            onClick={handleClearEntry}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium active:scale-95 transition"
          >
            CE
          </button>
          <button
            onClick={handleClear}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold active:scale-95 transition"
          >
            C
          </button>
          <button
            onClick={toggleSign}
            className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium active:scale-95 transition"
          >
            ±
          </button>
          <button
            onClick={performSqrt}
            className="h-8 rounded bg-sky-900/60 hover:bg-sky-800 text-sky-200 font-semibold active:scale-95 transition"
          >
            √
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit('7')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            7
          </button>
          <button
            onClick={() => inputDigit('8')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            8
          </button>
          <button
            onClick={() => inputDigit('9')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            9
          </button>
          <button
            onClick={() => performOperation('÷')}
            className="h-9 rounded bg-sky-900/80 hover:bg-sky-800 text-sky-200 text-sm font-bold active:scale-95 transition"
          >
            ÷
          </button>
          <button
            onClick={performPercent}
            className="h-9 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            %
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputDigit('4')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            4
          </button>
          <button
            onClick={() => inputDigit('5')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            5
          </button>
          <button
            onClick={() => inputDigit('6')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            6
          </button>
          <button
            onClick={() => performOperation('×')}
            className="h-9 rounded bg-sky-900/80 hover:bg-sky-800 text-sky-200 text-sm font-bold active:scale-95 transition"
          >
            ×
          </button>
          <button
            onClick={performReciprocal}
            className="h-9 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium active:scale-95 transition"
          >
            1/x
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputDigit('1')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            1
          </button>
          <button
            onClick={() => inputDigit('2')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            2
          </button>
          <button
            onClick={() => inputDigit('3')}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            3
          </button>
          <button
            onClick={() => performOperation('-')}
            className="h-9 rounded bg-sky-900/80 hover:bg-sky-800 text-sky-200 text-sm font-bold active:scale-95 transition"
          >
            −
          </button>
          <button
            onClick={performEquals}
            className="row-span-2 h-[76px] rounded bg-blue-600 hover:bg-blue-500 text-white text-base font-bold active:scale-95 transition flex items-center justify-center shadow"
          >
            =
          </button>

          {/* Row 6 */}
          <button
            onClick={() => inputDigit('0')}
            className="col-span-2 h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-sm font-semibold active:scale-95 transition"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="h-9 rounded bg-slate-700/80 hover:bg-slate-600 text-white text-base font-bold active:scale-95 transition"
          >
            .
          </button>
          <button
            onClick={() => performOperation('+')}
            className="h-9 rounded bg-sky-900/80 hover:bg-sky-800 text-sky-200 text-sm font-bold active:scale-95 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
