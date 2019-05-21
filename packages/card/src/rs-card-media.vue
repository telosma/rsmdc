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

.rs-card__media {
  position: relative; // Child element `__media-content` has `position: absolute`
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    display: block;
    content: "";
    margin-top: var(--rs-card-media_before--margin-top);
  }

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
}

.rs-card__media-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
}
</style>