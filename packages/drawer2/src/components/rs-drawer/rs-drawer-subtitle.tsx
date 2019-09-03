import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-drawer-subtitle',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class DrawerSubTitle {
  render() {
    return  <Host>
              <header class="rs-drawer-subtitle">
                <slot />
              </header>
            </Host>
  }
}
