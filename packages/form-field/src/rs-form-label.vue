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
@import "@rsmdc/rtl/mixins";
@import "@rsmdc/theme/mixins";
@import "@rsmdc/theme/variables";
@import "@rsmdc/typography/mixins";
@import "../rs-functions";
@import "../rs-variables";
@import "../floating-label/mixins";
@import "../floating-label/variables";

@import "../../textfield/variables";
@import "../../textfield/icon/variables";


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
  @include rs-typography(body2);
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--rs-form-label--color, text-primary-on-background);
  margin-right: var(--rs-form-label--margin-right, auto);
  padding-left: var(--rs-form-label--padding-left, $rs-form-field-item-spacing);

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

    font-size: var(--rs-form-label__floatinglabel--color--font-size);
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

    &[dir="rtl"] {
      right: 0;
      left: auto;
      transform-origin: right top;
      text-align: right;
    }

    &.-floatabove {
      cursor: auto;
      font-size: var(--rs-form-label__floatinglabel__floatabove--font-size);
      transform: var(--rs-form-label__floatinglabel__floatabove--transform, rs-form-label-floatinglabel-position($rs-floating-label-position-y));
    }

    &[dir="rtl"].-floatabove {
      transform: var(--rs-form-label__floatinglabel_rtl__floatabove--transform);
    }

    &.-shake {
      animation: var(--rs-form-label__floatinglabel__shake--animation, rs-form-label-floatinglabel-shake-animation(standard));
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
      height: var(--rs-form-label__floatinglabel__outlined--height);
    }

    &.-outlined.-floatabove {
      display: inline-block;
      position: absolute;
      top: 2px;
      max-width: 130%;
    }

    &.-outlined.-icon {
      // @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width));
    }

    &.-outlined.-icon.-floatabove {
      // @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width) + $rs-notched-outline-padding);
    }
  }
}
</style>