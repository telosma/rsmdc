<template>
  <div class="rs-top-app-bar__actions" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
import { RSRipple } from '../../ripple'

export default {
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      const slotChildren = this.$refs.slotContainer.querySelector('slot').assignedNodes()
      const elements = Array.from(slotChildren).filter(child => child.nodeType === 1)
      elements.forEach(el => {
        if(el.nodeName === 'I') {
          const ripple = new RSRipple(el)
          ripple.unbounded = true
          el.setAttribute('tabindex', 0)
        }
      })
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
@import '../mixins';
@import '../variables';
@import '../../ripple/rs-mixins';

:host {
  --_rs-top-app-bar-actions: true;
  margin-left: var(--rs-top-app-bar__collapsed--margin-left, auto);
  margin-right: 0;
  align-self: var(--rs-top-app-bar-actionItem--align-self);
}

.rs-top-app-bar__actions {
  display: flex;
  justify-content: center;
  padding-right: var(--rs-top-app-bar-actionItem--padding-right);
}


::slotted(i) {
  @include rs-top-app-bar-icon_;
  transition: var(--rs-top-app-bar-actionItem--transition);
  color: var(--rs-top-app-bar-actionItem--color, inherit);

  background-image: var(--rs-top-app-bar-actionItem--background-image);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
}

::slotted(i)::before {
  background-color: var(--rs-ripple_before--background-color, $rs-theme-on-primary);
  content: var(--rs-ripple_before--content, '');
}

::slotted(i)::after {
  background-color: var(--rs-ripple_after--background-color, $rs-theme-on-primary);
  content: var(--rs-ripple_after--content, '');
  transition: opacity 150ms linear;
}

::slotted(i:hover)::before {
  opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity(on-primary, hover));
}

::slotted(i:not(.rs-ripple-upgraded):focus)::before {
  transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
  opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(on-primary, focus));
}

::slotted(.rs-ripple-upgraded--background-focused)::before {
  transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
  opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(on-primary, focus));
}

::slotted(i:not(.rs-ripple-upgraded))::after {
  transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
}

::slotted(i:not(.rs-ripple-upgraded):active)::after {
  transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
  opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(on-primary, press));
}

::slotted(.rs-ripple-upgraded) {
  --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity(on-primary, press)});
}

@include rs-ripple-surface-slotted;
@include rs-ripple-radius-unbounded-slotted;

</style>