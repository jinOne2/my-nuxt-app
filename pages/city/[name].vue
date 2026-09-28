<!-- pages/city/[name].vue -->
<script setup>
definePageMeta({
  middleware: 'validate-city'
})

const route = useRoute()
const weatherStore = useWeatherStore()
const city = weatherStore.getCityByName(route.params.name)

useHead({
  title: `${city.name} 날씨`,
  meta: [
    { name: 'description', content: `${city.name}의 실시간 기온 정보를 확인하세요.` }
  ]
})

</script>

<template>
  <div style="text-align: center; margin-top: 80px; font-family: sans-serif;">
    <h1>{{ city.name }} 상세 페이지</h1>
    <p>현재 온도: {{ city.temperature }}°C</p>
  </div>
</template>