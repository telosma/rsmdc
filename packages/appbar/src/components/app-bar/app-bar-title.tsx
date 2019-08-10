import { Component, Element, State, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-app-bar-title',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @State() isScrolling: boolean
  
  render() {
    return  <Host>
              <h1 class="rs-app-bar-title">
                <slot />
              </h1>
            </Host>
  }
}
