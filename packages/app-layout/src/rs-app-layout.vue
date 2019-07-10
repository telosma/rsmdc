<template>
  <div class="rs-app-layout" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasDrawer: false
    }
  },
  watch: {
    hasDrawer() {
      const host = this.$el.parentNode.host
      host.style.setProperty('--rs-drawer', 'true')
    }
  },
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const contents = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
        const drawers = contents.filter(content => this.getElementProperty(content, '--rs-drawer') === 'true')
        if(drawers.length === 0) { return }

        this.hasDrawer = true
        const drawer = drawers[0]
        const isPermanentDrawer = this.getElementProperty(drawers[0], '--rs-drawer__modal') ? false
          : this.getElementProperty(drawers[0], '--rs-drawer__dismissible') ? false : true 
          
        if(isPermanentDrawer) {
          const host = this.$el.parentNode.host
          const drawerWidth = this.getElementProperty(drawer, 'width')

          host.style.setProperty('--rs-app-layout--display', 'flex')
          host.style.setProperty('--rs-app-layout--height', '100%')
          host.style.setProperty('--rs-app-layout-content--margin-left', drawerWidth)
        }
      })
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
  :host {
    display: var(--rs-app-layout--display);
    height: var(--rs-app-layout--height);
  }
</style>


