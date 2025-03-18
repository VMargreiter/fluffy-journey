<template>
  <div class="app-layout">
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} {{ coupleName }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '~/components/Navbar.vue'

const coupleName = ref("Jane & John")
</script>

<style>
@import '~/assets/css/global.css';

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.footer {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.animate-float { animation: float 15s ease-in-out infinite; }
.animate-float-delay-1 { animation: float 20s ease-in-out infinite 1s; }
.animate-float-delay-2 { animation: float 18s ease-in-out infinite 2s; }
.animate-float-delay-3 { animation: float 17s ease-in-out infinite 3s; }
</style>