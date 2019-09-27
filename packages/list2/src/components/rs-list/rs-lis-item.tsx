import { Component, Element, Host, h, Method } from '@stencil/core';
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-list-item',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class ListItem {

  @Element() el: Element;

  listItem: HTMLElement

  @Method()
  async activateRipple() {
    this.listItem[0].ripple.activate()
    setTimeout(() => { // TODO
      this.listItem[0].ripple.deactivate()
    }, 200)
  }


  componentDidLoad() {
    const listItem = this.el.shadowRoot.querySelector('.rs-list-item')
    console.log(listItem)

    const ripple = new RSRipple(listItem)
    ripple.unbounded = true;

  }

  render() {
    return <Host>
      <li class="rs-list-item">
        <slot />
      </li>
    </Host>
  }
}
