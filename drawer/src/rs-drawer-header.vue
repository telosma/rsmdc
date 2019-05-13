<template>
  <div class="rs-drawer__header" ref="slotContainer">
    <slot></slot>
  </div>
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
@import '../variables';
@import '../../typography/mixins';
@import '../../typography/variables';

.rs-drawer__header {
  flex-shrink: 0;
  box-sizing: border-box;
  min-height: 64px; // same as $mdc-top-app-bar-row-height
  padding: 0 $rs-drawer-surface-padding 4px;
}

::slotted(h3) {
  @include rs-typography(headline6);
  color: var(--rs-drawer-title--color, rgba(rs-theme-prop-value($rs-drawer-title-ink-color), $rs-drawer-title-ink-opacity));
}

@include rs-typography-baseline-top(36px, true, h3);
@include rs-typography-baseline-top-strut_(36px, true, h3);
@include rs-typography-baseline-bottom(20px, true, h3);
@include rs-typography-baseline-bottom-strut_(20px, true, h3);

::slotted(h6) {
  @include rs-typography(body2);
  margin-bottom: 0;
  color: var(--rs-drawer-subtitle--color, rgba(rs-theme-prop-value($rs-drawer-subtitle-ink-color), $rs-drawer-subtitle-ink-opacity));
}

@include rs-typography-baseline-top(20px, true, h6);
@include rs-typography-baseline-top-strut_(20px, true, h6);

</style>

