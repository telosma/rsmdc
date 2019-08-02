import { Component, Element, Prop, Watch, Method, Host, h } from "@stencil/core"
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

  @Prop() checked: boolean

  @Prop() disabled: boolean

  @Prop() dataChecked: string = ''

  rsRadio: RSRadio

  radio: Element

  @Watch('checked')
  checkedHandler() {
    this.isHostChecked()
  }

  @Watch('disabled')
  disabledHandler() {
    this.isDisabled()
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.radio.classList.add('-disabled')
    } else {
      this.radio.classList.remove('-disabled')
    }
  }

  @Method()
  async isHostChecked() {
    this.rsRadio.checked = this.checked
    this.updateDataChecked()
    this.isChecked()
  }

  @Method()
  async isChecked() {
    if (this.dataChecked) {
      this.radio.classList.add('-checked')
    } else {
      this.radio.classList.remove('-checked')
    }
  }

  @Method()
  async updateDataChecked() {
    const isChecked = this.rsRadio.checked ? 'checked' : ''
    this.el.setAttribute('data-checked', isChecked)
    this.dataChecked = isChecked
  }

  componentDidLoad() {
    this.radio = this.el.shadowRoot.querySelector('.rs-radio')
    this.rsRadio = new RSRadio(this.el.shadowRoot.querySelector('.container'))

    this.isHostChecked()
    this.isDisabled()

    this.radio.addEventListener('click', () => {
      this.updateDataChecked()
    })
  }

  componentDidRender() {
    if (!this.rsRadio) { return }

    this.updateDataChecked()
    this.isChecked()
  }

  render() {
    return (
      <Host>
        <div class="rs-radio">
          <div class="container">
            <input class="nativecontrol" type="radio" />
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
