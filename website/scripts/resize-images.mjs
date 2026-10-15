// Shrinks the site's images so they aren't shipped far larger than they're
// shown. Uses sharp, which is already one of our dependencies.
//
// Usage, from website/:
//   node scripts/resize-images.mjs <max-width> <file-or-folder>... [--quality 80] [--out <folder>]
//
// Examples:
//   node scripts/resize-images.mjs 1920 public/images/team4.jpg
//   node scripts/resize-images.mjs 1000 public/images/Join --out /tmp/join-test
//
// A folder means the .jpg, .jpeg, .png and .webp files directly in it (in any
// letter case; subfolders are skipped). Each image is:
// - turned upright from its EXIF orientation, which is about to be dropped
// - scaled down to at most <max-width> pixels wide, keeping its aspect
//   ratio; a narrower image keeps its size
// - saved in the format its extension names: JPEG (mozjpeg, --quality,
//   default 80), PNG (lossless) or WebP (--quality). A file whose content
//   doesn't match its extension, such as a PNG named .JPG, comes out
//   matching it, so the server's Content-Type is right.
// - stripped of EXIF, XMP and IPTC metadata (camera serial numbers, GPS
//   position...) but keeping its ICC colour profile, so colours don't shift
//
// Files are overwritten in place (git keeps the originals) unless --out is
// given. Every file passed is re-encoded, which loses a little quality each
// time, so pass only the ones that need it and keep full-size originals
// outside public/: everything in public/ is deployed.
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import sharp from 'sharp'

const USAGE =
  'Usage: node scripts/resize-images.mjs <max-width> <file-or-folder>... [--quality 80] [--out <folder>]'
const FORMATS = { '.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp' }
const formatOf = (file) => FORMATS[path.extname(file).toLowerCase()]

let args
try {
  args = parseArgs({
    allowPositionals: true,
    options: { quality: { type: 'string', default: '80' }, out: { type: 'string' } }
  })
} catch (err) {
  console.error(`${err.message}\n${USAGE}`)
  process.exit(1)
}
const [widthArg, ...inputs] = args.positionals
const maxWidth = Number(widthArg)
const quality = Number(args.values.quality)
const outDir = args.values.out
const valid = Number.isInteger(maxWidth) && maxWidth > 0 && inputs.length > 0 &&
  Number.isInteger(quality) && quality >= 1 && quality <= 100
if (!valid) {
  console.error(USAGE)
  process.exit(1)
}

async function listImages (input) {
  if (!(await fs.stat(input)).isDirectory()) {
    if (!formatOf(input)) throw new Error('not a .jpg, .jpeg, .png or .webp file')
    return [input]
  }
  const entries = await fs.readdir(input, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && formatOf(e.name))
    .map((e) => path.join(input, e.name))
    .sort()
}

async function resize (file) {
  // Read it all first: sharp can't write to the file it is reading
  const input = await fs.readFile(file)
  const before = await sharp(input).metadata()
  const image = sharp(input)
    .autoOrient()
    .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
    .keepIccProfile()
  const format = formatOf(file)
  if (format === 'jpeg') {
    // JPEG has no transparency: put any transparent pixels on white, not black
    image.flatten({ background: '#ffffff' }).jpeg({ quality, mozjpeg: true })
  } else if (format === 'png') {
    image.png({ compressionLevel: 9, adaptiveFiltering: true })
  } else {
    image.webp({ quality, effort: 6 })
  }
  const { data, info } = await image.toBuffer({ resolveWithObject: true })
  const target = outDir ? path.join(outDir, path.basename(file)) : file
  await fs.writeFile(target, data)
  console.log(
    `${file}: ${before.format} ${before.width}x${before.height} ${input.length} B -> ` +
    `${info.format} ${info.width}x${info.height} ${data.length} B` +
    (target === file ? '' : ` in ${target}`)
  )
}

if (outDir) await fs.mkdir(outDir, { recursive: true })
for (const input of inputs) {
  let files
  try {
    files = await listImages(input)
  } catch (err) {
    console.error(`${input}: ${err.message}`)
    process.exitCode = 1
    continue
  }
  for (const file of files) {
    try {
      await resize(file)
    } catch (err) {
      console.error(`${file}: ${err.message}`)
      process.exitCode = 1
    }
  }
}
