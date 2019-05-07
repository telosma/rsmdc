<template>
  <div>
    <div class="rs-drawer" ref="slotContainer">
      <slot></slot>
    </div>
    <div :class="{ 'rs-drawer-scrim': isModal }"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      isModal: false,
      isDismissible: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.parentNode.host
    },
    host() {
      this.isModal = this.getElementProperty(this.host, '--rs-drawer__modal') ? true : false
      this.isDismissible = this.getElementProperty(this.host, '--rs-drawer__dismissible') ? true : false
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.drawer) {
      window.__rsmdc.drawer = {
        lists: [],
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el.querySelector('.rs-drawer')
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
@import '../rs-drawer';
@import '../variables';
@import '../../animation/variables';
@import '../../animation/functions';
@import '../../typography/mixins';
@import '../../typography/variables';
@import '../../theme/mixins';
@import '../../shape/rs-functions';


:host {
  --rs-drawer-list-item--border-radius: 4px;
}

.rs-drawer {
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  height: 100%;
  transition-property: transform;
  transition-timing-function: $rs-animation-standard-curve-timing-function;
  border-right-width: 1px;
  border-right-style: solid;
  overflow: hidden;
  width: var(--rs-drawer--width);
  border-color: var(--rs-drawer--border-color, rgba(rs-theme-prop-value($rs-drawer-divider-color), $rs-drawer-divider-opacity));
  background-color: var(--rs-drawer--background-color, $rs-drawer-surface-fill-color);
  z-index: var(--rs-drawer--z-index, $rs-drawer-z-index);
  border-radius: var(--rs-drawer--border-radius, rs-shape-radius(large));
  
  //type
  box-shadow: var(--rs-drawer--box-shadow);
  display: var(--rs-drawer--display, flex);
  position: var(--rs-drawer--position);
  left: var(--rs-drawer--left);
  right: var(--rs-drawer--right);


  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-drawer_rtl--border-radius, rs-shape-rtl-radius(large, true));
  }
}

.rs-drawer--open {
  display: var(--rs-drawer__open--display);
}

.rs-drawer--opening {
  transform: translateX(0);
  transition-duration: $rs-drawer-animation-enter;

  // Required to level the specificity with animate class.
  @include rs-rtl {
    transform: translateX(0);
  }
}

.rs-drawer--closing {
  transform: translateX(-100%);
  transition-duration: $rs-drawer-animation-exit;

  @include rs-rtl {
    transform: translateX(100%);
  }
}

.rs-drawer--animate {
  transform: translateX(-100%);

  @include rs-rtl {
    transform: translateX(100%);
  }
}

.rs-drawer-scrim {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition-property: opacity;
  transition-timing-function: $rs-animation-standard-curve-timing-function;
  z-index: $rs-drawer-z-index - 1;

  .rs-drawer--open + & {
    display: block;
  }

  .rs-drawer--animate + & {
    opacity: 0;
  }

  .rs-drawer--opening + & {
    transition-duration: $rs-drawer-animation-enter;
    opacity: 1;
  }

  .rs-drawer--closing + & {
    transition-duration: $rs-drawer-animation-exit;
    opacity: 0;
  }
}

::slotted(h3) {
  @include rs-typography(headline6);
  flex-shrink: 0;
  box-sizing: border-box;
  color: var(--rs-drawer-title--color, rgba(rs-theme-prop-value($rs-drawer-title-ink-color), $rs-drawer-title-ink-opacity));
  //min-height: 64px; // same as $rs-top-app-bar-row-height
  padding: 0 $rs-drawer-surface-padding;
}

@include rs-typography-baseline-top(36px, true, h3);
@include rs-typography-baseline-top-strut_(36px, true, h3);
@include rs-typography-baseline-bottom(20px, true, h3);
@include rs-typography-baseline-bottom-strut_(20px, true, h3);

::slotted(h6) {
  @include rs-typography(body2);

  padding: 0 $rs-drawer-surface-padding 4px;
  margin-bottom: 0;
  color: var(--rs-drawer-subtitle--color, rgba(rs-theme-prop-value($rs-drawer-subtitle-ink-color), $rs-drawer-subtitle-ink-opacity));
}

@include rs-typography-baseline-top(20px, true, h6);
@include rs-typography-baseline-top-strut_(20px, true, h6);

::slotted(:not(h3)),
::slotted(:not(h6)) {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}


</style>

