<template>
  <span class="rs-list-item__primary-text"><slot></slot></span>
</template>
<style lang="scss">
@import '../rs-list';

.rs-list-item__primary-text {
  display: var(--rs-list-item-primary-text--dispaly, block);
  margin-top: var(--rs-list-item-primary-text--margin-top, 0);
  line-height: var(--rs-list-item-primary-text--line-height, normal);
  margin-bottom: var(--rs-list-item-primary-text--margin-bottom, -1 * $item-secondary-text-baseline-height);

  &::before {
    vertical-align: var(--rs-list-item-primary-text_before--vertical-align, 0);
    display: var(--rs-list-item-primary-text_before--dispaly, inline-block);
    width: var(--rs-list-item-primary-text_before--width, 0);
    height: var(--rs-list-item-primary-text_before--height, $item-primary-text-baseline-height);
    content: var(--rs-list-item-primary-text_before--content, '');
  }

  &::after {
    vertical-align: var(--rs-list-item-primary-text_after--vertical-align, -1 * $item-secondary-text-baseline-height);
    display: var(--rs-list-item-primary-text_after--dispaly, inline-block);
    width: var(--rs-list-item-primary-text_after--width, 0);
    height: var(--rs-list-item-primary-text_after--height, $item-secondary-text-baseline-height);
    content: var(--rs-list-item-primary-text_after--content, '');
  }
}
</style>

