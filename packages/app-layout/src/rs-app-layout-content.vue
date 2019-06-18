<template>
  <div class="rs-app-layout__content" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
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
  --rs-app-layout-content: true;
  --rs-top-app-bar_-drawer: true;
}

.rs-app-layout__content {
  margin-left: var(--rs-app-layout-content--margin-left);
}

</style>

