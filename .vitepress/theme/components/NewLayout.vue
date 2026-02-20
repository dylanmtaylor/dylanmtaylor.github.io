<template>
    <Layout>
        <template #doc-before>
            <div style="padding-top:20px;" class='post-info' v-if="!$frontmatter.page">
                {{ $frontmatter.date?.substring(0,10) }}
            </div>
        </template>
    </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>
