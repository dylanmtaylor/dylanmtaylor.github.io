import { join, resolve } from 'node:path'
import fs from 'fs-extra'
import { globby } from 'globby'
import matter from 'gray-matter'
import type { Post } from './functions.ts'

export async function getPosts(pageSize: number): Promise<Post[]> {
    const paths = await globby(['posts/**/*.md'])
    await generatePaginationPages(paths.length, pageSize)

    const posts = await Promise.all(paths.map(async (path): Promise<Post> => {
        const content = await fs.readFile(path, 'utf8')
        const { data } = matter(content)
        const date = convertDate(data.date)

        if (!date) throw new Error(`${path}: frontmatter must contain a valid date`)
        if (typeof data.title !== 'string' || !data.title.trim()) {
            throw new Error(`${path}: frontmatter must contain a title`)
        }

        return {
            frontMatter: {
                date,
                title: data.title,
                description: typeof data.description === 'string' ? data.description : ''
            },
            regularPath: `/${path.replace(/\.md$/, '.html')}`
        }
    }))

    return posts.sort((a, b) => b.frontMatter.date.localeCompare(a.frontMatter.date))
}

async function generatePaginationPages(total: number, pageSize: number): Promise<void> {
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    const blogDir = resolve('blog')
    await fs.ensureDir(blogDir)

    const stalePages = await globby(['page_*.md'], { cwd: blogDir, absolute: true })
    await Promise.all(stalePages.map((path) => fs.remove(path)))
    await fs.remove(join(blogDir, 'index.md'))

    for (let page = 1; page <= pageCount; page++) {
        const title = page === 1 ? 'Blog' : `Page ${page}`
        const content = `
---
page: true
title: ${JSON.stringify(title)}
aside: false
---
<script setup lang="ts">
import Page from "../.vitepress/theme/components/Page.vue"
import { useData } from "vitepress"

const { theme } = useData()
const posts = theme.value.posts.slice(${pageSize * (page - 1)}, ${pageSize * page})
</script>

<Page :posts="posts" :pageCurrent="${page}" :pagesNum="${pageCount}" />

<div style="text-align: center; margin-top: 1rem;">
<a href="/blog/archives">Browse all posts by date →</a>
</div>
`.trim()

        await fs.writeFile(join(blogDir, `page_${page}.md`), content)
    }

    await fs.move(join(blogDir, 'page_1.md'), join(blogDir, 'index.md'), { overwrite: true })
}

function convertDate(value: unknown): string | undefined {
    const text = String(value ?? '')
    const isoDate = text.match(/(\d{4})-(\d{2})-(\d{2})/)
    if (isoDate) return isoDate[0]

    const date = new Date(text)
    if (Number.isNaN(date.getTime())) return undefined
    return date.toISOString().slice(0, 10)
}
