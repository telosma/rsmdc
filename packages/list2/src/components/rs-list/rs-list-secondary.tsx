import { Component, Element, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-secondary',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListSecondary {

  @Element() el: Element;

  listSecondary: HTMLElement

  componentDidLoad() {
  }

  render() {
    return <Host>
      <span class="rs-list-secondary">
        <slot />
      </span>
    </Host>
  }
}
