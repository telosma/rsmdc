import { Component, Element, h, Host, Method } from '@stencil/core'
import ResizeObserver from 'resize-observer-polyfill'

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

  indicatorEl: Element

  scrollArea: Element

  @Method()
  async wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  @Method()
  async setScrollPosition(scrollArea, left) {
    scrollArea.scrollTo({
      top: 0,
      left: left,
      behavior: 'smooth'
    })
  }

  async componentDidLoad() {
    this.tabBar = this.el.shadowRoot.querySelector('.rs-tab-bar')
    const slot = this.el.shadowRoot.querySelector('slot')
    this.children = Array.from(slot.assignedElements())
    this.tabItem = this.children.find(child => child.tagName === 'RS-TAB-ITEM')
    this.tabItemEl = this.tabItem.shadowRoot.querySelector('.rs-tab')
    this.scrollArea = this.el.shadowRoot.querySelector('.scrollarea')
    const scrollAreaWidth = this.el.shadowRoot.querySelector('.scrollarea').clientWidth


    const indicator = document.createElement("div");
    indicator.classList.add('rs-tab-indicator')
    slot.insertAdjacentElement('afterend', indicator)

    this.indicatorEl = this.el.shadowRoot.querySelector('.rs-tab-indicator')
    if (this.indicatorEl) {
      this.indicatorEl.classList.add('-no-animating')
    }

    this.children.forEach((item, i) => {
      const itemEl = item.shadowRoot.querySelector('.rs-tab')

      itemEl.addEventListener('click', () => {
        const tabLeftPosition = itemEl.getBoundingClientRect().left
        const tabRightPosition = itemEl.getBoundingClientRect().right

        this.children.forEach((child, n) => {
          const tabEl = child.shadowRoot.querySelector('.rs-tab')
          if (i === n) {
            tabEl.classList.add('-activated')
          } else {
            tabEl.classList.remove('-activated')
          }
        })
        
        if (i === 0 || i === this.children.length-1) {
          if (tabRightPosition > scrollAreaWidth) {
            const left = tabRightPosition + this.scrollArea.scrollLeft
            this.setScrollPosition(this.scrollArea, left)
          } else if (tabLeftPosition < 0) {
            this.setScrollPosition(this.scrollArea, 0)
          }
        } else {
          const rightTabWidth = this.children[i + 1].clientWidth / 3
          const leftTabWidth = this.children[i - 1].clientWidth / 3
          const rightViewPosition = tabRightPosition + rightTabWidth
          const leftViewPosition = tabLeftPosition - leftTabWidth
        
          if (rightViewPosition > scrollAreaWidth) {
            const diff = rightViewPosition - scrollAreaWidth
            const left = diff + this.scrollArea.scrollLeft
            this.setScrollPosition(this.scrollArea, left)
          } else if (leftViewPosition < 0) {
            const left = this.scrollArea.scrollLeft + leftViewPosition
            this.setScrollPosition(this.scrollArea, left)
          }
        }
      })
    })

    const observer = new ResizeObserver(() => {
      this.children.forEach(tab => {
        const itemEl = tab.shadowRoot.querySelector('.rs-tab')
        const width = itemEl.clientWidth
        const left = itemEl.getBoundingClientRect().left
        
        indicator.style.setProperty('width', `${width}px`)
        
        if (itemEl.classList.contains('-activated')) {
          indicator.style.setProperty('width', `${width}px`)
          indicator.style.setProperty('left', `${left}px`)
        }
        
        tab.addEventListener('click', () => {
          indicator.style.setProperty('width', `${width}px`)
          indicator.style.setProperty('left', `${left}px`)
          this.indicatorEl.classList.remove('-no-animating')
        })
      })
    })
    observer.observe(this.tabItemEl)
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
