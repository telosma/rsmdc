<template>
    <div class="rs-checkbox" :disabled="disabled" @click="updateCheckbox">
      <input type="checkbox" class="rs-checkbox__native-control" :id="id" :name="name"
        :checked="checked" :disabled="disabled" :indeterminate="indeterminate">
      <div class="rs-checkbox__background">
        <svg class="rs-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="rs-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
        </svg>
        <div class="rs-checkbox__mixedmark"></div>
      </div>
    </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host:'',
      ripple: ''
    }
  },
  watch: {
    indeterminate() {
      this.el.indeterminate = this.indeterminate
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.checkbox.checkboxes.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.checkbox) {
      window.__rsmdc.checkbox = {
        checkboxes: []
      }
    }
  },
  mounted() {
    this.ripple = new RSRipple(this.$el)
    this.ripple.unbounded = true
    this.el = this.$el
    this.el.indeterminate = this.indeterminate
  },
  methods: {
    updateCheckbox() {
      console.log(1)
      if(this.disabled) { return }
      // for label clicking (Todo: fix ripple style)
      this.activateRipple()
      this.el.querySelector('.rs-checkbox__native-control').focus()
      this.host.addEventListener('blur', () => {
        this.deactivateRipple()
      })
      this.passChangeEvent()
    },
    passChangeEvent() {
      this.$emit('change')
    },
    activateRipple() {
      this.ripple.activate()
    },
    deactivateRipple() {
      this.ripple.deactivate()
    }
  }
}
</script>
<style lang="scss">
@import "@rsmdc/animation/functions";
@import "@rsmdc/ripple/mixins";
@import "@rsmdc/rtl/mixins";
@import '@rsmdc/form-field/rs-form-field';
@import "../functions";
@import "../keyframes";
@import "../variables";

@mixin rs-checkbox__child--cover-parent_ {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@mixin rs-checkbox--disabled_ {
  --rs-checkbox__diabled--cursor: default;
  pointer-events: none;
}

@mixin rs-checkbox--anim_ {
  $rs-checkbox-indeterminate-change-duration_: 500ms;

  // stylelint-disable selector-max-type

  &-unchecked-checked,
  &-unchecked-indeterminate,
  &-checked-unchecked,
  &-indeterminate-unchecked {
    .rs-checkbox__background {
      animation-duration: $rs-checkbox-transition-duration * 2;
      animation-timing-function: linear;
    }
  }

  &-unchecked-checked {
    .rs-checkbox__checkmark-path {
      // Instead of delaying the animation, we simply multiply its length by 2 and begin the
      // animation at 50% in order to prevent a flash of styles applied to a checked checkmark
      // as the background is fading in before the animation begins.
      animation: rs-checkbox-unchecked-checked-checkmark-path $rs-checkbox-transition-duration * 2 linear 0s;
      transition: none;
    }
  }

  &-unchecked-indeterminate {
    .rs-checkbox__mixedmark {
      animation: rs-checkbox-unchecked-indeterminate-mixedmark $rs-checkbox-transition-duration linear 0s;
      transition: none;
    }
  }

  &-checked-unchecked {
    .rs-checkbox__checkmark-path {
      animation: rs-checkbox-checked-unchecked-checkmark-path $rs-checkbox-transition-duration linear 0s;
      transition: none;
    }
  }

  &-checked-indeterminate {
    .rs-checkbox__checkmark {
      animation: rs-checkbox-checked-indeterminate-checkmark $rs-checkbox-transition-duration linear 0s;
      transition: none;
    }

    .rs-checkbox__mixedmark {
      animation: rs-checkbox-checked-indeterminate-mixedmark $rs-checkbox-transition-duration linear 0s;
      transition: none;
    }
  }

  &-indeterminate-checked {
    .rs-checkbox__checkmark {
      animation: rs-checkbox-indeterminate-checked-checkmark $rs-checkbox-indeterminate-change-duration_ linear 0s;
      transition: none;
    }

    .rs-checkbox__mixedmark {
      animation: rs-checkbox-indeterminate-checked-mixedmark $rs-checkbox-indeterminate-change-duration_ linear 0s;
      transition: none;
    }
  }

  &-indeterminate-unchecked {
    .rs-checkbox__mixedmark {
      // stylelint-disable-next-line declaration-colon-space-after
      animation:
        rs-checkbox-indeterminate-unchecked-mixedmark $rs-checkbox-indeterminate-change-duration_ * .6 linear 0s;
      transition: none;
    }
  }
}

@include rs-ripple-common();
@include rs-checkbox-mark-keyframes_;

$fade-in-animation: rs-checkbox-animation-name(rs-checkbox-container-keyframes-uid_(), in);
$fade-out-animation: rs-checkbox-animation-name(rs-checkbox-container-keyframes-uid_(), out);

.rs-checkbox {
  @include rs-ripple-surface;
  @include rs-states($rs-checkbox-baseline-theme-color);
  @include rs-ripple-radius-unbounded;

  display: inline-block;
  position: relative;
  flex: 0 0 $rs-checkbox-size;
  box-sizing: content-box;
  width: $rs-checkbox-size;
  height: $rs-checkbox-size;
  padding: ($rs-checkbox-touch-area - $rs-checkbox-size) / 2;
  line-height: 0;
  white-space: nowrap;
  cursor: var(--rs-checkbox__diabled--cursor, pointer);
  vertical-align: bottom;

  &[disabled] {
    @include rs-checkbox--disabled_;
  }

  &.rs-checkbox--anim {
    @include rs-checkbox--anim_;

    &-unchecked-checked,
    &-unchecked-indeterminate {
      .rs-checkbox__native-control:enabled ~ .rs-checkbox__background {
        animation-name: var(--rs-checkbox__animchecked-nativecontrol_enabled_-background--animation-name, $fade-in-animation);
      }
    }

    &-checked-unchecked,
    &-indeterminate-unchecked {
      .rs-checkbox__native-control:enabled ~ .rs-checkbox__background {
        animation-name: var(--rs-checkbox__animunchekced-nativecontrol_enabled_-background--animation-name, $fade-out-animation);
      }
    }
  }

  &.rs-checkbox--upgraded {
    .rs-checkbox__background,
    .rs-checkbox__checkmark,
    .rs-checkbox__checkmark-path,
    .rs-checkbox__mixedmark {
      transition: none !important;
    }
  }

  &.rs-ripple-upgraded--background-focused .rs-checkbox__background::before {
    content: none;
  }

   &::before{
    background-color: var(--rs-checkbox-background_before--background-color, var(--rs-ripple_before--background-color, $rs-theme-primary));
    content: var(--rs-ripple_before--content, '');
  }

  &::after {
    background-color: var(--rs-checkbox-background_before--background-color, var(--rs-ripple_after--background-color, $rs-theme-primary));
    content: var(--rs-ripple_after--content, '');
  }

  &:hover::before {
    opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity(primary, hover));
  }

  &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
    transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
    opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity(primary, focus));
  }

  &.rs-ripple-upgraded--background-focused::before {
    transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
    opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity(primary, focus));
  }

  &:not(.rs-ripple-upgraded) {
    &::after {
      transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
    }

    &:active::after {
      transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
      opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity(primary, press));
    }
  }

  &.rs-ripple-upgraded {
    --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity(primary, press)});
  }
}

.rs-checkbox__native-control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;

  &:focus ~ .rs-checkbox__background::before {
    transform: scale(2.75, 2.75);
    opacity: $rs-checkbox-focus-indicator-opacity;

    transition:
      rs-checkbox-transition-enter(opacity, 0ms, 80ms),
      rs-checkbox-transition-enter(transform, 0ms, 80ms);
  }

  &:disabled {
    @include rs-checkbox--disabled_;
  }

  &:disabled:not(:checked):not(:indeterminate) ~ .rs-checkbox__background {
    border-color: var(--rs-checkbox-nativecontrol_disabled_not_checked_not_indeterminate_-background--border-color, $rs-checkbox-disabled-color);
  }
  &:disabled:checked ~ .rs-checkbox__background {
    border-color: var(--rs-checkbox-nativecontrol_checked_-background--border-color, transparent);
    background-color: var(--rs-checkbox-nativecontrol_checked_-background--background-color, $rs-checkbox-disabled-color);
  }

  &:disabled:indeterminate ~ .rs-checkbox__background {
    border-color: var(--rs-checkbox-nativecontrol_disabled_indeterminate_-background--border-color, transparent);
    background-color: var(--rs-checkbox-nativecontrol_disabled_indeterminate_-background--background-color, $rs-checkbox-disabled-color);
  }

  &:checked ~ .rs-checkbox__background {
    .rs-checkbox__checkmark {
      transition:
        rs-checkbox-transition-enter(opacity, 0ms, $rs-checkbox-transition-duration * 2),
        rs-checkbox-transition-enter(transform, 0ms, $rs-checkbox-transition-duration * 2);
      opacity: 1;
    }

    .rs-checkbox__mixedmark {
      transform: scaleX(1) rotate(-45deg);
    }
  }

  &:indeterminate ~ .rs-checkbox__background {
    .rs-checkbox__checkmark {
      transform: rotate(45deg);
      opacity: 0;
      transition:
        rs-checkbox-transition-exit(opacity, 0ms, $rs-checkbox-transition-duration),
        rs-checkbox-transition-exit(transform, 0ms, $rs-checkbox-transition-duration);
    }

    .rs-checkbox__mixedmark {
      transform: scaleX(1) rotate(0deg);
      opacity: 1;
    }
  }

  &:checked ~ .rs-checkbox__background,
  &:indeterminate ~ .rs-checkbox__background {
    transition:
      rs-checkbox-transition-enter(border-color),
      rs-checkbox-transition-enter(background-color);

    .rs-checkbox__checkmark-path {
      stroke-dashoffset: 0;
    }
  }

  &:enabled:checked ~ .rs-checkbox__background {
    border-color: var(--rs-checkbox-nativecontrol_enabled_checked_-background--border-color, $rs-checkbox-baseline-theme-color);
    background-color: var(--rs-checkbox-nativecontrol_enabled_checked_-background--background-color, $rs-checkbox-baseline-theme-color);
  }
  &:enabled:indeterminate ~ .rs-checkbox__background {
    border-color: var(--rs-checkbox-nativecontrol_enabled_indeterminate_-background--border-color, $rs-checkbox-baseline-theme-color);
    background-color: var(--rs-checkbox-nativecontrol_enabled_indeterminate_-background--background-color, $rs-checkbox-baseline-theme-color);
  }
}

.rs-checkbox__background {
  @include rs-rtl-reflexive-position(left, ($rs-checkbox-touch-area - $rs-checkbox-size) / 2, ".rs-checkbox");

  display: inline-flex;
  position: absolute;
  top: ($rs-checkbox-touch-area - $rs-checkbox-size) / 2;
  bottom: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: $rs-checkbox-ui-pct;
  height: $rs-checkbox-ui-pct;
  // border-color is overridden by the rs-checkbox-unmarked-stroke-color() mixin
  border: $rs-checkbox-border-width solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition:
    rs-checkbox-transition-exit(background-color),
    rs-checkbox-transition-exit(border-color);

  &::before {
    @include rs-checkbox__child--cover-parent_;

    width: 100%;
    height: 100%;
    transform: scale(0, 0);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    content: "";
    will-change: opacity, transform;
    transition:
      rs-checkbox-transition-exit(opacity),
      rs-checkbox-transition-exit(transform);
    background-color: var(--rs-checkbox-background_before--background-color, $rs-checkbox-baseline-theme-color);
  }
}

.rs-checkbox__checkmark {
  @include rs-checkbox__child--cover-parent_;

  width: 100%;
  opacity: 0;
  transition: rs-checkbox-transition-exit(opacity, 0ms, $rs-checkbox-transition-duration * 2);
  color: var(--rs-checkbox-background-checkmark--color, $rs-checkbox-mark-color);

  .rs-checkbox--upgraded & {
    opacity: 1;
  }
}

.rs-checkbox__checkmark-path {
  transition: rs-checkbox-transition-exit(stroke-dashoffset, 0ms, $rs-checkbox-transition-duration * 2);
  stroke: currentColor;
  stroke-width: $rs-checkbox-mark-stroke-size * 1.3;
  stroke-dashoffset: $rs-checkbox-mark-path-length_;
  stroke-dasharray: $rs-checkbox-mark-path-length_;
}

.rs-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: floor($rs-checkbox-mark-stroke-size) / 2;
  border-style: solid;
  opacity: 0;
  transition:
    rs-checkbox-transition-exit(opacity),
    rs-checkbox-transition-exit(transform);
  border-color: var(--rs-checkbox-background-mixedmark--border-color, $rs-checkbox-mark-color);
}

@media screen and (-ms-high-contrast: active) {
  .rs-checkbox__mixedmark {
    margin: 0 1px; // Extra horizontal space around mixedmark symbol.
  }
}
</style>


