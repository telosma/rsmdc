import { Component, Element, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'rs-image-list-media',
  styleUrl: '../../dist/result.css',
  shadow: true
})


export class ImageListMedia {

  @Element() el: HTMLElement

  @Prop() src: string;

  @Prop() alt: string;
  
  render() {
    return  <Host>
              <div class="rs-image-list-image">
                <img class="image" src={this.src} alt={this.alt} />
              </div>
            </Host>
  }
}
