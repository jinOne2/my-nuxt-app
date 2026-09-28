<!-- layouts/default.vue -->
 <!-- layouts/default.vue -->
<script setup>
useHead({
  titleTemplate: (title) => title ? `${title} - 날씨 대시보드` : '날씨 대시보드'
})
</script>

<template>
  <div>
    <header style="text-align: center; padding: 20px; background: #f0f0f0;">
      <h1 style="margin: 0;">🌤️ 날씨 대시보드</h1>
      <NuxtLink to="/" style="margin-right: 10px;">홈</NuxtLink>
    </header>

    <main>
      <slot />
    </main>

    <footer style="text-align: center; padding: 20px; color: #999; margin-top: 40px;">
      날씨 대시보드 프로젝트 · Vue3 + Nuxt 학습용
    </footer>
  </div>
</template>