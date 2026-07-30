import { createHash } from 'node:crypto'
import { availableParallelism } from 'node:os'
import { parse, relative, resolve } from 'node:path'
import fs from 'fs-extra'
import { globby } from 'globby'
import sharp from 'sharp'
import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const formatOptions = {
    avif: { quality: 50, effort: 4, chromaSubsampling: '4:4:4' },
    webp: { quality: 80 }
} as const

type OutputFormat = keyof typeof formatOptions

type CacheManifest = {
    version: string
    files: Record<string, string>
}

const formats = Object.keys(formatOptions) as OutputFormat[]
const cacheDir = resolve('.cache/optimized-images')
const cacheManifest = resolve(cacheDir, 'manifest.json')
const cacheVersion = createHash('sha256')
    .update(JSON.stringify(formatOptions))
    .digest('hex')

async function loadManifest(): Promise<Record<string, string>> {
    try {
        if (!await fs.pathExists(cacheManifest)) return {}
        const manifest = await fs.readJson(cacheManifest) as Partial<CacheManifest>
        return manifest.version === cacheVersion && manifest.files ? manifest.files : {}
    } catch {
        console.warn('Ignoring an unreadable image optimization cache manifest')
        return {}
    }
}

async function fileHash(path: string): Promise<string> {
    const buffer = await fs.readFile(path)
    return createHash('sha256').update(buffer).digest('hex')
}

async function pMap<T, R>(
    items: readonly T[],
    transform: (item: T) => Promise<R>,
    concurrency: number
): Promise<R[]> {
    const results = new Array<R>(items.length)
    let nextIndex = 0

    async function worker(): Promise<void> {
        const index = nextIndex++
        if (index >= items.length) return
        results[index] = await transform(items[index])
        await worker()
    }

    await Promise.all(
        Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
    )
    return results
}

export function imageOptimizationPlugin(): Plugin {
    let hasOptimized = false

    return {
        name: 'image-optimization',
        enforce: 'post',
        configureServer(server) {
            server.middlewares.use(async (request, response, next) => {
                const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
                const match = pathname.match(/^(\/images\/.+)\.(avif|webp)$/)
                if (!match) return next()

                const [, base, format] = match
                let sourcePath: string | undefined
                for (const extension of ['png', 'jpg', 'jpeg']) {
                    const candidate = resolve('public', `${base.slice(1)}.${extension}`)
                    if (await fs.pathExists(candidate)) {
                        sourcePath = candidate
                        break
                    }
                }
                if (!sourcePath) return next()

                try {
                    const outputFormat = format as OutputFormat
                    const buffer = await sharp(sourcePath)[outputFormat](formatOptions[outputFormat]).toBuffer()
                    response.setHeader('Content-Type', outputFormat === 'avif' ? 'image/avif' : 'image/webp')
                    response.setHeader('Cache-Control', 'no-store')
                    response.end(buffer)
                } catch (error) {
                    next(error)
                }
            })
        },
        resolveId(id) {
            if (/\/images\/.+\.(avif|webp)$/.test(id)) return `\0external:${id}`
        },
        load(id) {
            if (id.startsWith('\0external:')) {
                return `export default ${JSON.stringify(id.slice('\0external:'.length))}`
            }
        },
        async closeBundle() {
            if (hasOptimized) return
            hasOptimized = true

            const distDir = resolve('.vitepress/dist')
            const images = await globby([`${distDir}/images/**/*.{png,jpg,jpeg}`])
            const manifest = await loadManifest()
            const newManifest: Record<string, string> = {}
            await fs.ensureDir(cacheDir)

            const concurrency = Math.max(1, Math.min(availableParallelism(), 8))
            console.log(`Optimizing ${images.length} images with concurrency ${concurrency}...`)

            await pMap(images, async (image) => {
                const key = relative(distDir, image).replaceAll('\\', '/')
                const hash = await fileHash(image)
                newManifest[key] = hash
                const { dir, name } = parse(image)

                for (const format of formats) {
                    const outputPath = resolve(dir, `${name}.${format}`)
                    const cachedPath = resolve(cacheDir, `${key}.${format}`)
                    await fs.ensureDir(parse(cachedPath).dir)

                    if (manifest[key] !== hash || !await fs.pathExists(cachedPath)) {
                        try {
                            await sharp(image)[format](formatOptions[format]).toFile(cachedPath)
                        } catch (error) {
                            throw new Error(`Failed to optimize ${key} as ${format}`, { cause: error })
                        }
                    }

                    await fs.copy(cachedPath, outputPath)
                }
            }, concurrency)

            const updatedManifest: CacheManifest = {
                version: cacheVersion,
                files: newManifest
            }
            await fs.writeJson(cacheManifest, updatedManifest, { spaces: 2 })
        }
    }
}

export function picturePlugin(md: MarkdownIt): void {
    const defaultRender = md.renderer.rules.image!

    md.renderer.rules.image = (tokens, index, options, env, self) => {
        const token = tokens[index]
        const source = token.attrGet('src') ?? ''
        const match = source.match(/^(\/images\/.+)\.(png|jpg|jpeg)$/)
        if (!match) return defaultRender(tokens, index, options, env, self)

        token.attrSet('loading', token.attrGet('loading') ?? 'lazy')
        token.attrSet('decoding', token.attrGet('decoding') ?? 'async')

        const base = md.utils.escapeHtml(match[1])
        const image = defaultRender(tokens, index, options, env, self)
        return `<picture>` +
            `<source srcset="${base}.avif" type="image/avif">` +
            `<source srcset="${base}.webp" type="image/webp">` +
            image +
            `</picture>`
    }
}
