import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-drawer-content',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class DrawerContent {

  render() {
    return  <Host>
              <div class="rs-drawer-content">
                <slot />
              </div>
            </Host>
  }
}
