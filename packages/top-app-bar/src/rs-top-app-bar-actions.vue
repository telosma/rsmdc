<template>
  <div class="rs-top-app-bar__actions" ref="slotContainer">
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
  --rs-top-app-bar-actions: true;
  margin-left: var(--rs-top-app-bar__collapsed--margin-left, auto);
  margin-right: 0;
  align-self: var(--rs-top-app-bar-actionItem--align-self);
}

.rs-top-app-bar__actions {
  display: flex;
  justify-content: center;
  padding-right: var(--rs-top-app-bar-actionItem--padding-right);
}

</style>