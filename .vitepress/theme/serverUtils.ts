import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs-extra'
import { resolve } from 'path'

async function getPosts(pageSize: number) {
    let paths = await globby(['posts/**.md'])

    await generatePaginationPages(paths.length, pageSize)

    let posts = await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, 'utf-8')
            const { data } = matter(content)
            data.date = _convertDate(data.date)
            return {
                frontMatter: data,
                regularPath: `/${item.replace('.md', '.html')}`
            }
        })
    )
    posts.sort((a, b) => a.frontMatter.date < b.frontMatter.date ? 1 : -1)
    return posts
}

async function generatePaginationPages(total: number, pageSize: number) {
    let pagesNum = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    const paths = resolve('./')
    if (total > 0) {
        for (let i = 1; i < pagesNum + 1; i++) {
            const page = `
---
page: true
title: ${i === 1 ? 'Blog' : 'Page ' + i}
aside: false
---
<script setup>
import Page from "../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />

<div style="text-align: center; margin-top: 1rem;">
<a href="/blog/archives">Browse all posts by date →</a>
</div>
`.trim()
            const file = paths + `/blog/page_${i}.md`
            await fs.writeFile(file, page)
        }
    }
    // blog homepage
    await fs.move(paths + '/blog/page_1.md', paths + '/blog/index.md', { overwrite: true })
}

function _convertDate(date = new Date().toString()): string {
    const str = String(date)
    const match = str.match(/(\d{4})-(\d{2})-(\d{2})/)
    if (match) return match[0]
    const d = new Date(str)
    if (isNaN(d.getTime())) return '1970-01-01'
    return d.toISOString().slice(0, 10)
}

export { getPosts }
