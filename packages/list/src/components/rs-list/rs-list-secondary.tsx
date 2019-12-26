import { Component, Host, h } from '@stencil/core'


@Component({
  tag: 'rs-list-secondary',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListSecondary {
  render() {
    return  <Host>
              <span class="rs-list-secondary">
                <slot />
              </span>
            </Host>
  }
}
