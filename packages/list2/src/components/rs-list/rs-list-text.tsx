import { Component, Element, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-text',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListText {

  @Element() el: Element;

  listText: HTMLElement

  componentDidLoad() {
  }

  render() {
    return <Host>
      <span class="rs-list-text">
        <slot />
      </span>
    </Host>
  }
}
