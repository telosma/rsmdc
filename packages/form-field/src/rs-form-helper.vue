<template>
  <div class="rs-form-field-line -helper">
    <p class="rs-form-field-helper" ref="slotContainer">
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
  z-index: 1;
}

:host([data-type="textfield"]) {
  bottom: $rs-form-field-helper-text-bottom;
}

.rs-form-field-line {
  @include rs-form-field-line_;

  &:not(.-disabled) {
    color: var(--rs-form-field-line_not__disabled--color, $rs-form-field-helper-text-color);
  }

  &.-disabled {
    color: $rs-form-field-disabled-helper-text-color;
  }
}

.rs-form-field-helper {
  @include rs-form-field-helper_;
  color: inherit;
  opacity: 1;
  transition: rs-form-field-transition(opacity);
  will-change: opacity;
}

</style>
