<template>
  <div class="rs-text-field" ref="slotContainer">
    <input type="text" class="rs-text-field__input"
      :value="value" :maxLength="maxLength" :placeholder="placeholder" :autocomplete="autocomplete" :required="isRequired" :disabled="isDisabled">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    maxLength: {
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
      isRequired: false,
      isDisabled: false,
      textLength: 0
    }
  },
  watch: {
    disabled() {
      
    },
    required() {

    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
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

</style>
