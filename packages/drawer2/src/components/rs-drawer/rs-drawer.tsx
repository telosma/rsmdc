import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-drawer',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Drawer {

  @Element() el: HTMLElement

  @Prop() opened: boolean

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
  async openDrawerMotion() {
    
  }

  @Method()
  async closeDrawerMotion() {

  }

  componentDidLoad() {
    const scrim = this.el.shadowRoot.querySelector('.scrim')

    scrim.addEventListener('click', () => {
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
