---
page: true
title: page_14
aside: false
---
<script setup>
import Page from "../.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(130,140)
</script>
<Page :posts="posts" :pageCurrent="14" :pagesNum="17" />