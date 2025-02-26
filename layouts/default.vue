<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <Navigation />
    
    <!-- Geometric decorations -->
    <div class="fixed -z-10 opacity-5 -top-24 -left-24 w-72 h-72 rounded-full bg-green-600 animate-float"></div>
    <div class="fixed -z-10 opacity-5 -top-24 -right-24 border-l-[150px] border-r-[150px] border-b-[260px] border-l-transparent border-r-transparent border-b-green-500 animate-float-delay-2"></div>
    <div class="fixed -z-10 opacity-5 -bottom-24 -left-24 w-48 h-48 rotate-45 bg-green-800 animate-float-delay-1"></div>
    <div class="fixed -z-10 opacity-5 -bottom-24 -right-24 w-48 h-[173px] bg-green-400 animate-float-delay-3"></div>
    
    <div class="pt-20">
      <NuxtPage />
    </div>
    
    <footer class="text-center py-6 mt-12 text-gray-600 text-sm">
      <p>&copy; {{ new Date().getFullYear() }} {{ coupleName }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const coupleName = ref("Jane & John")
</script>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.animate-float { animation: float 15s ease-in-out infinite; }
.animate-float-delay-1 { animation: float 20s ease-in-out infinite 1s; }
.animate-float-delay-2 { animation: float 18s ease-in-out infinite 2s; }
.animate-float-delay-3 { animation: float 17s ease-in-out infinite 3s; }
</style>