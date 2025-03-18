export default {
  // Global page headers
  head: {
    title: 'Jazz & Val Wedding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jazz and Val\'s wedding website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '~/assets/css/global.css'
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: {
    dirs: [
      '~/components',
      '~/components/ui'
    ]
  },

  // Modules for dev and build
  buildModules: [],

  // Modules
  modules: [
    // Add this if you want to use Nuxt UI instead of creating your own UCard
    // '@nuxt/ui'
  ],

  // Build Configuration
  build: {}
}
