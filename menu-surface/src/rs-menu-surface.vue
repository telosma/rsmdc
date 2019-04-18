<template>
  <div class="rs-menu-surface rs-menu-surface--open">
    <slot></slot>
  </div>
</template>
<script>
import { RSMenuSurface } from '../index'

export default {
  mounted() {
    new RSMenuSurface(this.$el)
  }
}
</script>

<style lang="scss">
@import '../rs-menu-surface';

.rs-menu-surface {
  color: var(--rs-menu-surface--color, $rs-theme-on-surface);
  background-color: var(--rs-menu-surface--background-color, $rs-theme-surface);
  border-radius: var(--rs-menu-surface--border-radius, rs-shape-radius(medium));

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-menu-surface_rtl--border-radius, rs-shape-rtl-radius(medium, false));
  }
}

</style>


