<template>
  <span class="rs-list-item__graphic" :role="role"><slot></slot></span>
</template>
<script>
export default {
  props: {
    role: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '../rs-list';

.rs-list-item__graphic {
  color: var(--rs-list-item-graphic--color, rs-theme-ink-color-for-fill_(icon, $rs-theme-background));
  background-color: var(--rs-list-item-graphic--background-color, transparent);
  margin-left: var(--rs-list-item-graphic--margin-left, 0);
  margin-right: var(--rs-list-item-graphic--margin-right, 32px);
  width: var(--rs-list-item-graphic--width);
  height: var(--rs-list-item-graphic--height);
  border-radius: var(--rs-list-item-graphic--border-radius);
}
</style>

