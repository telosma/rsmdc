<template>
  <div class="rs-text-field-helper-line" :visible="isVisible">
    <p class="rs-text-field-helper-text rs-text-field-helper-text--persitent" ref="slotContainer">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: String,
      default: 'initial'
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  watch: {
    visible() {

    }
  },
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

