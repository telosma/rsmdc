<template>
  <div class="rs-form-field" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
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
    error: {
      type: Boolean,
      default: false
    },
    countable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
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
      if(this.isDisabled && this.checkbox) {
        this.checkbox.parentNode.host.setAttribute('disabled', true)
      }
      if(this.isDisabled && this.textField) {
        this.textField.parentNode.host.setAttribute('disabled', true)
      }
      if(this.isDisabled && this.label) {
        this.label.parentNode.host.setAttribute('disabled', true)
      }
      if(!this.isDisabled && this.radio) {
        this.radio.parentNode.host.removeAttribute('disabled')
      }
      if(!this.isDisabled && this.checkbox) {
        this.checkbox.parentNode.host.removeAttribute('disabled')
      }
      if(!this.isDisabled && this.textField) {
        this.textField.parentNode.host.removeAttribute('disabled')
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
          if(!this.checkbox) {
            this.checkbox = item.shadowRoot.querySelector('.rs-checkbox')
          }    
          if(!this.textField) {
            this.textField = item.shadowRoot.querySelector('.-textfield')
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
        this.label.parentNode.host.setAttribute('data-formindex', labelPosition)

        if(this.radio && this.label) {
          this.label.parentNode.host.setAttribute('data-type', 'radio')
        } 
        if(this.checkbox && this.label) {
          this.label.parentNode.host.setAttribute('data-type', 'checkbox')
        } 
        if(this.textField && this.label) {
          this.label.parentNode.host.setAttribute('data-type', 'textfield')
        } 
        if(this.textField && this.helperText) {
          this.helperText.parentNode.host.setAttribute('data-type', 'textfield')
        } 

        if(this.id && this.radio) {
          this.radio.parentNode.host.setAttribute('data-id', this.id)
        }
        if(this.id && this.checkbox) {
          this.checkbox.parentNode.host.setAttribute('data-id', this.id)
        }
        if(this.id && this.textField) {
          this.textField.parentNode.host.setAttribute('data-id', this.id)
        }
        if(this.id && this.label) {
          this.label.parentNode.host.setAttribute('data-id', this.id)
        }
        if(this.name && this.radio) {
          this.radio.parentNode.host.setAttribute('name', this.name)
        }
        if(this.name && this.checkbox) {
          this.checkbox.parentNode.host.setAttribute('name', this.name)
        }
        if(this.name && this.label) {
          this.label.parentNode.host.setAttribute('name', this.name)
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


