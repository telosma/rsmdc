import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-image-list-container',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageListcContainer {
  render() {
    return  <Host>
              <div class="rs-image-list-container">
                <slot />
              </div>
            </Host>
  }
}
