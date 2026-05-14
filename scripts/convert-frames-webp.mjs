import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const FRAMES_DIR = join(__dirname, "../public/frames");
const QUALITY = 82;
const CONCURRENCY = 12;

const files = (await readdir(FRAMES_DIR)).filter(f => f.endsWith(".jpg"));
console.log(`Converting ${files.length} frames to WebP (quality ${QUALITY})…`);

let done = 0;
const start = Date.now();

async function convert(file) {
  const src = join(FRAMES_DIR, file);
  const dest = join(FRAMES_DIR, file.replace(".jpg", ".webp"));
  await sharp(src).webp({ quality: QUALITY, effort: 4 }).toFile(dest);
  done += 1;
  if (done % 100 === 0 || done === files.length) {
    const pct = ((done / files.length) * 100).toFixed(0);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    process.stdout.write(`\r  ${pct}% (${done}/${files.length}) — ${elapsed}s`);
  }
}

// Process in batches of CONCURRENCY
for (let i = 0; i < files.length; i += CONCURRENCY) {
  await Promise.all(files.slice(i, i + CONCURRENCY).map(convert));
}

console.log("\n\nDone. Removing source JPGs…");
await Promise.all(files.map(f => unlink(join(FRAMES_DIR, f))));
console.log("All JPGs removed. WebP conversion complete.");
