import { Component, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-drawer-header',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class DrawerHeader {

  @Element() el: HTMLElement

  componentDidLoad() {
    const height = this.el.getBoundingClientRect().height
    const body = window.document.querySelector('body')
    body.style.setProperty('--rs-drawer-content---height', `calc(100% - ${height}px)`)    
  }

  render() {
    return  <Host>
              <header class="rs-drawer-header">
                <slot />
              </header>
            </Host>
  }
}
