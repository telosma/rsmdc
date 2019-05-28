<template>
  <button class="rs-tab" :class="{ '-rs-activated': areaSelected }" role="tab">
    <span class="rs-tab__content">
      <span class="rs-tab__text-label" :class="{ '-rs-no-text': hasText }" ref="slotContainer">
        <slot></slot>
      </span>
    </span>
    <span class="rs-tab__ripple" />
  </button>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
    activated: {
      type: Boolean,
      default: false
    },
    areaSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasText: false
    }
  },
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const texts = Array.from(this.$el.querySelector('slot').assignedNodes())
        this.hasText = texts.length === 0 ? true : false
      })
    new RSRipple(this.$el.querySelector('.rs-tab__ripple'))
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
@import "../variables";
@import "@rsmdc/ripple/mixins";
@import "@rsmdc/rtl/mixins";
@import "@rsmdc/theme/variables";
@import "@rsmdc/typography/mixins";

@include rs-ripple-common;

:host {
  flex: var(--rs-tab--flex, 1 0 auto);
}

.rs-tab {
  @include rs-typography(button);

  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: var(--rs-tab--height, $rs-tab-height);
  padding: 0 24px;
  border: none;
  outline: none;
  background: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  z-index: 1;
  width: 100%;
  margin: auto;
}

// activated tab
.-rs-activated {

  > .rs-tab__ripple {

    &:hover::before {
      opacity: rs-states-opacity(primary, focus);
    }

    &:focus::before {
      background-color: var(--rs-ripple_before--background-color, $rs-theme-primary);
      content: var(--rs-ripple_before--content, '');
      opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(primary, focus));
    }

    &:focus::after {
      background-color: var(--rs-ripple_after--background-color, $rs-theme-primary);
      content: var(--rs-ripple_after--content, '');
    }
  }

  .rs-tab__text-label {
    color: var(--rs-tab-text-label--color, $rs-theme-primary);
    transition-delay: 100ms;
    opacity: 1;
  }
}

.rs-tab__content {
  position: relative;
  display: flex;
  justify-content: center;
  height: inherit;
  pointer-events: none;

  align-items: var(--rs-tab--align-items, center);

  &::before {
    width: 24px;
    height: 24px;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;

    content: var(--rs-tab-content_before--content);
    background-image: var(--rs-tab-content_before--background-image);
    position: var(--rs-tab-content_before--position);
    top: var(--rs-tab-content_before--top);
  }

  &::after {
    width: 24px;
    height: 24px;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;

    content: var(--rs-tab-content_after--content);
    background-image: var(--rs-tab-content_after--background-image);
  }
}

.rs-tab__text-label {
  display: inline-block;
  opacity: $rs-tab-text-label-opacity;
  line-height: 1;
  transition: 150ms color linear, 150ms opacity linear;
  z-index: 2;

  color: var(--rs-tab-text-label--color, $rs-theme-on-surface);
  padding-right: var(--rs-tab-text-label--padding-right);
  padding-left: var(--rs-tab-text-label--padding-left);
  margin-bottom: var(--rs-tab-text-label--margin-bottom);

  &.-rs-no-text {
    padding-right: 0;
    padding-left: 0;
  }
}

.rs-tab__ripple {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

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

