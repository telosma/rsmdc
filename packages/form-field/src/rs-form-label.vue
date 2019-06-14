<template>
  <label class="rs-form-label" :class="{ '-floatinglabel': dataType === 'textfield' || dataType === 'textarea', '-textarea': dataType === 'textarea', '-left': dataFormindex === 0 }" :for="name" 
    ref="slotContainer" @click="updateControllers" :disabled="disabled">
    <slot></slot>
  </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dataId: {
      type: String,
      default: ''
    },
    dataFormindex: {
      type: Number,
      default: 0
    },
    dataType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      el: '',
      host: ''
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.formfield.formLabels.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.formfield) {
      window.__rsmdc.formfield = {
        formLabels: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    this.el = this.$el
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
    updateControllers() {
      if(this.dataType === 'radio') {
        this.updateRadios()
      } else if(this.dataType === 'checkbox') {
        this.updateCheckbox()
      }
    },
    updateRadios() {
      const radios = window.__rsmdc.radio.radios.filter(radio => radio.getAttribute('data-id') === this.dataId)
      radios.forEach(radio => {
        radio.shadowRoot.querySelector('.rs-radio').click()
      })
    },
    updateCheckbox() {
      const checkboxes = window.__rsmdc.checkbox.checkboxes.filter(checkbox => checkbox.getAttribute('data-id') === this.dataId)
      checkboxes.forEach(checkbox => {
        checkbox.shadowRoot.querySelector('.rs-checkbox').click()
      })
    }
  }
}
</script>
<style lang="scss">
@import "@rsmdc/animation/variables";
@import "@rsmdc/textfield/variables";
@import "@rsmdc/textfield/icon/variables";
@import "@rsmdc/theme/variables";
@import "../mixins";
@import "../rs-functions";



@include rs-form-label-floatinglabel-shake-keyframes(standard, $rs-floating-label-position-y);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-dense, $rs-text-field-dense-label-position-y, 0%, $rs-text-field-dense-label-scale);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined, $rs-text-field-outlined-label-position-y);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined-dense, $rs-text-field-outlined-dense-label-position-y, 0%, $rs-text-field-dense-label-scale);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined-leading-icon, $rs-text-field-outlined-label-position-y, $rs-text-field-outlined-with-leading-icon-label-position-x);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined-leading-icon-dense, $rs-text-field-outlined-dense-label-position-y, $rs-text-field-outlined-dense-with-leading-icon-label-position-x, $rs-text-field-dense-label-scale);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined-leading-icon-rtl, $rs-text-field-outlined-label-position-y, -$rs-text-field-outlined-with-leading-icon-label-position-x);
@include rs-form-label-floatinglabel-shake-keyframes(text-field-outlined-leading-icon-dense-rtl, $rs-text-field-outlined-dense-label-position-y, -$rs-text-field-outlined-dense-with-leading-icon-label-position-x, $rs-text-field-dense-label-scale);
@include rs-form-label-floatinglabel-shake-keyframes(textarea, $rs-text-field-textarea-label-position-y, 0%);

.rs-form-label {

  &.-disabled {
    cursor: default;
  }

  &.-left {
    margin-right: 0;
    margin-left: var(--rs-form-label__left--margin-left, auto);
    padding-right: var(--rs-form-label__left--padding-right, $rs-form-field-item-spacing);
    padding-left: var(--rs-form-label__left--padding-left, $rs-form-field-item-spacing);
    
  }

  &.-floatinglabel {
    // To override label default style.
    @include rs-typography(subtitle1);
    margin: 0;
    padding: 0;
    cursor: text;
    pointer-events: none;
    position: absolute;
    left: 16px;
    right: auto;
    transform-origin: left top;
    transition:
      transform $rs-floating-label-transition-duration $rs-animation-standard-curve-timing-function,
      color $rs-floating-label-transition-duration $rs-animation-standard-curve-timing-function;
    line-height: 1.15rem;
    text-align: left;
    overflow: hidden;
    will-change: transform;

    font-size: var(--rs-form-label__floatinglabel--font-size);
    color: var(--rs-form-label__floatinglabel--color, $rs-text-field-label);
    top: var(--rs-form-label__floatinglabel--top, 18px);

    &:-webkit-autofill {
      transform: translateY(-50%) scale(.75);
      cursor: auto;
    }

    &.-required::after {
      margin-left: 1px;
      content: "*";
      color: var(--rs-form-label__floatinglabel__required_after--color);
    }

    &[dir="rtl"] {
      right: 0;
      left: auto;
      transform-origin: right top;
      text-align: right;
    }

    &.-focus {
      color: var(--rs-form-label__floatinglabel__focus--color, $rs-text-field-focused-label-color);
    }

    &.-invalid {
      color: $rs-form-field-error;
    }

    &.-invalid.-required::after {
      color: $rs-form-field-error;
    }

    &.-disabled {
      color: $rs-text-field-disabled-label-color;
    }

    &.-floatabove {
      cursor: auto;
      font-size: var(--rs-form-label__floatinglabel__floatabove--font-size);
      transform: var(--rs-form-label__floatinglabel__floatabove--transform, rs-form-label-floatinglabel-position($rs-floating-label-position-y));
    }

    &[dir="rtl"].-floatabove.-dense {
      transform: var(--rs-form-label__floatinglabel_rtl__floatabove--transform);
    }

    &.-shake {
      animation: rs-form-label-floatinglabel-shake-animation(standard);
    }

    &[dir="rtl"].-shake {
      animation: var(--rs-form-label__floatinglabel_rtl__shake--animation);
    }

    &.-floatabove.-right {
      transform: rs-form-label-floatinglabel-rtl-position($rs-floating-label-position-y);
    }

    &.-floatabove.-textarea {
      top: 3px;
      bottom: auto;
    }

    &.-outlined {
      left: var(--rs-form-label__outlined__floatinglabel--left, 16px);
      height: var(--rs-form-label__floatinglabel__outlined--height);
    }

    &.-textarea {
      left: var(--rs-form-label__textarea__floatinglabel--left, 16px);
    }

    &.-outlined.-floatabove {
      display: inline-block;
      position: absolute;
      max-width: 130%;
      top: var(--rs-form-label__floatinglabel__outlined__floatabove--top, 2px);
    }

    &.-icon {
      left: 48px;
      top: 18px;
    }

    &.-outlined.-icon.-floatabove {
      left: 16px;
      top: 2px;
    }
  }
}
</style>