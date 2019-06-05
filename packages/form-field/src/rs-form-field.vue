<template>
  <div class="rs-form-field" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '',
      checkbox: '',
      textField: '',
      label: '',
      helper: '',
      error: ''
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
          if(!this.helper) {
            this.helper = item.shadowRoot.querySelector('.rs-form-field-line')
          }

        })
        this.radio = this.radio.parentNode.host
        this.label = this.label.parentNode.host
        this.helper = this.helper.parentNode.host

        

        const labelPosition = items.findIndex(item => item.isEqualNode(this.label))

        if(labelPosition > 0) {
          this.helper.setAttribute('label-position', 'right')
        }

        if(this.radio) {
          this.helper.setAttribute('type', 'radio')
        }


        
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


