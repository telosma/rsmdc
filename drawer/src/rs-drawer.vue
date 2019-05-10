<template>
  <div class="rs-drawer-content">
    <div
      class="rs-drawer"
      :class="{ 'rs-drawer--open': isOpen, 'rs-drawer--opening': isOpening, 'rs-drawer--animate': isAnimate, 'rs-drawer--closing' : isClosing }"
      ref="slotContainer">
      <slot></slot>
    </div>
    <div :class="{ 'rs-drawer-scrim': isModal }" @click="closeOverLay"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      hostParent: '',
      isModal: false,
      isDismissible: false,
      isOpen: false,
      isOpening: false,
      isAnimate: false,
      isClosing: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      this.hostParent = this.host.parentNode
      const observer = new MutationObserver(mutations => {
        const target = mutations[0].target
        const isOpen = Array.from(target.classList).findIndex(cls => cls === 'rs-drawer--open') > -1 ? true : false
        const body = window.document.querySelector('body')
        if(this.isModal && isOpen) {
          body.style.overflow = 'hidden'
        } else {
          body.style.overflow = 'auto'
        }
      })
      observer.observe(this.el, {
        attributes: true,
        childList: true,
        subtree: true
      })
    },
    host() {
      this.isModal = this.getElementProperty(this.host, '--rs-drawer__modal') ? true : false
      this.isDismissible = this.getElementProperty(this.host, '--rs-drawer__dismissible') ? true : false

      const observer = new MutationObserver(mutations => {
        const target = mutations[0].target
        const isOpen = this.getElementProperty(target, '--_rs-drawer-open') ? true : false
        if(isOpen) {
          this.openDrawer()
        }
      })

      const appBarNav = window.__rsmdc.topAppBar.navigations.filter(nav => this.getElementProperty(nav.host, '--_rs-drawer') === 'true')
      const { host } = appBarNav[0]
      observer.observe(host, {
        attributes: true,
      })
      if(this.getElementProperty(host, '--_rs-drawer-open') === 'true') {
        this.openDrawer()
      }
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.drawer) {
      window.__rsmdc.drawer = {
        drawers: [],
        drawerParents: [],
        lists: [],
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el

    window.__rsmdc.drawer.drawers.push(this.el)
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
    },
    closeOverLay() {
      this.isClosing = true
      setTimeout(() => {
        this.isOpen = false
        this.isClosing = false
      }, 200)
      const body = window.document.querySelector('body')
      body.style.overflow = 'auto'
    },
    openDrawer() {
      new Promise(resolve => {
        this.isOpen = true
        this.isOpening = true
        this.isAnimate = true
        resolve()
      }).then(() => {
        setTimeout(() => {
          this.isAnimate = false
        }, 1)
      }).then(() => {
        setTimeout(() => {
          this.isOpening = false
        }, 250)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../mixins';
@import '../variables';
@import '../../animation/variables';
@import '../../animation/functions';
@import '../../theme/mixins';
@import '../../shape/rs-functions';
@import '../../rtl/mixins';


:host {
  --rs-drawer-list-item--border-radius: 4px;

  position: fixed;
  z-index: 10;
  height: 100%;
}

.rs-drawer-content {
  height: 100%;
}

.rs-drawer {
  @include rs-drawer-item-icon-ink-color($rs-drawer-item-inactive-ink-color);
  @include rs-drawer-item-text-ink-color($rs-drawer-item-inactive-ink-color);
  @include rs-drawer-item-activated-icon-ink-color($rs-drawer-item-activated-ink-color);
  @include rs-drawer-item-activated-text-ink-color($rs-drawer-item-activated-ink-color);
  @include rs-drawer-item-shape-radius(4px);

  @include rs-rtl {
    /* @noflip */
    border-right-width: 0;
    /* @noflip */
    border-left-width: 1px;
    /* @noflip */
    border-right-style: none;
    /* @noflip */
    border-left-style: solid;
  }

  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  height: 100%;
  transition-property: transform;
  transition-timing-function: $rs-animation-standard-curve-timing-function;
  border-right-width: 1px;
  border-right-style: solid;
  overflow: hidden;
  width: var(--rs-drawer--width, $rs-drawer-width);
  border-color: var(--rs-drawer--border-color, rgba(rs-theme-prop-value($rs-drawer-divider-color), $rs-drawer-divider-opacity));
  background-color: var(--rs-drawer--background-color, $rs-drawer-surface-fill-color);
  z-index: var(--rs-drawer--z-index, $rs-drawer-z-index);
  border-radius: var(--rs-drawer--border-radius, rs-shape-radius(large));
  
  //type
  box-shadow: var(--rs-drawer--box-shadow);
  display: var(--rs-drawer--display, flex);
  position: var(--rs-drawer--position);
  left: var(--rs-drawer--left);
  right: var(--rs-drawer--right);


  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-drawer_rtl--border-radius, rs-shape-rtl-radius(large, true));
  }
}

.rs-drawer--open {
  display: var(--rs-drawer__open--display);
}

.rs-drawer--opening {
  transform: translateX(0);
  transition-duration: $rs-drawer-animation-enter;

  // Required to level the specificity with animate class.
  @include rs-rtl {
    transform: translateX(0);
  }
}

.rs-drawer--closing {
  transform: translateX(-100%);
  transition-duration: $rs-drawer-animation-exit;

  @include rs-rtl {
    transform: translateX(100%);
  }
}

.rs-drawer--animate {
  transform: translateX(-100%);

  @include rs-rtl {
    transform: translateX(100%);
  }
}

.rs-drawer-scrim {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition-property: opacity;
  transition-timing-function: $rs-animation-standard-curve-timing-function;
  z-index: $rs-drawer-z-index - 1;
  background-color: var(--rs-drawer-scrim--background-color);

  .rs-drawer--open + & {
    display: block;
  }

  .rs-drawer--animate + & {
    opacity: 0;
  }

  .rs-drawer--opening + & {
    transition-duration: $rs-drawer-animation-enter;
    opacity: 1;
  }

  .rs-drawer--closing + & {
    transition-duration: $rs-drawer-animation-exit;
    opacity: 0;
  }
}
</style>

