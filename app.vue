<template>
  <div class="main-container">
    <NuxtLayout>
      <NuxtPage class="container" />
    </NuxtLayout>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  /* Add a fallback background color */
  background-color: #f0f0f0;
  /* Try different path foramats for the background image */
  background-image: url('/assets/images/backgroundFern.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.main-container {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}
</style>