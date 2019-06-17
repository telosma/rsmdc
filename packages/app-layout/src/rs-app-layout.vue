<template>
  <div class="rs-app-layout" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      isPermanent: ''
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      if(!this.isPermanent) { return }
      this.host.style.setProperty('--rs-app-layout--display', 'flex')
      this.host.style.setProperty('--rs-app-layout--height', '100%')
    }
  },
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const contents = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
        const drawers = contents.filter(content => this.getElementProperty(content, '--rs-drawer') === 'true')
        this.isPermanent = this.getElementProperty(drawers[0], '--rs-drawer__modal') ? false
          : this.getElementProperty(drawers[0], '--rs-drawer__dismissible') ? false : true  
      })
    this.el = this.$el
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


