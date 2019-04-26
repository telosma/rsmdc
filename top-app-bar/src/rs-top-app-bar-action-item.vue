<template>
  <div class="action-items" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {
        index: 0,
        el: '',
        host: '',
      }
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
      this.setTabIndex(elements)
    })    
  },
  methods: {
    setTabIndex(elements) {
      elements.forEach(el => {
        el.setAttribute('tabindex', 0)
      })
    },
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

:host {
  margin-left: var(--rs-top-app-bar__collapsed--margin-left, auto);
  margin-right: 0;
  align-self: var(--rs-top-app-bar-actionItem--align-self);
}

.action-items {
  display: flex;
  justify-content: center;
  padding-right: var(--rs-top-app-bar-actionItem--padding-right);
}

::slotted(*) {
  @include rs-top-app-bar-icon_;
  transition: var(--rs-top-app-bar-actionItem--transition);
  color: var(--rs-top-app-bar-actionItem--color, inherit);

  background-image: var(--rs-top-app-bar-actionItem--background-image);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
}

::slotted(*)::before {
  background-color: $rs-theme-on-primary;
  content: '';
}

::slotted(*)::after {
  background-color: $rs-theme-on-primary;
  content: '';
  transition: opacity 150ms linear;
}

::slotted(*:hover)::before {
  opacity: 0.08;
}

::slotted(*:active)::after,
::slotted(*:focus)::before {
  transition-duration: 75ms;
  opacity: 0.24;
}
</style>