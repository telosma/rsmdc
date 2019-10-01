import { Component, Element, Prop, Host, h, Method, Watch } from '@stencil/core';
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-list-item',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListItem {

  @Element() el: Element;

  listItem: HTMLElement

  ripple: RSRipple

  @Prop() selected: boolean

  @Prop() activated: boolean

  @Prop() disabled: boolean

  @Watch("disabled")
  disabledHandler() {
    this.isDisabled();
  }

  @Watch("selected")
  selectedHandler() {
    this.isSelected();
  }

  @Watch("activated")
  activatedHandler() {
    this.isActivated();
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.listItem.classList.add("-disabled");
    } else {
      this.listItem.classList.remove("-disabled");
    }
  }

  @Method()
  async isSelected() {
    this.listItem = this.el.shadowRoot.querySelector('.rs-list-item')
    if (this.selected) {
      this.listItem.classList.add("-selected");
    } else {
      this.listItem.classList.remove("-selected");
    }
  }

  @Method()
  async isActivated() {
    this.listItem = this.el.shadowRoot.querySelector('.rs-list-item')
    if (this.activated) {
      this.listItem.classList.add("-activated");
    } else {
      this.listItem.classList.remove("-activated");
    }
  }

  componentDidLoad() {
    this.listItem = this.el.shadowRoot.querySelector('.rs-list-item')
    this.ripple = new RSRipple(this.listItem)

    this.isSelected()
    this.isActivated()
    this.isDisabled()
  }

  render() {
    return  <Host>
              <li class="rs-list-item" tabindex="0">
                <slot />
              </li>
            </Host>
  }
}
