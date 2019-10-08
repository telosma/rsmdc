import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-image-list-label',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageListLabel {
  render() {
    return  <Host>
              <div class="rs-image-list-label">
                <slot />
              </div>
            </Host>
  }
}
