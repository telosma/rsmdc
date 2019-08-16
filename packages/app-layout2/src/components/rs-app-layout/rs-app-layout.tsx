import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'rs-app-layout',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppLayout {

  @Element() el: HTMLElement

  drawers: Element[]

  componentDidLoad() {
    const slotEl = this.el.shadowRoot.querySelector('slot')

    const drawers = Array.from(slotEl.assignedElements().filter(element => element.tagName === 'RS-DRAWER'))
    if (drawers.length > 0) {
      this.drawers = drawers
    }
  }

  render() {
    return  <div class="rs-app-layout">
              <slot />
            </div>
  }
}
