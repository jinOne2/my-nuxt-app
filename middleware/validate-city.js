// middleware/validate-city.js
export default defineNuxtRouteMiddleware((to) => {
  // 이 미들웨어를 쓰는 페이지에서만 실행되니, to.params.name이 항상 있다고 가정 가능
  const weatherStore = useWeatherStore()
  const city = weatherStore.getCityByName(to.params.name)

  if (!city) {
    // 도시를 못 찾으면, 페이지를 그리지 않고 홈으로 돌려보냄
    return navigateTo('/')
  }
})