<template>
  <h3 class="rs-list-group__subheader">
    <slot></slot>
  </h3>
</template>
<style lang="scss">
@import '../rs-list';

.rs-list-group__subheader {
  color: var(--rs-list-group-subheader--color, rs-theme-ink-color-for-fill_(primary, $rs-theme-background));
}

</style>

