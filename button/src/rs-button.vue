<template>
  <button class="rs-button" :disabled="isEnableDisabled">
    <slot></slot>
  </button>
</template>
<script>
import { RSRipple } from '/Users/gotoukoharu/workspace/@rsmdc/ripple/assets'

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
  watch : {
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
@import '../assets/rs-button';
@import '../assets/rs-mixins';

.rs-button {
  // base
  @include set-rs-feat-color(color, var(--rs-button--color, #{$rs-theme-primary}));
  @include set-rs-feat-structure(padding, var(--rs-button--padding, 0 #{$rs-button-horizontal-padding} 0 #{$rs-button-horizontal-padding}));
  @include set-rs-feat-structure(border-radius, var(--rs-button--border-radius, 4px));
  @include set-rs-feat-structure(font-size, var(--rs-button--font-size, 0.875rem));
  @include set-rs-feat-structure(box-shadow, var(--rs-button--box-shadow, none));
  @include set-rs-feat-structure(height, var(--rs-button--height, 36px));

  // button-type
  @include set-rs-feat-structure(border-width, var(--rs-button--border-width));
  @include set-rs-feat-structure(border-style, var(--rs-button--border-style));
  @include set-rs-feat-animation(transition, var(--rs-button--transition));


  &:hover,
  &:focus {
    @include set-rs-feat-structure(box-shadow, var(--rs-button_hover--box-shadow));
    @include set-rs-feat-structure(box-shadow, var(--rs-button_focus--box-shadow));
  }


  &:active {
    @include set-rs-feat-structure(box-shadow, var(--rs-button_active--box-shadow, none));
  }


  &:not(:disabled) {
    @include set-rs-feat-color(background-color, var(--rs-button_not_disabled--background-color, transparent));
    @include set-rs-feat-color(color, var(--rs-button_not_disabled--color, #{$rs-theme-primary}));
    @include set-rs-feat-color(border-color, var(--rs-button_not_disabled--border-color, none));
  }


  &:disabled {
    @include set-rs-feat-structure(box-shadow, var(--rs-button_disabled--box-shadow));
    @include set-rs-feat-color(background-color, var(--rs-button_disabled--background-color, transparent));
    @include set-rs-feat-color(color, var(--rs-button_disabled--color, #{$rs-button-disabled-ink-color}));
    @include set-rs-feat-color(border-color, var(--rs-button_disabled--border-color));
  }


  &::before{
    @include set-rs-feat-color(background-color, var(--rs-ripple_before--background-color, $rs-theme-primary));
    @include set-rs-feat-structure(content, var(--rs-ripple_before--content, ''));
  }


  &::after {
    @include set-rs-feat-color(background-color, var(--rs-ripple_after--background-color, #{$rs-theme-primary}));
    @include set-rs-feat-structure(content, var(--rs-ripple_after--content, ''));
  }


  &:hover::before {
    @include set-rs-feat-structure(opacity, var(--rs-ripple_hover_before--opacity, rs-states-opacity(primary, hover)));
  }


  &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
    @include set-rs-feat-animation(transition-duration, var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms));
    @include set-rs-feat-structure(opacity, var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(primary, focus)));
  }

  &.rs-ripple-upgraded--background-focused::before {
    @include set-rs-feat-animation(transition-duration, var(--rs-upgraded_-background-focused_before--transition-duration, 75ms));
    @include set-rs-feat-structure(opacity, var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(primary, focus)));
  }

  &:not(.rs-ripple-upgraded) {
    &::after {
      @include set-rs-feat-animation(transition, var(--rs-ripple_not-upgraded_after--transition, opacity #{$rs-ripple-fade-out-duration} linear));
    }

    &:active::after {
      @include set-rs-feat-animation(transition-duration, var(--rs-ripple_not-upgraded_active_after--transition-duration, #{$rs-ripple-fade-in-duration}));
      @include set-rs-feat-structure(opacity, var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(primary, press)));
    }
  }


  &.rs-ripple-upgraded {
    @include set-rs-feat-color(--rs-ripple-fg-opacity, var(--rs-ripple-upgraded--rs-ripple-fg-opacity, rs-states-opacity(primary, press)));
  }

}
</style>

