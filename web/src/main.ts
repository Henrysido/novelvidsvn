import '@fontsource-variable/manrope'
import '@fontsource-variable/noto-sans-sc'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import AppButton from './components/AppButton.vue'
import router from './router'
import { initializeAppTheme } from './shared/appTheme'
import i18n from './locales'
import './styles.css'
import './features/workbench/styles/workbench.css'
import './features/workbench/styles/shengshimedia-workbench.css'
import './app-theme.css'

initializeAppTheme()
createApp(App).component('AppButton', AppButton).use(createPinia()).use(router).use(i18n).mount('#app')
