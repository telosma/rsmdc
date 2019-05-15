<template>
  <div class="rs-drawer__header" ref="slotContainer">
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
@import '../variables';

.rs-drawer__header {
  flex-shrink: 0;
  box-sizing: border-box;
  min-height: 64px; // same as $rs-top-app-bar-row-height
  padding: 0 $rs-drawer-surface-padding 4px;
}
</style>

