<script setup lang="ts">
import { ArrowLeft, FileText, Plus, Scissors, Trash2, X } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import { appConfirm } from '@/shared/confirmDialog'
import { notice } from '@/shared/notice'
import type { Chapter, Novel } from '@/types'

const { t } = useI18n()
const route = useRoute(); const id = Number(route.params.id); const novel = ref<Novel | null>(null); const chapters = ref<Chapter[]>([]); const showCreate = ref(false); const form = ref({ number: 1, name: '', content: '' }); const splitting = ref(false)
async function load() { try { const [a, b] = await Promise.all([api.novel(id), api.chapters(id)]); novel.value = a.data; chapters.value = b.data.items; form.value.number = Math.max(0, ...chapters.value.map(item => item.number)) + 1 } catch (error) { notice.error((error as Error).message) } }
async function create() { await api.createChapter({ ...form.value, novel_id: id }); showCreate.value = false; await load(); notice.success(t('novel.toastCreated')) }
async function split() { splitting.value = true; try { await api.splitNovel(id); await load(); notice.success(t('novel.toastSplitDone')) } catch (error) { notice.error((error as Error).message) } finally { splitting.value = false } }
async function remove(item: Chapter) {
  if (!await appConfirm({
    title: t('novel.deleteConfirm', { number: item.number }),
    message: t('novel.deleteWarning'),
    confirmLabel: t('novel.deleteChapter'),
    tone: 'danger',
  })) return
  await api.deleteChapter(item.id)
  await load()
}
onMounted(load)
</script>
<template><main class="page"><header class="page-header"><div class="title-with-back"><RouterLink to="/projects" class="icon-button"><ArrowLeft :size="18" /></RouterLink><div><span class="eyebrow">{{ $t('novel.eyebrow') }}</span><h1>{{ novel?.name || $t('novel.loading') }}</h1><p>{{ novel?.description || $t('novel.desc') }}</p></div></div><div class="header-actions"><AppButton v-if="novel?.content" variant="secondary" :disabled="splitting" @click="split"><Scissors :size="15" />{{ splitting ? $t('novel.splitting') : $t('novel.smartSplit') }}</AppButton><AppButton variant="primary" @click="showCreate = true"><Plus :size="15" />{{ $t('novel.newChapter') }}</AppButton></div></header><div class="chapter-list"><RouterLink v-for="item in chapters" :key="item.id" :to="`/novel/${id}/chapter/${item.id}/step/1`" class="chapter-row"><span class="chapter-number">{{ String(item.number).padStart(2, '0') }}</span><div><h3>{{ item.name }}</h3><p>{{ item.content || $t('novel.noContent') }}</p></div><span class="chapter-enter">{{ $t('novel.enterProduction') }}</span><AppButton type="button" variant="danger" size="sm" icon-only :aria-label="$t('novel.deleteChapter')" @click.prevent="remove(item)"><Trash2 :size="15" /></AppButton></RouterLink></div><div v-if="!chapters.length" class="empty-state"><FileText :size="30" /><h3>{{ $t('novel.empty') }}</h3><AppButton variant="secondary" @click="showCreate = true">{{ $t('novel.addChapter') }}</AppButton></div><div v-if="showCreate" class="modal-backdrop" @click.self="showCreate = false"><form class="modal" @submit.prevent="create"><header><h2>{{ $t('novel.newChapter') }}</h2><AppButton type="button" variant="ghost" size="sm" icon-only @click="showCreate = false"><X :size="18" /></AppButton></header><label>{{ $t('novel.chapterNumber') }}<input v-model.number="form.number" type="number" min="1"></label><label>{{ $t('novel.chapterName') }}<input v-model="form.name" required></label><label>{{ $t('novel.chapterContent') }}<textarea v-model="form.content" rows="12" /></label><footer><AppButton type="button" variant="secondary" @click="showCreate = false">{{ $t('common.cancel') }}</AppButton><AppButton type="submit" variant="primary">{{ $t('novel.createChapter') }}</AppButton></footer></form></div></main></template>
