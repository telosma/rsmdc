<template>
  <i class="rs-top-app-bar__navigation-icon" tabindex="0">
    <slot></slot>
  </i>
</template>
<script>
export default {
}
</script>

<style lang="scss">
@import '../mixins';

:host {
  align-self: var(--rs-top-app-bar-navigationIcon--align-self);
  margin-left: var(--rs-top-app-bar-navigationIcon--margin-left);
  margin-right: var(--rs-top-app-bar-navigationIcon--margin-right);
  order: var(--rs-top-app-bar-navigationIcon--order);
}

.rs-top-app-bar__navigation-icon {
  @include rs-top-app-bar-icon_;
  color: var(--rs-top-app-bar-navigationIcon--color, inherit);

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
