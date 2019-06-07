<template>
  <div class="rs-form-field-line -helper" :class="{ '-radio': type === 'radio', '-left': labelPosition === 'left' }">
    <p class="rs-form-field-helper" ref="slotContainer">
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
  z-index: 1;
}

:host(:not([disabled])) {
  color: var(--rs-text-field-helper--color, $rs-text-field-helper-text-color);
}

:host([disabled]) {
  color: $rs-text-field-disabled-helper-text-color;
}

.rs-form-field-line {
  @include rs-form-field-line_;

  &.-radio {
    padding-left: $rs-form-field-label-radio-padding-left;
  }
  &.-radio.-left {
    padding-left: $rs-form-field-label-radio-left-padding-left;
  }
}

.rs-form-field-helper {
  @include rs-form-field-helper_;
  color: inherit;
  opacity: var(--rs-text-field-helper--opacity, 1);
  transition: var(--rs-text-field-helper--transition, rs-text-field-transition(opacity));
  will-change: var(--rs-text-field-helper--will-change, opacity);
}
</style>
