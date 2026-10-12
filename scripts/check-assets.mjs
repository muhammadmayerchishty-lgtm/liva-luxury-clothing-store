import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const PUBLIC_IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const SCAN_TARGETS = [
  path.join(ROOT_DIR, 'src'),
  path.join(ROOT_DIR, 'index.html'),
];

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json']);

function collectFiles(targetPath) {
  const results = [];
  if (!fs.existsSync(targetPath)) return results;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    results.push(targetPath);
    return results;
  }
  for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
    const full = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const filesToScan = SCAN_TARGETS.flatMap(collectFiles);
const imageRegex = /\/images\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/g;

const referencedPaths = new Map();

for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const refPath = match[0]; // e.g. /images/livia.webp
    const fileName = match[1];
    if (!referencedPaths.has(refPath)) {
      referencedPaths.set(refPath, { fileName, sources: [] });
    }
    referencedPaths.get(refPath).sources.push(path.relative(ROOT_DIR, file));
  }
}

let hasErrors = false;
const actualFilesInPublicImages = fs.existsSync(PUBLIC_IMAGES_DIR)
  ? new Set(fs.readdirSync(PUBLIC_IMAGES_DIR))
  : new Set();

// 1. Validate all files in /public/images follow lowercase-with-hyphens and are under 400KB
for (const fileName of actualFilesInPublicImages) {
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/.test(fileName)) {
    console.error(`[check-assets] ERROR: Invalid filename "${fileName}" in /public/images. Must be lowercase-with-hyphens only.`);
    hasErrors = true;
  }
  const fullPath = path.join(PUBLIC_IMAGES_DIR, fileName);
  const sizeBytes = fs.statSync(fullPath).size;
  const maxBytes = 400 * 1024;
  if (sizeBytes > maxBytes) {
    console.error(
      `[check-assets] ERROR: Image "/images/${fileName}" is ${(sizeBytes / 1024).toFixed(1)}KB, exceeding the 400KB limit.`
    );
    hasErrors = true;
  }
}

// 2. Validate every referenced /images/... path exists with exact case match in /public/images
for (const [refPath, info] of referencedPaths.entries()) {
  if (!actualFilesInPublicImages.has(info.fileName)) {
    console.error(
      `[check-assets] ERROR: Referenced asset "${refPath}" does not exist in /public/images (referenced in: ${info.sources.join(', ')})`
    );
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('[check-assets] Asset verification FAILED.');
  process.exit(1);
}

console.log(
  `[check-assets] Verified ${referencedPaths.size} referenced /images/* paths and ${actualFilesInPublicImages.size} files in /public/images (all exact-case & < 400KB).`
);
