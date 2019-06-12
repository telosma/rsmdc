<template>
  <div class="rs-text-field -outlined -textarea">
    <div class="rs-text-field__form rs-text-field--textarea" ref="slotContainer" @click="activateTextArea">
    <textarea class="rs-text-field__input" v-model="value" :value="value" :maxlength="maxlength" :cols="cols" :rows="rows"
      :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent" />
    </div>
    <div class="rs-notched-outline">
      <div class="rs-notched-outline__leading" />
        <div class="rs-notched-outline__notch" />
      <div class="rs-notched-outline__trailing" />
    </div>
    <div class="rs-text-field-character-counter" v-if="countable">{{ `${value.length} / ${maxlength}` }}</div>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
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
    }
  },
  data() {
    return {
      el: '',
      host: '',
      formLabels: [],
      labelPosition: ''
    }
  },
  watch: {
    dataId() {
      this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      // if textfield has value, float form label.
      this.formLabels.forEach(formLabel => {
        const label = formLabel.shadowRoot.querySelector('.rs-form-label')
        if(this.value.length > 0) { 
          label.classList.add('-floatabove')
        }
        if(this.labelPosition) {
          label.style.setProperty('--rs-form-label__textarea__floatinglabel--left', this.labelPosition)
        }
      })
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.textfield.textareas.push(this.host)
      this.labelPosition = this.getElementProperty(this.host, '--rs-form-label__textarea__floatinglabel--left')
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.textfield) {
      window.__rsmdc.textfield = {
        textfields: [],
        textareas: []
      }
    }
  },
  mounted() {
    const ripple = new RSRipple(this.$el.querySelector('.rs-text-field__form'))
    this.el = this.$el
  },
  methods: {
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    },
    passChangeEvent(event) {
      this.$emit('change', event.target.value)
    },
    activateTextArea() {
      if(this.formLabels.length === 0) {
        this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      }
      this.changeLabelStyle('activate')
      this.el.classList.add('-floatabove')
      this.activateRipple()

      this.el.classList.add('-focus')
      this.el.querySelector('.rs-text-field__input').focus()
      this.host.addEventListener('blur', () => {
        this.el.classList.remove('-focus')
        this.deactivateTextField()
      })
    },
    deactivateTextField() {
      this.changeLabelStyle('deactivate')
      if(this.value.length === 0) {
        this.el.classList.remove('-floatabove')
      }
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
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          this.setLabelWidth(label)
          label.click()
          label.classList.add('-floatabove')
          label.classList.add('-focus')
          label.classList.remove('-shake')
        })
      } else {
        // remove label focus ( and if textfield does not input anyting, sink label)
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          label.classList.remove('-focus')
          if(this.value.length === 0) {
            label.classList.remove('-floatabove')
            this.el.classList.remove('-floatabove')
          } else {
            this.el.classList.add('-floatabove')
          }
          // only error
          if(this.value.length > 0 && label.classList.contains('-invalid')) {
            label.classList.add('-shake')
          }     
        })
      }
    },
    setLabelWidth(label) {
      const labelWidth = this.getElementProperty(label, 'width')
      if(!labelWidth) { return }
      const width = parseInt(labelWidth.replace('px', '')) * 0.75 + 8
      this.el.querySelector('.rs-notched-outline__notch').style.setProperty('--rs-text-field__outlined-notched-outline-notch--width', `${width}px`)
    }
  }
}
</script>

<style lang="scss">
@import "../mixins";
@import "../character-counter/mixins";
@import "@rsmdc/notched-outline/mixins";

.rs-text-field__form.rs-text-field--textarea {
  @include rs-text-field-form_;

  display: inline-flex;
  width: auto;
  height: auto;
  transition: none;
  resize: auto;

  .-disabled & {
    background-color: $rs-textarea-disabled-background;
    border-bottom: none;
  }

  :not(.-disabled) & {
    background-color: var(--rs-text-field_not__disabled-form__textarea--background-color, transparent);
  }

  &::before {
    background-color: var(--rs-text-field-form__textarea__before--background-color, transparent);
  }

  > .rs-text-field__input {
    $padding-inset: 16px;

    align-self: auto;
    box-sizing: border-box;
    height: auto;
    margin: $padding-inset/2 1px 1px 0;
    padding: 0 $padding-inset $padding-inset;
    border: none;
  }
}

.rs-text-field__input {
  @include rs-text-field-input_;
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
