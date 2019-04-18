<template>
  <span class="rs-list-item__secondary-text"><slot></slot></span>
</template>
<style lang="scss">
@import '../rs-list';

.rs-list-item__secondary-text {
  color: var(--rs-list-item-secondary-text--color, rs-theme-ink-color-for-fill_(secondary, $rs-theme-background));
  display: var(--rs-list-item-secondary-text--dispaly, block);
  margin-top: var(--rs-list-item-secondary-text--margin-top, 0);
  line-height: var(--rs-list-item-secondary-text--line-height, normal);

  &::before {
    vertical-align: var(--rs-list-item-secondary-text_before--vertical-align, 0);
    display: var(--rs-list-item-secondary-text_before--dispaly, inline-block);
    width: var(--rs-list-item-secondary-text_before--width, 0);
    height: var(--rs-list-item-secondary-text_before--height, $item-secondary-text-baseline-height);
    content: var(--rs-list-item-secondary-text_before--content, '');
  }
}
</style>

