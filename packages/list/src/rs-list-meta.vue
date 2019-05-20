<template>
  <span class="rs-list-item__meta"><slot></slot></span>
</template>
<style lang="scss">
@import '../rs-variables';
@import '@rsmdc/theme/functions';
@import '@rsmdc/theme/variables';

:host {
  margin-left: auto;
  margin-right: 0;
}

.rs-list-item__meta {
  color: var(--rs-menu-list-item-meta--color, var(--rs-list-item-meta--color, rs-theme-ink-color-for-fill_(hint, $rs-theme-background)));
}

</style>

