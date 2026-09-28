// composables/useWeatherStatus.js

// 온도(숫자)를 받아서 상태 문구를 반환하는 순수 함수
export function useWeatherStatus(temp) {
  if (temp >= 35) return '폭염 🔥'
  if (temp >= 28) return '덥다 🥵'
  if (temp <= 10) return '춥다 🥶'
  return '적당하다 😊'
}