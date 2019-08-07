import { Component, Element, Host, h } from '@stencil/core';
import { RSSlider } from '../../utils/index';

@Component({
  tag: 'rs-slider',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Slider {
  
  @Element() el: HTMLElement

  rsSwitch: RSSlider

  Slider: Element
  
  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return  <Host>
              <div class="rs-slider" tabindex="0" role="slider"
                aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
                aria-label="Select Value">
                <div class="trackcontainer">
                  <div class="track"></div>
                </div>
                <div class="thumbcontainer">
                  <svg class="thumb" width="21" height="21">
                    <circle cx="10.5" cy="10.5" r="7.875"></circle>
                  </svg>
                  <div class="focusring"></div>
                </div>
              </div>
            </Host>
  }
}
