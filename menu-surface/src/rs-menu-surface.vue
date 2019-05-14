<template>
  <div class="rs-menu-surface rs-menu-surface--open">
    <slot></slot>
  </div>
</template>
<style lang="scss">
@import '../rs-menu-surface';

:host {
  position: absolute;
}

.rs-menu-surface {
  width: var(--rs-menu--width);

  color: var(--rs-menu-surface--color, $rs-theme-on-surface);
  background-color: var(--rs-menu-surface--background-color, $rs-theme-surface);
  border-radius: var(--rs-menu-surface--border-radius, rs-shape-radius(medium));
  display: var(--rs-menu-surface--display, none);
  transform: var(--rs-menu-surface--transform, scale(1));
  opacity: var(--rs-menu-surface--opacity, 0);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-menu-surface_rtl--border-radius, rs-shape-rtl-radius(medium, false));
  }
}
</style>


