<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, Globe } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import AppButton from './AppButton.vue'
import { type AppLocale, setLocale } from '@/locales'

withDefaults(defineProps<{
  placement?: 'floating' | 'sidebar'
}>(), {
  placement: 'floating',
})

const { locale, t } = useI18n()
const open = ref(false)

const options = computed<Array<{ value: AppLocale; label: string; description: string }>>(() => [
  { value: 'vi-VN', label: t('lang.vi'), description: t('lang.viDesc') },
  { value: 'zh-CN', label: t('lang.zh'), description: t('lang.zhDesc') },
])

const activeOption = computed(() => options.value.find(option => option.value === (locale.value as AppLocale)) ?? options.value[0])
const activeLabel = computed(() => activeOption.value.label)

function select(preference: AppLocale) {
  setLocale(preference)
  open.value = false
}
</script>

<template>
  <div class="app-lang-toggle" :class="`is-${placement}`" @keydown.esc="open = false">
    <AppButton
      class="app-lang-toggle__trigger"
      variant="secondary"
      size="sm"
      :icon-only="placement === 'floating'"
      :aria-label="`${t('nav.language')}: ${activeLabel}`"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      <Globe :size="17" />
      <span v-if="placement === 'sidebar'" class="app-lang-toggle__label">
        <span>{{ t('nav.language') }}</span>
        <small>{{ activeLabel }}</small>
      </span>
    </AppButton>
    <div v-if="open" class="app-lang-toggle__menu" role="menu" :aria-label="t('lang.title')">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="menuitemradio"
        :aria-checked="(locale as string) === option.value"
        @click="select(option.value)"
      >
        <Globe :size="16" />
        <span><strong>{{ option.label }}</strong><small>{{ option.description }}</small></span>
        <Check v-if="(locale as string) === option.value" :size="15" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-lang-toggle { position: fixed; right: 68px; bottom: 18px; z-index: 110; }
.app-lang-toggle__trigger { min-width: 42px; min-height: 42px; border-radius: 12px; color: var(--app-text-secondary); background: var(--app-surface-raised); box-shadow: inset 0 0 0 1px var(--app-border),0 10px 28px rgb(22 24 34 / 14%); backdrop-filter: blur(14px); }
.app-lang-toggle__trigger:hover { color: var(--app-accent); background: var(--app-surface-hover); }
.app-lang-toggle__menu { position: absolute; right: 0; bottom: 46px; display: grid; width: 228px; gap: 4px; padding: 6px; border: 1px solid var(--app-border); border-radius: 14px; color: var(--app-text); background: color-mix(in srgb,var(--app-surface-raised) 94%,transparent); box-shadow: 0 20px 56px rgb(18 20 29 / 22%); backdrop-filter: blur(18px); }
.app-lang-toggle__menu > button { display: grid; min-height: 52px; grid-template-columns: 28px minmax(0,1fr) 18px; align-items: center; gap: 8px; padding: 7px 9px; border-radius: 9px; color: var(--app-text-secondary); background: transparent; cursor: pointer; text-align: left; }
.app-lang-toggle__menu > button:hover { color: var(--app-text); background: var(--app-surface-hover); }
.app-lang-toggle__menu > button[aria-checked='true'] { color: var(--app-accent); background: var(--app-accent-soft); }
.app-lang-toggle__menu > button > span { display: grid; gap: 3px; }
.app-lang-toggle__menu strong { color: inherit; font-size: 11px; }
.app-lang-toggle__menu small { color: var(--app-text-muted); font-size: 9px; font-weight: 450; }
.app-lang-toggle__menu > button > svg:last-child { justify-self: end; }
.app-lang-toggle.is-sidebar { position: relative; right: auto; bottom: auto; z-index: 1; margin: 0 8px 6px; }
.app-lang-toggle.is-sidebar .app-lang-toggle__trigger { width: 100%; min-height: 44px; justify-content: flex-start; gap: 10px; padding: 0 12px; border-radius: 10px; box-shadow: inset 0 0 0 1px var(--app-border); backdrop-filter: none; }
.app-lang-toggle__label { display: flex; min-width: 0; flex: 1; align-items: center; justify-content: space-between; gap: 8px; font-size: 13px; }
.app-lang-toggle__label small { overflow: hidden; color: var(--app-text-muted); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
.app-lang-toggle.is-sidebar .app-lang-toggle__menu { right: auto; bottom: 52px; left: 0; }
@media (max-width: 720px) { .app-lang-toggle { right: 62px; bottom: 12px; }.app-lang-toggle__menu { width: min(228px,calc(100vw - 24px)); } }
@media (max-width: 720px) {
  .app-lang-toggle.is-sidebar { margin-right: 8px; margin-left: 8px; }
  .app-lang-toggle.is-sidebar .app-lang-toggle__trigger { justify-content: center; padding: 0; }
  .app-lang-toggle.is-sidebar .app-lang-toggle__label { display: none; }
  .app-lang-toggle.is-sidebar .app-lang-toggle__menu { position: fixed; right: 12px; bottom: 12px; left: 80px; width: auto; }
}
</style>
