import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-drawer-header',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class DrawerHeader {

  render() {
    return  <Host>
              <header class="rs-drawer-header">
                <slot />
              </header>
            </Host>
  }
}
