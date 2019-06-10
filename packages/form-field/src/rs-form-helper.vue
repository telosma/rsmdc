<template>
  <div class="rs-form-field-line -helper">
    <p class="rs-form-field-helper" ref="slotContainer">
      <slot></slot>
    </p>
    <div class="rs-form-field-character-counter">{{ `${textlength} / ${maxlength}` }}</div>
  </div>
</template>
<script>
export default {
  props: {
    dataType: {
      type: String,
      default: 'textfield'
    },
    maxlength: {
      type: Number,
      default: 0
    },
    textlength: {
      type: Number,
      default: 0
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
@import "../character-counter/mixins";
@import "../character-counter/rs-variables";
@import "../helper-text/mixins";
@import "../helper-text/rs-variables";
@import "../../textfield/variables";
@import "../../textfield/functions";

:host {
  @include rs-form-field-line-host_;
  z-index: 1;
}

:host([data-type="textfield"]) {
  bottom: -20px;
}

:host(:not([disabled])) {
  color: var(--rs-text-field-helper--color, $rs-text-field-helper-text-color);
}

:host([disabled]) {
  color: $rs-text-field-disabled-helper-text-color;
}

.rs-form-field-line {
  @include rs-form-field-line_;
}

.rs-form-field-helper {
  @include rs-form-field-helper_;
  color: inherit;
  opacity: var(--rs-text-field-helper--opacity, 1);
  transition: var(--rs-text-field-helper--transition, rs-text-field-transition(opacity));
  will-change: var(--rs-text-field-helper--will-change, opacity);
}

.rs-form-field-character-counter {
  @include rs-form-field-character-counter_;


  // for textarea
  // margin-bottom: 28px; // Leaves space for character counter if it exists.
  // padding-bottom: 0;
  // position: absolute;
  // bottom: var(--rs-form-field-character-counter--bottom, 13px);
  // right: var(--rs-form-field-character-counter--right, 16px);
}
</style>
