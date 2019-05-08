<template>
  <span class="rs-list-item__text" :class="{ '-rs-drawer': isDrawer }" ref="slotContainer"><slot></slot></span>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      drawerHost: '',
      isDrawer: false,
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      if(this.host && this.host.parentNode && this.host.parentNode.parentNode) {
        this.drawerHost = this.host.parentNode.parentNode.parentNode
      }
    },
    drawerHost() {
      if(!this.drawerHost) { return }
      if(this.drawerHost.shadowRoot) {
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer') ? true : false
      }
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.list) {
      window.__rsmdc.list = {
        lists: [],
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
        elements.forEach(el => {
          const isPrimary = this.getElementProperty(el, '--_rs-list-text-primary') ? true : false
          const isSecondary = this.getElementProperty(el, '--_rs-list-text-secondary') ? true : false
          if(isPrimary) {
            el.classList.add('-rs-primary')
          }else if(isSecondary) {
            el.classList.add('-rs-secondary')
          }
        })
        this.el = this.$el
      })
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
@import '../rs-variables';
@import '../../typography/mixins';
@import '../../theme/variables';

:host {
  align-self: var(--rs-list-item-text--align-self);
}

.rs-list-item__text {
  @include rs-typography-overflow-ellipsis;
  &[for] {
    pointer-events: none;
  }
}

.-rs-drawer {
  pointer-events: none;
}

::slotted(.-rs-primary) {
  @include rs-typography-overflow-ellipsis;
  display: var(--rs-list-item-primary-text--dispaly, block);
  margin-top: var(--rs-list-item-primary-text--margin-top, 0);
  line-height: var(--rs-list-item-primary-text--line-height, normal);
  margin-bottom: var(--rs-list-item-primary-text--margin-bottom, -1 * $item-secondary-text-baseline-height);
}

::slotted(.-rs-primary)::before {
  vertical-align: var(--rs-list-item-primary-text_before--vertical-align, 0);
  display: var(--rs-list-item-primary-text_before--dispaly, inline-block);
  width: var(--rs-list-item-primary-text_before--width, 0);
  height: var(--rs-list-item-primary-text_before--height, $item-primary-text-baseline-height);
  content: var(--rs-list-item-primary-text_before--content, '');
}

::slotted(.-rs-primary)::after {
  vertical-align: var(--rs-list-item-primary-text_after--vertical-align, -1 * $item-secondary-text-baseline-height);
  display: var(--rs-list-item-primary-text_after--dispaly, inline-block);
  width: var(--rs-list-item-primary-text_after--width, 0);
  height: var(--rs-list-item-primary-text_after--height, $item-secondary-text-baseline-height);
  content: var(--rs-list-item-primary-text_after--content, '');
}

::slotted(.-rs-secondary) {
  line-height: 1.25rem; // 20sp
  font-weight: map-get($rs-typography-font-weight-values, regular);
  letter-spacing: rs-typography-get-letter-spacing_(.25, .875);
  text-decoration: inherit;
  text-transform: inherit;
  @include rs-typography-overflow-ellipsis;

  color: var(--rs-list-item-secondary-text--color, rs-theme-ink-color-for-fill_(secondary, $rs-theme-background));
  display: var(--rs-list-item-secondary-text--dispaly, block);
  margin-top: var(--rs-list-item-secondary-text--margin-top, 0);
  line-height: var(--rs-list-item-secondary-text--line-height, normal);
}

::slotted(.-rs-secondary)::before {
  vertical-align: var(--rs-list-item-secondary-text_before--vertical-align, 0);
  display: var(--rs-list-item-secondary-text_before--dispaly, inline-block);
  width: var(--rs-list-item-secondary-text_before--width, 0);
  height: var(--rs-list-item-secondary-text_before--height, $item-secondary-text-baseline-height);
  content: var(--rs-list-item-secondary-text_before--content, '');
}

</style>



