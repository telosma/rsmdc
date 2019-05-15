<template>
  <div
    class="rs-menu rs-menu-surface"
    :class="{ 'rs-menu-surface--open' : opened, 'rs-menu-surface--animating-open': animatingOpen, 'rs-menu-surface--animating-closed': animatingClosed }"
    ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      animatingOpen: false,
      animatingClosed: false,
    }
  },
  watch: {
    opened() {
      if(this.opened) {
        this.openMenu()
      } else {
        this.closeMenu()
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    openMenu() {
      this.animatingOpen = true
      setTimeout(() => {
        this.animatingOpen = false
      }, 10)
    },
    closeMenu() {
      this.animatingClosed = true
      setTimeout(() => {
        this.animatingClosed = false
      }, 10)
    }
  }
}
</script>

<style lang="scss">
@import '../mixins';

:host {
  position: absolute;
}
@include rs-ripple-common();

.rs-menu {
  --rs-menu-list-item-meta--color: #{rs-theme-ink-color-for-fill_(primary, $rs-theme-background)};
  --rs-menu-list-item-graphic--color: #{rs-theme-ink-color-for-fill_(primary, $rs-theme-background)};
  --rs-menu-list-divider--margin: 8px 0;
  --rs-menu-list-item--cursor: pointer;
  --rs-menu-list-item--user-select: none;
  --rs-menu-list-item-disabled--cursor: auto;

  min-width: $rs-menu-min-width;
  width: var(--rs-menu--width);

  &.rs-menu-surface {
    color: var(--rs-menu-surface--color, $rs-theme-on-surface);
    background-color: var(--rs-menu-surface--background-color, $rs-theme-surface);
    border-radius: var(--rs-menu-surface--border-radius, rs-shape-radius(medium));
    display: var(--rs-menu-surface--display, none);
    transform: var(--rs-menu-surface--transform, scale(1));
    opacity: var(--rs-menu-surface--opacity, 0);

    [dir="rtl"] &,
    &[dir="rtl"] {
      border-radius: var(--rs-menu-surface_rtl--border-radius, rs-shape-rtl-radius(medium, false));
    }
  }
}

.rs-menu-surface {
  @include rs-menu-surface-base_();
  box-shadow: #{rs-elevation(8)};
  min-width: $rs-menu-min-width;

  @include rs-rtl-reflexive-property(transform-origin, top left, top right);
}

</style>

