import { Component, h } from '@stencil/core';

@Component({
  tag: 'rs-app-layout-content',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppLayoutContent {

  render() {
    return  <div class="rs-app-layout-content">
              <slot />
            </div>
  }
}
