<template>
    <div v-for="yearList in data" :key="yearList[0].frontMatter.date.slice(0, 4)">
        <div class="year">
            {{ yearList[0].frontMatter.date.slice(0, 4) }}
        </div>
        <a
            v-for="article in yearList"
            :key="article.regularPath"
            :href="withBase(article.regularPath)"
            class="posts"
        >
            <div class="post-container">
                <span class="post-dot"></span>
                {{ article.frontMatter.title }}
            </div>
            <div class="date">{{ article.frontMatter.date.slice(5) }}</div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useYearSort } from '../functions.ts'
import type { Post } from '../functions.ts'

const { theme } = useData<{ posts: Post[] }>()
const data = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
.year {
    padding: 28px 0 10px;
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--bt-theme-title);
    font-family: var(--date-font-family), serif;
}
</style>
