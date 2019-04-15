<template>
  <button class="rs-button" :disabled="isEnableDisabled">
    <slot></slot>
  </button>
</template>
<script>
import { RSRipple } from '../../ripple'

export default {
  props: {
    disabled: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEnableDisabled: false
    }
  },
  watch: {
    disabled: function() {
      this.isDisabled()
    }
  },
  mounted() {
    new RSRipple(this.$el)
    this.isDisabled()
  },
  methods: {
    isDisabled() {
      this.isEnableDisabled = this.disabled === 'disabled' ? true : false 
    }
  }
}
</script>
<style lang="scss">
@import '../rs-button';

.rs-button {
  // base
  padding: var(--rs-button--padding, 0 $rs-button-horizontal-padding 0 $rs-button-horizontal-padding);
  border-radius: var(--rs-button--border-radius, 4px);
  font-size: var(--rs-button--font-size, 0.875rem);
  box-shadow: var(--rs-button--box-shadow, none);
  height: var(--rs-button--height, 36px);

  // button-type
  border-width: var(--rs-button--border-width);
  border-style: var(--rs-button--border-style);
  transition: var(--rs-button--transition);

  &:hover {
    box-shadow: var(--rs-button_hover--box-shadow);
  }

  &:focus {
    box-shadow: var(--rs-button_focus--box-shadow);
  }

  &:active {
   box-shadow: var(--rs-button_active--box-shadow, none);
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

