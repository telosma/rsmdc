import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-snackbar',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Snackbar {
  @Element() el: Element

  @Prop() opened: boolean

  @Prop() keepAlive: number = 3000

  snackbar: HTMLElement

  @Watch('opened')
  openedHandler() {
    this.isOpened()
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async isOpened() {
    if (this.opened) {
      this.openSnackbarMotion()
      this.countSurvivalTime()
    } else {
      this.closeSnackbarMotion()
    }
  }

  @Method()
  async openSnackbarMotion() {
    this.snackbar.classList.add('-opening')
    setTimeout(() => {
      this.snackbar.classList.add('-open')
      this.snackbar.classList.remove('-opening')
    }, 100)
  }

  @Method()
  async countSurvivalTime() {
    setTimeout(() => {
      if (this.opened) this.change.emit()
    }, this.keepAlive)
  }

  async closeSnackbarMotion() {
    this.snackbar.classList.add('-closing')
    setTimeout(() => {
      this.snackbar.classList.remove('-open')
      this.snackbar.classList.remove('-closing')
    }, 100)
  }

  componentDidLoad() {
    this.snackbar = this.el.shadowRoot.querySelector('.rs-snackbar')
    this.isOpened()
  }

  render() {
    return  <Host>
              <div class="rs-snackbar">
                <div class="surface">
                  <slot />
                </div>
              </div>
            </Host>
  }
}
