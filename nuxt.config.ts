// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/icon'],
  runtimeConfig: {
    weatherApiKey: '' // 서버에서만 접근 가능 (클라이언트에 노출 안 됨)
  }
})