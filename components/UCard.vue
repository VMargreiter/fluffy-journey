<template>
  <div class="u-card" :class="[variant]">
    <div v-if="$slots.header" class="u-card-header">
      <slot name="header"></slot>
    </div>
    <div class="u-card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="u-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'primary', 'secondary', 'outlined'].includes(val)
    }
  }
}
</script>

<style scoped>
.u-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1rem;
}

.u-card.primary {
  border-top: 4px solid #2E7D32;
}

.u-card.secondary {
  border-top: 4px solid #757575;
}

.u-card.outlined {
  box-shadow: none;
  border: 1px solid #e0e0e0;
}

.u-card-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
}

.u-card-body {
  padding: 1rem;
}

.u-card-footer {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}
</style>
