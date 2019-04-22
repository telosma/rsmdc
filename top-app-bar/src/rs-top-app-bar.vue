<template>
  <header class="rs-top-app-bar">
    <div class="rs-top-app-bar__row">
      <div class="rs-top-app-bar__section">
        <slot></slot>
      </div>
    </div>
  </header>
</template> 
<style lang="scss">
@import '../rs-top-app-bar';
@import '../variables';
@import '../../theme/variables';

.rs-top-app-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 4;
  color: var(--rs-top-app-bar--color, $rs-theme-on-primary);
  background-color: var(--rs-top-app-bar--background-color, $rs-theme-primary);
  border-radius: var(--rs-top-app-bar--border-radius);

  // types
  width: var(--rs-top-app-bar--width, 100%);
  position: var(--rs-top-app-bar--position, fixed);
  top: var(--rs-top-app-bar--top, 0);
  right: var(--rs-top-app-bar--right, 0);
  left: var(--rs-top-app-bar--left, 0);
  transition: var(--rs-top-app-bar--transition);
  padding-top: var(--rs-top-app-bar--padding-top);
  box-shadow: var(--rs-top-app--box-shadow);

  &[dir="rtl"] {
    right: var(--rs-top-app-bar_rtl--right);
    left: var(--rs-top-app-bar_rtl--left);
  }

}

.rs-top-app-bar__row {
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: var(--rs-top-app-bar-row--height, $rs-top-app-bar-row-height);
}

.rs-top-app-bar__section {
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  z-index: 1;
  padding: var(--rs-top-app-bar-section--padding, $rs-top-app-bar-section-vertical-padding $rs-top-app-bar-section-horizontal-padding);
}

@media (max-width: $rs-top-app-bar-mobile-breakpoint) {
  .rs-top-app-bar {
    transition: var(--rs-top-app-bar_media--transition);
    padding-top: var(--rs-top-app-bar_media--padding-top);
    padding-right: var(--rs-top-app-bar_media--padding-right);
    padding-left: var(--rs-top-app-bar_media--padding-left);
  }

  .rs-top-app-bar__row {
    height: $rs-top-app-bar-mobile-row-height;
  }

  .rs-top-app-bar__section {
    padding: $rs-top-app-bar-mobile-section-padding;
  }
}

</style>

