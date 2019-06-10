<template>
  <div class="rs-text-field -textfield" ref="slotContainer" @click="activateTextField">
    <input type="text" class="rs-text-field__input" v-model="inputText"
      :value="value" :maxLength="maxLength" :placeholder="placeholder" :autocomplete="autocomplete" :required="isRequired" :disabled="isDisabled">
    <div class="rs-line-ripple" />
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

import { RSLineRipple } from '../../line-ripple/index'

export default {
  props: {
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
    required: {
      type: String,
      default: 'initial'
    },
    disabled: {
      type: String,
      default: 'initial'
    },
    dataId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      el: '',
      host: '',
      inputText: '',
      lineRipple: '',
      formLabels: [],
      isRequired: false,
      isDisabled: false,
      textLength: 0
    }
  },
  watch: {
    disabled() {
      
    },
    required() {

    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.textfield.textfields.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.textfield) {
      window.__rsmdc.textfield = {
        textfields: []
      }
    }
  },
  mounted() {
    const ripple = new RSRipple(this.$el)
    this.lineRipple = new RSLineRipple(this.$el.querySelector('.rs-line-ripple'))
    this.el = this.$el
    // this.$nextTick().then(this.fixSlot.bind(this))
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
    activateTextField() {
      if(this.formLabels.length === 0) {
        this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      }
      this.changeLabelStyle('activate')
      this.activateRipple()

      this.el.querySelector('.rs-text-field__input').focus()
      this.host.addEventListener('blur', () => {
        this.deactivateTextField()
      })
    },
    deactivateTextField() {
      this.changeLabelStyle('deactivate')
      this.deactivateRipple()
    },
    activateRipple() {
      this.lineRipple.activate()
      this.$el.classList.add('rs-ripple-upgraded--background-focused')
    },
    deactivateRipple() {
      this.lineRipple.deactivate()
      this.$el.classList.remove('rs-ripple-upgraded--background-focused')
    },
    changeLabelStyle(state) {
      if(state == 'activate') {
        // float form label to above and focus
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          label.classList.add('-above')
          label.classList.add('-focus')
        })
      } else {
        // remove label focus ( and if textfield does not input anyting, sink label)
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          label.classList.remove('-focus')
          if(this.inputText.length === 0) {
            label.classList.remove('-above')
          }      
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";


.rs-text-field {
  @include rs-text-field_;
}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-line-ripple {
  @include rs-text-field-line-ripple-color(primary);

  [invlaid] & {
    @include rs-text-field-line-ripple-color($rs-text-field-error);
  }
}

</style>
