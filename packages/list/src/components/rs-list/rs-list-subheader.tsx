import { Component, Host, h } from '@stencil/core'


@Component({
  tag: 'rs-list-subheader',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class ListSubheader {
  render() {
    return  <Host>
              <h3 class="rs-list-subheader">
                <slot />
              </h3>
            </Host>
  }
}
