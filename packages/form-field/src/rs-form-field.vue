<template>
  <div class="rs-form-field" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radio: '',
      checkbox: '',
      textField: '',
      label: '',
      helperText: '',
      errorText: '',
      isError: '',
      isDisabled: ''
    }
  },
  watch: {
    error() {
      this.isError = this.error ? true : false
    },
    disabled() {
      this.isDisabled = this.disabled ? true : false
    },
    isError() {
      if(this.isError && this.errorText) {
        this.errorText.parentNode.host.removeAttribute('hidden')
      }
      if(this.isError && this.helperText) {
        this.helperText.parentNode.host.setAttribute('hidden', true)
      }
      if(!this.isError && this.errorText) {
        this.errorText.parentNode.host.setAttribute('hidden', true)
      }
      if(!this.isError && this.helperText) {
        this.helperText.parentNode.host.removeAttribute('hidden')
      }
    },
    isDisabled() {
      if(this.isDisabled && this.radio) {
        this.radio.parentNode.host.setAttribute('disabled', true)
      }
      if(this.isDisabled && this.label) {
        this.label.parentNode.host.setAttribute('disabled', true)
      }
      if(!this.isDisabled && this.radio) {
        this.radio.parentNode.host.removeAttribute('disabled')
      }
      if(!this.isDisabled && this.label) {
        this.label.parentNode.host.removeAttribute('disabled')
      }
    }
  },
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const items = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
        items.forEach(item => {
          if(!this.radio) {
            this.radio = item.shadowRoot.querySelector('.rs-radio')
          }
          if(!this.label) {
            this.label = item.shadowRoot.querySelector('.rs-form-label')
          }
          if(!this.helperText) {
            this.helperText = item.shadowRoot.querySelector('.-helper')
          }
          if(!this.errorText) {
            this.errorText = item.shadowRoot.querySelector('.-error')
          }
        })

        const labelPosition = items.findIndex(item => item.isEqualNode(this.label.parentNode.host))
        if(labelPosition > 0 && this.helperText) {
          this.helperText.parentNode.host.setAttribute('label-position', 'right')
        }
        if(labelPosition > 0 && this.errorText) {
          this.errorText.parentNode.host.setAttribute('label-position', 'right')
        }

        if(this.radio && this.helperText) {
          this.helperText.parentNode.host.setAttribute('type', 'radio')
        }
        if(this.radio && this.errorText) {
          this.errorText.parentNode.host.setAttribute('type', 'radio')
        }
        this.isError = this.error ? true : false
        this.isDisabled = this.disabled ? true : false
      })
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
    }
  }
}
</script>
<style lang="scss">

.rs-form-field {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  &.-text {

  }

  &.-textarea {

  }

  &.-select {

  } 
}
</style>


