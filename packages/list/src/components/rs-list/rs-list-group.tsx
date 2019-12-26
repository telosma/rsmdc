import { Component, Host, h } from '@stencil/core'


@Component({
  tag: 'rs-list-group',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListGroup {
  render() {
    return  <Host>
              <div class="rs-list-group">
                <slot />
              </div>
            </Host>
  }
}
