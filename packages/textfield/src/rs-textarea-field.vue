<template>
  <div class="rs-text-field rs-text-field--textarea" ref="slotContainer">
    <textaera type="text" class="rs-text-field__input"
      :value="value" :maxLength="maxLength" :cols="cols" :rows="rows" :placeholder="placeholder" :autocomplete="autocomplete" :required="required" :disabled="isDisabled" />
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
    maxlength: {
      type: Number,
      default: 0
    },
    cols: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 1
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
    reauired() {

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

:host {
  @include rs-notched-outline-floating-label-float-position($rs-text-field-outlined-label-position-y, 0%);
  --rs-notched-outline__shake-leading-notch-form-label__floatinglabel--animation: #{rs-form-label-floattinglabel-shake-animation(text-field-outlined)};
}

</style>
