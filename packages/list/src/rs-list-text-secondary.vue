<template>
  <span class="rs-list-item__secondary-text" ref="slotContainer">
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

.rs-list-item__secondary-text {
  @include rs-typography(body2);
  @include rs-typography-overflow-ellipsis;
  color: var(--rs-list-color, var(--rs-list-item-secondary-text--color, rs-theme-ink-color-for-fill_(secondary, $rs-theme-background)));
  display: var(--rs-list-item-secondary-text--dispaly, block);
  margin-top: var(--rs-list-item-secondary-text--margin-top, 0);
  line-height: var(--rs-list-item-secondary-text--line-height, normal);
  font-size: var(--rs-list--font-size);

  &::before {
    vertical-align: var(--rs-list-item-secondary-text_before--vertical-align, 0);
    display: var(--rs-list-item-secondary-text_before--dispaly, inline-block);
    width: var(--rs-list-item-secondary-text_before--width, 0);
    height: var(--rs-list-item-secondary-text_before--height, $item-secondary-text-baseline-height);
    content: var(--rs-list-item-secondary-text_before--content, '');
  }
}
</style>