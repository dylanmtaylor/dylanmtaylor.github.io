---
page: true
title: Blog
aside: false
---
<script setup>
import Page from "../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(0,10)
</script>
<Page :posts="posts" :pageCurrent="1" :pagesNum="6" />

<div style="text-align: center; margin-top: 1rem;">
<a href="/blog/archives">Browse all posts by date →</a>
</div>