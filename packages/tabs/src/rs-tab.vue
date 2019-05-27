<template>
  <button class="rs-tab" role="tab">
    <span class="rs-tab__content">
      <span class="rs-tab__text-label" ref="slotContainer">
        <slot></slot>
      </span>
      <span class="rs-tab-indicator">
        <span class="rs-tab-indicator__content" aria-hidden="true"/>
      </span>
    </span>
    <span class="rs-tab__ripple" />
  </button>
</template>
<script>
export default {
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el
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
@import "@rsmdc/ripple/mixins";
@import "@rsmdc/theme/mixins";

.rs-tab {
  @include rs-typography(button);

  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: $rs-tab-height;
  padding: 0 24px;
  border: none;
  outline: none;
  background: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  z-index: 1;

  flex: var(--rs-tab--flex, 1 0 auto);
}

.rs-tab__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.rs-tab__text-label {
  display: inline-block;
  opacity: $rs-tab-text-label-opacity;
  line-height: 1;
  transition: 150ms color linear, 150ms opacity linear;
  z-index: 2;

  color: var(--rs-tab-text-label--color, $rs-theme-on-surface);
}

.rs-tab-indicator {
  @include rs-tab-indicator-icon-color(secondary);
  @include rs-tab-indicator-icon-height(34px);

  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  align-self: flex-end;
  width: 100%;
  transition: 250ms transform $rs-animation-standard-curve-timing-function;

  background-color: var(--rs-tab-indicator-content--background-color, $rs-theme-primary);
  height: var(--rs-tab-indicator-content--height, 2px);
}

.rs-tab-indicator__content {
  transform-origin: left;
  opacity: 0;
}

.rs-tab__ripple {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;
  @include rs-states(primary);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}



</style>

