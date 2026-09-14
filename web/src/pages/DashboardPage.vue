<script setup lang="ts">
import { ArrowRight, BookOpen, Trash2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import { appConfirm } from '@/shared/confirmDialog'
import { notice } from '@/shared/notice'
import { projectEntryRoute } from '@/shared/shortDramaProject'
import { fallbackImage } from '@/shared/mediaFallback'
import type { Novel } from '@/types'

const { t } = useI18n()

const novels = ref<Novel[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    novels.value = (await api.novels()).data.items
  } catch (error) {
    notice.error((error as Error).message)
  } finally {
    loading.value = false
  }
}

async function remove(item: Novel) {
  if (!await appConfirm({
    title: t('projects.deleteConfirm', { name: item.name }),
    message: t('projects.deleteWarning'),
    confirmLabel: t('projects.deleteButton'),
    tone: 'danger',
  })) return
  await api.deleteNovel(item.id)
  novels.value = novels.value.filter(value => value.id !== item.id)
}

onMounted(load)
</script>

<template>
  <main class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">{{ $t('projects.eyebrow') }}</span>
        <h1>{{ $t('projects.title') }}</h1>
        <p>{{ $t('projects.desc') }}</p>
      </div>
    </header>

    <div v-if="loading" class="state">{{ $t('projects.loading') }}</div>
    <div v-else-if="novels.length" class="project-grid">
      <RouterLink
        v-for="item in novels"
        :key="item.id"
        :to="projectEntryRoute(item)"
        class="project-card"
      >
        <div class="project-cover">
          <img
            v-if="item.cover"
            :src="item.cover_thumbnail || item.cover"
            :alt="item.name"
            width="320"
            height="480"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            @error="fallbackImage($event, item.cover)"
          >
          <BookOpen v-else :size="34" />
        </div>
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description || $t('projects.noSummary') }}</p>
          <small>{{ item.author || $t('projects.anonymous') }} · {{ $t('projects.chapterCount', { count: item.total_chapters || 0 }) }}</small>
        </div>
        <AppButton
          type="button"
          variant="danger"
          size="sm"
          icon-only
          :aria-label="$t('projects.deleteButton')"
          @click.prevent="remove(item)"
        >
          <Trash2 :size="15" />
        </AppButton>
      </RouterLink>
    </div>
    <div v-else class="empty-state">
      <BookOpen :size="32" />
      <h3>{{ $t('projects.empty') }}</h3>
      <p>{{ $t('projects.emptyHint') }}</p>
      <RouterLink to="/create/short-drama" class="empty-state-action">
        {{ $t('projects.goToCreation') }}
        <ArrowRight :size="15" aria-hidden="true" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.empty-state-action {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 14px;
  border-radius: 11px;
  color: #4c5262;
  background: #fff;
  box-shadow: 0 1px 2px rgb(35 39 55 / 7%), 0 7px 20px rgb(35 39 55 / 5%);
  font-size: 12px;
  font-weight: 620;
  transition: color .16s ease, background-color .16s ease, box-shadow .16s ease;
}
.empty-state-action:hover {
  color: #4f51e8;
  background: #fafaff;
  box-shadow: 0 2px 4px rgb(35 39 55 / 8%), 0 10px 24px rgb(35 39 55 / 7%);
}
.empty-state-action:focus-visible {
  outline: 3px solid rgb(91 92 246 / 20%);
  outline-offset: 2px;
}
</style>
