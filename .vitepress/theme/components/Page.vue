<template>
    <div v-for="article in posts" :key="article.regularPath" class="post-list">
        <div class="post-header">
            <div class="post-title">
                <a :href="withBase(article.regularPath)">{{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p class="describe">{{ article.frontMatter.description }}</p>
        <div class="post-info">
            {{ article.frontMatter.date }}
        </div>
    </div>

    <nav class="pagination" aria-label="Blog pagination">
        <a
            v-for="page in pagesNum"
            :key="page"
            class="link"
            :class="{ active: pageCurrent === page }"
            :aria-current="pageCurrent === page ? 'page' : undefined"
            :href="withBase(page === 1 ? '/blog/' : `/blog/page_${page}.html`)"
        >{{ page }}</a>
    </nav>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../functions.ts'

defineProps<{
    posts: Post[]
    pageCurrent: number
    pagesNum: number
}>()
</script>

<style scoped>
.post-list {
    border-bottom: 1px dashed var(--vp-c-divider-light);
    padding: 14px 0;
}
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--bt-theme-title) !important;
    margin: 0.1rem 0;
}
.post-title a {
    color: var(--bt-theme-title) !important;
}
.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}
.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}
.link {
    display: inline-block;
    width: 26px;
    text-align: center;
    border: 1px var(--vp-c-divider-light) solid;
    border-right: none;
    font-weight: 400;
    border-radius: 20px;
}
.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-c-text-1) !important;
}

@media screen and (max-width: 768px) {
    .post-title {
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }
    .describe {
        margin: 0.5rem 0 1rem;
    }
}
</style>
