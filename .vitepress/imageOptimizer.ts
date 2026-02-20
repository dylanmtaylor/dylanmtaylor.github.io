import sharp from 'sharp'
import { globby } from 'globby'
import { resolve, parse, relative } from 'path'
import { createHash } from 'crypto'
import fs from 'fs-extra'
import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const formats = ['avif', 'webp'] as const
const cacheDir = resolve('.cache/optimized-images')
const cacheManifest = resolve(cacheDir, 'manifest.json')

async function loadManifest(): Promise<Record<string, string>> {
    if (await fs.pathExists(cacheManifest)) return fs.readJson(cacheManifest)
    return {}
}

async function fileHash(path: string): Promise<string> {
    const buf = await fs.readFile(path)
    return createHash('md5').update(buf).digest('hex')
}

export function imageOptimizationPlugin(): Plugin {
    return {
        name: 'image-optimization',
        enforce: 'post',
        async closeBundle() {
            const distDir = resolve('.vitepress/dist')
            const images = await globby([`${distDir}/images/**/*.{png,jpg,jpeg}`])
            const manifest = await loadManifest()
            const newManifest: Record<string, string> = {}
            await fs.ensureDir(cacheDir)

            for (const img of images) {
                const key = relative(distDir, img)
                const hash = await fileHash(img)
                newManifest[key] = hash
                const { dir, name } = parse(img)

                for (const fmt of formats) {
                    const outDist = resolve(dir, `${name}.${fmt}`)
                    const cached = resolve(cacheDir, `${key}.${fmt}`)

                    if (manifest[key] === hash && await fs.pathExists(cached)) {
                        await fs.copy(cached, outDist)
                        continue
                    }

                    try {
                        await sharp(img)[fmt]({ quality: 80 }).toFile(outDist)
                        await fs.ensureDir(parse(cached).dir)
                        await fs.copy(outDist, cached)
                        console.log(`Generated ${name}.${fmt}`)
                    } catch {
                        console.warn(`Skipped ${key}: unsupported or corrupt`)
                        break
                    }
                }
            }

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

        const [, base] = match
        return `<picture>` +
            `<source srcset="${base}.avif" type="image/avif">` +
            `<source srcset="${base}.webp" type="image/webp">` +
            `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">` +
            `</picture>`
    }
}
