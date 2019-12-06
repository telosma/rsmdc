import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core'
import { RSRipple } from '@rsmdc/ripple'
import { RSLineRipple } from '@rsmdc/line-ripple'

@Component({
  tag: 'rs-textfield',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Textfield {

  @Element() el: HTMLElement

  @Prop() label: string

  @Prop() disabled: boolean

  @Prop() invalid: boolean

  @Prop() required: boolean

  @Prop() countable: boolean

  @Prop() type: string = 'text'

  @Prop() value: string = ''

  @Prop() placeholder: string = ''

  @Prop() maxlength: string = ''

  textfield: Element

  trailing: Element

  labels: Element[]

  nativeControl: Element

  htmlNativeConctrol: HTMLSelectElement

  notch: HTMLElement

  action: Element

  counter: Element

  rsRipple: RSRipple

  rsLineRipple: RSLineRipple

  labelEl: Element

  trailingEl: Element

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

  @Watch('invalid')
  invalidHandler() {
    this.isInvalid()
  }

  @Watch('required')
  requiredHandler() {
    this.isRequired()
  }

  @Watch('countable')
  countableHandler() {
    this.isCountable()
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.textfield.classList.add('-disabled')
    } else {
      this.textfield.classList.remove('-disabled')
    }
  }

  @Method()
  async isInvalid() {
    if (this.invalid) {
      this.textfield.classList.add('-invalid')
    } else {
      this.textfield.classList.remove('-invalid')
    }
  }

  @Method()
  async isRequired() {
    if (this.required) {
      this.textfield.classList.add('-required')
    } else {
      this.textfield.classList.remove('-required')
    }
  }

  @Method()
  async isCountable() {
    if (this.countable) {
      this.counter.classList.remove('-hidden')
    } else {
      this.counter.classList.add('-hidden')
     }
  }

  @Method()
  async floatLabel() {
    this.labels.forEach(l => { 
      l.classList.add('-floatabove')
    })
  }

  @Method()
  async setLabelWidthToNotch() {
    const labelWidth = await this.retriveLabelWidth(this.labels)
    const width = labelWidth * 0.75 + 8
    this.notch.style.setProperty('width', `${width}px`)
  }

  @Method()
  async addFocusStyle() {
    this.textfield.classList.add('-focused')
    this.textfield.classList.add('rs-ripple-upgraded--background-focused')
    this.rsLineRipple.activate()      
    this.labels.forEach(l => { 
      l.classList.add('-floatabove')
      this.notch.classList.add('-border')
      if (!l.classList.contains('-shake')) { return }
      l.classList.remove('-shake')
    })
    this.setLabelWidthToNotch()
  }

  @Method()
  async addFocusToParent() {
    this.trailingEl.addEventListener('click', () => {
      this.htmlNativeConctrol.focus()
    })
  }

  @Method()
  async removeFocusStyle() {
    this.textfield.classList.remove('-focused')
    this.textfield.classList.remove('rs-ripple-upgraded--background-focused')
    this.rsLineRipple.deactivate()
    this.labels.forEach(l => {
      if (this.invalid && this.value) l.classList.add('-shake')
      if (this.value) return
      l.classList.remove('-floatabove')
      this.notch.classList.remove('-border')
      this.notch.style.setProperty('--width', 'auto')
     })
  }

  @Method()
  async retriveLabelWidth(labels) {
    return labels.reduce((res, l) => {
      return res > l.clientWidth
        ? res
        : l.clientWidth
    }, 0)
  }

  @Method()
  async changeHandler() {
    this.value = this.htmlNativeConctrol.value
    this.change.emit({ value: this.value })
  }

  componentDidLoad() {
    this.textfield = this.el.shadowRoot.querySelector('.rs-textfield')
    this.labels = Array.from(this.el.shadowRoot.querySelectorAll('.label'))
    this.labelEl = this.el.shadowRoot.querySelector('.label') 
    this.nativeControl = this.el.shadowRoot.querySelector('.nativecontrol')
    this.htmlNativeConctrol = (this.nativeControl as HTMLSelectElement)
    this.notch = this.el.shadowRoot.querySelector('.notch')
    this.counter = this.el.shadowRoot.querySelector('.counter')
    this.action = this.el.shadowRoot.querySelector('.action')
    this.rsLineRipple = new RSLineRipple(this.el.shadowRoot.querySelector('.rs-line-ripple'))
    this.rsRipple = new RSRipple(this.textfield)

    const slot = this.el.shadowRoot.querySelector('slot')
    const children = Array.from(slot.assignedElements())
    this.trailing = children.find(child => child.tagName === 'RS-TEXTFIELD-TRAILING')

    if (this.trailing) {
      this.trailingEl = this.trailing.shadowRoot.querySelector('.rs-textfield-trailing')
      this.addFocusToParent()
    }
    
    if (this.type === 'date') {
      this.labelEl.classList.add('-date-label')
    }

    this.isDisabled()
    this.isInvalid()
    this.isRequired()
    this.isCountable()
    this.isRequired()

    this.nativeControl.addEventListener('focus', () => {
      this.addFocusStyle()
    })

    this.nativeControl.addEventListener('change', () => {
      this.changeHandler()
    })

    this.nativeControl.addEventListener('blur', () => {
      this.removeFocusStyle()
    })

    this.nativeControl.addEventListener('keyup', () => {
      this.value = this.htmlNativeConctrol.value
    })
  }
  
  componentDidUnLoad() {
    this.nativeControl.removeEventListener('focus', () => {
      this.addFocusStyle()
    })

    this.nativeControl.removeEventListener('change', () => {
      this.changeHandler()
    })

    this.nativeControl.removeEventListener('blur', () => {
      this.removeFocusStyle()
    })

    this.nativeControl.removeEventListener('keyup', () => {
      this.value = this.htmlNativeConctrol.value
    })

    this.trailingEl.removeEventListener('click', () => {
      this.htmlNativeConctrol.focus()
    })
  }

  render() {
    return  <Host>
              <div class="rs-textfield -textarea">
                <div class="form -outline">
                  <div class="input">
                    <input
                      type={this.type}
                      placeholder={this.placeholder}
                      maxlength={this.maxlength}
                      class="nativecontrol" />
                    <div class="action -none">
                      <slot />
                    </div>
                  </div>
                  <label class="label">{this.label}</label>
                </div>
                <div class="rs-line-ripple" />
                <div class="outline -none">
                  <div class="leading" />
                  <div class="notch">
                    <label class="label -outlined">{this.label}</label>
                  </div>
                  <div class="trailing" />
                </div>
                <div class="counter">{`${this.value.length} / ${this.maxlength}` }</div>
              </div>
            </Host>
  }
}