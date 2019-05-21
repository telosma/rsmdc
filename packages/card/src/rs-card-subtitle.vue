<template>
  <h3 class="rs-card__subtitle" ref="slotContainer">
    <slot></slot>
  </h3>
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
@import '@rsmdc/theme/variables';

.rs-card__subtitle {
  @include rs-typography(subtitle2);
  color: var(--rs-card-subtitle--color, $rs-theme-secondary);
  margin: 0;
}
</style>

