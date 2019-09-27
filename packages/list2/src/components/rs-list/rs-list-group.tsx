import { Component, Element, Host, h } from '@stencil/core';


@Component({
  tag: 'rs-list-group',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListGroup {

  @Element() el: Element;

  listGroup: HTMLElement

  componentDidLoad() {
  }

  render() {
    return  <Host>
              <div class="rs-list-group">
                <slot />
              </div>
            </Host>
  }
}
