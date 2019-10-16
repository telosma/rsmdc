import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'rs-image-list-label',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageListLabel{

  @Element() el: Element;

  imageListLabel: HTMLElement;

  componentDidLoad() {
    this.imageListLabel = this.el.shadowRoot.querySelector('.rs-image-list-label')
  }

  render() {
    return  <Host>
              <div class="rs-image-list-label">
                <div class="text">
                  <slot />
                </div>
              </div>
            </Host>
  }
}
