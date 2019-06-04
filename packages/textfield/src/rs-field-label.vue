<template>
  <div class="rs-notched-outline">
    <div class="rs-notched-outline__leading" />
    <div class="rs-notched-outline__notch">
      <label for="" class="rs-floating-label" ref="slotContainer">
        <slot></slot>
      </label>
    </div>
    <div class="rs-notched-outline__trailing" />
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

</style>


