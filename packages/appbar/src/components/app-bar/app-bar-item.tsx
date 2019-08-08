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

    // TODO (If host component has other classname, disappear this component when properties changes)
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.attributeName === 'class' && !this.el.classList.contains('hydrated')) {
          this.el.classList.add('hydrated')
        }
        if (record.attributeName === 'class' && !this.el.classList.contains('rs-app-bar-item-host')) {
          this.el.classList.add('rs-app-bar-item-host')
        }
      })
    })
    observer.observe(this.el, {
      attributes: true
    })
  }

  componentDidRender() {
  }

  render() {
    return  <Host class="host-rs-app-bar-item">
              <span class="rs-app-bar-item" tabindex="0">
                <span class="label">
                  <slot />
                </span>
              </span>
            </Host>
  }
}
