<script setup lang="ts">
import { ArrowRight, Clapperboard } from 'lucide-vue-next'
import AppIconTile from '@/components/AppIconTile.vue'
</script>

<template>
  <main class="route-placeholder-page">
    <div class="route-placeholder-content">
      <AppIconTile class="route-placeholder-icon" size="xl"><Clapperboard :size="24" /></AppIconTile>
      <p class="route-placeholder-kicker">{{ $t('home.kicker') }}</p>
      <h1>{{ $t('home.welcome') }}</h1>
      <p>{{ $t('home.desc') }}</p>
      <RouterLink to="/create/short-drama" class="route-placeholder-action">
        {{ $t('home.startCreation') }}
        <ArrowRight :size="16" />
      </RouterLink>
    </div>
  </main>
</template>
