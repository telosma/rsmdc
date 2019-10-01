import { Component, Host, h } from '@stencil/core';
@Component({
  tag: 'rs-list',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class List {
  render() {
    return  <Host>
              <ul class="rs-list">
                <slot />
              </ul>
            </Host>
  }
}
