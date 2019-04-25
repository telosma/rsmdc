<template>
  <header class="rs-top-app-bar">
    <div class="rs-top-app-bar__row">
      <div class="rs-top-app-bar__section" ref="slotContainer">
        <slot></slot>
      </div>
    </div>
  </header>
</template> 
<script>
import { RSTopAppBar } from '../index'
export default {
  data() {
    return {
      el: '',
      host: '',
      scrollTop: 0,
      windowScrollTop: 0,
      topLimit: -128
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.topAppBar) {
      window.__rsmdc.topAppBar = {
        navigations: [],
        titles: [],
        items: [],
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el

    window.onscroll = () => {
      let top = window.pageYOffset
      const diff = this.windowScrollTop - top

      if(top < this.windowScrollTop) {

        if(this.scrollTop === 0) {
          this.windowScrollTop = top
        } else {
          const scrollTopHarf = this.topLimit / 2
          const startTopPosition = this.scrollTop === this.topLimit ? scrollTopHarf : this.scrollTop + diff
          this.scrollTop  = startTopPosition > 0 ? 0 : startTopPosition
          this.el.style.top = `${this.scrollTop}px`
          this.windowScrollTop = top
        }

      } else {
        const moving = this.scrollTop + diff
        const startTopPosition = -top > this.topLimit 
          ? -top : moving < this.topLimit 
          ? this.topLimit : moving
        this.scrollTop = startTopPosition
        this.el.style.top = `${this.scrollTop}px`
        this.windowScrollTop = top    




        // if(-top > this.topLimit) {
        //   // this.scrollTop = -top
        //   this.el.style.top = `${this.scrollTop}px`
        //   this.windowScrollTop = top    
        // } else {
        //   const startTopPosition = this.scrollTop + diff
        //   this.scrollTop = startTopPosition< this.topLimit ? this.topLimit : startTopPosition
        //   // this.scrollTop = this.scrollTop + diff
        //   // this.scrollTop = this.scrollTop < this.topLimit ? this.topLimit : this.scrollTop
        //   this.el.style.top = `${this.scrollTop}px`
        //   this.windowScrollTop = top    
        // }

      }
    }
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
@import '../rs-top-app-bar';
@import '../variables';
@import '../../theme/variables';

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
  width: var(--rs-top-app-bar--width, 100%);
  position: var(--rs-top-app-bar--position, fixed);
  top: var(--rs-top-app-bar--top, 0);
  right: var(--rs-top-app-bar--right, 0);
  left: var(--rs-top-app-bar--left, 0);
  transition: var(--rs-top-app-bar--transition);
  padding-top: var(--rs-top-app-bar--padding-top);
  box-shadow: var(--rs-top-app-bar--box-shadow);

  &[dir="rtl"] {
    right: var(--rs-top-app-bar_rtl--right);
    left: var(--rs-top-app-bar_rtl--left);
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
}

::slotted(h1),
::slotted(h2) {
  @include rs-typography(headline6);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
  padding-right: 0;
  margin: 0; // override h1 h2 default style
  transition: var(--rs-top-app-bar-title--transition);
  opacity: var(--rs-top-app-bar-title--opacity);
  display: var(--rs-top-app-bar-title--display);
  padding-left: var(--rs-top-app-bar-title--padding-left, $rs-top-app-bar-title-left-padding);
  padding-bottom: var(--rs-top-app-bar-title--padding-bottom);
  align-self: var(--rs-top-app-bar-title--align-self);
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

</style>

