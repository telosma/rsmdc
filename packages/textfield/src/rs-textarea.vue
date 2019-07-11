<template>
  <div class="rs-text-field -outlined -textarea" :class="{ '-nolabel': label.length === 0 }" :required="required" :disabled="disabled" :invalid="invalid">
    <div class="rs-text-field__form rs-text-field--textarea" @click="activateTextField">
    <textarea class="rs-text-field__input" :id="id" v-model="text" :value="value" :maxlength="maxlength" :cols="cols" :rows="rows"
      :placeholder="placeholder" :autocomplete="autocomplete" @input="passChangeEvent" />
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
    dataId: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    cols: {
      type: Number,
      default: 0
    },
    rows: {
      type: Number,
      default: 0
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
      labelPosition: '',
      hasValue: '',
      text: ''
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.labelPosition = this.getElementProperty(this.host, '--rs-form-label__textarea__floatinglabel--left')
      this.formLabel = this.el.querySelector('.rs-text-field__label')
      this.hasValue = this.value.length > 0
    },
    hasValue() {
      if(!this.hasValue) { return }
      this.el.classList.add('-floatabove')
    }
  },
  mounted() {
    const ripple = new RSRipple(this.$el.querySelector('.rs-text-field__form'))
    this.el = this.$el

    this.text = this.value
  },
  methods: {
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    },
    passChangeEvent(event) {
      this.$emit('change', event.target.value)
      this.host.setAttribute('data-input', true)
      this.host.text = this.text
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
      this.el.querySelector('.rs-text-field__form').classList.add('rs-ripple-upgraded--background-focused')
    },
    deactivateRipple() {
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
        if(this.value.length > 0) {
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
@import "@rsmdc/notched-outline/mixins";
@import "@rsmdc/floating-label/mixins";
@import "../mixins";
@import "../character-counter/mixins";

.rs-text-field.-outlined {
  > .rs-text-field__form.rs-text-field--textarea {
    @include rs-text-field-form_;

    display: inline-flex;
    width: auto;
    height: auto;
    transition: none;
    resize: auto;

    &::before {
      background-color: var(--rs-text-field-form__textarea__before--background-color, transparent);
    }
  }

  &:not([disabled]) > .rs-text-field__form.rs-text-field--textarea {
    background-color: var(--rs-text-field_not__disabled-form__textarea--background-color, transparent);
  }

  &[disabled] > .rs-text-field__form.rs-text-field--textarea {
    pointer-events: none;
    background-color: $rs-textarea-disabled-background;
    border-bottom: none;
    resize: none;
  }

  > .rs-text-field__form.rs-text-field--textarea > .rs-text-field__input {
    $padding-inset: 16px;

    align-self: auto;
    box-sizing: border-box;
    height: auto;
    margin: $padding-inset/2 1px 1px 0;
    padding: 0 $padding-inset $padding-inset;
    border: none;
  }

  &[disabled] > .rs-text-field__form.rs-text-field--textarea > .rs-text-field__input {
    resize: none;
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

.rs-text-field__input {
  @include rs-text-field-input_;
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
  
  padding-bottom: 0;
  position: absolute;
  bottom: var(--rs-text-field-character-counter--bottom, 13px);
  right: var(--rs-text-field-character-counter--right, 16px);
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
