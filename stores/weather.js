// stores/weather.js
export const useWeatherStore = defineStore('weather', () => {
  const cityList = [
    { name: '서울', nx: 60, ny: 127 },
    { name: '부산', nx: 98, ny: 76 },
    { name: '강릉', nx: 92, ny: 131 },
    { name: '대구', nx: 89, ny: 90 },
  ]
 
  const cities = ref([])
  const isLoading = ref(true)
  const error = ref(null) // 새로 추가: 에러 메시지를 담을 반응형 값

  async function fetchAllWeather() {
    isLoading.value = true
    error.value = null // 재시도할 때를 대비해 이전 에러 초기화

    try {
      const results = await Promise.all(
        cityList.map(async (city) => {
          try {
            const data = await $fetch('/api/weather', {
              query: { nx: city.nx, ny: city.ny }
            })

            const items = data?.response?.body?.items?.item || []
            console.log(`[${city.name}] items:`, items)

            const tempItem = items.find(item => item.category === 'T1H')
            console.log(`[${city.name}] tempItem:`, tempItem)

            const temperature = tempItem ? Number(tempItem.obsrValue) : null
            console.log(`[${city.name}] temperature:`, temperature)

            // 값을 못 찾았으면 이것도 "이 도시만의 부분 실패"로 취급
            if (temperature === null) {
              throw new Error(`${city.name} 기온 데이터 없음`)
            }

            return { name: city.name, temperature, error: false }
          } catch (err) {
            console.error(`${city.name} 요청 실패:`, err)
            return { name: city.name, temperature: null, error: true }
          }
        })
      )
      cities.value = results
    } catch (err) {
      // 여기 도달하면 개별 도시 문제가 아니라 아예 전체가 죽은 심각한 상황
      error.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
      console.error('전체 날씨 불러오기 실패:', err)
    } finally {
      isLoading.value = false
    }
  }

  function getCityByName(name) {
    return cities.value.find(city => city.name === name)
  }

  return { cities, isLoading, error, fetchAllWeather, getCityByName }
})