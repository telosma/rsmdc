<template>
  <div class="rs-card__contents" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple';
export default {
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      new RSRipple(this.$el)
    })
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
@import "@rsmdc/shape/functions";
@import '@rsmdc/ripple/mixins';

@include rs-ripple-common;

.rs-card__contents {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative; // Needed to prevent the ripple wash from overflowing the container in IE and Edge
  outline: none;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  border-top-left-radius: var(--rs-card-contents--border-top-left-radius, rs-shape-prop-value(medium));
  border-top-right-radius: var(--rs-card-contents--border-top-right-radius, rs-shape-prop-value(medium));

  &[dir="rtl"],
  [dir="rtl"] & {
    border-top-left-radius: var(--rs-card-contents_rtl--border-top-left-radius, rs-shape-prop-value(medium));
    border-top-right-radius: var(--rs-card-contents_rtl--border-top-right-radius, rs-shape-prop-value(medium));
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  // ripple
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