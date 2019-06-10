<template>
  <div class="rs-text-field -textfield" ref="slotContainer" @click="activateRipple">
    <input type="text" class="rs-text-field__input"
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
    }
  },
  data() {
    return {
      el: '',
      host: '',
      lineRipple: '',
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
    activateRipple() {
      this.lineRipple.activate()
      this.$el.classList.add('rs-ripple-upgraded--background-focused')
      this.el.querySelector('.rs-text-field__input').focus()
      this.host.addEventListener('blur', () => {
        this.deactivateRipple()
      })
    },
    deactivateRipple() {
      this.lineRipple.deactivate()
      this.$el.classList.remove('rs-ripple-upgraded--background-focused')
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
