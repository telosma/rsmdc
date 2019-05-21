<template>
  <div class="rs-card__actions">
    <div class="rs-card__action-buttons rs-card__action" ref="slotContainer">
      <slot></slot>
    </div>
    <div class="rs-card__action-buttons" ref="slotContainer">
      <slot></slot>
    </div>
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
@import '@rsmdc/rtl/mixins';
@import '@rsmdc/theme/mixins';

@mixin rs-card-actions-layout_($display: flex) {
  display: $display;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
}

.rs-card__actions {
  @include rs-card-actions-layout_;

  min-height: 52px;
  padding: var(--rs-card-actions--padding, 8px);
}

.rs-card__action-icons {
  @include rs-card-actions-layout_;
  @include rs-theme-prop(color, text-icon-on-background);

  flex-grow: 1;
  justify-content: flex-end;
}

.rs-card__action-buttons {
  @include rs-card-actions-layout_;
  + .rs-card__action-icons {
    @include rs-rtl-reflexive-box(margin, left, 16px);
  }
}

::slotted(*) {
  @include rs-card-actions-layout_(inline-flex);

  justify-content: center;
  cursor: pointer;
  user-select: none;
}

::slotted(*:focus) {
  outline: none;
}

::slotted(.-rs-button) {
  @include rs-rtl-reflexive-box(margin, right, 8px);
  padding: 0 8px;
}

::slotted(.-rs-button.-rs-full-bleed) {
  justify-content: space-between;
  width: 100%;
  height: auto;
  max-height: none;
  margin: 0;
  padding: 8px 16px;
  /* @noflip */
  text-align: left;

  @include rs-rtl {
    /* @noflip */
    text-align: right;
  }
}

::slotted(.-rs-button:last-child) {
  @include rs-rtl-reflexive-box(margin, right, 0);
}

::slotted(.-rs-icon) {
  margin: -6px 0;
  padding: 12px;
}

::slotted(.-rs-icon:not(:disabled)) {
  @include rs-theme-prop(color, text-icon-on-background);
}

</style>

