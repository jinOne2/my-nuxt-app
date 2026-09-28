<!-- components/CityCard.vue -->
<script setup>
// 부모로부터 city 객체를 props로 전달받음 (예: { name: '서울', temperature: 28 })
const props = defineProps({
  city: Object,
});

// 부모에게 보낼 이벤트를 미리 선언
const emit = defineEmits(["toggle-favorite"]);

// 자체 함수 대신 composable을 바로 사용 (import 없이! 자동 import)
const status = useWeatherStatus(props.city.temperature)

// 온도에 따라 어떤 아이콘을 보여줄지 결정 
const iconName = computed(() => {
  const temp = props.city.temperature
  if (temp === null) return 'mdi:help-circle-outline'
  if (temp >= 35) return 'mdi:fire'
  if (temp >= 28) return 'mdi:weather-sunny'
  if (temp <= 10) return 'mdi:snowflake'
  return 'mdi:weather-partly-cloudy'
})

// 즐겨찾기 버튼 클릭 시 실행되는 함수
function onFavoriteClick() {
  emit("toggle-favorite", props.city.name); // 부모에게 "이 도시가 눌렸어요"라고 알림
}
</script>

<template>
  <li style="margin: 10px; list-style: none">
    <Icon :name="iconName" size="24" />
    <NuxtLink :to="`/city/${city.name}`">
      <strong>{{ city.name }}</strong>
    </NuxtLink>
    — {{ city.temperature }}°C ({{ status}})
    <button @click="onFavoriteClick">⭐</button>
  </li>
</template>
