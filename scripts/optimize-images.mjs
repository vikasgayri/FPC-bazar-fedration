/**
 * Image pipeline — run after adding/replacing photos:   npm run images
 *
 * For every JPG/PNG under public/images (and the logo) it writes responsive WebP
 * variants to public/images/opt/ and a manifest (src/data/image-manifest.json) with
 * the real width/height, available widths and a tiny blurred preview (LQIP).
 * The <Img> component reads the manifest to serve the right size, reserve the
 * correct aspect ratio and show an instant blur-up placeholder.
 *
 * Originals stay untouched — keep them as the source of truth.
 */
import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { join, relative, dirname, extname } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const PUBLIC = join(ROOT, 'public')
const OUT = join(PUBLIC, 'images', 'opt')
const SOURCES = [join(PUBLIC, 'images'), join(PUBLIC, 'brand')]
const WIDTHS = [480, 960, 1600]
const QUALITY = 74

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (p !== OUT) out.push(...(await walk(p)))
    } else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p)
  }
  return out
}

const manifest = {}
let count = 0
for (const src of (await Promise.all(SOURCES.map(walk))).flat().sort()) {
  const rel = '/' + relative(PUBLIC, src).split('\\').join('/') // e.g. /images/real/x.jpg
  const base = rel.replace(/^\/images\//, '').replace(/^\//, '').replace(extname(rel), '')
  const srcTime = (await stat(src)).mtimeMs
  const meta = await sharp(src).metadata()
  // EXIF orientation 5–8 swaps width/height
  const [width, height] = (meta.orientation ?? 1) >= 5 ? [meta.height, meta.width] : [meta.width, meta.height]
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])].sort((a, b) => a - b)
  for (const w of widths) {
    const dest = join(OUT, `${base}-${w}.webp`)
    await mkdir(dirname(dest), { recursive: true })
    const upToDate = await stat(dest).then((d) => d.mtimeMs >= srcTime).catch(() => false)
    if (!upToDate || process.argv.includes('--force'))
      await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(dest)
  }
  const lqip = await sharp(src).rotate().resize({ width: 24 }).blur(0.6).webp({ quality: 40 }).toBuffer()
  manifest[rel] = {
    w: width,
    h: height,
    v: widths,
    base: `/images/opt/${base}`,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  }
  count++
}
await writeFile(join(ROOT, 'src', 'data', 'image-manifest.json'), JSON.stringify(manifest, null, 0) + '\n')
console.log(`Optimised ${count} images → public/images/opt (manifest: src/data/image-manifest.json)`)
