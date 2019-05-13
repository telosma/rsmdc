<template>
  <span class="rs-top-app-bar__navigation-icon" tabindex="0" ref="slotContainer">
    <slot></slot>
  </span>
</template>
<script>
import { RSRipple } from '../../ripple'

export default {
  data() {
    return {
      el: '',
      host: '',
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.topAppBar.navigations.push({
        el: this.el,
        host: this.host
      })
    }
  },
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
    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    }
  }
}
</script>

<style lang="scss">
@import '../mixins';
@import '../../ripple/rs-mixins';

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

@include rs-ripple-surface-slotted;
@include rs-ripple-radius-unbounded-slotted;

</style>
