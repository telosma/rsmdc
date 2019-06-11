<template>
  <div class="rs-text-field">
    <div class="rs-text-field__form" ref="slotContainer" @click="activateTextField">
      <input type="text" class="rs-text-field__input" v-model="value"
        :value="value" :maxlength="maxlength" :placeholder="placeholder" :autocomplete="autocomplete" @change="passChangeEvent">
      <div class="rs-line-ripple" />
    </div>
    <div class="rs-notched-outline">
      <div class="rs-notched-outline__leading" />
        <div class="rs-notched-outline__notch" />
      <div class="rs-notched-outline__trailing" />
    </div>
    <div class="rs-text-field-character-counter" v-if="countable">{{ `${value.length} / ${maxlength}` }}</div>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'
import { RSLineRipple } from '../../line-ripple/index'

export default {
  props: {
    countable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    dataId: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      el: '',
      host: '',
      lineRipple: '',
      formLabels: []
    }
  },
  watch: {
    dataId() {
      if(this.value.length === 0) { return }
      // if textfield has value, float form label.
      this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      this.formLabels.forEach(formLabel => {
        const label = formLabel.shadowRoot.querySelector('.rs-form-label')
        label.classList.add('-floatabove')
      })
    },
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      window.__rsmdc.textfield.textfields.push(this.host)
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.textfield) {
      window.__rsmdc.textfield = {
        textfields: []
      }
    }
  },
  mounted() {
    const ripple = new RSRipple(this.$el.querySelector('.rs-text-field__form'))
    this.lineRipple = new RSLineRipple(this.$el.querySelector('.rs-line-ripple'))
    this.el = this.$el
  },
  methods: {
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    },
    passChangeEvent(event) {
      this.$emit('change', event.target.value)
    },
    activateTextField() {
      if(this.formLabels.length === 0) {
        this.formLabels = window.__rsmdc.formfield.formLabels.filter(formLabel => formLabel.getAttribute('data-id') === this.dataId)
      }
      this.changeLabelStyle('activate')
      this.el.classList.add('-floatabove')
      this.activateRipple()

      this.el.classList.add('-focus')
      this.el.querySelector('.rs-text-field__input').focus()
      this.host.addEventListener('blur', () => {
        this.el.classList.remove('-focus')
        this.deactivateTextField()
      })
    },
    deactivateTextField() {
      this.changeLabelStyle('deactivate')
      if(this.value.length === 0) {
        this.el.classList.remove('-floatabove')
      }
      this.deactivateRipple()
    },
    activateRipple() {
      this.lineRipple.activate()
      this.el.querySelector('.rs-text-field__form').classList.add('rs-ripple-upgraded--background-focused')
    },
    deactivateRipple() {
      this.lineRipple.deactivate()
      this.el.querySelector('.rs-text-field__form').classList.remove('rs-ripple-upgraded--background-focused')
    },
    changeLabelStyle(state) {
      if(state == 'activate') {
        // float form label to above and focus
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          this.setLabelWidth(label)
          label.click()
          label.classList.add('-floatabove')
          label.classList.add('-focus')
          label.classList.remove('-shake')
        })
      } else {
        // remove label focus ( and if textfield does not input anyting, sink label)
        this.formLabels.forEach(formLabel => {
          const label = formLabel.shadowRoot.querySelector('.rs-form-label')
          label.classList.remove('-focus')
          if(this.value.length === 0) {
            label.classList.remove('-floatabove')
            this.el.classList.remove('-floatabove')
          } else {
            this.el.classList.add('-floatabove')
          }
          // only error
          if(this.value.length > 0 && label.classList.contains('-invalid')) {
            label.classList.add('-shake')
          }     
        })
      }
    },
    setLabelWidth(label) {
      const labelWidth = this.getElementProperty(label, 'width')
      if(!labelWidth) { return }
      const width = parseInt(labelWidth.replace('px', '')) * 0.75 + 8
      this.el.querySelector('.rs-notched-outline__notch').style.setProperty('--rs-notched-outline__outlined-notch--width', `${width}px`)
    }
  }
}
</script>

<style lang="scss">
@import "../mixins";
@import "../character-counter/mixins";
@import "@rsmdc/line-ripple/rs-line-ripple";

:host {
  width: var(--rs-text-field_host--width);
}

.rs-text-field__form {
  @include rs-text-field-form_;
}

.rs-text-field__input {
  @include rs-text-field-input_;
}

.rs-line-ripple {
  @include rs-text-field-line-ripple-color(primary);

  .-invalid & {
    @include rs-text-field-line-ripple-color($rs-text-field-error);
  }

  .-outlined & {
    display: none;
  }
}

.rs-text-field-character-counter {
  @include rs-text-field-character-counter_;

  //for textarea
  // margin-bottom: 28px; // Leaves space for character counter if it exists.
  // padding-bottom: 0;
  // position: absolute;
  // bottom: var(--rs-text-field-character-counter--bottom, 13px);
  // right: var(--rs-text-field-character-counter--right, 16px);
}

.rs-notched-outline {
  .-outlined & {
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

  .-outlined[dit="rtl"] & {
    text-align: right;
  }

  .-outlined.rs-notched-outline--upgraded[dir="rtl"] & {
    transform: var(--rs-notched-outline__outlined__upgraded_rtl--transform);
  }

  .-outlined.rs-notched-outline--no-label & {
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
    // $rs-notched-outline-leading-width = 12px
    width: var(--rs-notched-outline__outlined-leading--width, 12px);
    border: solid;
    border-right: none;
    border-width: var(--rs-notched-outline__outlined-leading--border-width, 1px);
    border-radius: var(--rs-notched-outline__outlined-leading--border-radius, 4px 0 0 4px);
  }

  .-outlined[dir="rtl"] & {
    border-radius: var( --rs-notched-outline__outlined_rtl-leading--border-radius, 4px);
  }

  .-outlined.-disabled & {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  .-outlined:not(.-disabled) & {
    border-color: var(--rs-notched-outline__outlined_not_disabled--border-color, $rs-text-field-outlined-idle-border);
  }

  .-outlined:not(.-disabled):hover & {
    border-color: var(--rs-notched-outline__outlined_not__disabled_hover-leading--border-color, $rs-text-field-outlined-hover-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not_disabled__focus-leading--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not_disabled__focus-leading--border-color, $rs-theme-primary);
  }

  .-outlined.-invalid &,
  .-outlined.-invalid:hover &,
  .-outlined.-invalid.-focus & {
    color: $rs-text-field-error;
    border-color: $rs-text-field-error;
  }
}

.rs-notched-outline__notch {
  .-outlined & {
    flex: 0 0 auto;
    width: var(--rs-notched-outline__outlined-notch--width);
    max-width: calc(100% - #{$rs-notched-outline-leading-width} * 2);
    border-width: var( --rs-notched-outline__outlined-notch--border-width, 1px);
  }

  .-outlined.-floatabove & {
    border-top: none;
  }

  .-outlined.-disabled & {
    border-color: $rs-text-field-outlined-disabled-border;
  }

  .-outlined:not(.-disabled) & {
    border-color: var(--rs-notched-outline__outlined_not__disabled-notch--border-color, $rs-text-field-outlined-idle-border);
  }


  .-outlined:not(.-disabled):hover & {
    border-color: var(--rs-notched-outline__outlined_not__disabled_hover-notch--border-color, $rs-text-field-outlined-hover-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not__disabled__focus-notch--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not__disabled__focus-notch--border-color, $rs-theme-primary);
  }

  .-outlined.-invalid &,
  .-outlined.-invalid:hover &,
  .-outlined.-invalid.-focus & {
    color: $rs-text-field-error;
    border-color: $rs-text-field-error;
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

  .-outlined:not(.-disabled):hover & {
    border-color: var(--rs-notched-outline__outlined_not__disabled_hover-trailing--border-color, $rs-text-field-outlined-hover-border);
  }

  .-outlined:not(.-disabled).-focus & {
    border-width: var(--rs-notched-outline__outlined_not__disabled__focus-trailing--border-width, 2px);
    border-color: var(--rs-notched-outline__outlined_not__disabled__focus-trailing--border-color, $rs-theme-primary);
  }

  .-outlined[dir="rtl"] & {
    border-radius: var(--rs-notched-outline__outlined-trailing_rtl--border-radius, 4px);
  }

  .-outlined.-invalid &,
  .-outlined.-invalid:hover &,
  .-outlined.-invalid.-focus & {
    color: $rs-text-field-error;
    border-color: $rs-text-field-error;
  }
}

</style>
