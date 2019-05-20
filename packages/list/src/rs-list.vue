<template>
  <ul class="rs-list" ref="slotContainer">
    <slot></slot>
  </ul>
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
@import "@rsmdc/typography/mixins";
@import "@rsmdc/theme/variables";

.rs-list {
  @include rs-typography(subtitle1);

  padding-right: 0;
  padding-left: 0;
  line-height: map-get(map-get($rs-typography-styles, body1), line-height);
  margin: 0;
  list-style-type: none;

  padding-top: var(--rs-list--padding-top, 8px);
  padding-bottom: var(--rs-list--padding-bottom, 8px);
  font-size: var(--rs-list--font-size);
  color: var(--rs-list--color, rs-theme-ink-color-for-fill_(primary, $rs-theme-background));
}

</style>
