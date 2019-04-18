<template>
  <div class="rs-list-group">
    <slot></slot>
  </div>
</template>
<style lang="scss">
@import '../rs-list';

.rs-list-group {
  --rs-list--pading: 0;
  
  [dir="rtl"] &,
  &[dir="rtl"] {
    // rs-list-divider--margin-left rs-list-divider--margin-right
    margin-left: var(--rs-list-group--margin-left);
    margin-right: var(--rs-list-group--margin-right);
  }
}

</style>
