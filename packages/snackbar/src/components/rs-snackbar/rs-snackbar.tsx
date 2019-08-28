import { Component, Element, Prop, Watch, Method, Host, h } from '@stencil/core'

@Component({
  tag: "rs-snackbar",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Snackbar {
  @Element() el: Element

  @Prop() opened: boolean

  snackbar: HTMLElement

  @Watch('opened')
  openedHandler() {
    this.isOpened()
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.snackbar.classList.add('-open')
      this.snackbar.style.opacity = '1'
      // TODO
      // setTimeout(() => {
      //   this.snackbar.style.opacity = '0'
      //   this.snackbar.style.transition = '180ms'
      // }, 5000)
    } else {
      this.snackbar.classList.remove('-open')
    }
  }

  componentDidLoad() {
    this.snackbar = this.el.shadowRoot.querySelector(".rs-snackbar")
    this.isOpened()
  }

  render() {
    return (
      <Host>
        <div class="rs-snackbar">
          <div class="surface">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
