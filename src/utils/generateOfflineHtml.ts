import { EXAM_QUESTIONS } from '../data/questions';

export function buildStandaloneOfflineHtml(): string {
  const questionsJson = JSON.stringify(EXAM_QUESTIONS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ACCA F2 Management Accounting Test — Daw Thida Oo Training Center</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #1e293b;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-variant-numeric: tabular-nums; }

    /* Top ACCA CBE Header */
    .cbe-topbar {
      background: #002B49;
      color: #ffffff;
      border-bottom: 3px solid #fbbf24;
      padding: 10px 16px;
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .cbe-topbar-inner {
      max-width: 1040px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
    }
    .tdo-badge {
      background: #fbbf24;
      color: #0f172a;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
    }
    .cbe-exam-header {
      background: #002B49;
      color: #ffffff;
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      user-select: none;
    }
    .cbe-exam-row1 {
      padding: 8px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.12);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
    }
    .cbe-exam-row2 {
      background: #0a3556;
      padding: 10px 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    /* Buttons & Inputs */
    .btn {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #1e293b;
      padding: 7px 14px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s, border-color 0.15s;
    }
    .btn:hover:not(:disabled) { background: #f8fafc; }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }
    .btn-primary {
      background: #002B49;
      border-color: #002B49;
      color: #ffffff;
    }
    .btn-primary:hover:not(:disabled) { background: #001f35; }
    .btn-blue {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
    }
    .btn-blue:hover:not(:disabled) { background: #1d4ed8; }
    .btn-danger {
      background: #dc2626;
      border-color: #dc2626;
      color: #ffffff;
    }
    .btn-danger:hover:not(:disabled) { background: #b91c1c; }
    .btn-tool {
      background: #1e293b;
      border-color: #475569;
      color: #f8fafc;
      padding: 5px 10px;
    }
    .btn-tool:hover { background: #334155; }

    /* Containers & Cards */
    .container { max-width: 1040px; width: 100%; margin: 0 auto; padding: 20px 16px; flex: 1; }
    .card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .grid-instr {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
      align-items: start;
    }
    .syllabus-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 10px;
    }
    .syllabus-item {
      padding: 8px 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      font-size: 11px;
    }

    /* Tables */
    .cbe-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 12px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
    }
    .cbe-table th, .cbe-table td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      text-align: left;
    }
    .cbe-table th { background: #f1f5f9; font-weight: 700; color: #1e293b; }
    .cbe-table td { font-family: ui-monospace, monospace; font-variant-numeric: tabular-nums; }

    /* Single Choice Option */
    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .option-item:hover { background: #f8fafc; border-color: #94a3b8; }
    .option-item.selected {
      background: #eff6ff;
      border-color: #2563eb;
      box-shadow: 0 0 0 1px #3b82f6;
    }
    .radio-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2px;
      flex-shrink: 0;
      background: #ffffff;
    }
    .option-item.selected .radio-circle {
      border-color: #2563eb;
      background: #2563eb;
    }
    .radio-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ffffff;
    }

    /* Sticky CBE Footer */
    .cbe-footer {
      background: #e2e8f0;
      border-top: 1px solid #cbd5e1;
      padding: 12px 16px;
      position: sticky;
      bottom: 0;
      z-index: 30;
    }
    .cbe-footer-inner {
      max-width: 1040px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    /* Modals */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      z-index: 90;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-backdrop.open { display: flex; }
    .modal-box {
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      max-width: 680px;
      width: 100%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 35px rgba(0,0,0,0.3);
    }
    .modal-head {
      background: #002B49;
      color: #ffffff;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 700;
    }
    .modal-body {
      padding: 18px;
      overflow-y: auto;
      font-size: 12px;
    }
    .modal-foot {
      padding: 12px 18px;
      background: #f1f5f9;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(46px, 1fr));
      gap: 8px;
    }
    .nav-cell {
      padding: 8px 4px;
      border-radius: 5px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      font-family: ui-monospace, monospace;
    }
    .nav-cell.answered { background: #dbeafe; border-color: #3b82f6; color: #1e3a8a; }
    .nav-cell.flagged { background: #fef3c7; border-color: #f59e0b; color: #92400e; }
    .nav-cell.current { outline: 2px solid #002B49; outline-offset: 1px; }

    /* Calculator Popup */
    #calcWindow {
      position: fixed;
      right: 20px;
      top: 90px;
      width: 280px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      box-shadow: 0 12px 28px rgba(0,0,0,0.45);
      z-index: 120;
      display: none;
      user-select: none;
    }
    .calc-header {
      background: #1e293b;
      padding: 8px 12px;
      color: white;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
    }
    .calc-screen {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 4px;
      padding: 8px;
      margin: 10px;
      text-align: right;
      color: white;
      font-family: ui-monospace, monospace;
    }
    .calc-history { font-size: 11px; color: #94a3b8; height: 16px; overflow: hidden; }
    .calc-display { font-size: 22px; font-weight: bold; overflow: hidden; }
    .calc-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      padding: 0 10px 10px 10px;
    }
    .calc-btn {
      height: 34px;
      border: none;
      border-radius: 4px;
      background: #334155;
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .calc-btn:active { transform: scale(0.96); }
    .calc-btn-op { background: #075985; color: #bae6fd; font-weight: bold; }
    .calc-btn-eq { background: #0284c7; color: white; grid-row: span 2; height: 72px; }
    .calc-btn-num { background: #475569; font-size: 14px; font-weight: bold; }

    @media print {
      .no-print { display: none !important; }
      body { background: #ffffff !important; }
      .card { border: none !important; box-shadow: none !important; padding: 0 !important; }
    }

    @media (max-width: 820px) {
      .grid-instr { grid-template-columns: 1fr; }
      .syllabus-grid { grid-template-columns: 1fr; }
      .card { padding: 16px; }
      #calcWindow { left: 8px; right: 8px; width: auto; }
    }
  </style>
</head>
<body>

  <!-- ==================== SCREEN 1: INSTRUCTION SCREEN ==================== -->
  <div id="instructionScreen" style="display: flex; flex-direction: column; min-height: 100vh;">
    <header class="cbe-topbar">
      <div class="cbe-topbar-inner">
        <div style="font-weight: 700; font-size: 14px;">ACCA Computer-Based Examination (CBE) Simulator</div>
        <div class="tdo-badge">Daw Thida Oo Training center Internal test purpose</div>
      </div>
    </header>

    <main class="container" style="display: flex; align-items: center;">
      <div class="grid-instr" style="width: 100%;">
        <!-- Left Instructions -->
        <div class="card">
          <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 14px;">
            <h1 style="font-size: 22px; font-weight: 800; color: #0f172a;">ACCA F2 — Management Accounting</h1>
            <p style="font-size: 12px; color: #475569; margin-top: 2px;">Comprehensive Practice Examination · Authentic CBE Format</p>
          </div>

          <div style="padding: 10px 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; font-size: 12px; color: #78350f; margin-bottom: 16px;">
            <strong>Official Center Notice:</strong> This examination portal is configured for <strong>Daw Thida Oo Training center Internal test purpose</strong>. No sign-in is required. Upon clicking Done, your total score and pass status are shown immediately and your full graded result is automatically sent to Daw Thida Oo Training Center.
          </div>

          <h3 style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Exam Specifications &amp; Instructions</h3>
          <ul style="font-size: 12px; color: #334155; padding-left: 18px; line-height: 1.8;">
            <li><strong>Total Questions:</strong> 27 Questions in total.</li>
            <li><strong>Section A (Q1 – Q25):</strong> 25 objective test questions, <strong>2 marks each</strong> (50 marks).</li>
            <li><strong>Section B (Q26 &amp; Q27):</strong> 2 multi-task case scenarios, <strong>10 marks each</strong> (20 marks).</li>
            <li><strong>Total Marks &amp; Passing Mark:</strong> Total 70 marks. Pass mark is <strong>50% (35 / 70 marks)</strong>.</li>
            <li><strong>Time Allowed:</strong> <strong>90 Minutes (1 hour 30 mins)</strong>. Countdown starts upon clicking Start Examination.</li>
            <li><strong>Answer Randomization:</strong> Question answer options are randomized for authentic examination practice.</li>
            <li><strong>Tools Provided:</strong> Built-in Pearson VUE Exam Calculator, Item Navigator, and ACCA Formula Sheet.</li>
          </ul>

          <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 12px; font-weight: 700; color: #0f172a;">Tested Syllabus Chapters:</div>
            <div class="syllabus-grid">
              <div class="syllabus-item">1. Accounting for Material (EOQ, Levels, FIFO/AVCO)</div>
              <div class="syllabus-item">2. Accounting for Labor (Bonus, Overtime, Turnover)</div>
              <div class="syllabus-item">3. Accounting for Overheads (OAR, Absorption)</div>
              <div class="syllabus-item">4. Absorption &amp; Marginal Costing Reconciliation</div>
              <div class="syllabus-item" style="grid-column: 1 / -1;">5. Job, Batch and Services Costing (EBQ, Transport, Hospital)</div>
            </div>
          </div>
        </div>

        <!-- Right Candidate Verification -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="card" style="border: 2px solid #002B49;">
            <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 14px;">
              Candidate Verification
            </h2>

            <div id="instrError" style="display: none; padding: 10px; background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c; font-size: 12px; border-radius: 5px; margin-bottom: 12px;"></div>

            <div style="margin-bottom: 14px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 5px;">
                Candidate Full Name <span style="color: #dc2626;">*</span>
              </label>
              <input type="text" id="candidateName" placeholder="e.g. Maung Aung Thu" style="width: 100%; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 5px; font-size: 14px;">
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 5px;">
                Student ID Number <span style="color: #dc2626;">*</span>
              </label>
              <input type="text" id="candidateId" placeholder="e.g. TDO-2026-F2-042" style="width: 100%; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 5px; font-size: 14px; font-family: monospace;">
            </div>

            <button type="button" onclick="startExam()" class="btn btn-primary" style="width: 100%; padding: 12px 16px; font-size: 14px;">
              ⏱ Start Examination (90 Minutes)
            </button>
          </div>

          <div class="card" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 12px;">
              <strong>Local Progress Tracker</strong>
              <span id="pastCountText" style="color: #64748b;">0 Previous Attempts</span>
            </div>
            <button type="button" onclick="openHistoryModal()" class="btn" style="width: 100%;">
              View Score History
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer style="background: #e2e8f0; border-top: 1px solid #cbd5e1; padding: 10px 16px; text-align: center; font-size: 12px; color: #475569;">
      Daw Thida Oo Training center Internal test purpose · ACCA F2 Management Accounting (FMA)
    </footer>
  </div>

  <!-- ==================== SCREEN 2: ACCA CBE EXAM WORKSPACE ==================== -->
  <div id="examScreen" style="display: none; flex-direction: column; min-height: 100vh;">
    <header class="cbe-exam-header">
      <div class="cbe-exam-row1">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="background: #dc2626; color: #fff; font-weight: 700; padding: 2px 7px; border-radius: 3px; font-size: 11px;">ACCA CBE</span>
          <span style="font-weight: 600;">F2 Management Accounting</span>
          <span style="color: #94a3b8;">|</span>
          <span style="color: #fcd34d; font-weight: 600;">Daw Thida Oo Training center Internal test purpose</span>
        </div>
        <div>
          Candidate: <strong id="hdrName"></strong>
          <span class="font-mono" style="color: #cbd5e1;" id="hdrId"></span>
        </div>
      </div>

      <div class="cbe-exam-row2">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="font-size: 13px; font-weight: 600;">
            Question <span class="font-mono" style="color: #7dd3fc;" id="hdrQNum">1</span> of <span class="font-mono">27</span>
          </span>
          <button type="button" id="flagBtn" onclick="toggleFlagCurrent()" class="btn btn-tool">
            ⚑ Flag for Review
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <div id="timerBox" class="font-mono" style="background: #0f172a; border: 1px solid #475569; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span>Time Left: <span id="timerDisplay">01:30:00</span></span>
            <button type="button" onclick="toggleTimerVisibility()" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 11px;">👁</button>
          </div>
          <button type="button" onclick="toggleCalculator()" class="btn btn-tool">Calculator</button>
          <button type="button" onclick="openFormulaeModal()" class="btn btn-tool">Formulae</button>
          <button type="button" onclick="openNavigatorModal()" class="btn btn-blue">Navigator</button>
        </div>
      </div>
    </header>

    <main class="container" style="padding-bottom: 28px;">
      <div id="questionWorkspace" class="card" style="padding: 0; overflow: hidden;"></div>
    </main>

    <footer class="cbe-footer">
      <div class="cbe-footer-inner">
        <div style="display: flex; gap: 8px;">
          <button type="button" id="prevBtn" onclick="goPrev()" class="btn">‹ Previous</button>
          <button type="button" id="nextBtn" onclick="goNext()" class="btn">Next ›</button>
        </div>
        <div id="footerStatus" style="font-size: 12px; color: #475569;"></div>
        <div>
          <button type="button" onclick="openReviewModal()" class="btn btn-primary" style="padding: 8px 18px;">
            ☑ Review &amp; Done
          </button>
        </div>
      </div>
    </footer>
  </div>

  <!-- ==================== SCREEN 3: SCORE-ONLY RESULTS SCREEN ==================== -->
  <div id="resultsScreen" style="display: none; flex-direction: column; min-height: 100vh;">
    <header class="cbe-topbar no-print">
      <div class="cbe-topbar-inner">
        <div style="font-weight: 700; font-size: 14px;">ACCA F2 Examination Result</div>
        <div style="color: #fcd34d; font-weight: 600;">Daw Thida Oo Training center Internal test purpose</div>
      </div>
    </header>

    <main class="container" style="max-width: 780px;">
      <div class="card">
        <div style="text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a;">DAW THIDA OO TRAINING CENTER</h1>
          <p style="font-size: 12px; font-weight: 600; color: #475569; margin-top: 2px;">Daw Thida Oo Training center Internal test purpose</p>
          <h2 style="font-size: 15px; font-weight: 700; color: #1e293b; margin-top: 6px;">ACCA F2 Management Accounting (FMA) — Score Statement</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; align-items: center; margin-bottom: 20px;">
          <div style="font-size: 13px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 6px 0;">
              <span style="color: #64748b;">Candidate Name:</span>
              <strong id="resName"></strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 6px 0;">
              <span style="color: #64748b;">Student ID Number:</span>
              <strong class="font-mono" id="resId"></strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 6px 0;">
              <span style="color: #64748b;">Completed At:</span>
              <span id="resDate"></span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 6px 0;">
              <span style="color: #64748b;">Time Taken:</span>
              <strong class="font-mono" id="resTime"></strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span style="color: #64748b;">Passing Benchmark:</span>
              <span class="font-mono">50% (35 / 70 marks)</span>
            </div>
          </div>

          <div id="scoreBox" style="padding: 24px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; color: #475569;">Total Score</div>
            <div class="font-mono" style="font-size: 40px; font-weight: 900; color: #0f172a; margin: 4px 0;" id="resPoints">0 / 70</div>
            <div class="font-mono" style="font-size: 17px; font-weight: 700; color: #334155;" id="resPct">0%</div>
            <div style="margin-top: 12px;" id="resBadge"></div>
          </div>
        </div>

        <div id="emailDeliveryBanner" style="margin-bottom: 18px;"></div>

        <div class="no-print" style="border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px;">
          <button type="button" onclick="window.print()" class="btn">Print Summary</button>
          <button type="button" onclick="location.reload()" class="btn btn-primary">Retake Test</button>
        </div>
      </div>
    </main>
  </div>

  <!-- ==================== MODALS ==================== -->
  <!-- Navigator Modal -->
  <div id="navigatorModal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-head">
        <span>Item Navigator (27 Questions)</span>
        <button type="button" onclick="closeModal('navigatorModal')" style="background:none; border:none; color:#cbd5e1; cursor:pointer; font-size:16px;">✕</button>
      </div>
      <div class="modal-body">
        <div id="navigatorGrid" class="nav-grid"></div>
      </div>
      <div class="modal-foot">
        <span style="font-size:11px; color:#64748b;">Blue = Answered · Amber = Flagged</span>
        <button type="button" onclick="closeModal('navigatorModal')" class="btn">Close</button>
      </div>
    </div>
  </div>

  <!-- Formula Sheet Modal -->
  <div id="formulaeModal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-head">
        <span>ACCA F2 Management Accounting — Standard Formula Sheet</span>
        <button type="button" onclick="closeModal('formulaeModal')" style="background:none; border:none; color:#cbd5e1; cursor:pointer; font-size:16px;">✕</button>
      </div>
      <div class="modal-body" style="line-height: 1.7;">
        <p><strong>EOQ</strong> = √[(2 × Co × D) / Ch]</p>
        <p><strong>EBQ</strong> = √[(2 × Co × D) / (Ch × (1 - D/R))]</p>
        <p><strong>Reorder Level</strong> = Maximum usage × Maximum lead time</p>
        <p><strong>Minimum Level</strong> = Reorder level - (Average usage × Average lead time)</p>
        <p><strong>Maximum Level</strong> = Reorder level + Reorder qty - (Minimum usage × Minimum lead time)</p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p><strong>Rowan Bonus</strong> = (Time Saved / Time Allowed) × Time Taken × Basic Rate</p>
        <p><strong>Halsey Bonus (50%)</strong> = 50% × Time Saved × Basic Rate</p>
        <p><strong>Labor Turnover</strong> = (Replacements / Average Workforce) × 100%</p>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p><strong>OAR</strong> = Budgeted Overhead / Budgeted Activity</p>
        <p><strong>High-Low Variable Cost</strong> = (Cost High - Cost Low) / (Units High - Units Low)</p>
        <p><strong>Profit Reconciliation</strong>: Absorption Profit - Marginal Profit = (Closing Inv - Opening Inv) × Fixed OAR/unit</p>
      </div>
      <div class="modal-foot">
        <span></span>
        <button type="button" onclick="closeModal('formulaeModal')" class="btn">Close</button>
      </div>
    </div>
  </div>

  <!-- Review Modal -->
  <div id="reviewModal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-head">
        <span>ACCA Exam Final Review Screen</span>
        <button type="button" onclick="closeModal('reviewModal')" style="background:none; border:none; color:#cbd5e1; cursor:pointer; font-size:16px;">✕</button>
      </div>
      <div class="modal-body" id="reviewModalBody"></div>
      <div class="modal-foot">
        <button type="button" onclick="closeModal('reviewModal')" class="btn">Return to Exam</button>
        <button type="button" id="finalDoneBtn" onclick="submitExam(false)" class="btn btn-danger">Done — Submit Exam →</button>
      </div>
    </div>
  </div>

  <!-- Score History Modal -->
  <div id="historyModal" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-head">
        <span>Local Progress Tracker — Past Test Attempts</span>
        <button type="button" onclick="closeModal('historyModal')" style="background:none; border:none; color:#cbd5e1; cursor:pointer; font-size:16px;">✕</button>
      </div>
      <div class="modal-body" id="historyModalBody"></div>
      <div class="modal-foot">
        <span></span>
        <button type="button" onclick="closeModal('historyModal')" class="btn">Close</button>
      </div>
    </div>
  </div>

  <!-- Pearson VUE Calculator -->
  <div id="calcWindow">
    <div class="calc-header">
      <span>Pearson VUE Calculator</span>
      <span onclick="toggleCalculator()" style="cursor: pointer; padding: 2px 6px;">✕</span>
    </div>
    <div class="calc-screen">
      <div class="calc-history" id="calcHistory"></div>
      <div class="calc-display" id="calcDisplay">0</div>
    </div>
    <div class="calc-grid">
      <button class="calc-btn" onclick="calcMem('MC')">MC</button>
      <button class="calc-btn" onclick="calcMem('MR')">MR</button>
      <button class="calc-btn" onclick="calcMem('MS')">MS</button>
      <button class="calc-btn" onclick="calcMem('M+')">M+</button>
      <button class="calc-btn" onclick="calcMem('M-')">M-</button>

      <button class="calc-btn" onclick="calcBack()">←</button>
      <button class="calc-btn" onclick="calcClearEntry()">CE</button>
      <button class="calc-btn" onclick="calcClear()">C</button>
      <button class="calc-btn" onclick="calcSign()">±</button>
      <button class="calc-btn calc-btn-op" onclick="calcSqrt()">√</button>

      <button class="calc-btn calc-btn-num" onclick="calcDigit('7')">7</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('8')">8</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('9')">9</button>
      <button class="calc-btn calc-btn-op" onclick="calcOp('÷')">÷</button>
      <button class="calc-btn" onclick="calcPercent()">%</button>

      <button class="calc-btn calc-btn-num" onclick="calcDigit('4')">4</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('5')">5</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('6')">6</button>
      <button class="calc-btn calc-btn-op" onclick="calcOp('×')">×</button>
      <button class="calc-btn" onclick="calcReciprocal()">1/x</button>

      <button class="calc-btn calc-btn-num" onclick="calcDigit('1')">1</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('2')">2</button>
      <button class="calc-btn calc-btn-num" onclick="calcDigit('3')">3</button>
      <button class="calc-btn calc-btn-op" onclick="calcOp('-')">−</button>
      <button class="calc-btn calc-btn-eq" onclick="calcEquals()">=</button>

      <button class="calc-btn calc-btn-num" style="grid-column: span 2;" onclick="calcDigit('0')">0</button>
      <button class="calc-btn calc-btn-num" onclick="calcDecimal()">.</button>
      <button class="calc-btn calc-btn-op" onclick="calcOp('+')">+</button>
    </div>
  </div>

  <script>
    const QUESTIONS = ${questionsJson};
    const FALLBACK_API_URL = 'https://ais-pre-fs3s6dnsvy4vr4t6cyjewj-537682758935.asia-northeast1.run.app/api/submit-result';
    const TOTAL_TIME_SECS = 90 * 60;

    let answers = {};
    let shuffledOptions = {};
    let currentIdx = 0;
    let studentName = '';
    let studentId = '';
    let timerSecs = TOTAL_TIME_SECS;
    let timerInterval = null;
    let showTimer = true;
    let examSubmitted = false;
    let lastEmailPayload = null;

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function shuffleAllOptions() {
      QUESTIONS.forEach(q => {
        if (q.options) {
          const copy = q.options.slice();
          for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = copy[i];
            copy[i] = copy[j];
            copy[j] = tmp;
          }
          shuffledOptions[q.id] = copy;
        }
      });
    }

    function updateHistoryCount() {
      try {
        const list = JSON.parse(localStorage.getItem('tdo_acca_f2_attempts') || '[]');
        document.getElementById('pastCountText').innerText =
          list.length + ' Previous ' + (list.length === 1 ? 'Attempt' : 'Attempts');
      } catch (e) {}
    }

    function startExam() {
      studentName = document.getElementById('candidateName').value.trim();
      studentId = document.getElementById('candidateId').value.trim();
      const errBox = document.getElementById('instrError');

      if (!studentName) {
        errBox.innerText = 'Please enter your full Candidate Name before starting the exam.';
        errBox.style.display = 'block';
        return;
      }
      if (!studentId) {
        errBox.innerText = 'Please enter your Student ID Number before starting the exam.';
        errBox.style.display = 'block';
        return;
      }
      errBox.style.display = 'none';

      shuffleAllOptions();
      currentIdx = 0;
      answers = {};
      timerSecs = TOTAL_TIME_SECS;
      examSubmitted = false;

      document.getElementById('hdrName').innerText = studentName;
      document.getElementById('hdrId').innerText = '(' + studentId + ')';
      document.getElementById('instructionScreen').style.display = 'none';
      document.getElementById('examScreen').style.display = 'flex';

      renderQuestion();
      startTimer();
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        if (examSubmitted) return;
        timerSecs--;
        if (timerSecs <= 0) {
          timerSecs = 0;
          updateTimerDisplay();
          clearInterval(timerInterval);
          submitExam(true);
          return;
        }
        updateTimerDisplay();
      }, 1000);
    }

    function updateTimerDisplay() {
      const h = Math.floor(timerSecs / 3600);
      const m = Math.floor((timerSecs % 3600) / 60);
      const s = timerSecs % 60;
      const formatted = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
      document.getElementById('timerDisplay').innerText = showTimer ? formatted : '••:••:••';
      const box = document.getElementById('timerBox');
      if (timerSecs < 300) {
        box.style.borderColor = '#ef4444';
        box.style.color = '#fca5a5';
      }
    }

    function toggleTimerVisibility() {
      showTimer = !showTimer;
      updateTimerDisplay();
    }

    function isQuestionAnswered(q) {
      const ans = answers[q.id];
      if (!ans) return false;
      if (q.type === 'single-choice') return !!ans.selectedOptionId;
      if (q.type === 'multi-task') {
        return ans.multiTaskAnswers && Object.keys(ans.multiTaskAnswers).length > 0;
      }
      return false;
    }

    function renderQuestion() {
      const q = QUESTIONS[currentIdx];
      const ans = answers[q.id] || {};
      const isFlagged = !!ans.isFlagged;

      document.getElementById('hdrQNum').innerText = String(q.id);
      const flagBtn = document.getElementById('flagBtn');
      flagBtn.innerText = isFlagged ? '⚑ Flagged for Review' : '⚑ Flag for Review';
      flagBtn.style.borderColor = isFlagged ? '#fbbf24' : '#475569';
      flagBtn.style.color = isFlagged ? '#fcd34d' : '#f8fafc';

      let html = '';
      html += '<div style="background:#f1f5f9; border-bottom:1px solid #cbd5e1; padding:12px 20px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px;">';
      html += '<div style="display:flex; align-items:center; gap:10px;">';
      html += '<span style="background:#002B49; color:#fff; font-size:11px; font-weight:700; padding:3px 9px; border-radius:4px;">' + escapeHtml(q.section) + '</span>';
      html += '<span style="font-size:12px; font-weight:600; color:#334155;">' + escapeHtml(q.chapter) + '</span>';
      html += '</div>';
      html += '<span class="font-mono" style="font-size:12px; font-weight:700; color:#334155;">' + q.marks + ' Marks</span>';
      html += '</div>';

      html += '<div style="padding: 22px 24px;">';
      html += '<h2 style="font-size:17px; font-weight:700; color:#0f172a; border-bottom:1px solid #f1f5f9; padding-bottom:10px; margin-bottom:16px;">' + escapeHtml(q.title) + '</h2>';
      html += '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:14px; font-size:13px; color:#334155; white-space:pre-line; margin-bottom:16px;">' + escapeHtml(q.scenario) + '</div>';

      if (q.tableData) {
        if (q.tableData.title) {
          html += '<div style="background:#e2e8f0; padding:7px 12px; font-weight:700; font-size:12px; border:1px solid #cbd5e1; border-bottom:none; border-radius:5px 5px 0 0; margin-top:12px;">' + escapeHtml(q.tableData.title) + '</div>';
        }
        html += '<div style="overflow-x:auto;"><table class="cbe-table" style="margin-top:0;"><thead><tr>';
        q.tableData.headers.forEach(h => html += '<th>' + escapeHtml(h) + '</th>');
        html += '</tr></thead><tbody>';
        q.tableData.rows.forEach(r => {
          html += '<tr>';
          r.forEach(c => html += '<td>' + escapeHtml(c) + '</td>');
          html += '</tr>';
        });
        html += '</tbody></table></div>';
      }

      html += '<div style="font-size:14px; font-weight:600; color:#0f172a; margin:16px 0 12px 0;">' + escapeHtml(q.questionText) + '</div>';

      if (q.type === 'single-choice') {
        const opts = shuffledOptions[q.id] || q.options || [];
        opts.forEach((opt, idx) => {
          const selected = ans.selectedOptionId === opt.id;
          const letter = String.fromCharCode(65 + idx);
          html += '<div class="option-item ' + (selected ? 'selected' : '') + '" onclick="selectOption(' + q.id + ', \\'' + opt.id + '\\')">';
          html += '<div class="radio-circle">' + (selected ? '<div class="radio-dot"></div>' : '') + '</div>';
          html += '<div style="font-size:13px;"><strong>' + letter + '.</strong> ' + escapeHtml(opt.text) + '</div>';
          html += '</div>';
        });
      }

      if (q.type === 'multi-task' && q.multiTaskParts) {
        q.multiTaskParts.forEach(p => {
          const curVal = (ans.multiTaskAnswers && ans.multiTaskAnswers[p.id]) || '';
          html += '<div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:14px; margin-bottom:14px;">';
          html += '<div style="display:flex; justify-content:space-between; border-bottom:1px solid #e2e8f0; padding-bottom:6px; margin-bottom:8px;">';
          html += '<strong style="color:#002B49; font-size:13px;">' + escapeHtml(p.label) + '</strong>';
          html += '<span class="font-mono" style="font-size:11px; color:#475569; font-weight:600;">' + p.marks + ' Marks</span>';
          html += '</div>';
          html += '<p style="font-size:13px; color:#334155; margin-bottom:10px;">' + escapeHtml(p.prompt) + '</p>';

          if (p.type === 'dropdown') {
            html += '<select onchange="updateMultiTask(' + q.id + ', \\'' + p.id + '\\', this.value)" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:5px; font-size:13px; background:#fff;">';
            html += '<option value="">-- Select an option --</option>';
            p.options.forEach(o => {
              const selAttr = curVal === o.id ? ' selected' : '';
              html += '<option value="' + escapeHtml(o.id) + '"' + selAttr + '>' + escapeHtml(o.label) + '</option>';
            });
            html += '</select>';
          } else if (p.type === 'number-input') {
            html += '<div style="display:flex; align-items:center; gap:10px;">';
            html += '<span class="font-mono" style="font-weight:700; color:#475569;">$</span>';
            html += '<input type="text" value="' + escapeHtml(curVal) + '" placeholder="e.g. 296000" oninput="updateMultiTask(' + q.id + ', \\'' + p.id + '\\', this.value)" style="width:220px; padding:8px 10px; border:1px solid #cbd5e1; border-radius:5px; font-size:13px; font-family:monospace;">';
            html += '</div>';
          }
          html += '</div>';
        });
      }

      html += '</div>';
      document.getElementById('questionWorkspace').innerHTML = html;

      document.getElementById('prevBtn').disabled = currentIdx === 0;
      document.getElementById('nextBtn').disabled = currentIdx === QUESTIONS.length - 1;
      const answered = isQuestionAnswered(q);
      document.getElementById('footerStatus').innerHTML =
        '<strong class="font-mono">' + q.marks + ' marks</strong> · ' +
        (answered ? '<span style="color:#1d4ed8; font-weight:600;">● Answer recorded</span>' : '<span>○ Not yet answered</span>');
    }

    function selectOption(qId, optId) {
      if (!answers[qId]) answers[qId] = {};
      answers[qId].selectedOptionId = optId;
      renderQuestion();
    }

    function updateMultiTask(qId, partId, val) {
      if (!answers[qId]) answers[qId] = {};
      if (!answers[qId].multiTaskAnswers) answers[qId].multiTaskAnswers = {};
      const q = QUESTIONS[currentIdx];
      const partObj = (q.multiTaskParts || []).find(p => p.id === partId);
      answers[qId].multiTaskAnswers[partId] =
        partObj && partObj.type === 'number-input'
          ? val.replace(/[^0-9.-]/g, '')
          : val;
      const answered = isQuestionAnswered(q);
      document.getElementById('footerStatus').innerHTML =
        '<strong class="font-mono">' + q.marks + ' marks</strong> · ' +
        (answered ? '<span style="color:#1d4ed8; font-weight:600;">● Answer recorded</span>' : '<span>○ Not yet answered</span>');
    }

    function toggleFlagCurrent() {
      const q = QUESTIONS[currentIdx];
      if (!answers[q.id]) answers[q.id] = {};
      answers[q.id].isFlagged = !answers[q.id].isFlagged;
      renderQuestion();
    }

    function goPrev() {
      if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function goNext() {
      if (currentIdx < QUESTIONS.length - 1) {
        currentIdx++;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function closeModal(id) {
      document.getElementById(id).classList.remove('open');
    }

    function openNavigatorModal() {
      let html = '';
      QUESTIONS.forEach((q, idx) => {
        const answered = isQuestionAnswered(q);
        const flagged = answers[q.id] && answers[q.id].isFlagged;
        let cls = 'nav-cell';
        if (flagged) cls += ' flagged';
        else if (answered) cls += ' answered';
        if (idx === currentIdx) cls += ' current';
        html += '<button type="button" class="' + cls + '" onclick="jumpTo(' + idx + ')">Q' + q.id + '</button>';
      });
      document.getElementById('navigatorGrid').innerHTML = html;
      document.getElementById('navigatorModal').classList.add('open');
    }

    function jumpTo(idx) {
      currentIdx = idx;
      closeModal('navigatorModal');
      closeModal('reviewModal');
      renderQuestion();
    }

    function openFormulaeModal() {
      document.getElementById('formulaeModal').classList.add('open');
    }

    function openReviewModal() {
      const answeredCount = QUESTIONS.filter(isQuestionAnswered).length;
      const unansweredCount = QUESTIONS.length - answeredCount;
      const flaggedCount = QUESTIONS.filter(q => answers[q.id] && answers[q.id].isFlagged).length;

      let html = '<div style="margin-bottom:14px; padding:12px; border-radius:6px; background:' + (unansweredCount > 0 ? '#fffbeb' : '#ecfdf5') + '; border:1px solid ' + (unansweredCount > 0 ? '#fcd34d' : '#6ee7b7') + ';">';
      html += unansweredCount > 0
        ? '<strong>You have ' + unansweredCount + ' unanswered questions.</strong> Click any question below to return and answer it, or click Done — Submit Exam.'
        : '<strong>All 27 questions answered!</strong> Click Done — Submit Exam to view your total score and send your result automatically.';
      html += '</div>';

      html += '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center; margin-bottom:14px;">';
      html += '<div style="padding:10px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:5px;"><div class="font-mono" style="font-size:16px; font-weight:700; color:#1d4ed8;">' + answeredCount + ' / 27</div><div>Answered</div></div>';
      html += '<div style="padding:10px; background:#fffbeb; border:1px solid #fde68a; border-radius:5px;"><div class="font-mono" style="font-size:16px; font-weight:700; color:#b45309;">' + unansweredCount + '</div><div>Unanswered</div></div>';
      html += '<div style="padding:10px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:5px;"><div class="font-mono" style="font-size:16px; font-weight:700; color:#334155;">' + flaggedCount + '</div><div>Flagged</div></div>';
      html += '</div>';

      html += '<div style="border:1px solid #e2e8f0; border-radius:5px; max-height:220px; overflow-y:auto;">';
      QUESTIONS.forEach((q, idx) => {
        const ans = isQuestionAnswered(q);
        const flg = answers[q.id] && answers[q.id].isFlagged;
        html += '<div onclick="jumpTo(' + idx + ')" style="padding:8px 12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; cursor:pointer;">';
        html += '<span><strong class="font-mono">Q' + q.id + '</strong> · ' + escapeHtml(q.title) + '</span>';
        html += '<span style="color:' + (ans ? '#1d4ed8' : '#b45309') + '; font-weight:600;">' + (flg ? '⚑ ' : '') + (ans ? 'Answered' : 'Incomplete') + '</span>';
        html += '</div>';
      });
      html += '</div>';

      document.getElementById('reviewModalBody').innerHTML = html;
      document.getElementById('reviewModal').classList.add('open');
    }

    function openHistoryModal() {
      let list = [];
      try {
        list = JSON.parse(localStorage.getItem('tdo_acca_f2_attempts') || '[]');
      } catch (e) {}
      if (list.length === 0) {
        document.getElementById('historyModalBody').innerHTML =
          '<div style="text-align:center; padding:24px; color:#64748b;">No previous attempts recorded on this device yet.</div>';
      } else {
        let html = '';
        list.forEach(att => {
          html += '<div style="padding:10px 12px; border:1px solid #e2e8f0; background:#f8fafc; border-radius:5px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">';
          html += '<div><strong>' + escapeHtml(att.studentName) + ' (' + escapeHtml(att.studentId) + ')</strong><div style="font-size:11px; color:#64748b;">' + new Date(att.timestamp).toLocaleString() + '</div></div>';
          html += '<div style="text-align:right;"><div class="font-mono" style="font-weight:700; color:' + (att.passed ? '#047857' : '#b91c1c') + ';">' + att.totalScore + ' / ' + att.maxScore + ' (' + att.percentage + '%)</div><div style="font-size:11px; font-weight:700;">' + (att.passed ? 'PASSED' : 'NOT PASSED') + '</div></div>';
          html += '</div>';
        });
        document.getElementById('historyModalBody').innerHTML = html;
      }
      document.getElementById('historyModal').classList.add('open');
    }

    function setDeliveryBanner(state, info) {
      const box = document.getElementById('emailDeliveryBanner');
      if (!box) return;
      if (state === 'sending') {
        box.innerHTML =
          '<div style="padding:12px 14px; border-radius:6px; border:1px solid #bfdbfe; background:#eff6ff; color:#1e3a8a; font-size:12px;">' +
          '⏳ Sending your official score automatically to Daw Thida Oo Training Center...' +
          '</div>';
      } else if (state === 'sent') {
        const rec = escapeHtml((info && info.recipient) || 'mary.tdo03041988@gmail.com');
        box.innerHTML =
          '<div style="padding:12px 14px; border-radius:6px; border:1px solid #a7f3d0; background:#ecfdf5; color:#064e3b; font-size:12px;">' +
          '✓ <strong>Result automatically sent.</strong> Your official score has been emailed to <strong>' + rec + '</strong>. No further action is required.' +
          '</div>';
      } else if (state === 'failed') {
        const msg = escapeHtml((info && info.message) || 'Could not reach the mail server right now.');
        box.innerHTML =
          '<div style="padding:12px 14px; border-radius:6px; border:1px solid #fcd34d; background:#fffbeb; color:#78350f; font-size:12px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px;">' +
          '<div>⚠ <strong>Automatic email delivery pending.</strong> ' + msg + '</div>' +
          '<button type="button" onclick="retryAutoSend()" class="btn" style="background:#b45309; border-color:#b45309; color:#fff; padding:5px 12px; font-size:11px;">↻ Retry Auto-Send</button>' +
          '</div>';
      }
    }

    function queuePendingEmail(payload) {
      try {
        const queue = JSON.parse(localStorage.getItem('tdo_pending_email_queue') || '[]');
        const exists = queue.some(item => item.submittedAt === payload.submittedAt && item.studentId === payload.studentId);
        if (!exists) {
          queue.push(payload);
          localStorage.setItem('tdo_pending_email_queue', JSON.stringify(queue.slice(-20)));
        }
      } catch (e) {}
    }

    function removePendingEmail(payload) {
      try {
        const queue = JSON.parse(localStorage.getItem('tdo_pending_email_queue') || '[]');
        const filtered = queue.filter(item => !(item.submittedAt === payload.submittedAt && item.studentId === payload.studentId));
        localStorage.setItem('tdo_pending_email_queue', JSON.stringify(filtered));
      } catch (e) {}
    }

    async function postPayloadOnce(payload) {
      const isStaticExternal =
        !window.location.protocol.startsWith('http') ||
        window.location.hostname.endsWith('github.io');
      const urlsToTry = isStaticExternal
        ? [FALLBACK_API_URL]
        : [window.location.origin + '/api/submit-result', FALLBACK_API_URL];

      let lastErrMsg = 'Could not reach the mail server right now.';
      for (let i = 0; i < urlsToTry.length; i++) {
        try {
          const controller = new AbortController();
          const tid = setTimeout(() => controller.abort(), 12000);
          const res = await fetch(urlsToTry[i], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          clearTimeout(tid);
          const ctype = res.headers.get('content-type') || '';
          if (!ctype.includes('application/json')) continue;
          const data = await res.json();
          if (res.ok && data.delivered) {
            return { delivered: true, data: data };
          }
          lastErrMsg = data.message || lastErrMsg;
        } catch (err) {
          lastErrMsg = 'Offline or unreachable mail server. Your score is saved locally and will send when connected.';
        }
      }
      return { delivered: false, message: lastErrMsg };
    }

    async function sendEmailToBackend(payload) {
      setDeliveryBanner('sending');
      const result = await postPayloadOnce(payload);
      if (result.delivered) {
        removePendingEmail(payload);
        setDeliveryBanner('sent', result.data);
      } else {
        queuePendingEmail(payload);
        setDeliveryBanner('failed', { message: result.message });
      }
    }

    async function flushPendingEmails() {
      if (!navigator.onLine) return;
      try {
        const queue = JSON.parse(localStorage.getItem('tdo_pending_email_queue') || '[]');
        if (!queue.length) return;
        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];
          const res = await postPayloadOnce(item);
          if (res.delivered) {
            removePendingEmail(item);
            if (lastEmailPayload && lastEmailPayload.submittedAt === item.submittedAt) {
              setDeliveryBanner('sent', res.data);
            }
          }
        }
      } catch (e) {}
    }

    window.addEventListener('online', flushPendingEmails);

    function retryAutoSend() {
      if (lastEmailPayload) {
        sendEmailToBackend(lastEmailPayload);
      }
    }

    function submitExam(isAutoTimeout) {
      if (examSubmitted) return;
      examSubmitted = true;
      if (timerInterval) clearInterval(timerInterval);
      closeModal('reviewModal');
      closeModal('navigatorModal');
      closeModal('formulaeModal');
      document.getElementById('calcWindow').style.display = 'none';

      let totalScore = 0;
      let maxScore = 0;
      const chapterScores = {};
      const questionSummary = [];

      QUESTIONS.forEach(q => {
        maxScore += q.marks;
        if (!chapterScores[q.chapter]) {
          chapterScores[q.chapter] = { scored: 0, total: 0, percentage: 0 };
        }
        chapterScores[q.chapter].total += q.marks;

        const ans = answers[q.id];
        if (q.type === 'single-choice') {
          const selOpt = (q.options || []).find(o => o.id === (ans && ans.selectedOptionId));
          const corOpt = (q.options || []).find(o => o.id === q.correctOptionId);
          const ok = Boolean(ans && ans.selectedOptionId && ans.selectedOptionId === q.correctOptionId);
          const earned = ok ? q.marks : 0;
          totalScore += earned;
          chapterScores[q.chapter].scored += earned;
          questionSummary.push({
            id: q.id,
            title: q.title,
            chapter: q.chapter,
            marksAwarded: earned,
            maxMarks: q.marks,
            isCorrect: ok,
            userSummary: selOpt ? selOpt.text : 'Unanswered',
            correctSummary: corOpt ? corOpt.text : '',
          });
        } else if (q.type === 'multi-task' && q.multiTaskParts) {
          let earned = 0;
          const partStatuses = [];
          const correctStatuses = [];
          q.multiTaskParts.forEach((p, idx) => {
            const uVal = ans && ans.multiTaskAnswers ? ans.multiTaskAnswers[p.id] : undefined;
            let ok = false;
            if (p.type === 'dropdown') {
              ok = uVal === p.correctAnswer;
            } else if (p.type === 'number-input') {
              const num = parseFloat(String(uVal || '').replace(/,/g, ''));
              const target = parseFloat(String(p.correctAnswer));
              const tol = p.tolerance || 0;
              ok = !isNaN(num) && Math.abs(num - target) <= tol;
            }
            if (ok) earned += p.marks;

            const uOpt = (p.options || []).find(o => o.id === uVal);
            const cOpt = (p.options || []).find(o => o.id === p.correctAnswer);
            const uLabel = uOpt ? uOpt.label : (uVal !== undefined && String(uVal).trim() !== '' ? String(uVal) : 'Unanswered');
            const cLabel = cOpt ? cOpt.label : String(p.correctAnswer);
            partStatuses.push('P' + (idx + 1) + ': ' + uLabel);
            correctStatuses.push('P' + (idx + 1) + ': ' + cLabel);
          });
          totalScore += earned;
          chapterScores[q.chapter].scored += earned;
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

      Object.keys(chapterScores).forEach(ch => {
        const entry = chapterScores[ch];
        entry.percentage = entry.total > 0 ? Math.round((entry.scored / entry.total) * 100) : 0;
      });

      const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
      const passed = totalScore >= Math.ceil(maxScore * 0.5);
      const timeSpentSeconds = Math.max(0, TOTAL_TIME_SECS - timerSecs);
      const submittedAt = new Date().toISOString();

      try {
        const existing = JSON.parse(localStorage.getItem('tdo_acca_f2_attempts') || '[]');
        existing.unshift({
          id: 'attempt_' + Date.now(),
          studentName: studentName || 'Student Candidate',
          studentId: studentId || 'TDO-CANDIDATE',
          timestamp: submittedAt,
          timeSpentSeconds,
          totalScore,
          maxScore,
          percentage: pct,
          passed,
          chapterScores,
          answers,
        });
        localStorage.setItem('tdo_acca_f2_attempts', JSON.stringify(existing.slice(0, 50)));
      } catch (e) {}

      // Show Total Score and Pass Status Only
      document.getElementById('resName').innerText = studentName || 'Student Candidate';
      document.getElementById('resId').innerText = studentId || 'TDO-CANDIDATE';
      document.getElementById('resDate').innerText = new Date(submittedAt).toLocaleString();
      document.getElementById('resTime').innerText = Math.floor(timeSpentSeconds / 60) + 'm ' + (timeSpentSeconds % 60) + 's';
      document.getElementById('resPoints').innerText = totalScore + ' / ' + maxScore;
      document.getElementById('resPct').innerText = pct + '%';

      const scoreBox = document.getElementById('scoreBox');
      scoreBox.style.background = passed ? '#ecfdf5' : '#fef2f2';
      scoreBox.style.borderColor = passed ? '#6ee7b7' : '#fca5a5';
      document.getElementById('resBadge').innerHTML = passed
        ? '<span style="display:inline-block; padding:6px 16px; border-radius:4px; background:#047857; color:#ffffff; font-size:12px; font-weight:800; letter-spacing:0.06em;">✓ PASSED</span>'
        : '<span style="display:inline-block; padding:6px 16px; border-radius:4px; background:#b91c1c; color:#ffffff; font-size:12px; font-weight:800; letter-spacing:0.06em;">✕ NOT PASSED</span>';

      document.getElementById('examScreen').style.display = 'none';
      document.getElementById('resultsScreen').style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      lastEmailPayload = {
        studentName: studentName || 'Student Candidate',
        studentId: studentId || 'TDO-CANDIDATE',
        submittedAt,
        timeSpentSeconds,
        totalScore,
        maxScore,
        percentage: pct,
        passed,
        sourceMode: isAutoTimeout ? 'Offline Standalone HTML (Timed Out)' : 'Offline Standalone HTML (ACCA CBE)',
        chapterScores,
        questionSummary,
      };

      sendEmailToBackend(lastEmailPayload);
    }

    // Calculator code
    let calcVal = '0', calcPrev = null, calcOperation = null, calcAwaiting = false, calcMemVal = 0;
    function toggleCalculator() {
      const el = document.getElementById('calcWindow');
      el.style.display = el.style.display === 'block' ? 'none' : 'block';
    }
    function calcDigit(d) {
      if (calcAwaiting) { calcVal = d; calcAwaiting = false; }
      else { calcVal = calcVal === '0' ? d : calcVal + d; }
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcDecimal() {
      if (calcAwaiting) { calcVal = '0.'; calcAwaiting = false; }
      else if (!calcVal.includes('.')) calcVal += '.';
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcClear() {
      calcVal = '0'; calcPrev = null; calcOperation = null; calcAwaiting = false;
      document.getElementById('calcDisplay').innerText = '0';
      document.getElementById('calcHistory').innerText = '';
    }
    function calcClearEntry() { calcVal = '0'; document.getElementById('calcDisplay').innerText = '0'; }
    function calcBack() {
      if (calcAwaiting) return;
      calcVal = calcVal.length > 1 ? calcVal.slice(0, -1) : '0';
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcSign() { calcVal = String(-parseFloat(calcVal)); document.getElementById('calcDisplay').innerText = calcVal; }
    function calcSqrt() {
      const v = parseFloat(calcVal);
      calcVal = v < 0 ? 'Error' : String(Number(Math.sqrt(v).toFixed(8)));
      calcAwaiting = true;
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcPercent() {
      const v = parseFloat(calcVal);
      calcVal = calcPrev !== null && calcOperation ? String((calcPrev * v) / 100) : String(v / 100);
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcReciprocal() {
      const v = parseFloat(calcVal);
      calcVal = v === 0 ? 'Error' : String(Number((1 / v).toFixed(8)));
      calcAwaiting = true;
      document.getElementById('calcDisplay').innerText = calcVal;
    }
    function calcOp(op) {
      const v = parseFloat(calcVal);
      if (calcPrev === null) { calcPrev = v; }
      else if (calcOperation && !calcAwaiting) {
        if (calcOperation === '+') calcPrev += v;
        if (calcOperation === '-') calcPrev -= v;
        if (calcOperation === '×') calcPrev *= v;
        if (calcOperation === '÷') calcPrev = v === 0 ? 0 : calcPrev / v;
        calcVal = String(calcPrev);
        document.getElementById('calcDisplay').innerText = calcVal;
      }
      calcOperation = op;
      calcAwaiting = true;
      document.getElementById('calcHistory').innerText = calcPrev + ' ' + op;
    }
    function calcEquals() {
      const v = parseFloat(calcVal);
      if (calcPrev !== null && calcOperation) {
        let res = v;
        if (calcOperation === '+') res = calcPrev + v;
        if (calcOperation === '-') res = calcPrev - v;
        if (calcOperation === '×') res = calcPrev * v;
        if (calcOperation === '÷') res = v === 0 ? 0 : calcPrev / v;
        document.getElementById('calcHistory').innerText = calcPrev + ' ' + calcOperation + ' ' + v + ' =';
        calcVal = String(Number(res.toFixed(8)));
        document.getElementById('calcDisplay').innerText = calcVal;
        calcPrev = null; calcOperation = null; calcAwaiting = true;
      }
    }
    function calcMem(fn) {
      const v = parseFloat(calcVal) || 0;
      if (fn === 'MC') calcMemVal = 0;
      if (fn === 'MR') { calcVal = String(calcMemVal); calcAwaiting = true; document.getElementById('calcDisplay').innerText = calcVal; }
      if (fn === 'MS') calcMemVal = v;
      if (fn === 'M+') calcMemVal += v;
      if (fn === 'M-') calcMemVal -= v;
    }

    updateHistoryCount();
    flushPendingEmails();
  </script>
</body>
</html>`;
}

export function downloadStandaloneOfflineHtml(): void {
  const htmlContent = buildStandaloneOfflineHtml();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ACCA_F2_Management_Accounting_Exam_DawThidaOo.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
