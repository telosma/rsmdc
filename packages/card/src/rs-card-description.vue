<template>
  <div class="rs-card__description" ref="slotContainer">
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
@import '@rsmdc/typography/mixins';
@import '@rsmdc/theme/variables';

.rs-card__description {
  @include rs-typography(body2);
  padding: 0 1rem 8px;
  color: var(--rs-card-description--color, $rs-theme-secondary);
}
</style>

