import { Component, Element, Prop, State, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core';
import { RSCheckbox } from '../../utils/index'
@Component({
  tag: 'rs-checkbox',
  styleUrl: '../../styles/result.css',
  shadow: true
})
export class Checkbox {

  @Element() el: HTMLElement

  @Prop() id: string

  @Prop() name: string

  @Prop() label: string

  @Prop() value: string | number

  @Prop() checked: boolean

  @Prop() disabled: boolean

  @Prop() indeterminate: boolean

  @State() dataChecked: string = ''

  rsCheckbox: RSCheckbox

  checkbox: Element

  @Watch('checked')
  checkedHandler() {
    this.isHostChecked()
  }

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

  @Watch('indeterminate')
  indeterminateHandler() {
    this.isIndeterminate()
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async activateRipple() {
    this.rsCheckbox.ripple.activate()
    setTimeout(() => { // TODO
      this.rsCheckbox.ripple.deactivate()
    }, 200)
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.checkbox.classList.add('-disabled')
    } else {
      this.checkbox.classList.remove('-disabled')
    }
  }

  @Method()
  async isHostChecked() {
    this.rsCheckbox.checked = this.checked
  }

  @Method()
  async isChecked() {
    if (this.dataChecked) {
      this.checkbox.classList.add('-checked')
    } else {
      this.checkbox.classList.remove('-checked')
    }
  }

  @Method()
  async isIndeterminate() {
    if (this.rsCheckbox.indeterminate) {
      this.checkbox.classList.add('-indeterminate')
    } else {
      this.checkbox.classList.remove('-indeterminate')
    }
  }

  @Method()
  async updateDataChecked() {
    this.dataChecked = this.rsCheckbox.checked ? 'checked' : ''
  }

  componentDidLoad() {
    const labelEl = this.el.shadowRoot.querySelector('.label')
    this.checkbox = this.el.shadowRoot.querySelector('.rs-checkbox')
    this.rsCheckbox = new RSCheckbox(this.el.shadowRoot.querySelector('.container'))

    this.isHostChecked()
    this.isDisabled()
    this.rsCheckbox.indeterminate = this.indeterminate
    this.isIndeterminate()

    this.checkbox.addEventListener('click', () => {
      this.updateDataChecked()
      this.isIndeterminate()
    })
    labelEl.addEventListener('click', () => {
      this.activateRipple()
    })

    const observer = new MutationObserver(mutation => {
      if (mutation[0].attributeName !== 'data-checked') { return }
      this.change.emit({ value: this.value})
    })
    observer.observe(this.el, {
      attributes: true
    })
  }

  componentDidRender() {
    if (!this.rsCheckbox) { return }

    this.updateDataChecked()
    this.isChecked()
  }

  render() {
    return  <Host data-checked={this.dataChecked}>
              <div class="rs-checkbox">
                <div class="container">
                  <input
                    id={this.id}
                    name={this.name}
                    type="checkbox"
                    class="nativecontrol" />
                  <div class="background">
                    <svg class="checkmark" viewBox="0 0 24 24">
                      <path
                        class="checkmarkpath"
                        fill="none"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                    </svg>
                    <div class="mixedmark" />
                  </div>
                </div>
                <label class="label" htmlFor={this.id}>{this.label}</label>
              </div>
            </Host>
  }
}
