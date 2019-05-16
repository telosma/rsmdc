<template>
  <button class="rs-button" :disabled="disabled" ref="slotContainer">
    <slot></slot>
  </button>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    new RSRipple(this.$el)
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
@import '@rsmdc/ripple/mixins';
@import '@rsmdc/typography/mixins';
@import '@rsmdc/theme/mixins';
@import '@rsmdc/shape/functions';
@import '../variables';

@include rs-ripple-common;

.rs-button {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;
  @include rs-typography(button);

  // base
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  height: $rs-button-height;
  border: none;
  outline: none;
  /* @alternate */
  line-height: inherit;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: var(--rs-button--border-radius, 4px);
  font-size: var(--rs-button--font-size, 0.875rem);
  box-shadow: var(--rs-button--box-shadow, none);
  height: var(--rs-button--height, 36px);
  padding-right: var(--rs-button--padding-right, $rs-button-horizontal-padding);
  padding-left: var(--rs-button--padding-left, $rs-button-horizontal-padding);
  padding-top: var(--rs-button--padding-top, 0);
  padding-bottom: var(--rs-button--padding-bottom, 0);

  // button-type
  border-width: var(--rs-button--border-width);
  border-style: var(--rs-button--border-style);
  transition: var(--rs-button--transition);

  // icon
  background-repeat: var(--rs-button--background-repeat);
  background-image: var(--rs-button--background-image);
  background-position: var(--rs-button--background-position);
  background-size: var(--rs-button--background-size);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-button_rtl--border-radius, rs-shape-rtl-radius(medium, false));
  }

  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  &:hover {
    box-shadow: var(--rs-button_hover--box-shadow);
    cursor: pointer;
  }

  &:focus {
    box-shadow: var(--rs-button_focus--box-shadow);
  }

  &:active {
    box-shadow: var(--rs-button_active--box-shadow, none);
    outline: none;
  }

  &:not(:disabled) {
    background-color: var(--rs-button_not_disabled--background-color, transparent);
    color: var(--rs-button_not_disabled--color, $rs-theme-primary);
    border-color: var(--rs-button_not_disabled--border-color, none);
  }

  &:disabled {
    box-shadow: var(--rs-button_disabled--box-shadow);
    background-color: var(--rs-button_disabled--background-color, transparent);
    color: var(--rs-button_disabled--color, $rs-button-disabled-ink-color);
    border-color: var(--rs-button_disabled--border-color);
    cursor: default;
    pointer-events: none;    
  }

  &::before{
    background-color: var(--rs-ripple_before--background-color, $rs-theme-primary);
    content: var(--rs-ripple_before--content, '');
  }

  &::after {
    background-color: var(--rs-ripple_after--background-color, $rs-theme-primary);
    content: var(--rs-ripple_after--content, '');
  }

  &:hover::before {
    opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity(primary, hover));
  }

  &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
    transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
    opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(primary, focus));
  }

  &.rs-ripple-upgraded--background-focused::before {
    transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
    opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(primary, focus));
  }

  &:not(.rs-ripple-upgraded) {
    &::after {
      transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
    }

    &:active::after {
      transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
      opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(primary, press));
    }
  }

  &.rs-ripple-upgraded {
    --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity(primary, press)});
  }

}
</style>

