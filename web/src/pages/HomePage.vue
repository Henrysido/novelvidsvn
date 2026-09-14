<script setup lang="ts">
import { ArrowRight, Clapperboard, FolderKanban, Images, RefreshCcw, Sparkles } from 'lucide-vue-next'
</script>

<template>
  <main class="home-page">
    <div class="home-container">
      <header class="home-hero">
        <div class="home-badge">
          <Sparkles :size="14" class="sparkle-icon" />
          <span>{{ $t('home.kicker') }}</span>
        </div>
        <div class="home-logo-wrap">
          <img src="/logo.png" alt="HenryVids Studio" class="home-hero-logo" />
        </div>
        <h1 class="home-title">
          {{ $t('home.welcome') }} <span class="brand-highlight">{{ $t('nav.brandName') }}</span>
        </h1>
        <p class="home-desc">
          {{ $t('home.desc') }}
        </p>
        <div class="home-cta-row">
          <RouterLink to="/create/short-drama" class="home-primary-btn">
            <Clapperboard :size="18" />
            <span>{{ $t('home.startCreation') }}</span>
            <ArrowRight :size="16" />
          </RouterLink>
          <RouterLink to="/create/remake" class="home-secondary-btn">
            <RefreshCcw :size="16" />
            <span>{{ $t('nav.remakeWorkshop') }}</span>
          </RouterLink>
        </div>
      </header>

      <section class="home-grid">
        <RouterLink to="/create/short-drama" class="home-card">
          <div class="card-icon"><Clapperboard :size="22" /></div>
          <div class="card-content">
            <h3>{{ $t('nav.shortDrama') }}</h3>
            <p>{{ $t('shortDrama.titlePrefix') }}{{ $t('shortDrama.titleAccent') }}</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </RouterLink>

        <RouterLink to="/create/remake" class="home-card">
          <div class="card-icon"><RefreshCcw :size="22" /></div>
          <div class="card-content">
            <h3>{{ $t('nav.remakeWorkshop') }}</h3>
            <p>Bóc tách phân cảnh, chuyển thể phong cách và tái tạo video tự động</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </RouterLink>

        <RouterLink to="/projects" class="home-card">
          <div class="card-icon"><FolderKanban :size="22" /></div>
          <div class="card-content">
            <h3>{{ $t('nav.projects') }}</h3>
            <p>{{ $t('projects.desc') }}</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </RouterLink>

        <RouterLink to="/assets" class="home-card">
          <div class="card-icon"><Images :size="22" /></div>
          <div class="card-content">
            <h3>{{ $t('nav.assets') }}</h3>
            <p>Kho lưu trữ nhân vật, âm thanh và kết xuất phân cảnh đã tạo</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100%;
  padding: 48px 24px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--app-canvas, #090812);
  background-image:
    radial-gradient(ellipse 900px 500px at 50% 15%, rgb(168 85 247 / 14%), transparent 70%),
    var(--creation-bg-image, none);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--app-text, #f5f2fd);
}

.home-container {
  width: min(880px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.home-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--app-accent, #a855f7);
  background: var(--app-accent-soft, rgba(168, 85, 247, 0.14));
  border: 1px solid rgba(168, 85, 247, 0.25);
  margin-bottom: 20px;
}

.sparkle-icon {
  animation: pulse 2s infinite ease-in-out;
}

.home-logo-wrap {
  margin-bottom: 16px;
}

.home-hero-logo {
  width: 76px;
  height: 76px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 12px 36px rgba(168, 85, 247, 0.35), 0 0 0 1px rgba(168, 85, 247, 0.2);
}

.home-title {
  margin: 0 0 12px;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--app-text, #f5f2fd);
}

.brand-highlight {
  background: linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-desc {
  max-width: 580px;
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--app-text-secondary, #c4bcd8);
}

.home-cta-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.home-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 24px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 10px 28px rgba(124, 58, 237, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  text-decoration: none;
}

.home-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(124, 58, 237, 0.45);
}

.home-secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  color: var(--app-text, #f5f2fd);
  background: var(--app-surface-raised, rgba(19, 16, 34, 0.8));
  border: 1px solid var(--app-border, #2c254c);
  backdrop-filter: blur(12px);
  font-size: 14px;
  font-weight: 550;
  transition: transform 0.15s ease, border-color 0.15s ease;
  text-decoration: none;
}

.home-secondary-btn:hover {
  transform: translateY(-2px);
  border-color: var(--app-border-strong, #453974);
  background: var(--app-surface-hover, #252042);
}

.home-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
}

@media (max-width: 640px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}

.home-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 16px;
  background: var(--app-surface-raised, rgba(19, 16, 34, 0.75));
  border: 1px solid var(--app-border, #2c254c);
  backdrop-filter: blur(16px);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.home-card:hover {
  transform: translateY(-3px);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(168, 85, 247, 0.2);
}

.card-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  color: var(--app-accent, #a855f7);
  background: var(--app-accent-soft, rgba(168, 85, 247, 0.12));
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-content h3 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 650;
  color: var(--app-text, #f5f2fd);
}

.card-content p {
  margin: 0;
  font-size: 12px;
  color: var(--app-text-muted, #8c83a7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-arrow {
  color: var(--app-text-muted, #8c83a7);
  transition: transform 0.15s ease, color 0.15s ease;
}

.home-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--app-accent, #a855f7);
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}
</style>
