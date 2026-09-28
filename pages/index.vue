<script setup>
useHead({
  title: '홈'
})

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.fetchAllWeather()
})

function handleFavorite(cityName) {
  console.log(`${cityName} 즐겨찾기 클릭됨!`)
}
</script>

<template>
  <Panel>
    <p v-if="weatherStore.isLoading">불러오는 중... ⏳</p>

    <div v-else-if="weatherStore.error" style="color: red;">
      <p>⚠️ {{ weatherStore.error }}</p>
      <button @click="weatherStore.fetchAllWeather">다시 시도</button>
    </div>

    <ul v-else style="padding: 0">
      <CityCard
        v-for="city in weatherStore.cities"
        :key="city.name"
        :city="city"
      >
        <template v-if="city.error"> (데이터 없음 ⚠️)</template>
      </CityCard>
    </ul>
  </Panel>
</template>