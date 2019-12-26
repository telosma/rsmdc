import { Component, Host, h } from '@stencil/core'


@Component({
  tag: 'rs-list-text',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListText {
  render() {
    return  <Host>
              <span class="rs-list-text">
                <slot />
              </span>
            </Host>
  }
}
