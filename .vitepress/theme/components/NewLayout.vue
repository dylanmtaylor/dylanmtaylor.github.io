<template>
    <Layout>
        <template #doc-before>
            <div v-if="!$frontmatter.page" class="post-info post-date">
                {{ $frontmatter.date?.substring(0, 10) }}
            </div>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<style scoped>
.post-date {
    padding-top: 20px;
}
</style>
