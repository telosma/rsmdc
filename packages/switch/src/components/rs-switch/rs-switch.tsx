import { Component, Prop, Host, Element, Watch, Method, h } from '@stencil/core';
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

  @Watch('checked')
  checkedHandler() {
    this.isHostChecked()
  }

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

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
    this.switch = this.el.shadowRoot.querySelector('.rs-switch')
    const labelEl = this.el.shadowRoot.querySelector('.label')
    this.rsSwitch = new RSSwitch(this.switch)
    

    this.isHostChecked()
    this.isDisabled()

    labelEl.addEventListener('click', () => {
      this.activateRipple()
    })
  }

  render() {
    return <Host>
      <div class="rs-switch">
        <div class="track"></div>
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
