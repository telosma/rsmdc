<template>
  <h6 class="rs-drawer__subtitle" ref="slotContainer">
    <slot></slot>
  </h6>
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
@import '../variables';
@import '@rsmdc/typography/mixins';
@import '@rsmdc/typography/variables';

$baselineTop: 20px;

.rs-drawer__subtitle {
  @include rs-typography(body2);
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  margin-bottom: 0;
  color: var(--rs-drawer-subtitle--color, rgba(rs-theme-prop-value($rs-drawer-subtitle-ink-color), $rs-drawer-subtitle-ink-opacity));

  &::before {
    @include rs-typography-baseline-top-strut_($baselineTop);
  }
}

</style>


