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
@import '../mixins';
@import "@rsmdc/typography/mixins";

.rs-list {
  @include rs-list-base_;
  padding-top: var(--rs-list--padding-top, 8px);
  padding-bottom: var(--rs-list--padding-bottom, 8px);
  font-size: var(--rs-list--font-size);
  color: var(--rs-list--color, rs-theme-ink-color-for-fill_(primary, $rs-theme-background));
}

</style>
