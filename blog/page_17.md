---
page: true
title: page_17
aside: false
---
<script setup>
import Page from "../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(160,170)
</script>
<Page :posts="posts" :pageCurrent="17" :pagesNum="17" />