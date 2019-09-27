import { Component, Element, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-primary',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListPrimary {

  @Element() el: Element;

  listPrimary: HTMLElement

  componentDidLoad() {
  }

  render() {
    return <Host>
      <span class="rs-list-primary">
        <slot />
      </span>
    </Host>
  }
}
