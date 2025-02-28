---
page: true
title: page_15
aside: false
---
<script setup>
import Page from "../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(140,150)
</script>
<Page :posts="posts" :pageCurrent="15" :pagesNum="17" />