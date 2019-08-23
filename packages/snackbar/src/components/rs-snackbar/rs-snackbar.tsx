import { Component, Element, Prop, Watch, Method, Host, h } from '@stencil/core';
import { RSSnackbar } from "../../utils/index";

@Component({
  tag: "rs-snackbar",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Snackbar {
  @Element() el: Element

  @Prop() opened: boolean

  @Prop() stacked: boolean

  @Prop() leading: boolean

  rsSnackbar: RSSnackbar

  snackbar: HTMLElement

  snackbarText: Element

  @Watch("opened")
  openedHandler() {
    this.isOpened()
  }

  @Watch("stacked")
  stackedHandler() {
    this.isStacked()
  }

  @Watch("leading")
  leadingHandler() {
    this.isLeading()
  }

  @Method()
  async isStacked() {
    if (this.stacked) {
      this.snackbar.classList.add("-stacked")
    } else {
      this.snackbar.classList.remove("-stacked")
    }
  }

  @Method()
  async isLeading() {
    if (this.leading) {
      this.snackbar.classList.add("-leading")
    } else {
      this.snackbar.classList.remove("-leading")
    }
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.snackbar.classList.add("-open")
      // this.snackbar.style.opacity = "1"
      // setTimeout(() => {
      //   this.snackbar.style.opacity = "0"
      //   this.snackbar.style.transition = "180ms"
      // }, 5000)
    } else {
      this.snackbar.classList.remove("-open")
    }
  }

  componentDidLoad() {
    this.snackbar = this.el.shadowRoot.querySelector(".rs-snackbar")
    this.rsSnackbar = new RSSnackbar(this.snackbar);

    this.isOpened();
    this.isStacked();
    this.isLeading();
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
