import { Component, Element, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-graphic',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListGraphic {

  @Element() el: Element;

  listGraphic: HTMLElement

  componentDidLoad() {
  }

  render() {
    return <Host>
      <span class="rs-list-graphic">
        <slot />
      </span>
    </Host>
  }
}
