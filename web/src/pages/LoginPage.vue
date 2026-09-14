<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../features/auth/authStore'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const submitting = ref(false)

async function submit() {
  if (!username.value.trim() || !password.value) {
    errorMessage.value = t('login.errorEmpty')
    return
  }
  submitting.value = true
  errorMessage.value = ''
  try {
    await auth.login(username.value.trim(), password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('login.errorFailed')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <form class="login-card" @submit.prevent="submit">
      <img class="login-logo" src="/logo.png" :alt="$t('nav.brandName')" />
      <h1>{{ $t('login.title') }}</h1>
      <p class="login-subtitle">{{ $t('login.subtitle') }}</p>
      <label class="login-field">
        <span>{{ $t('login.username') }}</span>
        <input v-model="username" type="text" autocomplete="username" :placeholder="$t('login.usernamePlaceholder')" />
      </label>
      <label class="login-field">
        <span>{{ $t('login.password') }}</span>
        <input v-model="password" type="password" autocomplete="current-password" :placeholder="$t('login.passwordPlaceholder')" />
      </label>
      <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>
      <button class="login-submit" type="submit" :disabled="submitting">
        {{ submitting ? $t('login.submitting') : $t('login.submit') }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--app-canvas, #090812);
  background-image:
    radial-gradient(ellipse at center, rgba(168, 85, 247, 0.16), transparent 60%),
    var(--creation-bg-image, none);
  background-position: center;
  background-size: cover;
}
.login-card {
  width: 100%;
  max-width: 380px;
  background: var(--app-surface-raised, #131022);
  border: 1px solid var(--app-border, #2c254c);
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(168, 85, 247, 0.15);
  backdrop-filter: blur(16px);
}
.login-logo {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  align-self: center;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
}
.login-card h1 {
  margin: 0;
  font-size: 20px;
  text-align: center;
  color: var(--app-text, #303442);
}
.login-subtitle {
  margin: -6px 0 6px;
  text-align: center;
  font-size: 13px;
  color: var(--app-text-muted, #9398a8);
}
.login-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--app-text-muted, #9398a8);
}
.login-field input {
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--app-border, #e3e5ec);
  border-radius: 10px;
  background: var(--app-canvas, #f8f9fc);
  color: var(--app-text, #303442);
  font-size: 14px;
  outline: none;
}
.login-field input:focus {
  border-color: var(--app-accent, #a855f7);
  box-shadow: 0 0 0 3px var(--app-accent-soft, rgba(168, 85, 247, 0.16));
}
.login-error {
  margin: 0;
  font-size: 13px;
  color: var(--app-danger, #dc2626);
}
.login-submit {
  margin-top: 6px;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 8px 22px rgba(124, 58, 237, 0.35);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.login-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(124, 58, 237, 0.45);
}
.login-submit:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
