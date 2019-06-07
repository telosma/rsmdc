<template>
  <div class="rs-notched-outline" v-if="isTextAreaLabel || isOutline">
    <div class="rs-notched-outline__leading" />
      <div class="rs-notched-outline__notch">
        <label :for="name" class="rs-form-label -float" ref="slotContainer" :disabled="disabled">
          <slot></slot>
        </label>
      </div>
      <div class="rs-notched-outline__trailing" />
    </div>
  <label class="rs-form-label" :class="{ '-float': isTextFiledLabel && !isOutline }" :for="name" 
    ref="slotContainer" @click="updateRadios" :disabled="disabled" v-else>
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
    }
  },
  data() {
    return {
      isTextFiledLabel: false,
      isTextAreaLabel: false,
      isOutline: false
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
    },
    updateRadios() {
      const radios = window.__rsmdc.radio.radios.filter(radio => radio.getAttribute('id') === this.name)
      radios.forEach(radio => {
        radio.shadowRoot.querySelector('.rs-radio').click()
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


@include rs-form-label-float-shake-keyframes(standard, $rs-floating-label-position-y);
@include rs-form-label-float-shake-keyframes(text-field-dense, $rs-text-field-dense-label-position-y, 0%, $rs-text-field-dense-label-scale);
@include rs-form-label-float-shake-keyframes(text-field-outlined, $rs-text-field-outlined-label-position-y);
@include rs-form-label-float-shake-keyframes(text-field-outlined-dense, $rs-text-field-outlined-dense-label-position-y, 0%, $rs-text-field-dense-label-scale);
@include rs-form-label-float-shake-keyframes(text-field-outlined-leading-icon, $rs-text-field-outlined-label-position-y, $rs-text-field-outlined-with-leading-icon-label-position-x);
@include rs-form-label-float-shake-keyframes(text-field-outlined-leading-icon-dense, $rs-text-field-outlined-dense-label-position-y, $rs-text-field-outlined-dense-with-leading-icon-label-position-x, $rs-text-field-dense-label-scale);
@include rs-form-label-float-shake-keyframes(text-field-outlined-leading-icon-rtl, $rs-text-field-outlined-label-position-y, -$rs-text-field-outlined-with-leading-icon-label-position-x);
@include rs-form-label-float-shake-keyframes(text-field-outlined-leading-icon-dense-rtl, $rs-text-field-outlined-dense-label-position-y, -$rs-text-field-outlined-dense-with-leading-icon-label-position-x, $rs-text-field-dense-label-scale);
@include rs-form-label-float-shake-keyframes(textarea, $rs-text-field-textarea-label-position-y, 0%);

.rs-form-label {
  @include rs-typography(body2);
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--rs-form-label--color, text-primary-on-background);
  margin-right: var(--rs-form-field-label--margin-right, auto);
  padding-left: var(--rs-form-field-label--padding-left, $rs-form-field-item-spacing);

  [disabled] &,
  &[disabled] {
    cursor: default;
  }

  &.-left {
    margin-right: 0;
    padding-left: 0;
    margin-left: var(--rs-form-field-label--margin-left, auto);
    padding-right: var(--rs-form-field-label--padding-right, $rs-form-field-item-spacing);
  }

  &.-float {
    // To override label default style.
    @include rs-typography(subtitle1);
    margin: 0;
    padding: 0;
    cursor: text;

    position: absolute;
    left: 0;
    transform-origin: left top;
    transition:
      transform $rs-floating-label-transition-duration $rs-animation-standard-curve-timing-function,
      color $rs-floating-label-transition-duration $rs-animation-standard-curve-timing-function;
    line-height: 1.15rem;
    text-align: left;
    overflow: hidden;
    will-change: transform;

    color: var(--rs-form-label--color, $rs-text-field-ink-color);

    :focus &,
    &:focus {
      color: var(--rs-form-label_focus--color, $rs-text-field-focused-label-color);
    }

    [invalid] &,
    &[invalid] {
      color: $rs-text-field-error;
    }

    [disabled] &,
    &[disabled] {
      color: $rs-text-field-disabled-label-color;
    }

    [dir="rtl"] &,
    &[dir="rtl"] {
      right: 0;
      left: auto;
      transform-origin: right top;
      text-align: right;
    }

    &.-above {
      cursor: auto;
      font-size: var(--rs-form-label__float__above--font-size);
      transform: var(--rs-form-label__float__above--transform, rs-form-label-float-position($rs-floating-label-position-y));
    }

    [dir="rtl"] &.-above,
    &[dir="rtl"].-above {
      transform: var(--rs-form-label_rtl__float__above--transform);
    }

    .-shake {
      animation: rs-form-label-float-shake-animation(standard);
    }

    &.-above.-right {
      transform: rs-form-label-float-rtl-position($rs-floating-label-position-y);
    }

    &.-text {
      --rs-form-label--color: #{$rs-text-field-label};
      @include rs-rtl-reflexive-position(left, $rs-text-field-label-offset);

      top: 18px;
      pointer-events: none;
    }

    &.-textarea {
      @include rs-rtl-reflexive-position(left, $rs-notched-outline-padding);
    }

    &.-outlined {
      @include rs-rtl-reflexive-position(left, $rs-notched-outline-padding);
      top: 17px;
    }

    &.-outlined.-icon {
      @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width));
    }
    &.-outlined.-icon.-above {
      @include rs-rtl-reflexive-position(left, ($rs-text-field-icon-padding - $rs-notched-outline-leading-width) + $rs-notched-outline-padding);
    }
  }
}

.rs-notched-outline {
  display: flex;
  position: absolute;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  /* @noflip */
  text-align: left;
  pointer-events: none;

  [dir="rtl"] &
  & [dit="rtl"] {
    text-align: right;
  }

  > .rs-form-label.-float {
    display: inline-block;
    position: relative;
    top: 17px;
    bottom: auto;
    max-width: 100%;
  }

  > .rs-form-label.-float.-above {
    text-overflow: clip;
  }

  &.rs-notched-outline--upgraded {
    .rs-form-label.-float.-above {
      max-width: calc(100% / .75);

      transform: var(--rs-notched-outline__upgraded-label__float__above--transform);
      font-size: var(--rs-notched-outline__upgraded-label__float__above--font-size);
    }
  }

  [dir="rtl"] &.rs-notched-outline--upgraded,
  &[dir="rtl"].rs-notched-outline--upgraded {
    transform: var(--rs-notched-outline__upgraded-label_right__float__above--transform);
  }

  &.rs-notched-outline--notched {
    .rs-notched-outline__notch {
      @include rs-rtl-reflexive-box(padding, right, 8px);

      border-top: none;
    }
  }

  &.rs-notched-outline--no-label {
    .rs-notched-outline__notch {
      padding: 0;
    }
  }
}

.rs-notched-outline__leading,
.rs-notched-outline__notch,
.rs-notched-outline__trailing {
  box-sizing: border-box;
  height: 100%;
  transition: border $rs-notched-outline-transition-duration $rs-animation-standard-curve-timing-function;
  border-top: 1px solid;
  border-bottom: 1px solid;
  pointer-events: none;
}

.rs-notched-outline__leading {
  @include rs-rtl-reflexive-property(border, 1px solid, none);
  width: var(--rs-notched-outline-leading--width, $rs-notched-outline-leading-width);
  border-color: var(--rs-notched-outline-leading--border-color);
  border-width: var(--rs-notched-outline-leading--border-width);
  border-radius: var(--rs-notched-outline-leading--border-radius, 4px);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-notched-outline-leading_rtl--border-radius, 4px);
  }

  [disabled] &,
  &[disabled] {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  :not([disabled]):hover &,
  &:not([disabled]):hover {
    border-width: 1px;
    border-color: var(--rs-notched-outline-leading_not_disabled_hover--border-color, rs-text-field-outlined-hover-border);
  }

  :not([disabled]):focus &,
  &:not([disabled]):focus {
    border-width: var(--rs-notched-outline-leading_not_disabled_focus--border-width, 2px);
    border-color: var(--rs-notched-outline-leading_not_disabled_focus--border-color, $rs-theme-primary);
  }

  [invalid] &,
  &[invalid],
  [invalid]:hover &,
  &[invalid]:hover,
  [invalid]:focus &,
  &[invalid]:focus{
    border-color: $rs-text-field-error;
  }
}

.rs-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
  max-width: calc(100% - #{$rs-notched-outline-leading-width} * 2);
  border-width: var(--rs-notched-outline-notch--border-width);
  border-color: var(--rs-notched-outline-notch--border-color);

  [disabled] &,
  &[disabled] {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  :not([disabled]):hover &,
  &:not([disabled]):hover {
    border-width: 1px;
    border-color: var(--rs-notched-outline-notch_not_disabled_hover--border-color, rs-text-field-outlined-hover-border);
  }

  :not([disabled]):focus &,
  &:not([disabled]):focus {
    border-width: var(--rs-notched-outline-notch_not_disabled_focus--border-width, 2px);
    border-color: var(--rs-notched-outline-notch_not_disabled_focus--border-color, $rs-theme-primary);
  }

  [invalid] &,
  &[invalid],
  [invalid]:hover &,
  &[invalid]:hover,
  [invalid]:focus &,
  &[invalid]:focus{
    border-color: $rs-text-field-error;
  }
}

.rs-notched-outline__trailing {
  @include rs-rtl-reflexive-property(border, none, 1px solid);
  flex-grow: 1;
  max-width: var(--rs-notched-outline-notch--max-width);
  border-width: var(--rs-notched-outline-trailing--border-width);
  border-color: var(--rs-notched-outline-trailing--border-color);
  border-radius: var(--rs-notched-outline-trailing--border-radius, 4px);

  [dir="rtl"] &,
  &[dir="rtl"] {
    border-radius: var(--rs-notched-outline-trailing_rtl--border-radius, 4px);
  }

  [disabled] &,
  &[disabled] {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  :not([disabled]):hover &,
  &:not([disabled]):hover {
    border-width: 1px;
    border-color: var(--rs-notched-outline-notch_not_disabled_hover--border-color, $rs-text-field-outlined-hover-border);
  }

  :not([disabled]):focus &,
  &:not([disabled]):focus {
    border-width: var(--rs-notched-outline-trailing_not_disabled_focus--border-width, 2px);
    border-color: var(--rs-notched-outline-trailing_not_disabled_focus--border-color, $rs-theme-primary);
  }

  [invalid] &,
  &[invalid],
  [invalid]:hover &,
  &[invalid]:hover,
  [invalid]:focus &,
  &[invalid]:focus {
    border-color: $rs-text-field-error;
  }
}
</style>