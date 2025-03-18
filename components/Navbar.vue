<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <nuxt-link to="/" class="logo">Jazz & Val</nuxt-link>
      <div class="nav-links" :class="{ active: mobileMenuOpen }">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        <nuxt-link to="/details" class="nav-link">Wedding Details</nuxt-link>
        <nuxt-link to="/gallery" class="nav-link">Gallery</nuxt-link>
        <nuxt-link to="/rsvp" class="nav-link">RSVP</nuxt-link>
      </div>
      <div class="hamburger" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2E7D32;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #2E7D32;
}

.nav-link.nuxt-link-exact-active {
  color: #2E7D32;
}

.nav-link.nuxt-link-exact-active:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #2E7D32;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 1rem 0;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }

  .nav-links.active {
    max-height: 300px;
  }

  .nav-link {
    padding: 1rem 2rem;
    width: 100%;
    display: block;
  }
}
</style>
