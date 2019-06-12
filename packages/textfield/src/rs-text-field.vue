<template>
  <div class="rs-text-field">
    <div class="rs-text-field__form" ref="slotContainer" @click="activateTextField">
      <div class="rs-text-field__inputarea">
        <input :type="type" class="rs-text-field__input" v-model="value"
          :value="value" :maxlength="maxlength" :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent">
      </div>
      <div class="rs-line-ripple" />
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
import { RSLineRipple } from '../../line-ripple/index'

export default {
  props: {
    countable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 0
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
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      el: '',
      host: '',
      lineRipple: '',
      formLabels: [],
      hasIcon: ''
    }
  },
  watch: {
    dataId() {
      this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)

      // if textfield has value, float form label. And if text field has icon, add class '-icon'.
      this.formLabels.forEach(formLabel => {
        const label = formLabel.shadowRoot.querySelector('.rs-form-label')
        if(this.value.length > 0 || this.type === 'date') { 
          label.classList.add('-floatabove')
        }
        if(this.hasIcon) {
          label.classList.add('-icon')
        }
      })
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.textfield.textfields.push(this.host)
      this.hasIcon = this.getElementProperty(this.host, '--rs-text-field__icon')
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
    this.lineRipple = new RSLineRipple(this.$el.querySelector('.rs-line-ripple'))
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
    activateTextField() {
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
          if(this.type === 'date' || this.value.length > 0) {
            label.classList.add('-floatabove')
            this.el.classList.add('-floatabove')
          } else {
            label.classList.remove('-floatabove')
            this.el.classList.remove('-floatabove')
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
@import "../notched-outline/mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";

:host {
  width: var(--rs-text-field_host--width);
}

.rs-text-field__form {
  @include rs-text-field-form_;
}

.rs-text-field__inputarea {
  position: relative;
  height: 100%;

  &::before {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;
    background-image: var(--rs-text-field-form-inputarea_before--background-image);
    content: var(--rs-text-field-form-inputarea_before--content, none);
  }
}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-line-ripple {
  @include rs-text-field-line-ripple-color(primary);

  .-invalid & {
    @include rs-text-field-line-ripple-color($rs-text-field-error);
  }

  .-outlined & {
    display: none;
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
