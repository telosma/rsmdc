import { Component, Prop, Host, Element, Watch, Event, EventEmitter, Method, h } from '@stencil/core';
import { RSSwitch } from '../../utils/index'

@Component({
  tag: 'rs-switch',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Switch {

  @Element() el: HTMLElement
  
  @Prop() id: string

  @Prop() label: string

  @Prop() checked: boolean

  @Prop() disabled: boolean
  
  rsSwitch: RSSwitch

  switch: Element

  labelEl: Element

  nativeControl: Element

  @Watch('checked')
  checkedHandler() {
    this.isHostChecked()
  }

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async activateRipple() {
    this.rsSwitch.ripple.activate()
    setTimeout(() => { // TODO
      this.rsSwitch.ripple.deactivate()
    }, 200)
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.switch.classList.add('-disabled')
    } else {
      this.switch.classList.remove('-disabled')
    }
  }

  @Method()
  async isHostChecked() {
    this.rsSwitch.checked = this.checked
  }

  componentDidLoad() {
    this.labelEl = this.el.shadowRoot.querySelector('.label')
    this.nativeControl = this.el.shadowRoot.querySelector('.nativecontrol')
    this.switch = this.el.shadowRoot.querySelector('.rs-switch')
    this.rsSwitch = new RSSwitch(this.switch)
    
    this.isHostChecked()
    this.isDisabled()

    this.nativeControl.addEventListener('change', () => {
      this.change.emit({ value: (this.nativeControl as HTMLInputElement).checked })
    })

    this.labelEl.addEventListener('click', () => {
      this.activateRipple()
    })
  }

  componentDidUnLoad() {
    this.nativeControl.removeEventListener('change', () => {
      this.change.emit({ value: (this.nativeControl as HTMLInputElement).checked })
    })

    this.labelEl.removeEventListener('click', () => {
      this.activateRipple()
    })
  }

  render() {
    return<Host>
            <div class="rs-switch">
              <div class="track" />
              <div class="thumbunderlay">
                <div class="thumb">
                  <input type="checkbox" id={this.id} class="nativecontrol" role="switch" />
                </div>
              </div>
            </div>
            <label class="label" htmlFor={this.id}>{this.label}</label>
          </Host>
  }
}
