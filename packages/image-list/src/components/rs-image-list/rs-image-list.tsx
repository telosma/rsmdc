import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-image-list',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageList {
  render() {
    return  <Host>    
              <ul class="rs-image-list">
                <slot />
              </ul>
            </Host>
  }
}
