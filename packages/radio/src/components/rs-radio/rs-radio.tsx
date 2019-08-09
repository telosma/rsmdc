import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h, State } from "@stencil/core"
import { RSRadio } from "../../utils/index"

@Component({
  tag: "rs-radio",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Radio {

  @Element() el: HTMLElement

  @Prop() id: string

  @Prop() label: string

  @Prop() name: string

  @Prop() value: string

  @Prop() checked: boolean

  @Prop() disabled: boolean

  @Prop({
    mutable: true
  }) dataChecked: string = ''

  @State() sameGroupRadios: Element[]

  rsRadio: RSRadio

  radioEl: Element

  @Watch('checked')
  checkedHandler() {
    this.isChecked()
  }

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

  @Watch('dataChecked')
  dataCheckedHandler() {
    if (this.dataChecked) {
      this.radioEl.classList.add('-checked')
    } else {
      this.radioEl.classList.remove('-checked')
    }
}

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.radioEl.classList.add('-disabled')
    } else {
      this.radioEl.classList.remove('-disabled')
    }
  }

  @Method()
  async isChecked() {
    this.dataChecked = this.checked ? 'checked' : ''
  }

  @Method()
  async isDataChecked() {
    this.rsRadio.checked = this.dataChecked ? true : false
    this.el.setAttribute('data-checked', this.dataChecked)
  }

  @Method()
  async checkDataChecked() {
    this.dataChecked = 'checked'
    this.rsRadio.checked = this.dataChecked
    this.el.setAttribute('data-checked', this.dataChecked)
  }

  @Method()
  async uncheckSameGroupRadios() {
    this.sameGroupRadios.forEach(radio => {
      if (radio !== this.el) {
        radio.setAttribute('data-checked', '')
      }
    })
  }

  @Method()
  async activateRipple() { //TODO
    this.rsRadio.ripple.activate()
    setTimeout(() => {
      this.rsRadio.ripple.deactivate()
    }, 200)
  }

  async componentDidLoad() {
    this.sameGroupRadios = Array.from(window.document.querySelectorAll(`rs-radio[name=${this.name}]`))
    this.rsRadio = new RSRadio(this.el.shadowRoot.querySelector('.container'))
    this.radioEl = this.el.shadowRoot.querySelector('.rs-radio')
    const labelEl = this.el.shadowRoot.querySelector('.label')
    
    this.isChecked()
    this.isDataChecked()
    this.isDisabled()

    this.radioEl.addEventListener('click', async e => {
      if (e.target === labelEl) { return }
      await this.activateRipple()
      await this.checkDataChecked()
      if (this.sameGroupRadios) {
        await this.uncheckSameGroupRadios()
      }
      await this.change.emit({ value: this.value })
    })
  }

  render() {
    return (
      <Host>
        <div class="rs-radio">
          <div class="container">
            <input
              class="nativecontrol"
              type="radio"
              id={this.id}/>
            <div class="background">
              <div class="outercircle" />
              <div class="innercircle" />
            </div>
          </div>
          <label class="label" htmlFor={this.id}>
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
