<template>
  <button
    class="rs-button"
    :class="{ '-rs-button': !isIcon && !isFab, '-rs-icon': isIcon, '-rs-fab': isFab }"
    :disabled="disabled" ref="slotContainer">
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
    },
    exited: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host: '',
      ripple: '',
      isIcon: false,
      isFab: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.isFab = this.getElementProperty(this.host, '--rs-button__fab') ? true : false
      this.isIcon = this.getElementProperty(this.host, '--rs-button__icon') ? true : false
      if(this.isIcon) {
        this.ripple.unbounded = true
      }
    },
    exited() {
      if(this.exited) {
        this.el.classList.add('-rs-fab-exited')
      }else {
        this.el.classList.remove('-rs-fab-exited')
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.ripple = new RSRipple(this.$el)
    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
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
  @include rs-typography(button);
  @include rs-ripple-radius-bounded;

  // base
  position: relative;
  align-items: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  /* @alternate */
  line-height: inherit;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: var(--rs-button--border-radius);
  font-size: var(--rs-button--font-size);
  box-shadow: var(--rs-button--box-shadow);
  height: var(--rs-button--height);
  padding: var(--rs-button--padding);
  padding-right: var(--rs-button--padding-right);
  padding-left: var(--rs-button--padding-left);
  padding-top: var(--rs-button--padding-top);
  padding-bottom: var(--rs-button--padding-bottom);

  // button type
  justify-content: var(--rs-button--justify-content);
  display: var(--rs-button--display);
  border-width: var(--rs-button--border-width);
  border-style: var(--rs-button--border-style);
  transition: var(--rs-button--transition);
  opacity: var(--rs-button--opacity);
  fill: var(--rs-button--fill);
  cursor: var(--rs-button--cursor);
  -moz-appearance: var(--rs-button--moz-appearance);
  color: var(--rs-button--color);
  background-color: var(--rs-button--background-color);
  width: var(--rs-button--width);
  min-width: var(--rs-button--min-width);
  max-width: var(--rs-button--max-width);
  text-decoration: var(--rs-button--text-decoration);
  text-overflow: var(--rs-button--text-overflow);
  white-space: var(--rs-button--white-space);

  // icon
  background-repeat: var(--rs-button--background-repeat);
  background-image: var(--rs-button--background-image);
  background-position: var(--rs-button--background-position);
  background-size: var(--rs-button--background-size);

  &.-rs-fab-exited {
    transform: scale(0);
    transition:
      opacity 15ms linear 150ms,
      rs-animation-exit-permanent(transform, 180ms);
    opacity: 0;
  }

  &.-rs-icon {
    @include rs-ripple-radius-unbounded;
  }

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-button_rtl--border-radius);
  }

  &::-moz-focus-inner {
    padding: var(--rs-button_moz-focus-inner--padding);
    border: var(-rs-button_moz-focus-inner--border);
  }

  &:hover {
    box-shadow: var(--rs-button_hover--box-shadow);
    cursor: pointer;
  }

  &:focus {
    box-shadow: var(--rs-button_focus--box-shadow);
    outline: var(--rs-button_focus--outline);
  }

  &:active {
    box-shadow: var(--rs-button_active--box-shadow);
    outline: none;
  }

  &:not(:disabled) {
    background-color: var(--rs-button_not_disabled--background-color);
    color: var(--rs-button_not_disabled--color);
    border-color: var(--rs-button_not_disabled--border-color);
  }

  &:disabled {
    cursor: default;
    pointer-events: none;    
    box-shadow: var(--rs-button_disabled--box-shadow);
    background-color: var(--rs-button_disabled--background-color, transparent);
    color: var(--rs-button_disabled--color, $rs-button-disabled-ink-color);
    border-color: var(--rs-button_disabled--border-color);
    opacity: var(--rs-button_disabled--opacity);
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

