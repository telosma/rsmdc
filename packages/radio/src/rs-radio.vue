<template>
  <div class="rs-radio" @click="updateRadios(), clickRadio()" :disabled="disabled">
    <input class="rs-radio__native-control" :class="{ '-checked': isChecked }" type="radio" :id="id" :name="name" :disabled="disabled">
    <div class="rs-radio__background">
      <div class="rs-radio__outer-circle"></div>
      <div class="rs-radio__inner-circle"></div>
    </div>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'radio'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host: '',
      ripple: '',
      isChecked: false
    }
  },
  watch: {
    checked() {
      this.isChecked = this.checked ? true : false
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.radio.radios.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.radio) {
      window.__rsmdc.radio = {
        radios: []
      }
    }
  },
  mounted() {
    this.ripple = new RSRipple(this.$el)
    this.ripple.unbounded = true
    this.el = this.$el
    this.isChecked = this.checked ? true : false
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    updateRadios() {
      if(this.disabled) { return }
      this.activateRipple()
      const radioGroup = window.__rsmdc.radio.radios.filter(radio => radio.getAttribute('name') === this.name)
      radioGroup.forEach(radio => {
        if(radio.isEqualNode(this.host)) {
          this.isChecked = true
        } else {
          radio._wrapper.$children[0].isChecked = false
          radio._wrapper.$children[0].deactivateRipple()
        }
      })
    },
    clickRadio() {
      this.$emit('change')
    },
    activateRipple() {
      this.ripple.activate()
    },
    deactivateRipple() {
      this.ripple.deactivate()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@rsmdc/animation/functions";
@import "@rsmdc/ripple/mixins";
@import "@rsmdc/ripple/variables";
@import "@rsmdc/theme/mixins";
@import "@rsmdc/theme/variables";
@import "@rsmdc/form-field/rs-form-field";
@import "../functions";
@import "../variables";

@include rs-ripple-common;

.rs-radio {
  @include rs-ripple-surface;
  @include rs-ripple-radius-unbounded;

  display: inline-block;
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  width: $rs-radio-touch-area;
  height: $rs-radio-touch-area;
  padding: ($rs-radio-touch-area - $rs-radio-ui-size) / 2;
  cursor: pointer;
  /* @alternate */
  will-change: opacity, transform, border-color, color;

  &[disabled] {
    cursor: default;
    pointer-events: none;
  }
  
  // ripple
  &::before {
    background-color: var(--rs-ripple_before--background-color, $rs-theme-secondary);
    content: var(--rs-ripple_before--content, '');
  }

  &::after {
    background-color: var(--rs-ripple_after--background-color, $rs-theme-secondary);
    content: var(--rs-ripple_after--content, '');
  }

  &:hover::before {
    opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, hover));
  }

  &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
    transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
    opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, focus));
  }

  &.rs-ripple-upgraded--background-focused::before {
    transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
    opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, focus));
  }

  &:not(.rs-ripple-upgraded) {
    &::after {
      transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
    }

    &:active::after {
      transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
      opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity($rs-radio-baseline-theme-color, press));
    }
  }

  &.rs-ripple-upgraded {
    --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity($rs-radio-baseline-theme-color, press)});
  }

  &.rs-ripple-upgraded--background-focused {
    .rs-radio__background::before {
      content: none;
    }
  }
}

.rs-radio__native-control {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;

  &.-checked + .rs-radio__background,
  &:disabled + .rs-radio__background {
    transition:
      rs-radio-enter(opacity),
      rs-radio-enter(transform);
  }

  &.-checked + .rs-radio__background > .rs-radio__outer-circle,
  &:disabled + .rs-radio__background > .rs-radio__outer-circle {
    transition: rs-radio-enter(border-color);
  }

  &.-checked + .rs-radio__background > .rs-radio__inner-circle,
  &:disabled + .rs-radio__background > .rs-radio__inner-circle {
    transition:
      rs-radio-enter(transform),
      rs-radio-enter(border-color);
  }

  &.-checked + .rs-radio__background > .rs-radio__inner-circle {
    transform: scale(.5);

    transition:
      rs-radio-enter(transform),
      rs-radio-enter(border-color);
  }

  &:enabled.-checked + .rs-radio__background > .rs-radio__outer-circle {
    border-color: var(--rs-radio-nativeControl_enabled_checked_-background-outerCircle--border-color, $rs-theme-secondary);
  }

  &:enabled.-checked + .rs-radio__background > .rs-radio__inner-circle {
    border-color: var(--rs-radio-nativeControl_enabled_-background-innerCircle--border-color, $rs-theme-secondary);
  }

  &:enabled:not(.-checked) + .rs-radio__background > .rs-radio__outer-circle {
    border-color: var(--rs-radio-nativeControl_enabled_not_checked_-background-outerCircle--border-color, $rs-radio-unchecked-color);
  }

  &:enabled:not(.-checked) + .rs-radio__background > .rs-radio__inner-circle {
    border-color: transparent;
  }

  &:not(:disabled) + .rs-radio__background > .rs-radio__inner-circle {
    transform: scale(.5);
  }

  &:disabled + .rs-radio__background ,
  [aria-disabled="true"] & + .rs-radio__background {
    cursor: default;
  }

  &:disabled + .rs-radio__background > .rs-radio__outer-circle,
  &:disabled + .rs-radio__background > .rs-radio__inner-circle,
  [aria-disabled="true"] & + .rs-radio__background > .rs-radio__outer-circle,
  [aria-disabled="true"] & + .rs-radio__background > .rs-radio__inner-circle {
    border-color: $rs-radio-circle-color;
  }

  &:focus + .rs-radio__background::before {
    transform: scale(2, 2);
    opacity: map-get($rs-ripple-dark-ink-opacities, focus);

    transition:
      rs-radio-enter(opacity),
      rs-radio-enter(transform);
  }
}

.rs-radio__background {
  display: inline-block;
  position: absolute;
  left: ($rs-radio-touch-area - $rs-radio-ui-size) / 2;
  box-sizing: border-box;
  width: $rs-radio-ui-pct;
  height: $rs-radio-ui-pct;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0, 0);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    content: "";
    transition: rs-radio-exit(opacity), rs-radio-exit(transform);
    background-color: var(--rs-radio-background_before--background-color, $rs-theme-secondary);
  }
}

.rs-radio__outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;

  transition: rs-radio-exit(border-color);
}

.rs-radio__inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform: scale(0, 0);
  border-width: 10px;
  border-style: solid;
  border-radius: 50%;

  transition:
    rs-radio-exit(transform),
    rs-radio-exit(border-color);
}

</style>



