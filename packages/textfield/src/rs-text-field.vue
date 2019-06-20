<template>
  <div class="rs-text-field" :class="{ '-nolabel': label.length === 0 }" :required="required" :disabled="disabled" :invalid="invalid">
    <div class="rs-text-field__form" @click="activateTextField">
      <div class="rs-text-field__inputarea">
        <input :id="id" :type="type" class="rs-text-field__input" v-model="value" 
          :value="value" :maxlength="maxlength" :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent">
        <div class="rs-text-field__action" ref="slotContainer">
          <slot></slot>
        </div>
      </div>
      <label :for="id" class="rs-text-field__label">{{ label }}</label>
      <div class="rs-line-ripple" />
    </div>
    <div class="rs-notched-outline">
      <div class="rs-notched-outline__leading" />
        <div class="rs-notched-outline__notch">
          <label :for="id" class="rs-text-field__label -outlined">{{ label }}</label>
        </div>
      <div class="rs-notched-outline__trailing" />
    </div>
    <div class="rs-text-field-character-counter" v-if="countable">{{ `${value.length} / ${maxlength}` }}</div>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'
import { RSLineRipple } from "@rsmdc/line-ripple";

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    countable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host: '',
      formLabel: '',
      lineRipple: '',
      labelPosition: '',
      hasValue: '',
      hasIcon: false,
      isDense: false,
      isOutlined: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.hasIcon = this.getElementProperty(this.host, '--rs-text-field__icon')
      this.isDense = this.getElementProperty(this.host, '--rs-text-field__dense')
      this.isOutlined = this.getElementProperty(this.host, '--rs-text-field__outlined')
    },
    isOutlined() {
      if(this.isOutlined) {
        this.el.classList.add('-outlined')
        this.el.querySelector('.rs-text-field__label:not(.-outlined)').remove()
        this.el.querySelector('.rs-line-ripple').remove()
      } else {
        this.el.classList.remove('-outlined')
        this.el.querySelector('.rs-notched-outline').remove()
      }
      this.formLabel = this.el.querySelector('.rs-text-field__label')
      this.hasValue = this.value.length > 0
    },
    isDense() {
      if(this.isDense) {
        this.el.classList.add('-dense')
      }
    },
    hasIcon() {
      if(this.hasIcon) {
        this.el.classList.add('-icon')
      }
    },
    hasValue() {
      if(!this.hasValue) { return }
      this.el.classList.add('-floatabove')
    }
  },
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const actions = Array.from(this.$el.querySelector('slot').assignedNodes())
        if(actions.length === 0) {
          this.$el.querySelector('.rs-text-field__action').classList.add('-none')
        }
      })
    const ripple = new RSRipple(this.$el.querySelector('.rs-text-field__form'))
    this.lineRipple = new RSLineRipple(this.$el.querySelector('.rs-line-ripple'))
    this.el = this.$el

    if(this.type === 'date') {
      this.el.classList.add('-floatabove')
    }
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
    },
    passChangeEvent(event) {
      this.$emit('change', event.target.value)
    },
    activateTextField() {
      this.changeLabelStyle('activate')
      this.activateRipple()

      this.el.querySelector('.rs-text-field__input').focus()
      this.host.addEventListener('blur', () => {
        this.el.classList.remove('-focus')
        this.deactivateTextField()
      })
    },
    deactivateTextField() {
      this.changeLabelStyle('deactivate')
      this.deactivateRipple()
    },
    activateRipple() {
      this.lineRipple.activate()
      this.el.querySelector('.rs-text-field__form').classList.add('rs-ripple-upgraded--background-focused')
    },
    deactivateRipple() {
      this.lineRipple.deactivate()
      this.el.querySelector('.rs-text-field__form').classList.remove('rs-ripple-upgraded--background-focused')
    },
    changeLabelStyle(state) {
      if(state == 'activate') {
        // float form label to above and focus
        this.el.classList.add('-floatabove', '-focus')        
        this.setLabelWidth(this.formLabel)
        this.formLabel.classList.remove('-shake')
      } else {
        // remove label focus ( and if textfield does not input anyting, sink label)
        this.el.classList.remove('-focus')    
        if(this.type === 'date' || this.value.length > 0) {
          this.el.classList.add('-floatabove')
        } else {
          this.el.classList.remove('-floatabove')
        }
        // only error
        if(this.value.length > 0 && this.invalid) {
          this.formLabel.classList.add('-shake')
        }     
      }
    },
    setLabelWidth(label) {
      const labelWidth = this.getElementProperty(label, 'width')
      if(!labelWidth || !this.isOutlined) { return }
      const percentage = this.isDense ? 0.8 : 0.75
      const width = parseInt(labelWidth.replace('px', '')) * percentage + 8
      this.el.querySelector('.rs-notched-outline__notch').style.setProperty('--rs-text-field-notched-outline-notch--width', `${width}px`)
    }
  }
}
</script>

<style lang="scss">
@import "../mixins";
@import "../character-counter/mixins";
@import "../variables";
@import "../icon/variables";
@import "@rsmdc/notched-outline/mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";
@import "@rsmdc/form-field/mixins";

:host {
  width: var(--rs-text-field_host--width);
}

.rs-text-field__form {
  @include rs-text-field-form_;
}

.rs-text-field__inputarea {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  transition: rs-text-field-transition(opacity);
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid;


  .-outlined & {
    border: none !important; 
    border-bottom: none;
    border-radius: var(--rs-text-field__outlined-form-inputarea--border-radius, 4px);
  }

  :not([disabled]) & {
    background-color: var(--rs-text-field_not__disabled-form-inputarea--background-color);
  }

  :not([disabled]):not(.-outlined):not(.rs-text-field--textarea) & {
    border-bottom-color: var(--rs-text-field_not__disabled_not__outlined-form_not__textarea-inputarea--border-bottom-color, $rs-text-field-bottom-line-idle);
  }

  :not([disabled]):not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: var(--rs-text-field_not__disabled_not__outlined-form_not__textarea-inputarea_hover--border-bottom-color, $rs-text-field-bottom-line-hover);
  }

  [invalid]:not([disabled]):not(.-outlined):not(.rs-text-field--textarea) &,
  [invalid]:not([disabled]):not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: $rs-text-field-error;
  }

  [disabled] & {
    background-color: $rs-text-field-disabled-background;
  }

  [disabled] &,
  [disabled]:not(.-outlined):not(.rs-text-field--textarea) &,
  [disabled]:not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: $rs-text-field-disabled-border;
  }

  [invalid] & {
    border-bottom-color: $rs-text-field-error;
  }

  &::before {
    width: 24px;
    position: absolute;
    left: 16px;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;

    height: var(--rs-text-field-form-inputarea_before--height);
    font-family: var(--rs-text-field-form-inputarea_before--font-family);
    background-image: var(--rs-text-field-form-inputarea_before--background-image);
    font-size: var(--rs-text-field-form-inputarea_before--font-size, 24px);
    font-weight: var(--rs-text-field-form-inputarea_before--font-weight, 400);
    display: var(--rs-text-field-form-inputarea_before--display, none);
    content: var(--rs-text-field-form-inputarea_before--content, '');
    top: var(--rs-text-field-form-inputarea_before--top, auto);
    bottom: var(--rs-text-field-form-inputarea_before--bottom, auto);
  }

  .-icon.-dense &::before {
    transform: scale(.8);
    left: 12px;
  }
}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-text-field__action {
  min-width: 24px;
  height: 24px;
  margin-right: 16px;
  margin-left: -4px;

  &.-none {
    display: none;
  }

  .-dense & {
    transform: scale(.8);
    margin-right: 12px;
  }
}

.rs-ripple-upgraded {
  @include rs-ripple-surface;
  @include rs-ripple-radius-bounded;

  &::before{
    background-color: var(--rs-ripple_before--background-color, $rs-text-field-ink-color);
    content: var(--rs-ripple_before--content, '');
  }

  .-outlined &::before {
    background-color: transparent;
  }

  &::after {
    background-color: var(--rs-ripple_after--background-color, $rs-text-field-ink-color);
    content: var(--rs-ripple_after--content, '');
  }

  &:hover::before {
    opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity($rs-text-field-ink-color, hover));
  }

  &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
    transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
    opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity($rs-text-field-ink-color, focus));
  }

  &.rs-ripple-upgraded--background-focused::before {
    transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
    opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity($rs-text-field-ink-color, focus));
  }

}

.rs-line-ripple {
  background-color: var(--rs-line-ripple--background-color, $rs-theme-primary);

  [invalid] & {
    background-color: $rs-text-field-error;
  }

  .-outlined & {
    display: none;
  }
}

@include rs-floating-label-animation;

.rs-text-field__label {

  &.-none {
    display: none;
  }

  :not(.-none) &,
  &:not(.-none) {
    @include rs-floating-label_;
  }
}

.rs-text-field-character-counter {
  @include rs-text-field-character-counter_;
}

.rs-notched-outline {
  @include rs-notched-outline_;
}


.rs-notched-outline__leading {
  @include rs-notched-outline-leading_;
}

.rs-notched-outline__notch {
  @include rs-notched-outline-notch_;
}

.rs-notched-outline__trailing {
  @include rs-notched-outline-trailing_;
}

</style>
