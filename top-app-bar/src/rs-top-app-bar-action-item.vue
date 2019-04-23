<template>
  <span class="rs-top-app-bar__action-item" tabindex="0">
    <slot></slot>
  </span>
</template>
<script>
export default {
  data() {
    return {
      item: {
        el: '',
        index: 0,
        hostElement: '',
      },
      allItems: []
    }
  },
  watch: {
    allItems() {
      if(!this.item.hostElement) {
        window.__rsmdc.topAppBar.items[this.item.index].hostElement = this.getHostElement()
        window.__rsmdc.topAppBar.items.splice(this.item.index, 1, this.item)
        this.allItems = window.__rsmdc.topAppBar.items
        this.item.hostElement = window.__rsmdc.topAppBar.items[this.item.index].hostElement
      } else {
        const lightElement = this.allItems.filter(item => {
          return item.hostElement.parentNode !== this.item.hostElement.parentNode
        })
        console.log(lightElement)
        const host = lightElement[0].hostElement
        if(!host) { return }
        const marginLeft = this.getElementProperty(host, '--rs-top-app-bar-actionItem--margin-left')
        const marginRight = this.getElementProperty(host, '--rs-top-app-bar-actionItem--margin-right')
        if(marginLeft && marginRight) {
          const host = this.getHostElement()
          host.style.setProperty('--rs-top-app-bar-actionItem--margin-left', marginLeft)
          host.style.setProperty('--rs-top-app-bar-actionItem--margin-right', marginRight)
        }
      }
    },
    // hostElement() {
    //   const lightElement = window.__rsmdc.topAppBar.items.filter(item => {
    //     // console.log(this.hostElement.parentNode)
    //     console.log(item)
    //     return item.hostElement.parentNode !== this.hostElement.parentNode
    //   })
    //   // console.log(lightElement)
    //   // console.log(this.hostElement.parentNode.parentNode)
    //   const a = this.getHostElementCustomProperty('--rs-top-app-bar-actionItem--margin-left')
    //   const b = this.getHostElementCustomProperty('--rs-top-app-bar-actionItem--margin-right')
    //   // console.log(a)
    //   // console.log(b)
    // }
  },
  mounted() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.topAppBar) {
      window.__rsmdc.topAppBar = {
        items: []
      }
    }

    this.item.el = this.$el
    this.item.index = window.__rsmdc.topAppBar.items.length

    window.__rsmdc.topAppBar.items.push(this.item)
    this.allItems = window.__rsmdc.topAppBar.items
  },
  methods: {
    getHostElement() {
      const self = this.allItems.filter(item => item.index === this.item.index)
      const host = self[0].el.parentNode.host
      return host
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

:host {
  align-self: var(--rs-top-app-bar-actionItem--align-self);
  margin-left: var(--rs-top-app-bar-actionItem--margin-left);
  margin-right: var(--rs-top-app-bar-actionItem--margin-right);
  order: var(--rs-top-app-bar-actionItem--order);
}

.rs-top-app-bar__action-item {
  @include rs-top-app-bar-icon_;
  transition: var(--rs-top-app-bar-actionItem--transition);
  color: var(--rs-top-app-bar-actionItem--color, inherit);

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
</style>

