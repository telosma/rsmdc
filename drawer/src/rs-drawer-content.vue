<template>
  <div class="rs-drawer__content" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.drawer) {
      window.__rsmdc.drawer = {
        drawers: [],
        lists: [],
      }
    }
  },
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

 .rs-drawer__content {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

</style>

