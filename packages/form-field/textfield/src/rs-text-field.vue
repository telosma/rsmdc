<template>
  <div class="rs-text-field" ref="slotContainer">
    <input type="text" class="rs-text-field__input"
      :value="value" :maxLength="maxLength" :placeholder="placeholder" :autocomplete="autocomplete" :required="isRequired" :disabled="isDisabled">
    <slot></slot>
    <div class="rs-line-ripple" />
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


.rs-text-field {
  @include rs-text-field_;

  &[disabled] {
    @include rs-text-field-disabled_;
  }

  &[invalid] {
    @include rs-text-field-invalid_;
  }
}


.floating-label {
  &[disabled] {
    @include rs-text-field-label-ink-color_($rs-text-field-disabled-label-color);
  }
}


.rs-notched-outline {
  @include rs-notched-outline-color($color);

}

.rs-text-field--textarea {

}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-text-field-character-counter {

  //.rs-text-field-character-counter + .rs-text-field__input
  .rs-text-field--textarea & {
    margin-bottom: 28px; // Leaves space for character counter if it exists.
    padding-bottom: 0;
  }
}

.rs-floating-label {
  .rs-text-field--textarea & {
    top: 17px;
    bottom: auto;
    width: auto;
    pointer-events: none;
  }
}

</style>
