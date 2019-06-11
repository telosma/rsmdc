<template>
  <div class="rs-notched-outline" @click="setLabelWidth">
    <div class="rs-notched-outline__leading" />
      <div class="rs-notched-outline__notch">
        <label class="rs-form-label" :class="{ '-floatinglabel': dataType === 'textfield', '-left': dataFormindex === 0 }" :for="name" 
          ref="slotContainer" @click="updateControllers" :disabled="disabled">
          <slot></slot>
        </label>
      </div>
    <div class="rs-notched-outline__trailing" />
  </div>
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
      host: '',
      isTextFiledLabel: false,
      isTextAreaLabel: false
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
    setLabelWidth() {
      const labelWidth = this.getElementProperty(this.el.querySelector('.rs-form-label'), 'width')
      const width = parseInt(labelWidth.replace('px', '')) * 0.75 + 8
      this.el.querySelector('.rs-notched-outline__notch').style.setProperty('--rs-notched-outline__outlined-notch--width', `${width}px`)
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
@import "../notched-outline/variables";

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

  color: var(--rs-notched-outline-leading-notch-form-label--color, text-primary-on-background);
  margin-right: var(--rs-notched-outline-leading-notch-form-label--margin-right, auto);
  padding-left: var(--rs-notched-outline-leading-notch-form-label--padding-left, $rs-form-field-item-spacing);

  .-disabled & {
    cursor: default;
  }

  &.-left {
    margin-right: 0;
    margin-left: var(--rs-notched-outline-leading-notch-form-label__left--margin-left, auto);
    padding-right: var(--rs-notched-outline-leading-notch-form-label__left--padding-right, $rs-form-field-item-spacing);
    padding-left: var(--rs-notched-outline-leading-notch-form-label__left--padding-left, $rs-form-field-item-spacing);
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

    font-size: var(--rs-notched-outline-leading-notch-form-label__floatinglabel--font-size);
    color: var(--rs-notched-outline-leading-notch-form-label__floatinglabel--color, $rs-text-field-label);
    top: var(--rs-notched-outline-leading-notch-form-label__floatinglabel--top, 18px);

    &:-webkit-autofill {
      transform: translateY(-50%) scale(.75);
      cursor: auto;
    }

    .-required &::after {
      margin-left: 1px;
      content: "*";
      color: var(--rs-notched-outline__required-leading-notch-form-label__floatinglabel_after--color);
    }
    
    .-focus & {
      color: var(--rs-notched-outline__focus-leading-notch-form-label__floatinglabel--color, $rs-text-field-focused-label-color);
    }

    .-invalid & {
      color: $rs-form-field-error;
    }

    .-invalid.-required &::after {
      color: $rs-form-field-error;
    }

    .-disabled &,
    &.-disabled {
      color: $rs-text-field-disabled-label-color;
    }

    [dir="rtl"] &,
    &[dir="rtl"] {
      right: 0;
      left: auto;
      transform-origin: right top;
      text-align: right;
    }

    .-floatabove & {
      cursor: auto;
      font-size: var(--rs-notched-outline__floatabove-leading-notch-form-label__floatinglabel--font-size);
      transform: var(--rs-notched-outline__floatabove-leading-notch-form-label__floatinglabel--transform, rs-form-label-floatinglabel-position($rs-floating-label-position-y));
    }

    [dir="rtl"].-floatabove & {
      transform: var(--rs-notched-outline_rtl__floatabove-leading-notch-form-label__floatinglabel--transform);
    }

    .-shake & {
      animation: var(--rs-notched-outline__shake-leading-notch-form-label__floatinglabel--animation, rs-form-label-floatinglabel-shake-animation(standard));
    }

    [dir="rtl"].-shake & {
      animation: var(--rs-notched-outline_rtl__shake-leading-notch-form-label__floatinglabel--animation);
    }

    .-floatabove.-right & {
      transform: rs-form-label-floatinglabel-rtl-position($rs-floating-label-position-y);
    }

    .-textarea & {
      @include rs-rtl-reflexive-position(left, $rs-notched-outline-padding);

      top: 17px;
      bottom: auto;
      width: auto;
      pointer-events: none;
    }

    .-outlined & {
      height: var(--rs-notched-outline__outlined-leading-notch-form-label__floatinglabel--height);
    }

    .-outlined.-floatabove & {
      display: inline-block;
      position: relative;
      top: 1px;
      left: 4px;
      max-width: 130%;
    }

    .-outlined.-icon & {
      @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width));
    }

    .-outlined.-icon.-floatabove &{
      @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width) + $rs-notched-outline-padding);
    }
  }
}

.rs-notched-outline {
  &.-outlined {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    height: 100%;
    /* @noflip */
    text-align: left;
    pointer-events: none;
  }

  &.-outlined[dit="rtl"] {
    text-align: right;
  }

  &.-outlined.rs-notched-outline--upgraded[dir="rtl"] {
    transform: var(--rs-notched-outline__outlined__upgraded_rtl--transform);
  }

  &.-outlined.-floatabove .rs-notched-outline__notch {
    position: relative;
    border-top-color: #fff;
  }

  &.-outlined.rs-notched-outline--no-label {
    .rs-notched-outline__notch {
      padding: 0;
    }
  }
}

.rs-notched-outline__leading,
.rs-notched-outline__notch,
.rs-notched-outline__trailing {

  .-outlined & {
    box-sizing: border-box;
    height: 100%;
    transition: border $rs-notched-outline-transition-duration $rs-animation-standard-curve-timing-function;
    border-top: 1px solid;
    border-bottom: 1px solid;
    pointer-events: none;
  }
}

.rs-notched-outline__leading {

  .-outlined & {
    width: var(--rs-notched-outline__outlined-leading--width, $rs-notched-outline-leading-width);
    border: solid;
    border-right: none;
    border-width: var(--rs-notched-outline__outlined-leading--border-width, 1px);
    border-radius: var(--rs-notched-outline__outlined-leading--border-radius, 4px 0 0 4px);
  }

  .-outlined[dir="rtl"] {
    border-radius: var( --rs-notched-outline__outlined_rtl-leading--border-radius, 4px);
  }

  .-outlined.-disabled & {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  .-outlined:not(.-disabled) & {
    border-color: var(--rs-notched-outline__outlined_not_disabled--border-color, $rs-text-field-outlined-idle-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not_disabled__focus-leading--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not_disabled__focus-leading--border-color, $rs-theme-primary);
  }

  .-outlined.-invalid &,
  .-outlined.-invalid.-focus & {
    color: $rs-form-field-error;
    border-color: $rs-form-field-error;
  }
}

.rs-notched-outline__notch {
  .-outlined & {
    flex: 0 0 auto;
    width: var(--rs-notched-outline__outlined-notch--width);
    max-width: calc(100% - #{$rs-notched-outline-leading-width} * 2);
    border-width: var( --rs-notched-outline__outlined-notch--border-width, 1px);
  }

  .-outlined.-disabled & {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  .-outlined:not(.-disabled) & {
    border-color: var(--rs-notched-outline__outlined_not__disabled-notch--border-color, $rs-text-field-outlined-idle-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not__disabled__focus-notch--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not__disabled__focus-notch--border-color, $rs-theme-primary);
    border-top-color: #fff;
  }

  .-outlined.-invalid & {
    color: $rs-form-field-error;
    border-color: $rs-form-field-error;
  }

  .-outlined.-invalid.-floatabove &,
  .-outlined.-invalid.-floatabove.-focus & {
    color: $rs-form-field-error;
    border-color: $rs-form-field-error;
    // todo
    border-top-color: #fff;
  }
}

.rs-notched-outline__trailing {

  .-outlined & {
    flex-grow: 1;
    border-left: none;
    border-right: solid;
    max-width: var(--rs-notched-outline__outlined-trailing--max-width);
    border-width: var(--rs-notched-outline__outlined-trailing--border-width, 1px);
    border-radius: var(--rs-notched-outline__outlined-trailing--border-radius, 0 4px 4px 0);
  }

  .-outlined.-disabled & {
    border-color: $rs-text-field-outlined-disabled-border;
  }
  .-outlined:not(.-disabled) & {
    border-color: var(--rs-notched-outline__outlined_not__disabled--border-color, $rs-text-field-outlined-idle-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not__disabled__focus-trailing--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not__disabled__focus-trailing--border-color, $rs-theme-primary);
  }

  .-outlined[dir="rtl"] & {
    border-radius: var(--rs-notched-outline__outlined-trailing_rtl--border-radius, 4px);
  }

  .-outlined.-invalid &,
  .-outlined.-invalid.-focus & {
    color: $rs-form-field-error;
    border-color: $rs-form-field-error;
  }
}
</style>