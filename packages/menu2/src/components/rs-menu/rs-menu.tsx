import { Component, Host, h, Element, Prop, Watch, Method } from '@stencil/core';

@Component({
  tag: 'rs-menu',
  styleUrl: "../../dist/result.css",
  shadow: true
})
  
export class Menu {

  @Element() el: Element;

  menu: HTMLElement

  @Prop() opened: boolean

  @Watch("opened")
  openeddHandler() {
    this.isOpened();
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.menu.classList.add("-opened");
    } else {
      this.menu.classList.remove("-opened");
    }
  }

  componentDidLoad() {
    this.menu = this.el.shadowRoot.querySelector('.rs-menu')

    this.isOpened()
  }

  render() {
    return  <Host>
              <div
                class="rs-menu rs-menu-surface">
                <slot></slot>
              </div>
          </Host>
  }
}
