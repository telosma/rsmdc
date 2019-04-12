<template>
  <div class="rs-form-field" @click="updateRadioChecked">
    <div class="rs-radio" :class="{ 'rs-radio--disabled': isEnableDisabled, '-unchecked': !radio.checked }">
      <input class="rs-radio__native-control" type="radio" :name="name" :checked="isEnableChecked" :disabled="isEnableDisabled">
      <div class="rs-radio__background">
        <div class="rs-radio__outer-circle"></div>
        <div class="rs-radio__inner-circle"></div>
      </div>
    </div>
    <label for="radio-1"><slot></slot></label>
  </div>
</template>
<script>
import { RSFormField } from '../../form-field';
import { RSRadio } from '../assets/index';

export default {
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    checked: {
      type: String,
      default: ''
    },
    disabled: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEnableChecked: false,
      isEnableDisabled: false,
      allRadios: [],
      radio: {
        el: '',
        checked: false
      }
    }
  },
  watch: {
    checked() {
      this.isChecked()
    },
    disabled() {
      this.isDisabled()
    },
    allRadios() {
      if (window.__rsmdc.radios.checkedIndex > -1) {
        const targetIndex = this.allRadios.findIndex(radio => this.$el.isEqualNode(radio.el))
        this.radio.checked = window.__rsmdc.radios.checkedIndex === targetIndex ? true : false
      }
    }
  },
  mounted() {
    if (!window.__rsmdc) {
      window.__rsmdc = {
        radios: {
          eles: [],
          checkedIndex: ''
        }
      }
    }

    const formField = new RSFormField(this.$el);
    const radio = new RSRadio(this.$el.querySelector('.rs-radio'));
    formField.input = radio;

    this.isChecked()
    this.isDisabled()

    this.radio.el = this.$el
    window.__rsmdc.radios.eles.push(this.radio)
    window.__rsmdc.radios.checkedIndex = -1
    this.allRadios = window.__rsmdc.radios.eles
  },
  methods: {
    isChecked() {
      this.isEnableChecked = this.checked === 'checked' ? true : false 
    },
    isDisabled() {
      this.isEnableDisabled = this.disabled === 'disabled' ? true : false 
    },
    updateRadioChecked() {
      const targetIndex = this.allRadios.findIndex(radio => this.$el.isEqualNode(radio.el))
      window.__rsmdc.radios.eles[targetIndex].checked = true
      window.__rsmdc.radios.checkedIndex = targetIndex

      this.allRadios.splice(targetIndex, 1, window.__rsmdc.radios.eles[targetIndex])
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/rs-radio";
@import "../../form-field/assets/rs-form-field";

  .rs-radio {

    &.-unchecked {
      > .rs-radio__native-control:enabled:checked + .rs-radio__background > .rs-radio__outer-circle {
        border-color: var(--rs-radio-nativeControl_enabled_not_checked_-background-outerCircle--border-color, $rs-radio-unchecked-color);
      }

      > .rs-radio__native-control:enabled + .rs-radio__background > .rs-radio__inner-circle {
        border-color: #fff;
      }
    }

    > .rs-radio__native-control:enabled:checked + .rs-radio__background > .rs-radio__outer-circle {
      border-color: var(--rs-radio-nativeControl_enabled_checked_-background-outerCircle--border-color, $rs-theme-secondary);
    }

    > .rs-radio__native-control:enabled:not(:checked) + .rs-radio__background > .rs-radio__outer-circle {
      border-color: var(--rs-radio-nativeControl_enabled_not_checked_-background-outerCircle--border-color, $rs-radio-unchecked-color);
    }

    > .rs-radio__native-control:enabled + .rs-radio__background > .rs-radio__inner-circle {
      border-color: var(--rs-radio-nativeControl_enabled_-background-innerCircle--border-color, $rs-theme-secondary);
    }
 
    > .rs-radio__background::before {
      background-color: var(--rs-radio-background_before--background-color, $rs-theme-secondary);
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
  }
</style>



