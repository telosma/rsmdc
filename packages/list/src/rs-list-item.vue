<template>
  <li
    class="rs-list-item"
    :class="{ '-drawer': isDrawer, '-first': isFirstChild, '-last': isLastChild }"
    :selected="selected"
    :disabled="disabled"
    :activated="activated"
    ref="slotContainer">
    <slot></slot>
  </li>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'
 
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    activated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host: '',
      listHost: '',
      drawerHost: '',
      isDrawer: false,
      isFirstChild: false,
      isLastChild: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      this.listHost = this.host.parentNode
      this.drawerHost = this.host.parentNode.parentNode
    },
    drawerHost() {
      if(this.drawerHost.shadowRoot) {
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer__content') ? true : false
        const listItems = Array.from(this.listHost.childNodes).filter(child => child.nodeType == 1)
        const itemIndex = listItems.findIndex(item => item.isSameNode(this.host))
        this.isFirstChild = itemIndex === 0 ? true : false
        this.isLastChild = itemIndex === listItems.length - 1 ? true : false
      }
    },
  },
  mounted() {
    new RSRipple(this.$el)
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el
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
@import '../variables';
@import '@rsmdc/ripple/variables';
@import '@rsmdc/ripple/mixins';
@import '@rsmdc/typography/mixins';
@import '@rsmdc/drawer/variables';

:host([activated]),
:host([selected]) {
  --rs-list-item-graphic--color: #{$rs-theme-primary};
}

.rs-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  padding: 0 $rs-list-side-padding;
  overflow: hidden;

  color: var(--rs-menu-surface--color, var(--rs-list--color));
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

  &:focus {
    outline: none;
  }

  &:not(.-drawer) {
    @include rs-ripple-common;
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

  &[disabled] {
    --rs-list--color: #{rs-theme-ink-color-for-fill_(disabled, $rs-theme-background)};
  }

  &:not([disabled]) {
    cursor: pointer;
  }
}

.rs-ripple-upgraded {
  &:not([disabled]) {
    @include rs-ripple-surface;
    @include rs-ripple-radius-bounded;
    @include rs-ripple-upgraded_($rs-theme-on-surface);
  }
}

.rs-list-item[selected] {
  &:not([disabled]) {
    @include rs-ripple-upgraded_($rs-theme-primary);
    @include rs-states-selected($rs-theme-primary);
    --rs-menu-list-item-graphic--display: inline;

    color: var(--rs-list-item_not_disabled_selected--color, $rs-theme-primary);
    &::before {
      background-color: var(--rs-list-item_selected--background-color, $rs-theme-primary);
    }
  }
}

.rs-list-item[activated] {
  &:not([disabled]) {
    @include rs-ripple-upgraded_($rs-theme-primary);
    @include rs-states-activated($rs-theme-primary);
    --rs-list--color: #{$rs-theme-primary};
    --rs-menu-list-item-graphic--display: inline;
    color: var(--rs-list-item_not_disabled_activated--color, $rs-theme-primary);
    &::before {
      background-color: var(--rs-list-item_activated--background-color, $rs-theme-primary);
    }
  }
}

</style>

