<template>
  <div class="rs-text-field">
    <div class="rs-text-field__form" @click="activateTextField">
      <div class="rs-text-field__inputarea">
        <input :type="type" class="rs-text-field__input" v-model="value"
          :value="value" :maxlength="maxlength" :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent">
        <div class="rs-text-field__action" ref="slotContainer">
          <slot></slot>
        </div>
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
import { RSLineRipple } from "@rsmdc/line-ripple";

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
      hasIcon: '',
      labelPosition: ''
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
        if(this.labelPosition) {
          label.style.setProperty('--rs-form-label__outlined__floatinglabel--left', this.labelPosition)
        }
      })
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.textfield.textfields.push(this.host)
      this.hasIcon = this.getElementProperty(this.host, '--rs-text-field__icon')
      this.labelPosition = this.getElementProperty(this.host, '--rs-form-label__outlined__floatinglabel--left')
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
@import "@rsmdc/notched-outline/mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";

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
  border-radius: 0;
  box-sizing: border-box;
  border: var(--rs-text-field-form-input--border, none);
  border-bottom: var(--rs-text-field-form-input--border-bottom, 1px solid);

  .-invalid & {
    border-bottom-color: $rs-text-field-error;
  }

  :not(.-disabled) & {
    background-color: var(--rs-text-field_not__disabled-form-inputarea--background-color);
  }

  :not(.-disabled).-outlined & {
    border-radius: var(--rs-text-field_not__disabled__outlined-form-inputarea--border-radius);
  }

  :not(.-disabled):not(.-outlined):not(.rs-text-field--textarea) & {
    border-bottom-color: var(--rs-text-field_not__disabled_not__outlined-form_not__textarea-inputarea--border-bottom-color, $rs-text-field-bottom-line-idle);
  }

  :not(.-disabled):not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: var(--rs-text-field_not__disabled_not__outlined-form_not__textarea-inputarea_hover--border-bottom-color, $rs-text-field-bottom-line-hover);
  }

  .-invalid:not(.-disabled):not(.-outlined):not(.rs-text-field--textarea) &,
  .-invalid:not(.-disabled):not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: $rs-text-field-error;
  }

  .-disabled &,
  .-disabled:not(.-outlined):not(.rs-text-field--textarea) &,
  .-disabled:not(.-outlined):not(.rs-text-field--textarea) &:hover {
    border-bottom-color: $rs-text-field-disabled-border;
  }

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

.rs-text-field__action {
  min-width: 24px;
  height: 24px;
  margin-right: 16px;

  &.-none {
    display: none;
  }
}

.rs-line-ripple {
  @include rs-line-ripple-color(primary);

  .-invalid & {
    @include rs-line-ripple-color($rs-text-field-error);
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
