// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: 'Wedding Site',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  components: true,

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    // Add any global CSS files
  ],

  compatibilityDate: '2025-02-26',

  devtools: {
    timeline: {
      enabled: true
    }
  }
})