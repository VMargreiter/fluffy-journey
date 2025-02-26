<template>
  <div class="parallax-wrapper">
    <div class="parallax-bg"></div>
    <div class="content-container">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
.parallax-wrapper {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px; /* Creates the 3D effect */
}

.parallax-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('/assets/images/backgroundFern.jpg');
  background-size: cover;
  background-position: center;
  transform: translateZ(-1px) scale(2); /* Move it back and scale it up */
  z-index: -1;
}

.content-container {
  position: relative;
  min-height: 100vh;
  background-color: transparent;
  z-index: 1;
}

/* Ensure proper stacking context for child elements */
.content-container > * {
  transform-style: preserve-3d;
}
</style>