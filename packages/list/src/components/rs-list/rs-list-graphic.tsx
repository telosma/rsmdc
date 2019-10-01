import { Component, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-graphic',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListGraphic {
  render() {
    return  <Host>
              <span class="rs-list-graphic">
                <slot />
              </span>
            </Host>
  }
}
