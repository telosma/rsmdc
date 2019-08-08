import { Component, Element, Prop, State, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-app-bar-title',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @Prop() first: string

  @Prop() middle: string

  @Prop() last: string

  @State() top: string

  render() {
    return  <Host class="rs-app-bar-title-host">
              <h1 class="rs-app-bar-title">
                <slot />
              </h1>
            </Host>
  }
}
