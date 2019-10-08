import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-image-list-item',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageListItem {
  render() {
    return  <Host>    
              <li class="rs-image-list-item">
                <slot />
              </li>
            </Host>
  }
}
