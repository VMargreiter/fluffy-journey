// layouts/default.vue
<template>
  <div class="app-layout">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Decorative geometric elements -->
    <div class="geo-decoration geo-circle top-left"></div>
    <div class="geo-decoration geo-triangle top-right"></div>
    <div class="geo-decoration geo-square bottom-left"></div>
    <div class="geo-decoration geo-hexagon bottom-right"></div>
    
    <!-- Main content with padding for fixed nav -->
    <div class="main-content">
      <nuxt />
    </div>
    
    <!-- Footer -->
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} {{ coupleName }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      coupleName: "Jane & John"
    }
  }
}
</script>

<style>
.app-layout {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.main-content {
  padding-top: 80px; /* Space for fixed navbar */
}

/* Geometric decorations */
.geo-decoration {
  position: fixed;
  z-index: -1;
  opacity: 0.05;
}

.geo-circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #4CAF50;
}

.geo-triangle {
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 260px solid #8BC34A;
}

.geo-square {
  width: 200px;
  height: 200px;
  background-color: #2E7D32;
  transform: rotate(45deg);
}

.geo-hexagon {
  width: 200px;
  height: 173px; /* Hexagon height */
  background-color: #81C784;
  position: relative;
}

.geo-hexagon:before,
.geo-hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
}

.geo-hexagon:before {
  bottom: 100%;
  border-bottom: 58px solid #81C784;
}

.geo-hexagon:after {
  top: 100%;
  border-top: 58px solid #81C784;
}

/* Positions */
.top-left {
  top: -100px;
  left: -100px;
}

.top-right {
  top: -100px;
  right: -100px;
}

.bottom-left {
  bottom: -100px;
  left: -100px;
}

.bottom-right {
  bottom: -100px;
  right: -100px;
}

/* Footer */
.app-footer {
  text-align: center;
  padding: 1.5rem;
  margin-top: 3rem;
  color: #666;
  font-size: 0.9rem;
}

/* Animation for decorations - subtle floating effect */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.geo-circle {
  animation: float 15s ease-in-out infinite;
}

.geo-triangle {
  animation: float 18s ease-in-out infinite 2s;
}

.geo-square {
  animation: float 20s ease-in-out infinite 1s;
}

.geo-hexagon {
  animation: float 17s ease-in-out infinite 3s;
}
</style>