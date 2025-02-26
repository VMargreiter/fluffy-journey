// components/Navigation.vue
<template>
  <nav class="navigation" :class="{ 'nav-open': mobileMenuOpen }">
    <div class="container">
      <div class="nav-wrapper">
        <div class="logo">
          <nuxt-link to="/">
            {{ coupleName }}
          </nuxt-link>
        </div>
        
        <button class="mobile-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul class="nav-links">
          <li v-for="(item, index) in navItems" :key="index">
            <nuxt-link :to="item.path" @click.native="mobileMenuOpen = false">
              {{ item.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      coupleName: "Jazz & Val",
      mobileMenuOpen: false,
      navItems: [
        { label: 'Home', path: '/' },
        { label: 'Details', path: '/details' },
        { label: 'RSVP', path: '/' }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      
      // Prevent body scrolling when menu is open
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeDestroy() {
    // Ensure body scrolling is restored when component is destroyed
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 1rem 0;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.logo a {
  color: #2E7D32;
  text-decoration: none;
  transition: color 0.3s;
}

.logo a:hover {
  color: #1B5E20;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-left: 2rem;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-links a:hover {
  color: #2E7D32;
}

.nav-links a:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2E7D32;
  transition: width 0.3s;
}

.nav-links a:hover:after,
.nav-links a.nuxt-link-active:after {
  width: 100%;
}

.nav-links a.nuxt-link-active {
  color: #2E7D32;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 200;
}

.mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #2E7D32;
  margin-bottom: 6px;
  transition: transform 0.3s, opacity 0.3s;
}

.mobile-toggle span:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: right 0.3s ease;
  }
  
  .nav-open .nav-links {
    right: 0;
  }
  
  .nav-links li {
    margin: 1.5rem 0;
  }
  
  .nav-links a {
    font-size: 1.5rem;
  }
  
  .nav-open .mobile-toggle span:first-child {
    transform: translateY(8px) rotate(45deg);
  }
  
  .nav-open .mobile-toggle span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-open .mobile-toggle span:last-child {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>