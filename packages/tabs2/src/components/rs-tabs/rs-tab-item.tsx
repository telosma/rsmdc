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

  children: Element[]

  @Prop() activated: boolean


  @Watch("activated")
  activatedHandler() {
    this.isActivated();
  }
  
  @Method()
  async isActivated() {
    if (this.activated) {
      this.tabItem.classList.add("-activated");
    } else {
      this.tabItem.classList.remove("-activated");
    }
  }
  
  componentDidLoad() {
    this.tabItem = this.el.shadowRoot.querySelector('.rs-tab')
    this.ripple = new RSRipple(this.tabItem);
    const slot = this.el.shadowRoot.querySelector('slot')
    this.children = Array.from(slot.assignedElements())
   
    // this.children.forEach(el => {
    //   el.addEventListener('click', () => {
    //     if (this.tabItem.classList.contains('-activated')) {
    //       this.tabItem.classList.remove('-activated')
    //     }
    //   })
    // })

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
