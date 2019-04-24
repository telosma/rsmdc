<template>
  <div class="rs-menu rs-menu-surface">
    <slot></slot>
  </div>
</template>
<script>
import { RSMenu } from '../index'

export default {
  data() {
    return {
      menu: {
        el: '',
        component: '',
        index: 0,
      },
      isOpen: false,
      hasObserver: false,
      hostElement: '',
      allMenus: []
    }
  },
  watch: {
    allMenus() {
      if(!this.hostElement) {
        this.hostElement = this.getHostElement()
        this.isOpen = this.getHostElementCustomProperty('--_rs-menu-open') ? this.getHostElementCustomProperty('--_rs-menu-open') : false
      }
    },
    isOpen() {
      if(this.isOpen !== this.menu.component.open) {
        this.menu.component.open = !this.menu.component.open
      } else {
        this.isOpen = true
      }
    },
    hostElement() {
      if(!this.hasObserver) {
        const observer = new MutationObserver(mutations => {
          this.hostElement = mutations[0].target
          this.isOpen = this.getHostElementCustomProperty('--_rs-menu-open') ? this.getHostElementCustomProperty('--_rs-menu-open') : false
        })
        observer.observe(this.hostElement, {
          attributes: true
        })
        this.hasObserver = true
      }
    }
  },
  mounted() {
    if(!window.__rsmdc) {
      window.__rsmdc = {
        menus: {
          eles: [],
          mutations: ''
        }
      }
    }

    const menu = new RSMenu(this.$el)
    this.menu.component = menu
    this.menu.el = this.$el
    this.menu.index = window.__rsmdc.menus.eles.length

    window.__rsmdc.menus.eles.push(this.menu)
    this.allMenus = window.__rsmdc.menus
  },
  methods: {
    getHostElement() {
      const self = this.allMenus.eles.filter(menu => menu.index === this.menu.index)
      const host = self[0].el.parentNode.host
      return host
    },
    getHostElementCustomProperty(prop) {
      const style = window.getComputedStyle(this.hostElement)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    }
  }
}
</script>

<style lang="scss">
@import '../rs-menu';
@import '../../menu-surface/rs-menu-surface';

:host {
  position: absolute;
}

.rs-menu {
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



</style>

