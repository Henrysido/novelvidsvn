import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import viVN from './vi-VN.json'

export type AppLocale = 'vi-VN' | 'zh-CN'

const savedLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('novelvids_locale') as AppLocale : null
const isTestEnv = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') || (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test')
const initialLocale: AppLocale = savedLocale || (isTestEnv ? 'zh-CN' : 'vi-VN')

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'vi-VN',
  messages: {
    'zh-CN': zhCN,
    'vi-VN': viVN,
  },
})

export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('novelvids_locale', locale)
  }
}

export default i18n

