<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import AppPagination from '@/components/AppPagination.vue'
import { notice } from '@/shared/notice'
import type { UserItem, UserStats } from '@/types'

const { locale } = useI18n()
const isVi = computed(() => locale.value === 'vi-VN')

const stats = ref<UserStats>({ user_count: 0, user_total_cost: 0, team_count: 0, team_balance_total: 0 })
const users = ref<UserItem[]>([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(20)
const totalUsers = ref(0)

const showCreateDialog = ref(false)
const createForm = ref({ username: '', nickname: '', password: '' })
const creating = ref(false)

const money = (value: number | string | null | undefined) => {
  const parsed = Number(value ?? 0)
  return Number.isFinite(parsed) ? parsed.toFixed(2) : '0.00'
}

async function load() {
  loading.value = true
  try {
    const [statsResponse, usersResponse] = await Promise.all([
      api.userStats(),
      api.users(page.value, pageSize.value),
    ])
    stats.value = statsResponse.data
    users.value = usersResponse.data.items
    totalUsers.value = usersResponse.data.pagination.total
    if (!users.value.length && page.value > 1) {
      page.value -= 1
      await load()
    }
  } catch (error) {
    notice.error(error instanceof Error ? error.message : (isVi.value ? 'Không thể tải danh sách người dùng' : '加载用户失败'))
  } finally {
    loading.value = false
  }
}

async function createUser() {
  if (!createForm.value.username.trim() || createForm.value.password.length < 8) return
  creating.value = true
  try {
    await api.createUser({
      username: createForm.value.username.trim(),
      nickname: createForm.value.nickname,
      password: createForm.value.password,
    })
    notice.success(isVi.value ? 'Người dùng đã được tạo thành công' : '用户已创建')
    showCreateDialog.value = false
    createForm.value = { username: '', nickname: '', password: '' }
    await load()
  } catch (error) {
    notice.error(error instanceof Error ? error.message : (isVi.value ? 'Tạo người dùng thất bại' : '创建用户失败'))
  } finally {
    creating.value = false
  }
}

async function toggleStatus(user: UserItem) {
  try {
    await api.updateUser(user.id, { status: user.status === 1 ? 0 : 1 })
    notice.success(user.status === 1 ? (isVi.value ? 'Đã khóa quyền đăng nhập' : '已禁用登录') : (isVi.value ? 'Đã khôi phục quyền đăng nhập' : '已恢复登录'))
    await load()
  } catch (error) {
    notice.error(error instanceof Error ? error.message : (isVi.value ? 'Thao tác thất bại' : '操作失败'))
  }
}

async function removeUser(user: UserItem) {
  const confirmMsg = isVi.value
    ? `Xác nhận xóa người dùng「${user.nickname || user.username}」? Mọi dữ liệu nhóm và phiên đăng nhập sẽ bị xóa vĩnh viễn.`
    : `确认删除用户「${user.nickname || user.username}」？其团队关系与会话将一并删除。`
  if (!window.confirm(confirmMsg)) return
  try {
    await api.deleteUser(user.id)
    notice.success(isVi.value ? 'Đã xóa người dùng thành công' : '用户已删除')
    await load()
  } catch (error) {
    notice.error(error instanceof Error ? error.message : (isVi.value ? 'Xóa người dùng thất bại' : '删除失败'))
  }
}

function changePage(next: number) {
  page.value = next
  void load()
}

function changePageSize(size: number) {
  pageSize.value = size
  page.value = 1
  void load()
}

onMounted(load)
</script>

<template>
  <main class="users-page">
    <header class="page-header">
      <h1>{{ isVi ? 'Quản lý người dùng' : '用户管理' }}</h1>
      <button type="button" class="primary-button" @click="showCreateDialog = true">
        {{ isVi ? 'Tạo người dùng mới' : '创建用户' }}
      </button>
    </header>

    <section class="stats-row">
      <div class="stat-card">
        <span class="stat-label">{{ isVi ? 'Tổng số người dùng' : '用户总数' }}</span>
        <strong class="stat-value">{{ stats.user_count }}</strong>
      </div>
      <div class="stat-card">
        <span class="stat-label">{{ isVi ? 'Tổng chi phí người dùng tiêu thụ' : '用户总消耗金额' }}</span>
        <strong class="stat-value is-cost">¥ {{ money(stats.user_total_cost) }}</strong>
      </div>
      <div class="stat-card">
        <span class="stat-label">{{ isVi ? 'Tổng số đội nhóm' : '团队总数' }}</span>
        <strong class="stat-value">{{ stats.team_count }}</strong>
      </div>
      <div class="stat-card">
        <span class="stat-label">{{ isVi ? 'Tổng số dư khả dụng của các nhóm' : '团队未消耗总金额' }}</span>
        <strong class="stat-value is-balance">¥ {{ money(stats.team_balance_total) }}</strong>
      </div>
    </section>

    <section class="panel">
      <p v-if="loading" class="dim">{{ isVi ? 'Đang tải…' : '加载中…' }}</p>
      <table v-else class="user-table">
        <thead>
          <tr>
            <th>{{ isVi ? 'Tên đăng nhập' : '用户名' }}</th>
            <th>{{ isVi ? 'Biệt danh' : '昵称' }}</th>
            <th>{{ isVi ? 'Loại tài khoản' : '类型' }}</th>
            <th>{{ isVi ? 'Trạng thái đăng nhập' : '登录状态' }}</th>
            <th>{{ isVi ? 'Ngày đăng ký' : '注册时间' }}</th>
            <th>{{ isVi ? 'Chi tiêu lũy kế (¥)' : '累计消耗（元）' }}</th>
            <th>{{ isVi ? 'Số nhóm' : '团队数' }}</th>
            <th class="actions">{{ isVi ? 'Thao tác' : '操作' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" :class="{ 'is-disabled': user.status !== 1 }">
            <td>{{ user.username }}</td>
            <td>{{ user.nickname || '—' }}</td>
            <td>
              <span v-if="user.is_super_admin" class="kind-badge is-super">{{ isVi ? 'Super Admin' : '超管' }}</span>
              <span v-else class="kind-badge">{{ isVi ? 'Thông thường' : '普通' }}</span>
            </td>
            <td>
              <span class="status-badge" :class="user.status === 1 ? 'is-active' : 'is-stopped'">
                {{ user.status === 1 ? (isVi ? 'Bình thường' : '正常') : (isVi ? 'Đã khóa' : '已禁用') }}
              </span>
            </td>
            <td>{{ user.created_at || '—' }}</td>
            <td class="cost">{{ money(user.total_cost) }}</td>
            <td>{{ user.team_count ?? 0 }}</td>
            <td class="actions">
              <template v-if="!user.is_super_admin">
                <button type="button" class="ghost-button" @click="toggleStatus(user)">
                  {{ user.status === 1 ? (isVi ? 'Khóa đăng nhập' : '禁用登录') : (isVi ? 'Khôi phục' : '恢复登录') }}
                </button>
                <button type="button" class="danger-button" @click="removeUser(user)">{{ isVi ? 'Xóa' : '删除' }}</button>
              </template>
              <span v-else class="dim">—</span>
            </td>
          </tr>
        </tbody>
      </table>
      <AppPagination
        :page="page"
        :page-size="pageSize"
        :total="totalUsers"
        @page-change="changePage"
        @size-change="changePageSize"
      />
    </section>

    <div v-if="showCreateDialog" class="dialog-mask" @click.self="showCreateDialog = false">
      <form class="dialog-card" @submit.prevent="createUser">
        <h2>{{ isVi ? 'Tạo người dùng mới' : '创建用户' }}</h2>
        <p class="dim">{{ isVi ? 'Sau khi tạo, người dùng này chưa thuộc nhóm nào, có thể tham gia nhóm thông qua liên kết mời.' : '创建后该用户暂无团队，可经邀请链接加入团队。' }}</p>
        <label>
          <span>{{ isVi ? 'Tên đăng nhập' : '用户名' }}</span>
          <input v-model="createForm.username" type="text" autocomplete="off" required />
        </label>
        <label>
          <span>{{ isVi ? 'Biệt danh' : '昵称' }}</span>
          <input v-model="createForm.nickname" type="text" autocomplete="off" />
        </label>
        <label>
          <span>{{ isVi ? 'Mật khẩu (tối thiểu 8 ký tự)' : '密码（至少 8 位）' }}</span>
          <input v-model="createForm.password" type="password" autocomplete="new-password" minlength="8" required />
        </label>
        <div class="dialog-actions">
          <button type="button" class="ghost-button" @click="showCreateDialog = false">{{ isVi ? 'Hủy' : '取消' }}</button>
          <button type="submit" class="primary-button" :disabled="creating">{{ creating ? (isVi ? 'Đang tạo…' : '创建中…') : (isVi ? 'Tạo tài khoản' : '创建') }}</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.users-page { max-width: 1080px; margin: 0 auto; padding: 28px 24px; display: flex; flex-direction: column; gap: 18px; }
.page-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.page-header h1 { margin: 0; font-size: 22px; color: var(--app-text, #303442); }
.primary-button { height: 36px; padding: 0 16px; border: none; border-radius: 8px; background: var(--app-accent, #5b5cf6); color: #fff; font-weight: 600; cursor: pointer; }
.primary-button:disabled { opacity: 0.6; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card { background: var(--app-surface, #fff); border: 1px solid var(--app-border, #e3e5ec); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: var(--app-text-muted, #9398a8); }
.stat-value { font-size: 22px; font-weight: 700; color: var(--app-text, #303442); }
.stat-value.is-cost { color: #d97706; }
.stat-value.is-balance { color: var(--app-success, #059669); }
.panel { background: var(--app-surface, #fff); border: 1px solid var(--app-border, #e3e5ec); border-radius: 12px; padding: 18px; }
.user-table { width: 100%; border-collapse: collapse; font-size: 13px; color: var(--app-text, #303442); }
.user-table th, .user-table td { text-align: left; padding: 10px; border-bottom: 1px solid var(--app-border, #e3e5ec); }
.user-table .actions { text-align: right; white-space: nowrap; }
.user-table .cost { font-variant-numeric: tabular-nums; }
.kind-badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; background: var(--app-surface-muted, #f2f3f7); color: var(--app-text-muted, #9398a8); }
.kind-badge.is-super { background: rgba(91, 92, 246, 0.12); color: var(--app-accent, #5b5cf6); font-weight: 600; }
.status-badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; }
.status-badge.is-active { background: var(--app-success-soft, rgba(16, 185, 129, 0.12)); color: var(--app-success, #059669); }
.status-badge.is-stopped { background: var(--app-danger-soft, rgba(220, 38, 38, 0.1)); color: var(--app-danger, #dc2626); }
.ghost-button, .danger-button { height: 28px; padding: 0 10px; border-radius: 8px; font-size: 12px; cursor: pointer; border: 1px solid var(--app-border, #e3e5ec); background: transparent; color: var(--app-text-muted, #9398a8); margin-left: 6px; }
.danger-button { color: var(--app-danger, #dc2626); }
.dim { color: var(--app-text-muted, #9398a8); font-size: 13px; }
.is-disabled { opacity: 0.6; }
.dialog-mask { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: flex; align-items: center; justify-content: center; z-index: 100; }
.dialog-card { width: 100%; max-width: 380px; background: var(--app-surface, #fff); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 14px; }
.dialog-card h2 { margin: 0; font-size: 17px; color: var(--app-text, #303442); }
.dialog-card label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--app-text-muted, #9398a8); }
.dialog-card input { height: 36px; padding: 0 10px; border: 1px solid var(--app-border, #e3e5ec); border-radius: 8px; background: var(--app-surface-muted, #f2f3f7); color: var(--app-text, #303442); font-size: 13px; }
.dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
