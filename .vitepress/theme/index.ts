import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Page from './components/Page.vue'
import Mermaid from './components/Mermaid.vue'

import './custom.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app }) {
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Mermaid', Mermaid)
    }
} satisfies Theme
