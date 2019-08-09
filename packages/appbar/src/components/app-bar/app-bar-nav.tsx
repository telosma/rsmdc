import { Component, Element, Prop, State, Host, h } from '@stencil/core'
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-app-bar-nav',
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
    const navEl = this.el.shadowRoot.querySelector('.rs-app-bar-nav')
    const ripple = new RSRipple(navEl)
    ripple.unbounded = true
  }

  render() {
    return  <Host>
              <span class="rs-app-bar-nav" tabindex="0">
                <span class="label">
                  <slot />
                </span>
              </span>
            </Host>
  }
}
