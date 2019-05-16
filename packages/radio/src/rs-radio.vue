<template>
  <div class="rs-form-field">
    <div class="rs-radio" :class="{ 'rs-radio--disabled': disabled }" @click="updateRadios">
      <input class="rs-radio__native-control" type="radio" :name="name" :checked="checked" :disabled="disabled">
      <div class="rs-radio__background">
        <div class="rs-radio__outer-circle"></div>
        <div class="rs-radio__inner-circle"></div>
      </div>
    </div>
    <label :for="name" ref="slotContainer"><slot></slot></label>
  </div>
</template>
<script>
import { RSFormField } from '@rsmdc/form-field';
import { RSRadio } from '../index';

export default {
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      el: '',
      host: '',
      isChecked: false
    }
  },
  watch: {
    checked() {
      this.isChecked = this.checked
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.radio.radios.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.radio) {
      window.__rsmdc.radio = {
        radios: []
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    const formField = new RSFormField(this.$el);
    const radio = new RSRadio(this.$el.querySelector('.rs-radio'));
    formField.input = radio;

    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    updateRadios() {
      if(this.disabled) { return }

      const radioGroup = window.__rsmdc.radio.radios.filter(radio => radio.getAttribute('name') === this.name)
      radioGroup.forEach(radio => {
        const el = radio.shadowRoot.querySelector('.rs-radio')
        if(radio.isSameNode(this.host)) {
          el.classList.remove('-rs-unchecked')
        } else {
          el.classList.add('-rs-unchecked')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../rs-radio";
@import "@rsmdc/form-field/rs-form-field";

  .rs-radio {
    &.-rs-unchecked {
      > .rs-radio__native-control:enabled:checked + .rs-radio__background > .rs-radio__outer-circle {
        border-color: var(--rs-radio-nativeControl_enabled_not_checked_-background-outerCircle--border-color, $rs-radio-unchecked-color);
      }

      > .rs-radio__native-control:enabled + .rs-radio__background > .rs-radio__inner-circle {
        border-color: #fff;
      }
    }

    > .rs-radio__native-control:enabled:checked + .rs-radio__background > .rs-radio__outer-circle {
      border-color: var(--rs-radio-nativeControl_enabled_checked_-background-outerCircle--border-color, $rs-theme-secondary);
    }

    > .rs-radio__native-control:enabled:not(:checked) + .rs-radio__background > .rs-radio__outer-circle {
      border-color: var(--rs-radio-nativeControl_enabled_not_checked_-background-outerCircle--border-color, $rs-radio-unchecked-color);
    }

    > .rs-radio__native-control:enabled + .rs-radio__background > .rs-radio__inner-circle {
      border-color: var(--rs-radio-nativeControl_enabled_-background-innerCircle--border-color, $rs-theme-secondary);
    }
 
    > .rs-radio__background::before {
      background-color: var(--rs-radio-background_before--background-color, $rs-theme-secondary);
    }

    // ripple
    &::before {
      background-color: var(--rs-ripple_before--background-color, $rs-theme-secondary);
      content: var(--rs-ripple_before--content, '');
    }

    &::after {
      background-color: var(--rs-ripple_after--background-color, $rs-theme-secondary);
      content: var(--rs-ripple_after--content, '');
    }

    &:hover::before {
      opacity: var(--rs-ripple_hover_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, hover));
    }

    &:not(.rs-ripple-upgraded):focus::before { // @mixin rs-states-focus-opacityのfalse
      transition-duration: var(--rs-ripple_not-upgraded_focus_before--transition-duration, 75ms);
      opacity: var(--rs-ripple_not-upgraded_focus_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, focus));
    }

    &.rs-ripple-upgraded--background-focused::before {
      transition-duration: var(--rs-upgraded_-background-focused_before--transition-duration, 75ms);
      opacity: var(--rs-upgraded_-background-focused_before--opacity, rs-states-opacity($rs-radio-baseline-theme-color, focus));
    }

    &:not(.rs-ripple-upgraded) {
      &::after {
        transition: var(--rs-ripple_not-upgraded_after--transition, opacity $rs-ripple-fade-out-duration linear);
      }

      &:active::after {
        transition-duration: var(--rs-ripple_not-upgraded_active_after--transition-duration, $rs-ripple-fade-in-duration);
        opacity: var(--rs-ripple_not-upgraded_active_after--opacity, rs-states-opacity($rs-radio-baseline-theme-color, press));
      }
    }

    &.rs-ripple-upgraded {
      --rs-ripple-fg-opacity: var(--rs-ripple-upgraded--rs-ripple-fg-opacity, #{rs-states-opacity($rs-radio-baseline-theme-color, press)});
    }
  }
</style>



