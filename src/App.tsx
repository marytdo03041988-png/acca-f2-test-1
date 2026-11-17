import React, { useState, useEffect, useRef } from 'react';
import { EXAM_QUESTIONS } from './data/questions';
import {
  Question,
  StudentAnswer,
  ExamAttemptRecord,
  QuestionOption,
  EmailDeliveryInfo,
  SubmitResultPayload,
} from './types/exam';
import { getSavedAttempts, saveExamAttempt } from './utils/storage';
import { gradeExamAttempt, dispatchResultEmail } from './utils/examSubmission';
import { downloadStandaloneOfflineHtml } from './utils/generateOfflineHtml';
import { InstructionScreen } from './components/InstructionScreen';
import { CbeHeader } from './components/CbeHeader';
import { CbeFooter } from './components/CbeFooter';
import { QuestionCard } from './components/QuestionCard';
import { PearsonCalculator } from './components/PearsonCalculator';
import { ExamNavigatorModal } from './components/ExamNavigatorModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { ReviewModal } from './components/ReviewModal';
import { ResultsScreen } from './components/ResultsScreen';

function createShuffledOptionsMap(questions: Question[]): Record<number, QuestionOption[]> {
  const map: Record<number, QuestionOption[]> = {};
  questions.forEach((q) => {
    if (q.options) {
      const copy = [...q.options];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      map[q.id] = copy;
    }
  });
  return map;
}

export default function App() {
  const [screen, setScreen] = useState<'instructions' | 'exam' | 'results'>('instructions');

  // Candidate info
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [pastAttempts, setPastAttempts] = useState<ExamAttemptRecord[]>([]);

  // Exam session state
  const [questions] = useState<Question[]>(EXAM_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>({});
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, QuestionOption[]>>(() =>
    createShuffledOptionsMap(EXAM_QUESTIONS)
  );

  // Timer: 90 minutes = 5400 seconds (starts only when user clicks Start Examination)
  const TOTAL_TIME = 90 * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Modals
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState<boolean>(false);
  const [isFormulaeOpen, setIsFormulaeOpen] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isDownloadingHtml, setIsDownloadingHtml] = useState<boolean>(false);

  // Results & Automatic Email Delivery State
  const [latestResult, setLatestResult] = useState<ExamAttemptRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailDelivery, setEmailDelivery] = useState<EmailDeliveryInfo>({ status: 'idle' });
  const [lastEmailPayload, setLastEmailPayload] = useState<SubmitResultPayload | null>(null);
  const isSubmittingRef = useRef<boolean>(false);
  const submitHandlerRef = useRef<() => void>(() => {});

  // Load past attempts on mount
  useEffect(() => {
    setPastAttempts(getSavedAttempts());
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (isTimerRunning && screen === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsTimerRunning(false);
            setTimeout(() => {
              submitHandlerRef.current();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, screen]);

  // Start exam from instruction screen
  const handleStartExam = (name: string, id: string) => {
    setStudentName(name);
    setStudentId(id);
    setCurrentIdx(0);
    setAnswers({});
    setShuffledOptionsMap(createShuffledOptionsMap(questions));
    setTimeRemaining(TOTAL_TIME);
    setEmailDelivery({ status: 'idle' });
    setLastEmailPayload(null);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    setScreen('exam');
    setIsTimerRunning(true);
  };

  // Option selection
  const handleSelectOption = (qId: number, optId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        selectedOptionId: optId,
      },
    }));
  };

  // Multi-task answers
  const handleUpdateMultiTaskAnswer = (qId: number, partId: string, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        multiTaskAnswers: {
          ...(prev[qId]?.multiTaskAnswers || {}),
          [partId]: value,
        },
      },
    }));
  };

  // Flag toggle
  const handleToggleFlag = () => {
    const q = questions[currentIdx];
    setAnswers((prev) => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        isFlagged: !prev[q.id]?.isFlagged,
      },
    }));
  };

  // Submit, grade, display total score only, and auto-send email to teacher
  const handleFinalSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setIsTimerRunning(false);
    setIsReviewOpen(false);
    setIsCalculatorOpen(false);
    setIsNavigatorOpen(false);
    setIsFormulaeOpen(false);

    try {
      const timeSpentSeconds = Math.max(0, TOTAL_TIME - timeRemaining);
      const { attemptRecord, emailPayload } = gradeExamAttempt({
        questions,
        answers,
        studentName: studentName.trim() || 'Student Candidate',
        studentId: studentId.trim() || 'TDO-CANDIDATE',
        timeSpentSeconds,
        sourceMode: 'ACCA CBE Simulator',
      });

      // Save to local storage
      saveExamAttempt(attemptRecord);
      setPastAttempts(getSavedAttempts());
      setLatestResult(attemptRecord);
      setLastEmailPayload(emailPayload);
      setEmailDelivery({
        status: 'sending',
        recipient: 'mary.tdo03041988@gmail.com',
      });
      setScreen('results');

      const deliveryResult = await dispatchResultEmail(emailPayload);
      setEmailDelivery(deliveryResult);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  submitHandlerRef.current = () => {
    void handleFinalSubmit();
  };

  const handleRetryAutoSend = async () => {
    if (!lastEmailPayload || emailDelivery.status === 'sending') return;
    setEmailDelivery({
      status: 'sending',
      recipient: 'mary.tdo03041988@gmail.com',
    });
    const deliveryResult = await dispatchResultEmail(lastEmailPayload);
    setEmailDelivery(deliveryResult);
  };

  const handleDownloadOfflineHtml = () => {
    setIsDownloadingHtml(true);
    try {
      downloadStandaloneOfflineHtml();
    } finally {
      setTimeout(() => setIsDownloadingHtml(false), 800);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setTimeRemaining(TOTAL_TIME);
    setIsTimerRunning(false);
    setCurrentIdx(0);
    setEmailDelivery({ status: 'idle' });
    setLastEmailPayload(null);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
    setScreen('instructions');
  };

  // Current question data for CBE view
  const currentQuestion = questions[currentIdx];
  const currentAnswer = answers[currentQuestion?.id];
  const isCurrentAnswered =
    currentQuestion?.type === 'single-choice'
      ? !!currentAnswer?.selectedOptionId
      : Object.keys(currentAnswer?.multiTaskAnswers || {}).length > 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {screen === 'instructions' && (
        <InstructionScreen
          onStartExam={handleStartExam}
          pastAttempts={pastAttempts}
          onDownloadOfflineHtml={handleDownloadOfflineHtml}
          isDownloadingHtml={isDownloadingHtml}
        />
      )}

      {screen === 'exam' && currentQuestion && (
        <div className="flex flex-col min-h-screen">
          {/* Authentic ACCA CBE Header */}
          <CbeHeader
            studentName={studentName || 'Candidate'}
            studentId={studentId || 'TDO-ID'}
            timeRemainingSeconds={timeRemaining}
            onOpenCalculator={() => setIsCalculatorOpen((prev) => !prev)}
            onOpenNavigator={() => setIsNavigatorOpen(true)}
            onOpenFormulae={() => setIsFormulaeOpen(true)}
            isFlagged={!!currentAnswer?.isFlagged}
            onToggleFlag={handleToggleFlag}
            currentQuestionNumber={currentQuestion.id}
            totalQuestions={questions.length}
          />

          {/* Main Question Workspace */}
          <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 pb-20">
            <QuestionCard
              question={currentQuestion}
              shuffledOptions={shuffledOptionsMap[currentQuestion.id] || currentQuestion.options || []}
              currentAnswer={currentAnswer}
              onSelectOption={(optId) => handleSelectOption(currentQuestion.id, optId)}
              onUpdateMultiTaskAnswer={(partId, val) =>
                handleUpdateMultiTaskAnswer(currentQuestion.id, partId, val)
              }
            />
          </main>

          {/* Bottom CBE Footer */}
          <CbeFooter
            currentIndex={currentIdx}
            totalQuestions={questions.length}
            onPrevious={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            onNext={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            onOpenReview={() => setIsReviewOpen(true)}
            isAnswered={isCurrentAnswered}
            marks={currentQuestion.marks}
          />

          {/* Review & Submit Modal */}
          <ReviewModal
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
            onSubmitFinal={handleFinalSubmit}
            questions={questions}
            answers={answers}
            onSelectQuestion={(idx) => setCurrentIdx(idx)}
            timeRemainingSeconds={timeRemaining}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {screen === 'results' && latestResult && (
        <ResultsScreen
          result={latestResult}
          emailDelivery={emailDelivery}
          onRetryEmail={handleRetryAutoSend}
          onRetakeExam={handleRetake}
        />
      )}

      {/* Floating Pearson VUE Exam Calculator */}
      <PearsonCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* ACCA Exam Item Navigator Modal */}
      <ExamNavigatorModal
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        questions={questions}
        currentQuestionIndex={currentIdx}
        answers={answers}
        onSelectQuestion={(idx) => setCurrentIdx(idx)}
      />

      {/* Formula Sheet Modal */}
      <FormulaSheetModal
        isOpen={isFormulaeOpen}
        onClose={() => setIsFormulaeOpen(false)}
      />
    </div>
  );
}
