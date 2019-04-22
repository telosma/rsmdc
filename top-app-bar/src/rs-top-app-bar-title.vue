<template>
  <span class="rs-top-app-bar__title">
    <slot></slot>
  </span>
</template>
<style lang="scss">
@import '../rs-top-app-bar';
@import '../variables';
@import '../../theme/variables';
@import "../../typography/mixins";

:host {
  align-self: var(--rs-top-app-bar-title--align-self);
  margin-left: var(--rs-top-app-bar-title--margin-left);
  margin-right: var(--rs-top-app-bar-title--margin-right);
  order: var(--rs-top-app-bar-title--order);
}

.rs-top-app-bar__title {
  @include rs-typography(headline6);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
  padding-right: 0;
  transition: var(--rs-top-app-bar-title--transition);
  opacity: var(--rs-top-app-bar-title--opacity);
  display: var(--rs-top-app-bar-title--display);
  padding-left: var(--rs-top-app-bar-title--padding-left, $rs-top-app-bar-title-left-padding);
  padding-bottom: var(--rs-top-app-bar-title--padding-bottom);
}

</style>


