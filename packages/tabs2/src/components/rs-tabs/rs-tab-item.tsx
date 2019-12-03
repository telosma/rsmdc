import { Component, Element, h, Host, Prop, Watch, Method } from '@stencil/core';
import { RSRipple } from '@rsmdc/ripple'

@Component({
  tag: 'rs-tab-item',
  styleUrl: '../../dist/result.css',
  shadow: true
})
  
export class TabItem {

  @Element() el: Element

  tabItem: Element

  ripple: RSRipple

  @Prop() activated:boolean

  @Watch("activated")
  activatedHandler() {
    this.isActivated();
  }
  
  @Method()
  async isActivated() {
    if (this.activated) {
      this.tabItem.classList.add('-activated')
    }
  }

  componentDidLoad() {
    this.tabItem = this.el.shadowRoot.querySelector('.rs-tab')
    this.ripple = new RSRipple(this.tabItem)
    
    this.isActivated()
  }

  render() {
    return <Host>
            <button class="rs-tab">
              <span class="content">
                <span class="textlabel">
                  <slot />
                </span>
              </span>
              <span class="ripple" />
            </button>
          </Host>
  }
}
