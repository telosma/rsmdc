<template>
  <div class="rs-card__media">
    <div class="rs-card__media-content" ref="slotContainer">
      <slot></slot>
    </div>
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
@import "@rsmdc/shape/functions";

.rs-card__media {
  position: relative; // Child element `__media-content` has `position: absolute`
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: var(--rs-card-media--background-image);
  padding-top: var(--rs-card-media--padding-top);
  border-top-left-radius: var(--rs-card-media--border-top-left-radius, rs-shape-prop-value(medium));
  border-top-right-radius: var(--rs-card-media--border-top-right-radius, rs-shape-prop-value(medium));

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  &[dir="rtl"],
  [dir="rtl"] & {
    border-top-left-radius: var(--rs-card-media_rtl--border-top-left-radius, rs-shape-prop-value(medium));
    border-top-right-radius: var(--rs-card-media_rtl--border-top-right-radius, rs-shape-prop-value(medium));
  }
}

.rs-card__media-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  color: var(--rs-card-media-content--color);
}
</style>