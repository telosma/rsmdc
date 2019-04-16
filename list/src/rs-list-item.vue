<template>
  <li class="rs-list-item" :class="{ 'rs-list-item--selected': isSelected, 'rs-list-item--activated': isActivated, 'rs-list-item--disabled': isDisabled }" v-if="type === 'text'">
    <span class="rs-list-item__text">
      <slot></slot>
    </span>
  </li>
  <li class="rs-list-item" :class="{ 'rs-list-item--selected': isSelected, 'rs-list-item--activated': isActivated, 'rs-list-item--disabled': isDisabled }" v-else-if="type === 'meta'">
    <span class="rs-list-item__meta">
      <slot></slot>
    </span>
  </li>
  <li class="rs-list-item" :class="{ 'rs-list-item--selected': isSelected, 'rs-list-item--activated': isActivated, 'rs-list-item--disabled': isDisabled }" v-else-if="type === 'graphic'">
    <span class="rs-list-item__graphic" :role="role">
      <slot></slot>
    </span>
  </li>
  <li class="rs-list-divider" v-else-if="type === 'divider'"></li>
</template>
<script>
import { RSRipple } from '../../ripple'
 
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    role: {
      type: String,
      default: ''
    },
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
    Object.keys(this.$data).forEach(key => {
      const attr = key
        .toLowerCase()
        .replace(/is/, '')
      this.isEnableAttr(key, attr)
    })
  },
  methods: {
    isEnableAttr(key, attr) {
      this[key] = this[attr] === attr ? true: false
    }
  }
}
</script>

<style lang="scss">
@import '../rs-list';
@import '../rs-variables';

.rs-list-item {
  color: var(--rs-list--color);
  height: var(--rs-list-item--height, 48px);

  [dir="rtl"] &,
  &[dir="rtl"] {
    margin-left: var(--rs-list-item-graphic--margin-left);
    margin-right: var(--rs-list-item-graphic--margin-right);
  }

  &.rs-list-item--selected {
    @include rs-states-selected(primary);

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

  > .rs-list-item__graphic {
    color: var(--rs-list-item-graphic--color, rs-theme-ink-color-for-fill_(icon, $rs-theme-background));
    background-color: var(--rs-list-item-graphic--background-color, transparent);
    margin-left: var(--rs-list-item-graphic--margin-left, 0);
    margin-right: var(--rs-list-item-graphic--margin-right, 32px);
    width: var(--rs-list-item-graphic--width);
    height: var(--rs-list-item-graphic--height);
    border-radius: var(--rs-list-item-graphic--border-radius);
  }

  > .rs-list-item__meta {
    color: var(--rs-list-item-meta--color, rs-theme-ink-color-for-fill_(hint, $rs-theme-background));
  }

  > .rs-text {
    align-self: var(--rs-list-item-text--align-self);
  }

  > .rs-list-item__text > .rs-list-item__primary-text {
    display: var(--rs-list-item-primary-text--dispaly, block);
    margin-top: var(--rs-list-item-primary-text--margin-top, 0);
    line-height: var(--rs-list-item-primary-text--line-height, normal);
    margin-bottom: var(--rs-list-item-primary-text--margin-bottom, -1 * $item-secondary-text-baseline-height);

    &::before {
      vertical-align: var(--rs-list-item-primary-text_before--vertical-align, 0);
      display: var(--rs-list-item-primary-text_before--dispaly, inline-block);
      width: var(--rs-list-item-primary-text_before--width, 0);
      height: var(--rs-list-item-primary-text_before--height, $item-primary-text-baseline-height);
      content: var(--rs-list-item-primary-text_before--content, '');
    }

    &::after {
      vertical-align: var(--rs-list-item-primary-text_after--vertical-align, -1 * $item-secondary-text-baseline-height);
      display: var(--rs-list-item-primary-text_after--dispaly, inline-block);
      width: var(--rs-list-item-primary-text_after--width, 0);
      height: var(--rs-list-item-primary-text_after--height, $item-secondary-text-baseline-height);
      content: var(--rs-list-item-primary-text_after--content, '');
    }
  }

  > .rs-list-item__text > .rs-list-item__secondary-text {
    color: var(--rs-list-item-secondary-text--color, rs-theme-ink-color-for-fill_(secondary, $rs-theme-background));
    display: var(--rs-list-item-primary-text--dispaly, block);
    margin-top: var(--rs-list-item-primary-text--margin-top, 0);
    line-height: var(--rs-list-item-primary-text--line-height, normal);

    &::before {
      vertical-align: var(--rs-list-item-primary-text_before--vertical-align, 0);
      display: var(--rs-list-item-primary-text_before--dispaly, inline-block);
      width: var(--rs-list-item-primary-text_before--width, 0);
      height: var(--rs-list-item-primary-text_before--height, $item-secondary-text-baseline-height);
      content: var(--rs-list-item-primary-text_before--content, '');
    }
  }
}

.rs-list-divider {
  $divider-color: if(
    rs-theme-tone($rs-theme-background) == "dark",
    $rs-list-divider-color-on-dark-bg,
    $rs-list-divider-color-on-light-bg
  );
  border-bottom-color: var(--rs-list-divider--border-bottom-color, $divider-color);
}

</style>

