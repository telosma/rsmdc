<template>
  <span class="rs-top-app-bar__navigation-icon" tabindex="0" ref="slotContainer">
    <slot></slot>
  </span>
</template>
<script>
import { RSRipple } from '../../ripple';

export default {
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.topAppBar) {
      window.__rsmdc.topAppBar = {
        navigations: [],
        titles: [],
        items: [],
      }
    }
  },
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      const slotChildren = this.$refs.slotContainer.querySelector('slot').assignedNodes()
      const elements = Array.from(slotChildren).filter(child => child.nodeType === 1)
      elements.forEach(child => {
        const ripple = new RSRipple(child)
        ripple.unbounded = true
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
@import '../../ripple/mixins';

:host {
  align-self: var(--rs-top-app-bar-navigationIcon--align-self);
}

::slotted(*) {
  @include rs-top-app-bar-icon_;
  color: var(--rs-top-app-bar-navigationIcon--color, inherit);

  background-image: var(--rs-top-app-bar-navigationIcon--background-image);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
}

::slotted(*)::before {
  background-color: var(--rs-ripple_before--background-color, $rs-theme-on-primary);
  content: var(--rs-ripple_before--content, '');
}

::slotted(*)::after {
  background-color: var(--rs-ripple_after--background-color, $rs-theme-on-primary);
  content: var(--rs-ripple_after--content, '');
  transition: opacity 150ms linear;
}

::slotted(*:hover)::before {
  opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity(on-primary, hover));
}

::slotted(*:not(.rs-ripple-upgraded):focus)::before {
  transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
  opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(on-primary, focus));
}

::slotted(.rs-ripple-upgraded--background-focused)::before {
  transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
  opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(on-primary, focus));
}

::slotted(*:not(.rs-ripple-upgraded))::after {
  transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
}

::slotted(*:not(.rs-ripple-upgraded):active)::after {
  transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
  opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(on-primary, press));
}

::slotted(.rs-ripple-upgraded) {
  --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity(on-primary, press)});
}

::slotted(*)::before,
::slotted(*)::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}

::slotted(*)::before {
  // Also transition background-color to avoid unnatural color flashes when toggling activated/selected state
  transition:
    opacity $rs-states-wash-duration linear,
    background-color $rs-states-wash-duration linear;

  z-index: 1; // Ensure that the ripple wash for hover/focus states is displayed on top of positioned child elements
}

::slotted(.rs-ripple-upgraded)::before {
  transform: scale(var(--rs-ripple-fg-scale, 1));
}

::slotted(.rs-ripple-upgraded)::after {
  top: 0;
  /* @noflip */
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}

::slotted(.rs-ripple-upgraded--unbounded)::after {
  top: var(--rs-ripple-top, 0);
  /* @noflip */
  left: var(--rs-ripple-left, 0);
}

::slotted(.rs-ripple-upgraded--foreground-activation)::after {
  animation:
    rs-ripple-fg-radius-in $rs-ripple-translate-duration forwards,
    rs-ripple-fg-opacity-in $rs-ripple-fade-in-duration forwards;
}

::slotted(.rs-ripple-upgraded--foreground-deactivation)::after {
  animation: rs-ripple-fg-opacity-out $rs-ripple-fade-out-duration;

  transform: translate(var(--rs-ripple-fg-translate-end, 0)) scale(var(--rs-ripple-fg-scale, 1));
}

$radius: 100%;

::slotted(*)::before,
::slotted(*)::after {
  top: calc(50% - #{$radius / 2});
  /* @noflip */
  left: calc(50% - #{$radius / 2});
  width: $radius;
  height: $radius;
}

::slotted(.rs-ripple-upgraded)::before,
::slotted(.rs-ripple-upgraded)::after {
  top: var(--rs-ripple-top, calc(50% - #{$radius / 2}));
  /* @noflip */
  left: var(--rs-ripple-left, calc(50% - #{$radius / 2}));
  width: var(--rs-ripple-fg-size, $radius);
  height: var(--rs-ripple-fg-size, $radius);
}

::slotted(.rs-ripple-upgraded)::after {
  width: var(--rs-ripple-fg-size, $radius);
  height: var(--rs-ripple-fg-size, $radius);
}
</style>
