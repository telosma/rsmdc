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
    label: {
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
      el: '',
      host: '',
      radio: '',
      checkbox: '',
      textField: '',
      textArea: '',
      helperText: '',
      errorText: '',
      isError: '',
      isDisabled: '',
      isRequired: '',
      isOutlined: ''
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    error() {
      this.isError = this.error
    },
    disabled() {
      this.isDisabled = this.disabled
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

      if(this.isError && this.textField) {
        this.textField.parentNode.host.setAttribute('invalid', this.isError)
      }
      if(!this.isError && this.textField) {
        this.textField.parentNode.host.setAttribute('invalid', this.isError)
      }
      if(this.isError && this.textArea) {
        this.textArea.parentNode.host.setAttribute('invalid', this.isError)
      }
      if(!this.isError && this.textArea) {
        this.textArea.parentNode.host.setAttribute('invalid', this.isError)
      }
    },
    isDisabled() {
      if(this.isDisabled && this.radio) {
        this.radio.parentNode.host.setAttribute('disabled', true)
      }
      if(!this.isDisabled && this.radio) {
        this.radio.parentNode.host.removeAttribute('disabled')
      }
      if(this.isDisabled && this.checkbox) {
        this.checkbox.parentNode.host.setAttribute('disabled', true)
      }
      if(!this.isDisabled && this.checkbox) {
        this.checkbox.parentNode.host.removeAttribute('disabled')
      }
      if(this.isDisabled && this.textField) {
        this.textField.parentNode.host.setAttribute('disabled', this.isDisabled)
      }
      if(!this.isDisabled && this.textField) {
        this.textField.parentNode.host.setAttribute('disabled', this.isDisabled)
      }
      if(this.isDisabled && this.textArea) {
        this.textArea.parentNode.host.setAttribute('disabled', this.isDisabled)
      }
      if(!this.isDisabled && this.textArea) {
        this.textArea.parentNode.host.setAttribute('disabled', this.isDisabled)
      }
      
      if(this.isDisabled && this.helperText) {
        this.helperText.classList.add('-disabled')
      }
      if(!this.isDisabled && this.helperText) {
        this.helperText.classList.remove('-disabled')
      }

    },
    isRequired() {
      if(this.isRequired && this.textField) {
        this.textField.parentNode.host.setAttribute('required', this.isRequired)
      }
      if(!this.isRequired && this.textField) {
        this.textField.parentNode.host.setAttribute('required', this.isRequired)
      }
      if(this.isRequired && this.textArea) {
        this.textArea.parentNode.host.setAttribute('required', this.isRequired)
      }
      if(!this.isRequired && this.textArea) {
        this.textArea.parentNode.host.setAttribute('required', this.isRequired)
      }
    },
    textField() {
      if(!this.textField) { return }
      const label = this.textField.querySelector('.rs-text-field__label')

      if(!label) { return }
      this.setLabelWidth(label, this.textField)
    },
    textArea() {
      if(!this.textArea) { return }
      const label = this.textArea.querySelector('.rs-text-field__label')

      if(!label) { return }
      this.setLabelWidth(label, this.textArea)
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
            this.textField = item.shadowRoot.querySelector('.rs-text-field')
          }
          if(!this.textArea) {
            this.textArea = item.shadowRoot.querySelector('.rs-text-field.-textarea')
          }
          if(!this.helperText) {
            this.helperText = item.shadowRoot.querySelector('.-helper')
          }
          if(!this.errorText) {
            this.errorText = item.shadowRoot.querySelector('.-error')
          }
        })

        if(this.textField && this.helperText) {
          this.helperText.parentNode.host.setAttribute('data-type', 'textfield')
        } 
        if(this.textArea && this.helperText) {
          this.helperText.parentNode.host.setAttribute('data-type', 'textarea')
        } 
        if(this.textField && this.errorText) {
          this.errorText.parentNode.host.setAttribute('data-type', 'textfield')
        }
        if(this.textArea && this.errorText) {
          this.errorText.parentNode.host.setAttribute('data-type', 'textarea')
        } 

        if(this.id && this.radio) {
          this.radio.parentNode.host.setAttribute('id', this.id)
        }
        if(this.id && this.checkbox) {
          this.checkbox.parentNode.host.setAttribute('id', this.id)
        }
        if(this.id && this.textField) {
          this.textField.parentNode.host.setAttribute('id', this.id)
        }
        if(this.id && this.textArea) {
          this.textArea.parentNode.host.setAttribute('id', this.id)
        }
        if(this.label && this.radio) {
          this.radio.parentNode.host.setAttribute('label', this.label)
        }
        if(this.label && this.checkbox) {
          this.checkbox.parentNode.host.setAttribute('label', this.label)
        }
        if(this.label && this.textField) {
          this.textField.parentNode.host.setAttribute('label', this.label)
        }
        if(this.label && this.textArea) {
          this.textArea.parentNode.host.setAttribute('label', this.label)
        }
        
        if(this.name && this.radio) {
          this.radio.parentNode.host.setAttribute('name', this.name)
        }
        if(this.name && this.checkbox) {
          this.checkbox.parentNode.host.setAttribute('name', this.name)
        }
        if(this.name && this.textField) {
          this.textField.parentNode.host.setAttribute('name', this.name)
        }
        if(this.name && this.textArea) {
          this.textArea.parentNode.host.setAttribute('name', this.name)
        }

        if(this.id && this.label2) {
          this.label2.parentNode.host.setAttribute('data-id', this.id)
        }
        if(this.name && this.label2) {
          this.label2.parentNode.host.setAttribute('name', this.name)
        }

        this.isError = this.error
        this.isDisabled = this.disabled
        this.isRequired = this.required
        this.el = this.$el
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
    },
    setLabelWidth(label, textField) {
      const labelWidth = this.getElementProperty(label, 'width')
      let width = parseInt(labelWidth.replace('px', '')) * 0.75 + 8
      if(this.required) {
        width += 4
      }
      textField.style.setProperty('--rs-text-field-notched-outline-notch--width', `${width}px`)
    }
  }
}
</script>
<style lang="scss">

:host {
  display: inline-block;
  height: 100%;
  margin-bottom: 22px;
  width: var(--rs-form-field_host--width);
}

.rs-form-field {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  width: var(--rs-form-field--width);
}
</style>


