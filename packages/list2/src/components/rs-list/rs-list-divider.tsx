import { Component, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-list-divider',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListDivider{

  @Element() el: Element;

  listDivider: HTMLElement

  componentDidLoad() {
  }

  render() {
    return  <Host>
              <hr class="rs-list-divider"></hr>
            </Host>
  }
}
