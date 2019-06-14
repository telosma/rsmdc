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
@import "@rsmdc/shape/functions";
@import '@rsmdc/ripple/mixins';

@include rs-ripple-common;

.rs-card__contents {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative; // Needed to prevent the ripple wash from overflowing the container in IE and Edge
  outline: none;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  border-top-left-radius: var(--rs-card-contents--border-top-left-radius, rs-shape-prop-value(medium));
  border-top-right-radius: var(--rs-card-contents--border-top-right-radius, rs-shape-prop-value(medium));

  &[dir="rtl"],
  [dir="rtl"] & {
    border-top-left-radius: var(--rs-card-contents_rtl--border-top-left-radius, rs-shape-prop-value(medium));
    border-top-right-radius: var(--rs-card-contents_rtl--border-top-right-radius, rs-shape-prop-value(medium));
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
}

.rs-ripple-upgraded {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;
  @include rs-ripple-upgraded_($rs-theme-on-surface)
}
</style>