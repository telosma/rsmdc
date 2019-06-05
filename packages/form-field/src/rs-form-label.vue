<template>
  <div v-if="aaa">
    <div class="rs-notched-outline" v-if="isTextArea || isOutline">
      <div class="rs-notched-outline__leading" />
      <div class="rs-notched-outline__notch">
        <label for="" class="rs-form-label" ref="slotContainer">
          <slot></slot>
        </label>
      </div>
      <div class="rs-notched-outline__trailing" />
    </div>
    <label for="" class="rs-form-label" ref="slotContainer" v-else>
      <slot></slot>
    </label>
  </div>
  <label class="rs-form-label" for="" v-else></label>
</template>
<script>
export default {
  data() {
    return {
      isTextArea: false,
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
@import "../rs-mixins";
@import "../rs-variables";
@import "../rs-functions";
@import "../mixins";
@import "../variables";

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

    &.-right {
      right: 0;
      left: auto;
      transform-origin: right top;
      text-align: right;
    }

    &.-above {
      cursor: auto;
      transform: rs-form-label-float-position($rs-floating-label-position-y);
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

  &[disabled] {
    @include rs-notched-outline-color($rs-text-field-outlined-disabled-border);

  }

  &[invalid] {

  }
}

.rs-notched-outline__leading {
  border-color: var(--rs-notched-outline-leading--border-color);
}

.rs-notched-outline__notch {
  border-color: var(--rs-notched-outline-notch--border-color);
}

.rs-notched-outline__trailing {
  border-color: var(--rs-notched-outline-trailing--border-color);
}


</style>


