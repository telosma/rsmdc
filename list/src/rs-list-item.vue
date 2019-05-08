<template>
  <li
    class="rs-list-item"
    :class="{ 'rs-list-item--selected': isSelected, 'rs-list-item--activated': isActivated, 'rs-list-item--disabled': isDisabled, '-drawer': isDrawer, '-first': isFirstChild, '-last': isLastChild }"
    ref="slotContainer">
    <slot></slot>
  </li>
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
      el: '',
      host: '',
      listHost: '',
      drawerHost: '',
      isDrawer: false,
      isSelected: false,
      isActivated: false,
      isDisabled: false,
      isFirstChild: false,
      isLastChild: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      this.drawerHost = this.host.parentNode.parentNode
    },
    drawerHost() {
      if(this.drawerHost.shadowRoot) {
        this.listHost = this.host.parentNode
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer') ? true : false
        const listItems = Array.from(this.listHost.childNodes).filter(child => child.nodeType == 1)
        const itemIndex = listItems.findIndex(item => item.isSameNode(this.host))
        this.isFirstChild = itemIndex === 0 ? true : false
        this.isLastChild = itemIndex === listItems.length - 1 ? true : false
      }
    },
    isSelected() {
      this.isEnableAttr('isSelected', 'selected')
    },
    isActivated() {
      this.isEnableAttr('isActivated', 'activated')
    },
    isDisabled() {
      this.isEnableAttr('isDisabled', 'disabled')
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.list) {
      window.__rsmdc.list = {
        lists: [],
        items: [],
      }
    }
  },
  mounted() {
    new RSRipple(this.$el)
    this.checkAttrs()
    this.el = this.$el
    this.$nextTick().then(this.fixSlot.bind(this))
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
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
@import '../mixins';
@import '../../ripple/variables';
@import '../../ripple/mixins';
@import '../../typography/mixins';
@import '../../drawer/variables';

.rs-list-item {
  @include rs-list-item-base_;
  color: var(--rs-menu-surface--color, var(--rs-drawer-list-item--color, var(--rs-list--color)));
  height: var(--rs-list-item__drawer--height, var(--rs-list-item--height, 48px));
  align-items: var(--rs-list-item--align-items, center);
  border-radius: var(--rs-list-item--border-radius);
  cursor: var(--rs-menu-list-item--cursor);
  user-select: var(--rs-menu-list-item--user-select);
  padding: var(--rs-list-item__drawer--padding);
  padding-left: var(--rs-menu-list-item--padding-left, $rs-list-side-padding);
  padding-right: var(--rs-menu-list-item--padding-right, $rs-list-side-padding);
  margin: var(--rs-list-item__drawer--margin);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-list-item_rtl--border-radius);
    margin-left: var(--rs-list-item--margin-left);
    margin-right: var(--rs-list-item--margin-right);
  }

  &:not(.-drawer) {
    @include rs-list-ripple;
  }

  &.-drawer {
    @include rs-typography(subtitle2);
    --rs-list-item__drawer--height: calc(48px - 2 * #{$rs-drawer-list-item-spacing});
    --rs-list-item__drawer--margin: #{($rs-drawer-list-item-spacing * 2) 8px};
    --rs-list-item__drawer--padding: #{0 $rs-drawer-surface-padding / 2};
  }

  &.-first {
    margin-top: 2px;
  }

  &.-last {
    margin-bottom: 0;
  }

  &.rs-list-item--selected {
    @include rs-states-selected(primary);
    @include rs-list-item-primary-text-ink-color($rs-theme-primary);
    @include rs-list-item-graphic-ink-color($rs-theme-primary);
    --rs-menu-list-item-graphic--display: inline;

    &::before {
      opacity: var(--rs-selected_before--opacity);
    }
  }

  &.rs-list-item--activated {
    @include rs-states-activated(primary);
    @include rs-list-item-primary-text-ink-color($rs-theme-primary);
    @include rs-list-item-graphic-ink-color($rs-theme-primary);

    &::before {
      opacity: var(--rs-activated_before--opacity);
    }
  }

  &.rs-list-item:not(.rs-list-item--disabled) {
    @include rs-ripple-surface;
    @include rs-ripple-radius-bounded;
  }

  &.rs-list-item--disabled {
    @include rs-list-item-primary-text-ink-color(rs-theme-ink-color-for-fill_(disabled, $rs-theme-background));
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

