// Stops the build if a photo still carries embedded metadata (EXIF, XMP, IPTC): camera serial number, capture
// dates, GPS, editing history. The site publishes the original files as well as resized copies, so anything left
// in a source photo would be public.
//
//   node scripts/check-photo-metadata.mjs           check only (runs before every build)
//   node scripts/check-photo-metadata.mjs --strip   remove the metadata from JPEGs in place (pixels and the colour
//                                                   profile are untouched), then check
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const FOLDERS = ["photography/locations", "src/assets/images"];
const strip = process.argv.includes("--strip");

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

// JPEG: metadata lives in APP1 (EXIF, XMP), APP13 (IPTC/Photoshop) and COM segments before the image data.
const JPEG_META = { 0xe1: "EXIF/XMP", 0xed: "IPTC", 0xfe: "comment" };
function jpeg(buf) {
  const found = new Set();
  const kept = [buf.subarray(0, 2)];
  let i = 2;
  while (i + 4 <= buf.length && buf[i] === 0xff) {
    const marker = buf[i + 1];
    if (marker === 0xda) break; // image data starts here
    const end = i + 2 + buf.readUInt16BE(i + 2);
    if (JPEG_META[marker]) found.add(JPEG_META[marker]);
    else kept.push(buf.subarray(i, end));
    i = end;
  }
  kept.push(buf.subarray(i));
  return { found: [...found], clean: Buffer.concat(kept) };
}

// PNG: eXIf plus text chunks (XMP is stored in iTXt).
function png(buf) {
  const found = new Set();
  for (let i = 8; i + 8 <= buf.length; ) {
    const type = buf.toString("latin1", i + 4, i + 8);
    if (["eXIf", "iTXt", "tEXt", "zTXt"].includes(type)) found.add(type);
    i += 12 + buf.readUInt32BE(i);
  }
  return { found: [...found] };
}

// WebP: RIFF chunks named "EXIF" and "XMP ".
function webp(buf) {
  const found = new Set();
  for (let i = 12; i + 8 <= buf.length; ) {
    const type = buf.toString("latin1", i, i + 4);
    if (type === "EXIF" || type === "XMP ") found.add(type.trim());
    const size = buf.readUInt32LE(i + 4);
    i += 8 + size + (size % 2);
  }
  return { found: [...found] };
}

const readers = { ".jpg": jpeg, ".jpeg": jpeg, ".png": png, ".webp": webp };
const problems = [];
let checked = 0;

for (const folder of FOLDERS) {
  for (const file of walk(join(root, folder))) {
    const read = readers[extname(file).toLowerCase()];
    if (!read) continue;
    checked++;
    const name = relative(root, file);
    let result = read(readFileSync(file));
    if (result.found.length && strip && result.clean) {
      writeFileSync(file, result.clean);
      console.log(`Stripped ${result.found.join(", ")} from ${name}`);
      result = read(readFileSync(file));
    }
    if (result.found.length) problems.push({ name, found: result.found, fixable: Boolean(result.clean) });
  }
}

if (problems.length) {
  console.error("\nThese photos still carry embedded metadata, which would be published with them:\n");
  for (const p of problems) console.error(`  ${p.name}  (${p.found.join(", ")})`);
  console.error(
    problems.every((p) => p.fixable)
      ? "\nFix: run `npm run strip-photos`, then commit the changed files.\n"
      : "\nFix: run `npm run strip-photos` for the JPEGs; re-export PNG or WebP files with metadata turned off.\n"
  );
  process.exit(1);
}
console.log(`Photo metadata check: ${checked} photos, all clean.`);
