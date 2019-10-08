import { Component, Element, Host, h, Prop, Watch, Method } from '@stencil/core';

@Component({
  tag: 'rs-image-list',
  styleUrl: "../../dist/result.css",
  shadow: true
})

export class ImageList {

  @Element() el: Element;

  imageList: HTMLElement;

  @Prop() masonry: boolean;

  @Watch('masonry')
  masonryHandler() {
    this.isMasonry()
  }

  @Method()
  async isMasonry() {
    if (this.masonry) {
      this.imageList.classList.add("-masonry");
    } else {
      this.imageList.classList.remove("-masonry");
    }
  }

  componentDidLoad() {
    this.imageList = this.el.shadowRoot.querySelector(".rs-image-list");

    this.isMasonry()

  }


  render() {
    return  <Host>    
              <ul class="rs-image-list">
                <slot />
              </ul>
            </Host>
  }
}
