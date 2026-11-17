import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStandaloneOfflineHtml } from '../src/utils/generateOfflineHtml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

fs.mkdirSync(docsDir, { recursive: true });

const html = buildStandaloneOfflineHtml();

fs.writeFileSync(path.join(docsDir, 'index.html'), html, 'utf8');
fs.writeFileSync(
  path.join(docsDir, 'ACCA_F2_Management_Accounting_Exam_DawThidaOo.html'),
  html,
  'utf8'
);

console.log('Generated standalone offline HTML in docs/index.html');
