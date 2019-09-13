import { Component, Element, Host, h, Method } from '@stencil/core';
// import { RSButton } from "../../utils/index";

@Component({
  tag: 'rs-button2',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Button {
  @Element() el: Element;

  button: HTMLElement
  
  // rsButton: RSButton;

  label: Element


  @Method()
  async activateRipple() {
    this.label[0].ripple.active();
    setTimeout(() => {
      // TODO
      this.label[0].ripple.deactivate();
    })
  }

  componentDidLoad() {
    this.button = this.el.shadowRoot.querySelector(".rs-button2");
    // this.rsButton = new RSButton(this.button)

    this.label = this.el.shadowRoot.querySelector('.label')
    

    // this.el.shadowRoot
    //   .querySelector(".rs-button2")
    //   .addEventListener("click", () => {
    //     this.activateRipple();
    //   });

  }

  render() {
    return  <Host>
              <button class="rs-button2">
                <span class="label">
                  <slot></slot>
                </span>
                <span class="ripple" />
              </button>
            </Host>
  }
}
