<template>
  <div class="rs-card" ref="slotContainer">
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
@import "@rsmdc/elevation/mixins";
@import "@rsmdc/theme/variables";
@import "@rsmdc/shape/rs-functions";

.rs-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  background-color: var(--rs-card--background-color, $rs-theme-surface);
  box-shadow: var(--rs-card--box-shadow, rs-elevation(1));
  border-radius: var(--rs-card--border-radius, rs-shape-radius(medium));
  border-width: var(--rs-card--border-width);
  border-style: var(--rs-card--border-style);
  border-color: var(--rs-card--border-color);

  &[rtl]
  [rtl] & {
    border-radius: var(--rs-card_rtl--border-radius, rs-shape-radius(medium));
  }
 }
</style>

