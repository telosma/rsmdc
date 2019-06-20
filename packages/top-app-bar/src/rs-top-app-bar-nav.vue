<template>
  <span class="rs-top-app-bar__navigation-icon" tabindex="0">
    <span class="rs-top-app-bar__navigation-label" ref="slotContainer">
      <slot></slot>
    </span>
  </span>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      const ripple = new RSRipple(this.$el)
      ripple.unbounded = true
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
@import "@rsmdc/ripple/mixins";
@import '../mixins';

@include rs-ripple-common;

:host {
  align-self: var(--rs-top-app-bar-navigation-icon--align-self);
}

.rs-top-app-bar__navigation-icon {
  @include rs-top-app-bar-icon_;
  font-family: var(--rs-top-app-bar-navigation-icon--font-family);
  font-size: var(--rs-top-app-bar-navigation-icon--font-size, 24px);
  font-weight: var(--rs-top-app-bar-navigation-icon--font-weight, 400);
  color: var(--rs-top-app-bar-navigation-icon--color, inherit);
}

.rs-ripple-upgraded {
  @include rs-ripple-surface;
  @include rs-ripple-radius-unbounded;
  @include rs-ripple-upgraded_($rs-theme-on-primary);
}

.rs-top-app-bar__navigation-label {
  width: 24px;
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;

  height: var(--rs-top-app-bar-navigation-label--height);
  background-image: var(--rs-top-app-bar-navigation-label--background-image);

  &::before {
    content: var(--rs-top-app-bar-navigation-label_before--content, '');
  }
}
</style>
