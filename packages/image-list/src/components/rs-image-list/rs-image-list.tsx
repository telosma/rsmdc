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
                <li class="item">
                  <div class="imageaspectcontainer">
                    <img class="image" src="https://cweb.canon.jp/showroom/personal/workshop/instaevent-2018/img/picture19.jpg" />
                  </div>
                  <div class="supporting">
                    <span class="label">Text label</span>
                  </div>
                </li>
              </ul>      
              {/* <ul class="rs-image-list -masonry -masonry-image-list">
                <li class="item">
                  <img class="image" src="https://cweb.canon.jp/showroom/personal/workshop/instaevent-2018/img/picture19.jpg" />
                  <div class="supporting">
                    <span class="label">Text label</span>
                  </div>
                </li>
              </ul> */}
            </Host>
  }
}
