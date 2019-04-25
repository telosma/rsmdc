<template>
  <span class="rs-top-app-bar__navigation-icon" tabindex="0">
    <slot></slot>
  </span>
</template>
<script>
export default {
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.topAppBar) {
      window.__rsmdc.topAppBar = {
        navigations: [],
        titles: [],
        items: [],
      }
    }
  }
}
</script>

<style lang="scss">
@import '../mixins';

:host {
  align-self: var(--rs-top-app-bar-navigationIcon--align-self);
}

.rs-top-app-bar__navigation-icon {
  @include rs-top-app-bar-icon_;
  color: var(--rs-top-app-bar-navigationIcon--color, inherit);

  background-image: var(--rs-top-app-bar-navigationIcon--background-image);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;

  &::before {
    background-color: $rs-theme-on-primary;
    content: '';
  }
  &::after {
    background-color: $rs-theme-on-primary;
    content: '';
    transition: opacity 150ms linear;
  }
  
  &:hover::before {
    opacity: 0.08;
  }
  &:active::after,
  &:focus::before {
    transition-duration: 75ms;
    opacity: 0.24;
  }
}

</style>
