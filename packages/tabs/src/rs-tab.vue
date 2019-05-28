<template>
  <button class="rs-tab" role="tab">
    <span class="rs-tab__content">
      <span class="rs-tab__text-label" ref="slotContainer">
        <slot></slot>
      </span>
    </span>
    <!-- <span class="rs-tab-indicator">
      <span class="rs-tab-indicator__content rs-tab-indicator__content--underline" aria-hidden="true"/>
    </span> -->
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
    }
  },
  data() {
    return {
      el: '',
      host: ''
    }
  },
  watch: {
    activated() {
      this.toggleActivated(this.activated, this.el)
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.toggleActivated(this.activated, this.el, this.host)
      window.__rsmdc.tab.tabs.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.tab) {
      window.__rsmdc.tab = {
        tabs: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    new RSRipple(this.$el.querySelector('.rs-tab__ripple'))
    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    updateTabs() {
      const tabs = window.__rsmdc.tab.tabs
      tabs.forEach(tab => {
        const el = tab.shadowRoot.querySelector('.rs-tab')
        this.toggleActivated(tab.isEqualNode(this.host), el, this.host)
      })
    },
    toggleActivated(conditions, el, host) {
      if(conditions) {
        el.classList.add('-rs-activated')
      } else {
        el.classList.remove('-rs-activated')
      }
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
  position: relative;
}

:host([activated])::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  transition: 250ms transform $rs-animation-standard-curve-timing-function;
  height: var(--rs-tab-indicator--height, 2px);
  width: var(--rs-tab-indicator--width, 100%);
}

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

// activated tab
.-rs-activated {
  .rs-tab__text-label {
    color: var(--rs-tab-text-label--color, $rs-theme-primary);
    transition-delay: 100ms;
    opacity: 1;
  }
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
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  align-self: flex-end;
  width: 100%;

  &.rs-tab-indicator--fade > .rs-tab-indicator__content {
    transition: 150ms opacity linear;
  }

  &.rs-tab-indicator--active.rs-tab-indicator--fade > .rs-tab-indicator__content {
    transition-delay: 100ms;
  }
}

.rs-tab-indicator__content {
  transform-origin: left;
  opacity: 0;

  &.rs-tab-indicator__content--underline {
    align-self: flex-end;
    width: 100%;

    height: var(--rs-tab-indicator-content--height, 2px);
    background-color: var(--rs-tab-indicator-content--background-color, $rs-theme-primary);
    border-top-left-radius: var(--rs-tab-indicator-content--border-top-left-radius);
    border-top-right-radius: var(--rs-tab-indicator-content--border-top-right-radius);
  }
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

