<template>
  <div class="rs-list-item__text" :class="{ '-drawer': isDrawer }" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      drawerHost: '',
      isDrawer: false,
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      if(this.host && this.host.parentNode && this.host.parentNode.parentNode) {
        this.drawerHost = this.host.parentNode.parentNode.parentNode
      }
    },
    drawerHost() {
      if(!this.drawerHost) { return }
      if(this.drawerHost.shadowRoot) {
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer__content') ? true : false
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
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    }
  }
}
</script>

<style lang="scss">
@import '@rsmdc/typography/mixins';

:host {
  align-self: var(--rs-list-item-text--align-self);
}

.rs-list-item__text {
  @include rs-typography-overflow-ellipsis;
  &[for] {
    pointer-events: none;
  }
}
</style>



