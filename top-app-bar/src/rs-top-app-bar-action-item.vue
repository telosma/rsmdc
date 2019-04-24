<template>
  <div class="action-items">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {
        index: 0,
        el: '',
        host: '',
      },
      hasObserver: false,
      allItems: [],
      sourceProps: ['color', 'background-image'],
      canChangeProps: ['--rs-top-app-bar-actionItem--color', '--rs-top-app-bar-actionItem--background-image']
    }
  },
  watch: {
    allItems() {
      if(!this.item.host) {
        window.__rsmdc.topAppBar.items[this.item.index].host = this.getHost()
        window.__rsmdc.topAppBar.items.splice(this.item.index, 1, this.item)
        this.allItems = window.__rsmdc.topAppBar.items
        this.item.host = window.__rsmdc.topAppBar.items[this.item.index].host

      } else {
        const existHostStyles = this.canChangeProps.filter(prop => this.getElementProperty(this.item.host, prop))
        if(existHostStyles.length > 0) { return }

        const lightElement = this.allItems.filter(item => item.host.parentNode !== this.item.host.parentNode)
        const host = lightElement[0].host
        if(!host) { return }

        const children = Array.from(host.childNodes)
        const elements = children.filter(child => child.nodeType === 1)

        elements.forEach(el => {
          const selector = el.classList.item(0)
          const changeProps = this.canChangeProps.filter(prop => this.getElementProperty(el, prop))
          if(changeProps.length > 0) {
            const style = changeProps.reduce((prop, crr) => {
              const value = this.getElementProperty(el, crr)
              return prop + `${crr}: ${value};, `
            }, '')

            this.setStyle(this.$el, selector, style)
          }
        })
      }
    },
    'item.host': function() {
      if(!this.hasObserver) {
        console.log(1)
        const observer = new MutationObserver(mutations => {
          console.log(mutations)
          this.item.host = mutations[0].target
        })
        console.log(this.item.host)
        observer.observe(this.item.host, {
          attributes: true,
          childList: true,
          subtree: true
        })
        this.hasObserver = true
      }
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
    this.setTabIndex()

    this.item.el = this.$el
    this.item.index = window.__rsmdc.topAppBar.items.length

    window.__rsmdc.topAppBar.items.push(this.item)
    this.allItems = window.__rsmdc.topAppBar.items
  },
  methods: {
    setTabIndex() {
      this.$el.childNodes.forEach(child => {
        child.setAttribute('tabindex', 0)
      })
    },
    getHost() {
      const self = this.allItems.filter(item => item.index === this.item.index)
      const host = self[0].el.parentNode.host
      return host
    },
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    },
    setStyle(el, selector, style) {
      el.querySelector(`.${selector}`).style.cssText = style
    },
    hasDifferentStyleValue(target, selector, sourceProp, targetProp) {
      const sourceResult = this.getElementProperty(this.item.el.querySelector(`.${selector}`), sourceProp)
      const targetResult = this.getElementProperty(target, targetProp)
      return sourceResult !== targetResult ? true : false
    },
    setCssText(prop, value) {
      return `${prop}: ${value};, `
    }
  }
}
</script>

<style lang="scss">
@import '../mixins';

:host {
  margin-left: auto;
  margin-right: 0;
}

.action-items {
  display: flex;
  justify-content: center;

  > * {
    @include rs-top-app-bar-icon_;
    transition: var(--rs-top-app-bar-actionItem--transition);
    color: var(--rs-top-app-bar-actionItem--color, inherit);

    background-image: var(--rs-top-app-bar-actionItem--background-image);
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;

    &::before {
      background-color: $rs-theme-on-primary;
      content: '';
    }
    &::after {
      background-color: $rs-theme-on-primary;
      content: '';
      transition: opacity 150ms linear;
    }
    
    &:hover::before {
      opacity: 0.08;
    }

    &:active::after,
    &:focus::before {
      transition-duration: 75ms;
      opacity: 0.24;
    }
  }
}
</style>

