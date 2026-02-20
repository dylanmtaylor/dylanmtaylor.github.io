import sharp from 'sharp'
import { globby } from 'globby'
import { resolve, parse, relative } from 'path'
import { createHash } from 'crypto'
import fs from 'fs-extra'
import os from 'os'
import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const formatOptions = {
    avif: { quality: 50, effort: 4, chromaSubsampling: '4:4:4' },
    webp: { quality: 80 }
} as const
const formats = Object.keys(formatOptions) as (keyof typeof formatOptions)[]
const cacheDir = resolve('.cache/optimized-images')
const cacheManifest = resolve(cacheDir, 'manifest.json')

let validFormats: Record<string, Set<string>> = {}

async function loadManifest(): Promise<Record<string, string>> {
    if (await fs.pathExists(cacheManifest)) return fs.readJson(cacheManifest)
    return {}
}

async function fileHash(path: string): Promise<string> {
    const buf = await fs.readFile(path)
    return createHash('md5').update(buf).digest('hex')
}

async function pMap<T, R>(items: T[], fn: (item: T) => Promise<R>, concurrency: number): Promise<R[]> {
    const results: R[] = []
    let i = 0
    async function next(): Promise<void> {
        const idx = i++
        if (idx >= items.length) return
        results[idx] = await fn(items[idx])
        return next()
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => next()))
    return results
}

export function imageOptimizationPlugin(): Plugin {
    return {
        name: 'image-optimization',
        enforce: 'post',
        // Serve AVIF/WebP on-demand during dev
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const match = req.url?.match(/^(\/images\/.+)\.(avif|webp)$/)
                if (!match) return next()
                const [, base, fmt] = match
                const exts = ['png', 'jpg', 'jpeg']
                let srcPath: string | undefined
                for (const ext of exts) {
                    const p = resolve('public', `${base.slice(1)}.${ext}`)
                    if (await fs.pathExists(p)) { srcPath = p; break }
                }
                if (!srcPath) return next()
                try {
                    const buf = await sharp(srcPath)[fmt as 'avif' | 'webp'](formatOptions[fmt as keyof typeof formatOptions]).toBuffer()
                    res.setHeader('Content-Type', fmt === 'avif' ? 'image/avif' : 'image/webp')
                    res.end(buf)
                } catch { next() }
            })
        },
        // Prevent Rollup/SSR from resolving generated avif/webp paths
        resolveId(id) {
            if (/\/images\/.+\.(avif|webp)$/.test(id)) return `\0external:${id}`
        },
        load(id) {
            if (id.startsWith('\0external:')) return `export default "${id.slice('\0external:'.length)}"`
        },
        async closeBundle() {
            const distDir = resolve('.vitepress/dist')
            const images = await globby([`${distDir}/images/**/*.{png,jpg,jpeg}`])
            const manifest = await loadManifest()
            const newManifest: Record<string, string> = {}
            await fs.ensureDir(cacheDir)

            const concurrency = Math.max(os.cpus().length, 4)
            console.log(`Optimizing ${images.length} images with concurrency ${concurrency}...`)

            await pMap(images, async (img) => {
                const key = relative(distDir, img)
                const hash = await fileHash(img)
                newManifest[key] = hash
                const { dir, name } = parse(img)
                const origSize = (await fs.stat(img)).size
                if (!validFormats[key]) validFormats[key] = new Set()

                for (const fmt of formats) {
                    const outDist = resolve(dir, `${name}.${fmt}`)
                    const cached = resolve(cacheDir, `${key}.${fmt}`)

                    if (manifest[key] === hash && await fs.pathExists(cached)) {
                        const cachedSize = (await fs.stat(cached)).size
                        if (cachedSize < origSize) {
                            await fs.copy(cached, outDist)
                            validFormats[key].add(fmt)
                        }
                        continue
                    }

                    try {
                        await sharp(img)[fmt](formatOptions[fmt]).toFile(outDist)
                        const newSize = (await fs.stat(outDist)).size
                        await fs.ensureDir(parse(cached).dir)

                        if (newSize < origSize) {
                            await fs.copy(outDist, cached)
                            validFormats[key].add(fmt)
                            console.log(`Generated ${name}.${fmt} (${Math.round((1 - newSize / origSize) * 100)}% smaller)`)
                        } else {
                            await fs.remove(outDist)
                            console.log(`Skipped ${name}.${fmt} (larger than original)`)
                        }
                    } catch {
                        console.warn(`Skipped ${key}: unsupported or corrupt`)
                        break
                    }
                }
            }, concurrency)

            await fs.writeJson(cacheManifest, newManifest)
        }
    }
}

export function picturePlugin(md: MarkdownIt) {
    const defaultRender = md.renderer.rules.image!

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const src = token.attrGet('src') || ''
        const alt = token.content || ''

        const match = src.match(/^(\/images\/.+)\.(png|jpg|jpeg)$/)
        if (!match) return defaultRender(tokens, idx, options, env, self)

        const [, base, ext] = match
        const key = `images${base.slice('/images'.length)}.${ext}`

        // always include both sources — browser will fall back to img if file is missing
        // but at build time, only files smaller than the original are kept in dist
        return `<picture>` +
            `<source srcset="${base}.avif" type="image/avif">` +
            `<source srcset="${base}.webp" type="image/webp">` +
            `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">` +
            `</picture>`
    }
}
