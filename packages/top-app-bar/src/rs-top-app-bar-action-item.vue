<template>
  <span class="rs-top-app-bar__action-item" tabindex="0">
    <span class="rs-top-app-bar__action-label" ref="slotContainer">
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

.rs-top-app-bar__action-item {
  @include rs-top-app-bar-icon_;
  transition: var(--rs-top-app-bar-action-item--transition);
  font-family: var(--rs-top-app-bar-action-item--font-family);
  font-size: var(--rs-top-app-bar-action-item--font-size, 24px);
  font-weight: var(--rs-top-app-bar-action-item--font-weight, 400);
  color: var(--rs-top-app-bar-action-item--color, $rs-theme-on-primary);
}

.rs-ripple-upgraded {
  @include rs-ripple-surface;
  @include rs-ripple-radius-unbounded;
  @include rs-ripple-upgraded_($rs-theme-on-primary);
}

.rs-top-app-bar__action-label {
  width: 24px;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;

  height: var(--rs-top-app-bar-action-label--height);
  background-image: var(--rs-top-app-bar-action-label--background-image);

  &::before {
    content: var(--rs-top-app-bar-action-label_before--content, '');
  }
}


</style>
