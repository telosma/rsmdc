<template>
  <div class="rs-tab-bar" role="tablist">
    <div class="rs-tab-scroller">
      <div class="rs-tab-scroller__scroll-area" :class="scroll">
        <div class="rs-tab-scroller__scroll-content" ref="slotContainer">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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

.rs-tab-bar {
  width: var(--rs-tab-bar--width, 100%);
}

.rs-tab-scroller {
  overflow-y: hidden;
}

.rs-tab-scroller__scroll-area {
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow-x: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  // &.rs-tab-scroller__scroll-area--scroll {
  //   overflow-x: scroll;
  // }

}

.rs-tab-scroller__scroll-content {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  transform: none;
  will-change: transform;
  justify-content: var(--rs-tab-scroller--justify-content);
}




</style>

