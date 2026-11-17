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

const WEB3FORMS_ACCESS_KEY = 'eb6818b8-6a16-4ebd-af19-34a358e726b3';
const DEFAULT_TEACHER_EMAIL = 'mary.tdo03041988@gmail.com';

function formatSubmissionMessage(payload: SubmitResultPayload): { subject: string; text: string } {
  const mins = Math.floor(payload.timeSpentSeconds / 60);
  const secs = payload.timeSpentSeconds % 60;
  const formattedDate = new Date(payload.submittedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const statusLabel = payload.passed ? 'PASSED (>= 50%)' : 'NOT PASSED (< 50%)';

  const chapterLines = Object.entries(payload.chapterScores || {})
    .map(
      ([chapter, score]) =>
        `  - ${chapter}: ${score.scored} / ${score.total} marks (${score.percentage}%)`
    )
    .join('\n');

  const questionLines = (payload.questionSummary || [])
    .map(
      (q) =>
        `  Q${q.id} [${q.marksAwarded}/${q.maxMarks}]: ${q.title} -> ${
          q.isCorrect ? 'CORRECT' : 'INCORRECT'
        } (Student: ${q.userSummary} | Key: ${q.correctSummary})`
    )
    .join('\n');

  const text = [
    'DAW THIDA OO TRAINING CENTER — ACCA F2 TEST SUBMISSION',
    'Daw Thida Oo Training center Internal test purpose',
    '================================================================',
    `Candidate Name : ${payload.studentName}`,
    `Student ID     : ${payload.studentId}`,
    payload.studentEmail ? `Student Email  : ${payload.studentEmail}` : null,
    `Submitted At   : ${formattedDate}`,
    `Time Taken     : ${mins}m ${secs}s`,
    `Submission Via : ${payload.sourceMode || 'GitHub Pages'}`,
    '',
    `TOTAL SCORE    : ${payload.totalScore} / ${payload.maxScore} (${payload.percentage}%)`,
    `RESULT STATUS  : ${statusLabel}`,
    '',
    'CHAPTER PERFORMANCE BREAKDOWN:',
    chapterLines,
    '',
    'QUESTION-BY-QUESTION AUDIT:',
    questionLines,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const subject = `[ACCA F2 Result] ${payload.studentName} (${payload.studentId}) — ${payload.totalScore}/${payload.maxScore} (${payload.percentage}%) — ${statusLabel}`;

  return { subject, text };
}

async function sendViaWeb3Forms(payload: SubmitResultPayload): Promise<EmailDeliveryInfo> {
  const { subject, text } = formatSubmissionMessage(payload);
  const mins = Math.floor(payload.timeSpentSeconds / 60);
  const secs = payload.timeSpentSeconds % 60;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: 'Daw Thida Oo Test Portal',
        name: payload.studentName,
        email: payload.studentEmail || undefined,
        'Student ID': payload.studentId,
        'Total Score': `${payload.totalScore} / ${payload.maxScore} (${payload.percentage}%)`,
        'Result Status': payload.passed ? 'PASSED' : 'NOT PASSED',
        'Time Taken': `${mins}m ${secs}s`,
        message: text,
      }),
      signal: controller.signal,
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return {
        status: 'sent',
        recipient: DEFAULT_TEACHER_EMAIL,
      };
    }

    return {
      status: 'failed',
      recipient: DEFAULT_TEACHER_EMAIL,
      reason: 'DELIVERY_ERROR',
      message: data.message || 'Submission service could not deliver email.',
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      status: 'failed',
      recipient: DEFAULT_TEACHER_EMAIL,
      reason: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
      message: isTimeout
        ? 'Email request timed out. Your score was saved locally.'
        : 'Network error delivering email. Your score was saved locally.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function dispatchResultEmail(
  payload: SubmitResultPayload
): Promise<EmailDeliveryInfo> {
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  if (isLocalhost) {
    try {
      const localRes = await fetch('/api/submit-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.delivered) {
          return {
            status: 'sent',
            recipient: data.recipient || DEFAULT_TEACHER_EMAIL,
          };
        }
      }
    } catch {
      // Local server not running or error, proceed to Web3Forms
    }
  }

  return await sendViaWeb3Forms(payload);
}
