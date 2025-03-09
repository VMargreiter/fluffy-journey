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
  // Make sure tailwindcss comes before @nuxt/ui in the modules array
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxt/ui'
  ],
  css: [
    // Add any global CSS files
  ],
  // Expanded tailwindcss configuration
  tailwindcss: {
    exposeConfig: true,
    config: {
      // This ensures your tailwind.config.js is properly respected
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
        // Add UI components to the content paths
        './node_modules/@nuxt/ui/dist/**/*.{mjs,js,vue}'
      ]
    }
  },
  // Adding UI configuration to ensure proper integration
  ui: {
    // Use strategy to ensure your colors are preserved
    tailwindcss: {
      mergeConfig: true,
      viewer: false
    },
    // Disable automatic icons if you're not using them
    icons: false
  },
  compatibilityDate: '2025-02-26',
  devtools: {
    timeline: {
      enabled: true
    }
  }
})