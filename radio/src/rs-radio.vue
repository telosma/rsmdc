<template>

  <div class="rs-form-field">
    <div class="rs-radio">
      <input class="rs-radio__native-control" type="radio" :id="id" :name="name" :checked="isEnableChecked" :disabled="isEnableDisabled">
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
    id: {
      type: String,
      default: 'radio1'
    },
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
      isEnableDisabled: false
    }
  },
  watch: {
    checked() {
      this.isChecked()
    },
    disabled() {
      this.isDisabled()
    }
  },
  mounted() {
    const formField = new RSFormField(this.$el);
    const radio = new RSRadio(this.$el.querySelector('.rs-radio'));
    formField.input = radio;
    this.isChecked()
    this.isDisabled()
  },
  methods: {
    isChecked() {
      this.isEnableChecked = this.checked === 'checked' ? true : false 
    },
    isDisabled() {
      this.isEnableDisabled = this.disabled === 'disabled' ? true : false 
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/rs-radio";
@import "../../form-field/assets/rs-form-field";

  .rs-radio {

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



  
  // @include rs-states(orange);
}




</style>



