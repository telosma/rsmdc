import { Component, Element, h, Host, Method } from '@stencil/core';


@Component({
  tag: 'rs-tab-bar',
  styleUrl: '../../dist/result.css',
  shadow: true
})

export class TabBar {

  @Element() el: Element;

  tabBar: HTMLElement

  tabItem: Element

  tabItemEl: Element

  slot: Element

  children: Element[]

  rowEl: Element

  indicatorEl: Element

  // @Prop() activated:boolean

  // @Watch("activated")
  // activatedHandler() {
  //   this.isActivated();
  // }

  // @Method()
  // async isActivated() {
  //   if (this.activated) {
  //     this.tabItemEl.classList.add("-activated");
  //   } else {
  //     this.tabItemEl.classList.remove("-activated");
  //   }
  // }

  @Method()
  async wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  componentDidLoad() {
    this.tabBar = this.el.shadowRoot.querySelector('.rs-tab-bar')
    const slot = this.el.shadowRoot.querySelector('slot')
    this.children = Array.from(slot.assignedElements())
    this.tabItem = this.children.find(child => child.tagName === 'RS-TAB-ITEM')
    this.tabItemEl = this.tabItem.shadowRoot.querySelector('.rs-tab')

    const indicator = document.createElement("div");
    indicator.classList.add('rs-tab-indicator')
    slot.insertAdjacentElement('afterend', indicator)
    
    const width = this.tabItemEl.clientWidth
    indicator.style.setProperty('width', `${width}px`)

    this.indicatorEl = this.el.shadowRoot.querySelector('.rs-tab-indicator')
    if (this.indicatorEl) {
      this.indicatorEl.classList.add('-no-animating')
    }
    
    this.children.forEach(item => {
      const itemEl = item.shadowRoot.querySelector('.rs-tab')
      itemEl.addEventListener('click', () => {
        const position = itemEl.getBoundingClientRect()
        indicator.style.setProperty('left', `${position.left}px`)
        this.indicatorEl.classList.remove('-no-animating')
      })
    })

  }

  render() {
    return <Host>
            <div class="rs-tab-bar">
              <div class="scroller">
                <div class="scrollarea">
                  <div class="scrollcontent">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
          </Host>
  }
}
