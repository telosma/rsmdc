<template>
  <div>
    <div class="rs-text-field -textfield" ref="slotContainer" @click="activateTextField">
      <input type="text" class="rs-text-field__input" v-model="value"
        :value="value" :maxlength="maxlength" :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent">
      <div class="rs-line-ripple" />
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
    }
  },
  data() {
    return {
      el: '',
      host: '',
      lineRipple: '',
      formLabels: []
    }
  },
  watch: {
    dataId() {
      if(this.value.length === 0) { return }
      // if textfield has value, float form label.
      this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      this.formLabels.forEach(formLabel => {
        const label = formLabel.shadowRoot.querySelector('.rs-form-label')
        label.classList.add('-floatabove')
      })
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
    const ripple = new RSRipple(this.$el.querySelector('.rs-text-field'))
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
      this.el.querySelector('.rs-text-field').classList.add('rs-ripple-upgraded--background-focused')
    },
    deactivateRipple() {
      this.lineRipple.deactivate()
      this.el.querySelector('.rs-text-field').classList.remove('rs-ripple-upgraded--background-focused')
    },
    changeLabelStyle(state) {
      if(state == 'activate') {
        // float form label to above and focus
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-notched-outline')
          label.click()
          label.classList.add('-floatabove')
          label.classList.add('-focus')
          label.classList.remove('-shake')
        })
      } else {
        // remove label focus ( and if textfield does not input anyting, sink label)
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-notched-outline')
          label.classList.remove('-focus')
          if(this.value.length === 0) {
            label.classList.remove('-floatabove')
          }
          // only error
          if(this.value.length > 0 && label.classList.contains('-invalid')) {
            label.classList.add('-shake')
          }     
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../mixins";
@import "../character-counter/mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";

:host {
  width: var(--rs-text-field_host--width);
}

.rs-text-field {
  @include rs-text-field_;
}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-line-ripple {
  @include rs-text-field-line-ripple-color(primary);

  .-invalid & {
    @include rs-text-field-line-ripple-color($rs-text-field-error);
  }

  &.-none {
    display: none;
  }
}

.rs-text-field-character-counter {
  @include rs-text-field-character-counter_;

  //for textarea
  // margin-bottom: 28px; // Leaves space for character counter if it exists.
  // padding-bottom: 0;
  // position: absolute;
  // bottom: var(--rs-text-field-character-counter--bottom, 13px);
  // right: var(--rs-text-field-character-counter--right, 16px);
}
</style>
