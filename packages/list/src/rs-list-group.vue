<template>
  <div class="list-group" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      hostParent: ''
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      this.hostParent = this.host.parentNode.parentNode
    },
    hostParent() {
      if(!this.hostParent.shadowRoot) { return }
      const menu = this.hostParent.shadowRoot.querySelector('.rs-menu')
      if(menu) {
        this.host.classList.add('-rs-menu-list')
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
    }
  }
}
</script>
<style lang="scss">

:host {
  --rs-list--padding: 0;
  --rs-list__group-divider_rtl--margin-left: 0;
  --rs-list__group-divider_rtl--margin-right: 72px;
}

:host(.-rs-menu-list) {
  --rs-menu-list-item--padding-left: 56px;
  --rs-menu-list-item--padding-right: 0;
  --rs-menu-list-item-graphic--display: none;
  --rs-menu-list-item-graphic--position: absolute;
  --rs-menu-list-item-graphic--left: 16px;
  --rs-menu-list-item-graphic--right: initial;
  fill: currentColor;
}


</style>
