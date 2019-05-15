<template>
  <div>
    <header class="rs-top-app-bar"
      :class="{ 'rs-top-app-bar--fixed-scrolled' : isScrolled && isFixed, 'rs-top-app-bar--short-collapsed' : isScrolled && isShort, 'rs-top-app-bar--has-action-item' : (isScrolled && isShort && hasActionItem) || (isCollapsed && hasActionItem), '-rs-drawer': isDrawer }"
      :style="{ 'top': top }">
      <div class="rs-top-app-bar__row">
        <div class="rs-top-app-bar__section" ref="slotContainer">
          <slot></slot>
        </div>
      </div>
    </header>
    <div class="content"></div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      hostParent: '',
      lastChild: '',
      topLimit: '',
      top: 0,
      scrollTop: 0,
      windowScrollTop: 0,
      isDrawer: false,
      isScrolled: false,
      isFixed: false,
      isShort: false,
      isCollapsed: false,
      isProminent: false,
      hasActionItem: false,
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.parentNode.host
      this.hostParent = this.host.parentNode
    },
    host() {
      const appBarHeight = 56
      const withProminentHeight = 128

      this.isFixed = this.getElementProperty(this.host, '--rs-top-app-bar__fixed') ? true : false
      this.isShort = this.getElementProperty(this.host, '--rs-top-app-bar__short') ? true : false
      this.isCollapsed = this.getElementProperty(this.host, '--rs-top-app-bar__collapsed') ? true : false
      this.isProminent = this.getElementProperty(this.host, '--rs-top-app-bar__prominent') ? true : false
      this.topLimit = this.isProminent ? -(withProminentHeight * 2) : -(appBarHeight * 2)
    },
    hostParent() {
      this.isDrawer = this.getElementProperty(this.hostParent, '--rs-top-app-bar_-drawer') ? true : false
    },
    lastChild() { 
      const appBarHeight = 56
      const appBarPadding = 12
      const withCollapsedPadding = 4

      this.hasActionItem = this.getElementProperty(this.lastChild, '--_rs-top-app-bar-actions') === 'true' ? true : false

      if(this.hasActionItem) {
        const actionItemLengh = Array.from(this.lastChild.childNodes).filter(child => child.nodeType === 1).length
        const withCollapsedWidth = (appBarHeight * actionItemLengh) + appBarHeight - appBarPadding + withCollapsedPadding 
        this.$el.style.cssText = `--rs-top-app-bar__collapsed--width: ${withCollapsedWidth}px;`
      }
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.topAppBar) {
      window.__rsmdc.topAppBar = {
        topAppBars: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el.querySelector('.rs-top-app-bar')

    const slotChildren = this.$el.querySelector('.rs-top-app-bar__section').childNodes
    this.lastChild = Array.from(slotChildren).pop()

    window.onscroll = () => {
      let top = window.pageYOffset
      const diff = this.windowScrollTop - top
      this.isScrolled = top > 0

      if(this.isFixed || this.isShort) { return }

      if(this.isDrawer) {
        if(top < this.windowScrollTop) {
          const startTopPosition = top + this.topLimit
          this.scrollTop = this.scrollTop === 0 
            ? startTopPosition : this.scrollTop >= top
            ? top : this.scrollTop + diff
          this.scrollTop = this.scrollTop < 0 ? 0 : this.scrollTop
          this.top = `${this.scrollTop}px`
        } else {
          this.scrollTop = 0
        }

        this.windowScrollTop = top
      } else {
        if(top < this.windowScrollTop) {

          if(this.scrollTop === 0) {
            this.windowScrollTop = top
            return
          }

          const scrollTopHarf = this.topLimit / 2
          const startTopPosition = this.scrollTop === this.topLimit ? scrollTopHarf : this.scrollTop + diff
          this.scrollTop  = startTopPosition > 0 ? 0 : startTopPosition
          this.top = `${this.scrollTop}px`
          this.windowScrollTop = top

        } else {
          const moving = this.scrollTop + diff
          const startTopPosition = -top > this.topLimit 
            ? -top : moving < this.topLimit 
            ? this.topLimit : moving
          this.scrollTop = startTopPosition
          this.top = `${this.scrollTop}px`
          this.windowScrollTop = top    
        }
      }
    }
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
@import '../mixins';
@import '../variables';
@import '../../drawer/variables';
@import '../../theme/variables';
@import '../../elevation/mixins';
@import '../../animation/variables';

.rs-top-app-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 4;
  color: var(--rs-top-app-bar--color, $rs-theme-on-primary);
  background-color: var(--rs-top-app-bar--background-color, $rs-theme-primary);
  border-radius: var(--rs-top-app-bar--border-radius);

  // types
  width: var(--rs-top-app-bar--width);
  position: var(--rs-top-app-bar--position, fixed);
  top: var(--rs-top-app-bar--top, 0);
  right: var(--rs-top-app-bar--right, 0);
  left: var(--rs-top-app-bar--left, 0);
  transition: var(--rs-top-app-bar--transition);
  padding-top: var(--rs-top-app-bar--padding-top);
  box-shadow: var(--rs-top-app-bar--box-shadow);
  margin-left: var(--rs-app-layout-content--margin-left);

  &[dir="rtl"] {
    right: var(--rs-top-app-bar_rtl--right);
    left: var(--rs-top-app-bar_rtl--left);
  }

  &.rs-top-app-bar--fixed-scrolled {
    --rs-top-app-bar--box-shadow: #{rs-elevation(4)};
    --rs-top-app-bar--transition: box-shadow 200ms linear;
  }

  &.rs-top-app-bar--short-collapsed {
    @include rs-top-app-bar-short-shape-radius(24px);
    --rs-top-app-bar--width: var(--rs-top-app-bar__collapsed--width, #{$rs-top-app-bar-short-collapsed-width});
    --rs-top-app-bar--transition: #{width 300ms $rs-animation-standard-curve-timing-function};

    --rs-top-app-bar--box-shadow: #{rs-elevation(4)};
    --rs-top-app-bar_media--transition: #{width 250ms $rs-animation-standard-curve-timing-function};
    --rs-top-app-bar__collapsed--padding-right: 12px;
    --rs-top-app-bar__collapsed--padding-left: 0;
    --rs-top-app-bar__collapsed--margin-left: 0;

    --rs-top-app-bar-title--display: none;
    --rs-top-app-bar-actionItem--transition: #{padding 150ms $rs-animation-standard-curve-timing-function};
    --rs-top-app-bar-actionItem--padding-right: var(--rs-top-app-bar__collapsed-actionItems--padding-right);
  }

  &.rs-top-app-bar--has-action-item {
    --rs-top-app-bar--width: var(--rs-top-app-bar__collapsed--width);
  }

  &.-rs-drawer {
    position: absolute;

    &.rs-top-app-bar--fixed-scrolled,
    &.rs-top-app-bar--short-collapsed {
      position: fixed;
      margin-left: var(--rs-app-layout-content--margin-left, $rs-drawer-width);
    }
  }
}

.rs-top-app-bar__row {
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: var(--rs-top-app-bar-row--height, $rs-top-app-bar-row-height);
}

.rs-top-app-bar__section {
  $padding: $rs-top-app-bar-section-vertical-padding $rs-top-app-bar-section-horizontal-padding;

  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  z-index: 1;
  padding: var(--rs-top-app-bar-section--padding, $padding);
  padding-right: var(--rs-top-app-bar__collapsed--padding-right, $rs-top-app-bar-section-horizontal-padding);
}

@media (max-width: $rs-top-app-bar-mobile-breakpoint) {
  .rs-top-app-bar {
    transition: var(--rs-top-app-bar_media--transition);
    padding-top: var(--rs-top-app-bar_media--padding-top);
    padding-right: var(--rs-top-app-bar_media--padding-right);
    padding-left: var(--rs-top-app-bar_media--padding-left);
  }

  .rs-top-app-bar__row {
    height: $rs-top-app-bar-mobile-row-height;
  }

  .rs-top-app-bar__row > .rs-top-app-bar__section {
    padding: $rs-top-app-bar-mobile-section-padding;
  }
}

.content {
  padding-top: var(--rs-top-app-bar-content--padding-top, $rs-top-app-bar-row-height);
}

</style>