import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-drawer-title',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class DrawerTitle {
  render() {
    return  <Host>
              <header class="rs-drawer-title">
                <slot />
              </header>
            </Host>
  }
}
