<template>
  <li
    class="rs-list-item"
    :class="{ 'rs-list-item--selected': isSelected, 'rs-list-item--activated': isActivated, 'rs-list-item--disabled': isDisabled }"><slot></slot></li>
</template>
<script>
import { RSRipple } from '../../ripple'
 
export default {
  props: {
    selected: {
      type: String,
      default: ''
    },
    activated: {
      type: String,
      default: ''
    },
    disabled: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSelected: false,
      isActivated: false,
      isDisabled: false
    }
  },
  watch: {
    selected() {
      this.isEnableAttr('isSelected', 'selected')
    },
    activated() {
      this.isEnableAttr('isActivated', 'activated')
    },
    disabled() {
      this.isEnableAttr('isDisabled', 'disabled')
    }
  },
  mounted() {
    new RSRipple(this.$el)
    this.checkAttrs()
  },
  methods: {
    isEnableAttr(key, attr) {
      this[key] = this[attr] === attr ? true: false
    },
    checkAttrs() {
      Object.keys(this.$data).forEach(key => {
        const attr = key
          .toLowerCase()
          .replace(/is/, '')
        this.isEnableAttr(key, attr)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../rs-list';

.rs-list-item {
  color: var(--rs-menu-surface--color, var(--rs-list--color));
  height: var(--rs-list-item--height, 48px);
  align-items: var(--rs-list-item--align-items, center);
  border-radius: var(--rs-list-item--border-radius);
  cursor: var(--rs-menu-list-item--cursor);
  user-select: var(--rs-menu-list-item--user-select);
  padding-left: var(--rs-menu-list-item--padding-left, $rs-list-side-padding);
  padding-right: var(--rs-menu-list-item--padding-right, $rs-list-side-padding);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-list-item_rtl--border-radius);
    margin-left: var(--rs-list-item--margin-left);
    margin-right: var(--rs-list-item--margin-right);
  }

  &.rs-list-item--selected {
    @include rs-states-selected(primary);
    --rs-menu-list-item-graphic--display: inline;

    &::before {
      opacity: var(--rs-selected_before--opacity);
    }
  }

  &.rs-list-item--activated {
    @include rs-states-activated(primary);

    &::before {
      opacity: var(--rs-activated_before--opacity);
    }
  }
  
  // ripple
  &:not(.rs-list-item--disabled) {
    cursor: var(--rs-list-item--cursor, pointer);

    &::before{
      background-color: var(--rs-ripple_before--background-color, $rs-theme-on-surface);
      content: var(--rs-ripple_before--content, '');
    }

    &::after {
      background-color: var(--rs-ripple_after--background-color, $rs-theme-on-surface);
      content: var(--rs-ripple_after--content, '');
    }

    &:hover::before {
      opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity(on-surface, hover));
    }

    &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
      transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
      opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(on-surface, focus));
    }

    &.rs-ripple-upgraded--background-focused::before {
      transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
      opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(on-surface, focus));
    }

    &:not(.rs-ripple-upgraded) {
      &::after {
        transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
      }

      &:active::after {
        transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
        opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(on-surface, press));
      }
    }

    &.rs-ripple-upgraded {
      --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity(on-surface, press)});
    }
  }
}
</style>

