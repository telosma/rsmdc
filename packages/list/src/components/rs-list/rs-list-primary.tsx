import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-list-primary',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListPrimary {
  render() {
    return <Host>
              <span class="rs-list-primary">
                <slot />
              </span>
            </Host>
  }
}
