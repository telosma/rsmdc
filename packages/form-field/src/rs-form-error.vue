<template>
  <div class="rs-form-field-line -error" :class="{ '-left': labelPosition === 'left' }">
    <p class="rs-form-field-error" ref="slotContainer">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'textfield'
    },
    labelPosition: {
      type: String,
      default: 'left'
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
@import "@rsmdc/theme/mixins";
@import "../helper-text/mixins";
@import "../helper-text/rs-variables";
@import "../../textfield/variables";
@import "../../textfield/functions";

:host {
  @include rs-form-field-line-host_;
  z-index: 2;
}

.rs-form-field-line {
  @include rs-form-field-line_;
}

.rs-form-field-error {
  @include rs-form-field-helper_;
  opacity: 1;
  color: $rs-text-field-error;
}
</style>
