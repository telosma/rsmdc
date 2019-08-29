import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core'
import { RSRipple } from '@rsmdc/ripple'
import { RSLineRipple } from "@rsmdc/line-ripple"

@Component({
  tag: 'rs-select',
  styleUrls: [
    '../../dist/result.css',
    '../../styles/_material-icons.scss'
  ],
  shadow: true
})
export class Select {

  @Element() el: HTMLElement

  @Prop() name: string

  @Prop() label: string

  @Prop() disabled: boolean

  @Prop() invalid: boolean

  @Prop() required: boolean

  @Prop() multiple: boolean = false

  @Prop() value: string

  @Prop() selectedIndex: number

  select: Element

  labels: Element[]

  nativeControl: Element

  rsRipple: RSRipple

  rsLineRipple: RSLineRipple

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

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.select.classList.add('-disabled')
    } else {
      this.select.classList.remove('-disabled')
    }
  }

  @Method()
  async isInvalid() {
    if (this.invalid) {
      this.select.classList.add('-invalid')
    } else {
      this.select.classList.remove('-invalid')
    }
  }

  @Method()
  async isRequired() {
    if (this.required) {
      this.select.classList.add('-required')
    } else {
      this.select.classList.remove('-required')
    }
  }

  @Method()
  async addFocusStyle() {
    this.select.classList.add('-focused')
    this.select.classList.add('rs-ripple-upgraded--background-focused')
    this.rsLineRipple.activate()
    this.labels.forEach(l => { 
      l.classList.add('-floatabove')
      if (!l.classList.contains('-shake')) { return }
      l.classList.remove('-shake')
    })
  }

  @Method()
  async removeFocusStyle() {
    this.select.classList.remove('-focused')
    this.select.classList.remove('rs-ripple-upgraded--background-focused')
    this.rsLineRipple.deactivate()

    this.labels.forEach(l => { 
      if (this.invalid) l.classList.add('-shake')
      if ((this.nativeControl as HTMLSelectElement).selectedIndex > -1) { return }
      l.classList.remove('-floatabove')
    })
  }

  componentDidLoad() {
    this.select = this.el.shadowRoot.querySelector('.rs-select')
    this.labels = Array.from(this.el.shadowRoot.querySelectorAll('.label'))
    this.nativeControl = this.el.shadowRoot.querySelector('.nativecontrol')
    this.rsLineRipple = new RSLineRipple(this.el.shadowRoot.querySelector('.rs-line-ripple'))
    this.rsRipple = new RSRipple(this.select)
    const options = []
    const slot = this.el.shadowRoot.querySelector('slot')

    this.isDisabled()
    this.isInvalid()
    this.isRequired()
    
    slot.addEventListener('slotchange', () => {
      slot.assignedElements().forEach(e => {
        options.push(e)
      })

      if (options.length === 0) { return }
      this.nativeControl.innerHTML = ''
      options.forEach(op => {
        this.nativeControl.append(op.cloneNode(true))
      })
      if (options.find(op => op.getAttribute('selected'))) {
        this.addFocusStyle()
        return
      }
      (this.nativeControl as HTMLSelectElement).selectedIndex = -1
    })

    this.nativeControl.addEventListener('focus', () => {
      this.addFocusStyle()
    })

    this.nativeControl.addEventListener('change', () => {
      this.value = (this.nativeControl as HTMLSelectElement).value
      this.selectedIndex = (this.nativeControl as HTMLSelectElement).selectedIndex
      
      this.change.emit({ value: this.value, index: this.selectedIndex})
      
      if (options.length === 0) { return }
      options.forEach((option, i) => {
        if (i === this.selectedIndex) {
          option.setAttribute('data-selected', true)
          option.value = this.value
        } else {
          option.removeAttribute('data-selected')
        }
      })
    })

    this.nativeControl.addEventListener('blur', () => {
      this.removeFocusStyle()
    })
  }

  render() {
    return <Host>
              <div class="rs-select">
                <i class="dropdownicon material-icons">arrow_drop_down</i>
                <select class="nativecontrol" multiple={this.multiple}>
                  <slot />
                </select>
                <label class="label">{this.label}</label>
                <div class="rs-line-ripple"></div>
                <div class="outline">
                  <div class="leading"></div>
                  <div class="notch">
                    <label class="label -outlined">{this.label}</label>
                  </div>
                  <div class="trailing"></div>
                </div>
              </div>
            </Host>
  }
}