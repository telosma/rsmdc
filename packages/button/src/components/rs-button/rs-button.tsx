import { Component, Element, Host, h, Method, Prop, Watch } from '@stencil/core';
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-button',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Button {
  @Element() el: Element;

  button: HTMLElement

  @Prop() disabled: boolean

  @Prop() exited: boolean

  @Prop() fixed: boolean

  @Watch("disabled")
  disabledHandler() {
    this.isDisabled();
  }

  @Watch("exited")
  exitedHandler() {
    this.isExited();
  }

  @Watch("fixed")
  fixedHandler() {
    this.isFixed();
  }

  @Method()
  async isDisabled() {
    this.button = this.el.shadowRoot.querySelector('.rs-button')
    if (this.disabled) {
      this.button.classList.add("-disabled");
    } else {
      this.button.classList.remove("-disabled");
    }
  }

  @Method()
  async isExited() {
    this.button = this.el.shadowRoot.querySelector('.rs-button')
    if (this.exited) {
      this.button.classList.add("-exited");
    } else {
      this.button.classList.remove("-exited");
    }
  }
  
  @Method()
  async activateRipple() {
    this.button = this.el.shadowRoot.querySelector(".rs-button");
    this.button[0].ripple.active();
    setTimeout(() => {
      // TODO
      this.button[0].ripple.deactivate();
    })
  }

  @Method()
  async isFixed() {
    this.button = this.el.shadowRoot.querySelector('.rs-button')
    if (this.fixed) {
      this.button.classList.add("-fixed");
    } else {
      this.button.classList.remove("-fixed");
    }
  }

  componentDidLoad() {
    const button = this.el.shadowRoot.querySelector('.rs-button');
    const ripple = new RSRipple(button)
    const slot = this.el.shadowRoot.querySelector('slot');
    
    const styles = window.getComputedStyle(button)
    const isRippleUnbounded = String(styles.getPropertyValue('--rs-button-----ripple')).trim()

    const slotChildren = Array.from(slot.assignedNodes())
    if (slotChildren.length === 0 && !isRippleUnbounded) {
      button.classList.add('-no-text')
      ripple.unbounded = true
    } else if (slotChildren.length > 0 && isRippleUnbounded) {
      button.classList.add('-extended')
    }

    this.isDisabled()
    this.isExited()
    this.isFixed()
  }

  render() {
    return  <Host>
              <button class="rs-button">
                <span class="label">
                  <slot />
                </span>
              </button>
            </Host>
  }
}
