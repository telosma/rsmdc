import { Component, Element, Prop, State, Host, h } from '@stencil/core'
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-app-bar-item',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @Prop() first: string

  @Prop() middle: string

  @Prop() last: string

  @State() top: string

  componentDidLoad() {
    const itemEl = this.el.shadowRoot.querySelector('.rs-app-bar-item')
    const ripple = new RSRipple(itemEl)
    ripple.unbounded = true
  }

  render() {
    return  <Host class="rs-app-bar-item-host">
              <span class="rs-app-bar-item" tabindex="0">
                <span class="label">
                  <slot />
                </span>
              </span>
            </Host>
  }
}
