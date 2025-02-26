// components/GeometricPattern.vue
<template>
  <div class="geometric-pattern" :style="patternStyle">
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- Background Patterns -->
      <defs>
        <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" :fill="primaryColor" opacity="0.5" />
        </pattern>
        
        <pattern id="hexPattern" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 3.1L46.65 15.05L46.65 38.95L25 50.9L3.35 38.95L3.35 15.05L25 3.1Z" 
                :stroke="primaryColor" stroke-width="0.5" fill="none" opacity="0.3" />
        </pattern>
      </defs>
      
      <!-- Background Fill -->
      <rect width="100%" height="100%" fill="url(#dotPattern)" opacity="0.15" />
      
      <!-- Hexagon Pattern Overlay -->
      <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.1" />
      
      <!-- Geometric Elements -->
      <g v-if="showElements">
        <!-- Triangles -->
        <polygon 
          v-for="(_, i) in 3" 
          :key="`triangle-${i}`" 
          :points="getTrianglePoints(i)" 
          :fill="getElementColor(i)" 
          opacity="0.15" 
        />
        
        <!-- Circles -->
        <circle 
          v-for="(_, i) in 4" 
          :key="`circle-${i}`" 
          :cx="getRandomPos(width)" 
          :cy="getRandomPos(height)" 
          :r="getRandomSize(10, 40)" 
          :fill="getElementColor(i + 3)" 
          opacity="0.15" 
        />
        
        <!-- Squares -->
        <rect 
          v-for="(_, i) in 2" 
          :key="`square-${i}`" 
          :x="getRandomPos(width)" 
          :y="getRandomPos(height)" 
          :width="getRandomSize(20, 50)" 
          :height="getRandomSize(20, 50)" 
          :transform="`rotate(${i * 45}, ${width/2}, ${height/2})`" 
          :fill="getElementColor(i + 7)" 
          opacity="0.15" 
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    primaryColor: {
      type: String,
      default: '#2E7D32'
    },
    secondaryColor: {
      type: String,
      default: '#4CAF50'
    },
    accentColor: {
      type: String,
      default: '#8BC34A'
    },
    position: {
      type: String,
      default: 'relative'
    },
    showElements: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    patternStyle() {
      return {
        position: this.position,
        width: `${this.width}px`,
        height: `${this.height}px`,
        overflow: 'hidden'
      }
    }
  },
  methods: {
    getRandomPos(max) {
      // Using a deterministic "random" to ensure consistent rendering
      return Math.floor((Math.sin(max * 0.1) + 1) * max / 2);
    },
    getRandomSize(min, max) {
      // Using a deterministic "random" to ensure consistent rendering
      return min + Math.floor((Math.cos(min * 0.2) + 1) * (max - min) / 2);
    },
    getTrianglePoints(index) {
      const offset = index * 50;
      return `${offset},${offset} ${offset + 100},${offset + 50} ${offset + 50},${offset + 100}`;
    },
    getElementColor(index) {
      const colors = [
        this.primaryColor, 
        this.secondaryColor, 
        this.accentColor,
        this.primaryColor, 
        this.accentColor,
        this.secondaryColor,
        this.primaryColor,
        this.accentColor,
        this.secondaryColor
      ];
      return colors[index % colors.length];
    }
  }
}
</script>

<style scoped>
.geometric-pattern {
  position: absolute;
  z-index: -1;
  pointer-events: none;
}
</style>