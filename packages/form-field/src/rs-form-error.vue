<template>
  <div class="rs-form-field-line -error">
    <p class="rs-form-field-error" ref="slotContainer">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    dataType: {
      type: String,
      default: 'textfield'
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
@import "../rs-variables";
@import "../helper-text/mixins";
@import "../helper-text/rs-variables";
@import "../helper-text/rs-functions";

:host {
  @include rs-form-field-line-host_;
  z-index: 2;
}

:host([data-type="textfield"]) {
  bottom: $rs-form-field-helper-text-bottom;
}

.rs-form-field-line {
  @include rs-form-field-line_;
}

.rs-form-field-error {
  @include rs-form-field-helper_;
  opacity: 1;
  color: $rs-form-field-error;
}
</style>
