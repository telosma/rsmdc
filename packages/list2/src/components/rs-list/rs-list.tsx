import { Component, Element, Host, h } from '@stencil/core';
import { RSList } from '../../utils/index'

@Component({
  tag: 'rs-list',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class List {

  @Element() el: Element;

  list: HTMLElement

  rsList: RSList

  

  componentDidLoad() {
    this.list = this.el.shadowRoot.querySelector('.rs-list')
  }

  render() {
    return  <Host>
              <ul class="rs-list">
                <slot />
              </ul>
            </Host>
  }
}
