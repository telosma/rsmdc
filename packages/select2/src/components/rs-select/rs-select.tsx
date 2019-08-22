import { Component, Element, Prop, Watch, Method, Host, h } from '@stencil/core'
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

  select: Element

  labels: Element[]

  rsRipple: RSRipple

  rsLineRipple: RSLineRipple

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

  componentDidLoad() {
    this.select = this.el.shadowRoot.querySelector('.rs-select')
    this.labels = Array.from(this.el.shadowRoot.querySelectorAll('.label'))
    this.rsLineRipple = new RSLineRipple(this.el.shadowRoot.querySelector('.rs-line-ripple'))
    this.rsRipple = new RSRipple(this.select)
    let options = []
    const slot = this.el.shadowRoot.querySelector('slot')
    const nativeControl = this.el.shadowRoot.querySelector('.nativecontrol')

    this.isDisabled()
    this.isInvalid()
    this.isRequired()
    
    slot.addEventListener('slotchange', () => {
      slot.assignedElements().forEach(e => {
        options.push(e)
      })

      if (options.length === 0) { return }
      nativeControl.innerHTML = ''
      options.forEach(op => {
        nativeControl.append(op.cloneNode(true))
      })
      ;(nativeControl as HTMLSelectElement).selectedIndex = -1
    })

    nativeControl.addEventListener('focus', () => {
      this.select.classList.add('-focused')
      this.rsLineRipple.activate()
      this.labels.forEach(l => { 
        l.classList.add('-floatabove')
        if (!l.classList.contains('-shake')) { return }
        l.classList.remove('-shake')
      })
    })

    nativeControl.addEventListener('blur', () => {
      this.select.classList.remove('-focused')
      this.rsLineRipple.deactivate()

      this.labels.forEach(l => { 
        if (this.invalid) l.classList.add('-shake')
        if ((nativeControl as HTMLSelectElement).selectedIndex > -1) { return }
        l.classList.remove('-floatabove')
      })
    })
  }

  render() {
    return <Host>
              <div class="rs-select">
                <i class="dropdownicon material-icons">arrow_drop_down</i>
                <select class="nativecontrol">
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