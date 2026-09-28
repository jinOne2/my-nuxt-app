// server/api/weather.ts
export default defineEventHandler(async (event) => {
  // .env에 넣은 키를 안전하게 가져옴 (서버에서만 실행되는 코드라 노출 안 됨)
  const config = useRuntimeConfig()

  // 요청 URL의 쿼리스트링(?nx=60&ny=127)을 읽음
  const query = getQuery(event)
  const nx = query.nx || 60  // 기본값: 서울
  const ny = query.ny || 127

  // 초단기실황조회는 매시 40분에 생성됨. 아직 40분 전이면 이전 시각 데이터를 요청해야 함
  const now = new Date()
  if (now.getMinutes() < 40) {
    now.setHours(now.getHours() - 1)
  }
  const baseDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const baseTime = `${String(now.getHours()).padStart(2, '0')}00`

  // 기상청 API 실제 호출 (서버가 대신 요청해줌 = 프록시)
  const data = await $fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
    query: {
      serviceKey: config.weatherApiKey,
      pageNo: 1,
      numOfRows: 10,
      dataType: 'JSON',
      base_date: baseDate,
      base_time: baseTime,
      nx,
      ny
    }
  })

  return data
})