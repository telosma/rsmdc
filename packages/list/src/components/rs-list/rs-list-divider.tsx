import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-list-divider',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListDivider{
  render() {
    return  <Host>
              <hr class="rs-list-divider" />
            </Host>
  }
}
