import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DEFAULT_TEACHER_EMAIL = 'mary.tdo03041988@gmail.com';

interface ChapterScoreEntry {
  scored: number;
  total: number;
  percentage: number;
}

interface QuestionSummaryEntry {
  id: number;
  title: string;
  chapter: string;
  marksAwarded: number;
  maxMarks: number;
  isCorrect: boolean;
  userSummary: string;
  correctSummary: string;
}

interface SubmitResultBody {
  studentName: string;
  studentId: string;
  studentEmail?: string;
  submittedAt: string;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  sourceMode?: string;
  chapterScores: Record<string, ChapterScoreEntry>;
  questionSummary?: QuestionSummaryEntry[];
}

function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailContent(payload: SubmitResultBody) {
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
    `Submission Via : ${payload.sourceMode || 'Web Test Portal'}`,
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

  const chapterRowsHtml = Object.entries(payload.chapterScores || {})
    .map(
      ([chapter, score]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${escapeHtml(chapter)}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-family: monospace; text-align: right; color: #0f172a; font-weight: 600;">${score.scored} / ${score.total}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-family: monospace; text-align: right; color: ${score.percentage >= 50 ? '#047857' : '#b45309'}; font-weight: 700;">${score.percentage}%</td>
      </tr>`
    )
    .join('');

  const questionRowsHtml = (payload.questionSummary || [])
    .map(
      (q) => `
      <tr>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; font-weight: 700;">Q${q.id}</td>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #334155;">${escapeHtml(q.title)}</td>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #475569;">${escapeHtml(q.userSummary)}</td>
        <td style="padding: 6px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-family: monospace; text-align: right; font-weight: 700; color: ${q.isCorrect ? '#047857' : '#dc2626'};">${q.marksAwarded}/${q.maxMarks}</td>
      </tr>`
    )
    .join('');

  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 680px; margin: 0 auto; background: #f8fafc; padding: 20px; color: #1e293b;">
    <div style="background: #002B49; color: #ffffff; padding: 18px 22px; border-radius: 8px 8px 0 0;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #fbbf24; font-weight: 700;">Daw Thida Oo Training center Internal test purpose</div>
      <h1 style="margin: 6px 0 0 0; font-size: 18px;">ACCA F2 Management Accounting — Student Result</h1>
    </div>

    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: none; padding: 22px; border-radius: 0 0 8px 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; background: ${payload.passed ? '#ecfdf5' : '#fef2f2'}; border: 1px solid ${payload.passed ? '#6ee7b7' : '#fca5a5'}; padding: 14px 18px; border-radius: 6px; margin-bottom: 18px;">
        <div>
          <div style="font-size: 12px; color: #475569; font-weight: 600;">Total Score</div>
          <div style="font-size: 26px; font-weight: 800; font-family: monospace; color: #0f172a;">${payload.totalScore} / ${payload.maxScore} (${payload.percentage}%)</div>
        </div>
        <div style="background: ${payload.passed ? '#059669' : '#dc2626'}; color: #ffffff; padding: 6px 14px; border-radius: 4px; font-size: 12px; font-weight: 800; letter-spacing: 0.05em;">
          ${payload.passed ? 'PASSED' : 'NOT PASSED'}
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
        <tr><td style="padding: 5px 0; color: #64748b; width: 150px;">Candidate Name:</td><td style="font-weight: 700; color: #0f172a;">${escapeHtml(payload.studentName)}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Student ID:</td><td style="font-weight: 700; font-family: monospace; color: #0f172a;">${escapeHtml(payload.studentId)}</td></tr>
        ${payload.studentEmail ? `<tr><td style="padding: 5px 0; color: #64748b;">Student Email:</td><td>${escapeHtml(payload.studentEmail)}</td></tr>` : ''}
        <tr><td style="padding: 5px 0; color: #64748b;">Submitted At:</td><td>${escapeHtml(formattedDate)}</td></tr>
        <tr><td style="padding: 5px 0; color: #64748b;">Time Taken:</td><td style="font-family: monospace;">${mins}m ${secs}s</td></tr>
      </table>

      <h2 style="font-size: 14px; color: #002B49; margin: 18px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Syllabus Chapter Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 8px 12px; text-align: left; font-size: 12px; color: #475569;">Chapter</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 12px; color: #475569;">Marks</th>
            <th style="padding: 8px 12px; text-align: right; font-size: 12px; color: #475569;">Score %</th>
          </tr>
        </thead>
        <tbody>${chapterRowsHtml}</tbody>
      </table>

      ${
        questionRowsHtml
          ? `
      <h2 style="font-size: 14px; color: #002B49; margin: 18px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Question-by-Question Audit</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 6px 10px; text-align: left; font-size: 11px; color: #475569;">Q#</th>
            <th style="padding: 6px 10px; text-align: left; font-size: 11px; color: #475569;">Topic</th>
            <th style="padding: 6px 10px; text-align: left; font-size: 11px; color: #475569;">Student Response</th>
            <th style="padding: 6px 10px; text-align: right; font-size: 11px; color: #475569;">Marks</th>
          </tr>
        </thead>
        <tbody>${questionRowsHtml}</tbody>
      </table>`
          : ''
      }
    </div>
  </div>`;

  return { text, html };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Enable CORS on /api/* so downloaded offline HTML files can also submit results when online
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    const smtpPass = process.env.SMTP_PASS || '';
    const emailConfigured = Boolean(
      smtpPass && smtpPass !== 'YOUR_16_CHAR_GMAIL_APP_PASSWORD'
    );
    res.json({ ok: true, emailConfigured });
  });

  app.post('/api/submit-result', async (req: Request, res: Response) => {
    try {
      const payload = req.body as SubmitResultBody;
      if (!payload || !payload.studentName || !payload.studentId) {
        res.status(400).json({
          delivered: false,
          reason: 'VALIDATION_ERROR',
          message: 'Candidate name and student ID are required.',
        });
        return;
      }

      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT || '465');
      const smtpUser = process.env.SMTP_USER || DEFAULT_TEACHER_EMAIL;
      const smtpPass = process.env.SMTP_PASS || '';
      const teacherEmail = process.env.TEACHER_EMAIL || DEFAULT_TEACHER_EMAIL;

      if (!smtpPass || smtpPass === 'YOUR_16_CHAR_GMAIL_APP_PASSWORD') {
        res.status(200).json({
          delivered: false,
          reason: 'SMTP_NOT_CONFIGURED',
          recipient: teacherEmail,
          message:
            'Automatic email delivery awaits the SMTP_PASS secret in AI Studio Secrets.',
        });
        return;
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const { text, html } = buildEmailContent(payload);
      const statusText = payload.passed ? 'PASSED' : 'NOT PASSED';
      const subject = `[ACCA F2 Result] ${payload.studentName} (${payload.studentId}) — ${payload.totalScore}/${payload.maxScore} (${payload.percentage}%) — ${statusText}`;

      const info = await transporter.sendMail({
        from: `"Daw Thida Oo Test Portal" <${smtpUser}>`,
        to: teacherEmail,
        replyTo: payload.studentEmail || undefined,
        subject,
        text,
        html,
      });

      res.status(200).json({
        delivered: true,
        recipient: teacherEmail,
        messageId: info.messageId,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown SMTP error';
      console.error('Error sending automatic result email:', msg);
      res.status(500).json({
        delivered: false,
        reason: 'SMTP_ERROR',
        message: msg,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ACCA F2 Exam Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
