<template>
  <div class="rs-card__contents" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple';
export default {
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      new RSRipple(this.$el)
    })
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
@import '@rsmdc/ripple/mixins';

@include rs-ripple-common;

.rs-card__contents {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;
  @include rs-states;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative; // Needed to prevent the ripple wash from overflowing the container in IE and Edge
  outline: none;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

}
</style>