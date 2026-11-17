import {
  Chapter,
  EmailDeliveryInfo,
  ExamAttemptRecord,
  Question,
  QuestionResultSummary,
  StudentAnswer,
  SubmitResultPayload,
} from '../types/exam';

export function gradeExamAttempt(params: {
  questions: Question[];
  answers: Record<number, StudentAnswer>;
  studentName: string;
  studentId: string;
  studentEmail?: string;
  timeSpentSeconds: number;
  sourceMode: string;
}): {
  attemptRecord: ExamAttemptRecord;
  emailPayload: SubmitResultPayload;
} {
  const {
    questions,
    answers,
    studentName,
    studentId,
    studentEmail,
    timeSpentSeconds,
    sourceMode,
  } = params;

  let totalScore = 0;
  let maxScore = 0;

  const chapterTotals: Record<
    Chapter,
    { scored: number; total: number; percentage: number }
  > = {
    'Accounting for Material': { scored: 0, total: 0, percentage: 0 },
    'Accounting for Labor': { scored: 0, total: 0, percentage: 0 },
    'Accounting for Overheads': { scored: 0, total: 0, percentage: 0 },
    'Absorption and Marginal Costing': { scored: 0, total: 0, percentage: 0 },
    'Job, Batch and Services Costing': { scored: 0, total: 0, percentage: 0 },
  };

  const questionSummary: QuestionResultSummary[] = [];

  questions.forEach((q) => {
    maxScore += q.marks;
    chapterTotals[q.chapter].total += q.marks;
    const userAns = answers[q.id];

    if (q.type === 'single-choice') {
      const selectedOpt = q.options?.find((o) => o.id === userAns?.selectedOptionId);
      const correctOpt = q.options?.find((o) => o.id === q.correctOptionId);
      const isCorrect = Boolean(
        userAns?.selectedOptionId && userAns.selectedOptionId === q.correctOptionId
      );
      const marksAwarded = isCorrect ? q.marks : 0;

      totalScore += marksAwarded;
      chapterTotals[q.chapter].scored += marksAwarded;

      questionSummary.push({
        id: q.id,
        title: q.title,
        chapter: q.chapter,
        marksAwarded,
        maxMarks: q.marks,
        isCorrect,
        userSummary: selectedOpt ? selectedOpt.text : 'Unanswered',
        correctSummary: correctOpt ? correctOpt.text : '',
      });
    } else if (q.type === 'multi-task' && q.multiTaskParts) {
      let earned = 0;
      const partStatuses: string[] = [];
      const correctStatuses: string[] = [];

      q.multiTaskParts.forEach((part, idx) => {
        const val = userAns?.multiTaskAnswers?.[part.id];
        let isPartCorrect = false;

        if (part.type === 'dropdown') {
          isPartCorrect = val === part.correctAnswer;
        } else if (part.type === 'number-input') {
          const num = parseFloat(String(val || '').replace(/,/g, ''));
          const target = parseFloat(String(part.correctAnswer));
          const tol = part.tolerance || 0;
          isPartCorrect = !isNaN(num) && Math.abs(num - target) <= tol;
        }

        if (isPartCorrect) {
          earned += part.marks;
        }

        const userLabel =
          part.options?.find((o) => o.id === val)?.label ||
          (val !== undefined && String(val).trim() !== '' ? String(val) : 'Unanswered');
        const correctLabel =
          part.options?.find((o) => o.id === part.correctAnswer)?.label ||
          String(part.correctAnswer);

        partStatuses.push(`P${idx + 1}: ${userLabel}`);
        correctStatuses.push(`P${idx + 1}: ${correctLabel}`);
      });

      totalScore += earned;
      chapterTotals[q.chapter].scored += earned;

      questionSummary.push({
        id: q.id,
        title: q.title,
        chapter: q.chapter,
        marksAwarded: earned,
        maxMarks: q.marks,
        isCorrect: earned === q.marks,
        userSummary: partStatuses.join(' | '),
        correctSummary: correctStatuses.join(' | '),
      });
    }
  });

  Object.keys(chapterTotals).forEach((key) => {
    const ch = key as Chapter;
    const entry = chapterTotals[ch];
    entry.percentage =
      entry.total > 0 ? Math.round((entry.scored / entry.total) * 100) : 0;
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const passed = totalScore >= Math.ceil(maxScore * 0.5);
  const timestamp = new Date().toISOString();

  const attemptRecord: ExamAttemptRecord = {
    id: `attempt_${Date.now()}`,
    studentName: studentName.trim(),
    studentId: studentId.trim(),
    studentEmail: studentEmail?.trim() || undefined,
    timestamp,
    timeSpentSeconds,
    totalScore,
    maxScore,
    percentage,
    passed,
    chapterScores: chapterTotals,
    answers,
  };

  const emailPayload: SubmitResultPayload = {
    studentName: attemptRecord.studentName,
    studentId: attemptRecord.studentId,
    studentEmail: attemptRecord.studentEmail,
    submittedAt: timestamp,
    timeSpentSeconds,
    totalScore,
    maxScore,
    percentage,
    passed,
    sourceMode,
    chapterScores: chapterTotals,
    questionSummary,
  };

  return { attemptRecord, emailPayload };
}

const HOSTED_API_URL =
  'https://ais-pre-fs3s6dnsvy4vr4t6cyjewj-537682758935.asia-northeast1.run.app/api/submit-result';

export async function dispatchResultEmail(
  payload: SubmitResultPayload
): Promise<EmailDeliveryInfo> {
  const isStaticExternal =
    typeof window !== 'undefined' &&
    (window.location.protocol === 'file:' ||
      window.location.hostname.endsWith('github.io'));

  const endpoints = isStaticExternal
    ? [HOSTED_API_URL]
    : ['/api/submit-result', HOSTED_API_URL];

  let lastReason = 'NETWORK_ERROR';
  let lastMessage = 'Network error while dispatching email.';
  let lastRecipient = 'mary.tdo03041988@gmail.com';

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        lastReason = 'UNREACHABLE_ENDPOINT';
        lastMessage = 'Mail endpoint did not return JSON.';
        continue;
      }

      const data = await res.json();
      lastRecipient = data.recipient || lastRecipient;

      if (res.ok && data.delivered) {
        return {
          status: 'sent',
          recipient: lastRecipient,
        };
      }

      return {
        status: 'failed',
        recipient: lastRecipient,
        reason: data.reason || 'DELIVERY_ERROR',
        message:
          data.message || 'Could not send automatic email right now.',
      };
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      lastReason = isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR';
      lastMessage = isTimeout
        ? 'Email request timed out. Your score was still saved locally.'
        : 'Offline or unreachable mail server. Your score was saved locally.';
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    status: 'failed',
    recipient: lastRecipient,
    reason: lastReason,
    message: lastMessage,
  };
}
