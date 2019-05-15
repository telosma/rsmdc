<template>
  <h3 class="rs-drawer__title" ref="slotContainer">
    <slot></slot>
  </h3>
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
@import '../../typography/mixins';
@import '../../typography/variables';

$baselineTop: 36px;
$baselineBottom: 20px;

.rs-drawer__title {
  @include rs-typography(headline6);
  margin-top: 0;
  display: block;
  line-height: normal;
  margin-bottom: -1 * $baselineBottom;
  color: var(--rs-drawer-title--color, rgba(rs-theme-prop-value($rs-drawer-title-ink-color), $rs-drawer-title-ink-opacity));

  &::before {
    @include rs-typography-baseline-top-strut_(36px);
  }

  &::after {
    @include rs-typography-baseline-bottom-strut_(20px);
  }
}

</style>

