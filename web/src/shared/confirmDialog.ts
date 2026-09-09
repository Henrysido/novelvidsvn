import { reactive } from 'vue'
import i18n from '@/locales'

export type AppConfirmTone = 'neutral' | 'warning' | 'danger'

export interface AppConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: AppConfirmTone
}

export const appConfirmState = reactive({
  open: false,
  title: '',
  message: '',
  confirmLabel: i18n.global.t('common.confirm'),
  cancelLabel: i18n.global.t('common.cancel'),
  tone: 'danger' as AppConfirmTone,
})

let pendingResolve: ((confirmed: boolean) => void) | undefined

export function resolveAppConfirm(confirmed: boolean) {
  if (!appConfirmState.open) return
  appConfirmState.open = false
  const resolve = pendingResolve
  pendingResolve = undefined
  resolve?.(confirmed)
}

export function appConfirm(options: AppConfirmOptions) {
  if (appConfirmState.open) resolveAppConfirm(false)
  Object.assign(appConfirmState, {
    open: true,
    title: options.title,
    message: options.message || '',
    confirmLabel: options.confirmLabel || i18n.global.t('common.confirm'),
    cancelLabel: options.cancelLabel || i18n.global.t('common.cancel'),
    tone: options.tone || 'danger',
  })
  return new Promise<boolean>(resolve => {
    pendingResolve = resolve
  })
}
