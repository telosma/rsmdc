<template>
  <span class="rs-list-item__meta"><slot></slot></span>
</template>
<style lang="scss">
@import '../rs-list';
@import '../rs-variables';

:host {
  margin-left: auto;
  margin-right: 0;
}

.rs-list-item__meta {
  color: var(--rs-list-item-meta--color, rs-theme-ink-color-for-fill_(hint, $rs-theme-background));
}

</style>

