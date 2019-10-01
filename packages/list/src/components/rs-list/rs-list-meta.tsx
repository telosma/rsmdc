import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-list-meta',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListMeta {
  render() {
    return  <Host>
              <span class="rs-list-meta">
                <slot />
              </span>
            </Host>
  }
}
