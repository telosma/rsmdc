<template>
  <div class="rs-drawer__content" ref="slotContainer">
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
    }
  }
}
</script>

<style lang="scss">

 :host {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

</style>

