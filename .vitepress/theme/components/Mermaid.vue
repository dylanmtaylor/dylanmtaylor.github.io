<template>
    <div v-if="svg" class="mermaid" v-html="svg"></div>
    <p v-else-if="error" class="mermaid-error" role="alert">{{ error }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
    graph: string
    id: string
}>()

const { isDark } = useData()
const svg = ref('')
const error = ref('')
let renderSequence = 0
let mermaidPromise: Promise<typeof import('mermaid')['default']> | undefined

function loadMermaid(): Promise<typeof import('mermaid')['default']> {
    mermaidPromise ??= import('mermaid').then(({ default: mermaid }) => mermaid)
    return mermaidPromise
}

async function renderChart(): Promise<void> {
    const sequence = ++renderSequence
    error.value = ''

    try {
        const mermaid = await loadMermaid()
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict',
            theme: isDark.value ? 'dark' : 'default'
        })
        const result = await mermaid.render(
            `${props.id}-${sequence}`,
            decodeURIComponent(props.graph)
        )
        if (sequence === renderSequence) svg.value = result.svg
    } catch (renderError) {
        console.error('Unable to render Mermaid diagram', renderError)
        if (sequence === renderSequence) {
            svg.value = ''
            error.value = 'Unable to render this diagram.'
        }
    }
}

onMounted(() => void renderChart())
watch(isDark, () => void renderChart())
</script>
