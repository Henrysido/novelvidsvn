<script setup lang="ts">
import {
  AudioLines,
  Box,
  ClipboardPaste,
  Copy,
  Film,
  Image,
  ImageUp,
  LayoutGrid,
  Palette,
  Play,
  Plus,
  Redo2,
  StickyNote,
  Trash2,
  Undo2,
  Video,
  X,
} from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WorkbenchRunState } from '../execution/workbenchCapabilities'

const { locale } = useI18n()
const isVi = computed(() => locale.value === 'vi-VN')

const props = defineProps<{
  running?: boolean
  canUndo?: boolean
  canRedo?: boolean
  hasSelection?: boolean
  canCopy?: boolean
  canPaste?: boolean
  canCreateSection?: boolean
  runState: WorkbenchRunState
  watermarkEnabled?: boolean
  composerEnabled?: boolean
}>()

const emit = defineEmits<{
  addAsset: []
  addShot: []
  addNote: []
  addWatermark: []
  addComposer: []
  uploadImage: [file: File]
  uploadVideo: [file: File]
  uploadAudio: [file: File]
  createSection: []
  runSelected: []
  deleteSelection: []
  copy: []
  paste: []
  undo: []
  redo: []
  'auto-arrange': []
}>()

const imageInput = ref<HTMLInputElement | null>(null)
const videoInput = ref<HTMLInputElement | null>(null)
const audioInput = ref<HTMLInputElement | null>(null)
const addMenuRoot = ref<HTMLElement | null>(null)
const addMenuTrigger = ref<HTMLButtonElement | null>(null)
const addMenuOpen = ref(false)

function closeAddMenu({ restoreFocus = false } = {}) {
  addMenuOpen.value = false
  if (restoreFocus) void nextTick(() => addMenuTrigger.value?.focus())
}

function toggleAddMenu() {
  addMenuOpen.value = !addMenuOpen.value
  if (addMenuOpen.value) {
    void nextTick(() => addMenuRoot.value?.querySelector<HTMLElement>('[role="menuitem"]')?.focus())
  }
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (addMenuOpen.value && !addMenuRoot.value?.contains(event.target as Node)) closeAddMenu()
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (addMenuOpen.value && event.key === 'Escape') {
    event.preventDefault()
    closeAddMenu({ restoreFocus: true })
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  document.removeEventListener('keydown', handleDocumentKeydown)
})

function addNode(event: 'addAsset' | 'addShot' | 'addNote' | 'addWatermark' | 'addComposer') {
  closeAddMenu()
  if (event === 'addAsset') emit('addAsset')
  if (event === 'addShot') emit('addShot')
  if (event === 'addNote') emit('addNote')
  if (event === 'addWatermark') emit('addWatermark')
  if (event === 'addComposer') emit('addComposer')
}

function chooseFiles(input: HTMLInputElement | null) {
  closeAddMenu()
  input?.click()
}

function emitFiles(kind: 'image' | 'video' | 'audio', event: Event) {
  const input = event.target as HTMLInputElement
  const files = [...(input.files ?? [])]
  input.value = ''
  for (const file of files) {
    if (kind === 'image') emit('uploadImage', file)
    if (kind === 'video') emit('uploadVideo', file)
    if (kind === 'audio') emit('uploadAudio', file)
  }
}
</script>

<template>
  <div class="workbench-toolbar nodrag nowheel" role="toolbar" :aria-label="isVi ? 'Thanh công cụ Canvas' : '画布工具栏'" @pointerdown.stop @click.stop @wheel.stop>
    <div ref="addMenuRoot" class="workbench-toolbar__add">
      <button
        ref="addMenuTrigger"
        class="workbench-toolbar__add-trigger"
        :class="{ 'is-open': addMenuOpen }"
        type="button"
        aria-haspopup="menu"
        :aria-expanded="addMenuOpen"
        aria-controls="workbench-add-node-menu"
        :aria-label="addMenuOpen ? (isVi ? 'Đóng menu thêm node' : '关闭添加节点菜单') : (isVi ? 'Thêm node' : '添加节点')"
        :title="addMenuOpen ? (isVi ? 'Đóng menu thêm node' : '关闭添加节点菜单') : (isVi ? 'Thêm node' : '添加节点')"
        @click="toggleAddMenu"
      >
        <X v-if="addMenuOpen" :size="20" aria-hidden="true" />
        <Plus v-else :size="21" aria-hidden="true" />
      </button>

      <Transition name="workbench-add-menu">
        <div v-if="addMenuOpen" id="workbench-add-node-menu" class="workbench-add-menu" role="menu" :aria-label="isVi ? 'Menu thêm node' : '添加节点菜单'">
          <p class="workbench-add-menu__heading">{{ isVi ? 'Thêm node' : '添加节点' }}</p>
          <button type="button" role="menuitem" :aria-label="isVi ? 'Thêm tài sản' : '新增资产'" @click="addNode('addAsset')">
            <Box :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Tài sản' : '资产' }}</span>
          </button>
          <button type="button" role="menuitem" :aria-label="isVi ? 'Thêm video' : '新增视频'" @click="addNode('addShot')">
            <Video :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Video' : '视频' }}</span>
          </button>
          <button type="button" role="menuitem" :aria-label="isVi ? 'Thêm ghi chú' : '新增便签'" @click="addNode('addNote')">
            <StickyNote :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Ghi chú' : '便签' }}</span>
          </button>
          <button v-if="watermarkEnabled" type="button" role="menuitem" :aria-label="isVi ? 'Thêm watermark' : '新增水印'" @click="addNode('addWatermark')">
            <Image :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Watermark' : '水印' }}</span>
          </button>
          <button v-if="composerEnabled" type="button" role="menuitem" :aria-label="isVi ? 'Thêm trình ghép video' : '新增视频合成器'" @click="addNode('addComposer')">
            <Film :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Trình ghép video' : '视频合成器' }}</span>
          </button>

          <p class="workbench-add-menu__heading workbench-add-menu__heading--resources">{{ isVi ? 'Thêm tài nguyên' : '添加资源' }}</p>
          <button type="button" role="menuitem" @click="chooseFiles(imageInput)">
            <ImageUp :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Tải lên hình ảnh' : '上传图片' }}</span>
          </button>
          <button type="button" role="menuitem" @click="chooseFiles(videoInput)">
            <Video :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Tải lên video' : '上传视频' }}</span>
          </button>
          <button type="button" role="menuitem" @click="chooseFiles(audioInput)">
            <AudioLines :size="18" aria-hidden="true" />
            <span>{{ isVi ? 'Tải lên âm thanh' : '上传音频' }}</span>
          </button>
        </div>
      </Transition>
    </div>

    <input ref="imageInput" class="workbench-toolbar__file-input" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple :aria-label="isVi ? 'Chọn tệp hình ảnh để tải lên' : '选择上传图片文件'" @change="emitFiles('image', $event)">
    <input ref="videoInput" class="workbench-toolbar__file-input" type="file" accept="video/mp4,video/quicktime,.mp4,.mov" multiple :aria-label="isVi ? 'Chọn tệp video để tải lên' : '选择上传视频文件'" @change="emitFiles('video', $event)">
    <input ref="audioInput" class="workbench-toolbar__file-input" type="file" accept="audio/wav,audio/x-wav,audio/mpeg,.wav,.mp3" multiple :aria-label="isVi ? 'Chọn tệp âm thanh để tải lên' : '选择上传音频文件'" @change="emitFiles('audio', $event)">

    <div class="workbench-toolbar__scroll" tabindex="0" role="group" :aria-label="isVi ? 'Công cụ chỉnh sửa và node canvas, có thể cuộn ngang' : '画布节点与编辑工具，可横向滚动'">
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Tạo phân vùng nền cho các node đã chọn' : '为所选节点添加背景分区'" :title="isVi ? 'Thêm phân vùng nền sau khi chọn nhiều node' : '多选节点后添加背景分区'" :disabled="running || !canCreateSection" @click="$emit('createSection')">
        <Palette :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Tự động sắp xếp bố cục' : '自动整理布局'" :title="isVi ? 'Sắp xếp theo thứ tự liên kết và tự động dãn cách' : '按连接关系分列并自动避让'" :disabled="running" @click="$emit('auto-arrange')">
        <LayoutGrid :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Xóa mục đã chọn' : '删除所选'" :title="isVi ? 'Xóa mục đã chọn (Delete)' : '删除所选（Delete）'" :disabled="running || !hasSelection" @click="$emit('deleteSelection')">
        <Trash2 :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Sao chép mục đã chọn' : '复制所选'" :title="isVi ? 'Sao chép (Ctrl/Cmd+C)' : '复制所选（Ctrl/Cmd+C）'" :disabled="running || !canCopy" @click="$emit('copy')">
        <Copy :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Dán' : '粘贴'" :title="isVi ? 'Dán (Ctrl/Cmd+V)' : '粘贴（Ctrl/Cmd+V）'" :disabled="running || !canPaste" @click="$emit('paste')">
        <ClipboardPaste :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Hoàn tác' : '撤销'" :title="isVi ? 'Hoàn tác (Ctrl/Cmd+Z)' : '撤销（Ctrl/Cmd+Z）'" :disabled="running || !canUndo" @click="$emit('undo')">
        <Undo2 :size="16" aria-hidden="true" />
      </button>
      <button class="workbench-toolbar__button workbench-toolbar__button--icon" type="button" :aria-label="isVi ? 'Làm lại' : '重做'" :title="isVi ? 'Làm lại (Ctrl/Cmd+Shift+Z)' : '重做（Ctrl/Cmd+Shift+Z）'" :disabled="running || !canRedo" @click="$emit('redo')">
        <Redo2 :size="16" aria-hidden="true" />
      </button>
    </div>

    <button
      class="workbench-toolbar__button workbench-toolbar__button--primary"
      type="button"
      :disabled="running || !runState.enabled"
      :aria-label="!runState.enabled ? (isVi ? 'Vui lòng chọn node có thể thực thi' : '请先选择可执行节点') : running ? (isVi ? 'Đang thực thi hàng loạt…' : '正在批量执行') : (isVi ? 'Chạy cấu hình đã chọn' : '运行所选配置')"
      :title="runState.enabled ? undefined : runState.reason"
      @click="$emit('runSelected')"
    >
      <Play :size="16" aria-hidden="true" />
      <span>{{ running ? (isVi ? 'Đang chạy…' : '执行中') : (isVi ? 'Chạy cấu hình này' : '运行此配置') }}</span>
    </button>
  </div>
</template>
