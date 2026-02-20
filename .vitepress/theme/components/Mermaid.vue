<template>
  <div v-html="svg" class="mermaid"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import mermaid from "mermaid";

const props = defineProps({
  graph: { type: String, required: true },
  id: { type: String, required: true },
});

const svg = ref(null);
let mut = null;

onMounted(async () => {
  mermaid.initialize({ startOnLoad: false });
  mut = new MutationObserver(() => renderChart());
  mut.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  await renderChart();
});

onUnmounted(() => mut?.disconnect());

const renderChart = async () => {
  const hasDark = document.documentElement.classList.contains("dark");
  mermaid.initialize({
    startOnLoad: false,
    theme: hasDark ? "dark" : "default",
  });
  const { svg: code } = await mermaid.render(props.id, decodeURIComponent(props.graph));
  svg.value = code + `<span style="display:none">${Math.random()}</span>`;
};
</script>
