<template>
  <h2 class="rs-card__title" ref="slotContainer">
    <slot></slot>
  </h2>
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
@import '@rsmdc/typography/mixins';

.rs-card__title {
  @include rs-typography(headline6);
  margin: 0;
}
</style>

