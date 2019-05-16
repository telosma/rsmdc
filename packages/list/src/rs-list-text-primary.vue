<template>
  <span class="rs-list-item__primary-text" ref="slotContainer">
    <slot></slot>
  </span>
</template>
<script>
export default {
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    }
  }
}
</script>
<style lang="scss">
@import '../rs-variables';
@import '@rsmdc/typography/mixins';
@import '@rsmdc/theme/variables';

.rs-list-item__primary-text {
  @include rs-typography-overflow-ellipsis;
  display: var(--rs-list-item-primary-text--dispaly, block);
  margin-top: var(--rs-list-item-primary-text--margin-top, 0);
  line-height: var(--rs-list-item-primary-text--line-height, normal);
  margin-bottom: var(--rs-list-item-primary-text--margin-bottom, -1 * $item-secondary-text-baseline-height);
  font-size: var(--rs-list--font-size);

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