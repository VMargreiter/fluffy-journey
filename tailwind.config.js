module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2E7D32',
        'primary-light': '#4CAF50',
        'primary-dark': '#1B5E20',
        'accent': '#8BC34A',
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-delay-1': 'float 20s ease-in-out 1s infinite',
        'float-delay-2': 'float 18s ease-in-out 2s infinite',
        'float-delay-3': 'float 17s ease-in-out 3s infinite',
      },
    },
  },
  plugins: [],
}
