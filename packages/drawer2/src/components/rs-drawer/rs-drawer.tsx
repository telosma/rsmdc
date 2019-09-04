import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-drawer',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Drawer {

  @Element() el: HTMLElement

  @Prop() opened: boolean

  drawer: HTMLElement

  @Watch('opened')
  openedHandler() {
    if (this.opened) {
      this.openDrawerMotion()
    } else {
      this.closeDrawerMotion()
    }
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async isOpened() {
    if (this.opened) {
      this.drawer.classList.add('-open')
    } else {
      this.drawer.classList.remove('-open')
    }
  }

  @Method()
  async openDrawerMotion() {
    this.drawer.classList.add('-opening')
    setTimeout(() => {
      this.drawer.classList.add('-open')
    }, 200)
  }

  @Method()
  async closeDrawerMotion() {
    this.el.setAttribute('closing', 'closing')
    this.drawer.classList.add('-closing')
    this.drawer.classList.remove('-opening')
    setTimeout(() => {
      this.drawer.classList.remove('-open')
      this.drawer.classList.remove('-closing')
      this.el.removeAttribute('closing')
    }, 200)
  }

  componentDidLoad() {
    this.drawer = this.el.shadowRoot.querySelector('.rs-drawer')
    const scrim = this.el.shadowRoot.querySelector('.scrim')

    this.isOpened()

    scrim.addEventListener('click', () => {
      console.log('scrim emit')
      this.change.emit()
    })
  }

  render() {
    return  <Host>
              <div class="rs-drawer">
                <div class="content">
                  <slot></slot>
                </div>
                <div class="scrim" />
              </div>
            </Host>
  }
}
