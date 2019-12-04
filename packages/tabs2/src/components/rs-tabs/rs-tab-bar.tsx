import { Component, Element, h, Host, Method } from '@stencil/core'
import ResizeObserver from 'resize-observer-polyfill'

@Component({
  tag: 'rs-tab-bar',
  styleUrl: '../../dist/result.css',
  shadow: true
})

export class TabBar {

  @Element() el: Element;

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
    const slot = this.el.shadowRoot.querySelector('slot')
    const children = Array.from(slot.assignedElements())
    const tabItem = children.find(child => child.tagName === 'RS-TAB-ITEM')
    const tabItemEl = tabItem.shadowRoot.querySelector('.rs-tab')
    const scrollArea = this.el.shadowRoot.querySelector('.scrollarea')
    const scrollAreaWidth = this.el.shadowRoot.querySelector('.scrollarea').clientWidth

    const indicator = (this.el.shadowRoot.querySelector('.rs-tab-indicator') as HTMLScriptElement)
    if (indicator) {
      indicator.classList.add('-no-animating')
    }

    children.forEach((item, i) => {
      const itemEl = item.shadowRoot.querySelector('.rs-tab')

      itemEl.addEventListener('click', () => {
        const tabLeftPosition = itemEl.getBoundingClientRect().left
        const tabRightPosition = itemEl.getBoundingClientRect().right

        children.forEach((child, n) => {
          const tabEl = child.shadowRoot.querySelector('.rs-tab')
          if (i === n) {
            tabEl.classList.add('-activated')
          } else {
            tabEl.classList.remove('-activated')
          }
        })
        
        if (i === 0 || i === children.length-1) {
          if (tabRightPosition > scrollAreaWidth) {
            const left = tabRightPosition + scrollArea.scrollLeft
            this.setScrollPosition(scrollArea, left)
          } else if (tabLeftPosition < 0) {
            this.setScrollPosition(scrollArea, 0)
          }
        } else {
          const rightTabWidth = children[i + 1].clientWidth / 3
          const leftTabWidth = children[i - 1].clientWidth / 3
          const rightViewPosition = tabRightPosition + rightTabWidth
          const leftViewPosition = tabLeftPosition - leftTabWidth
        
          if (rightViewPosition > scrollAreaWidth) {
            const diff = rightViewPosition - scrollAreaWidth
            const left = diff + scrollArea.scrollLeft
            this.setScrollPosition(scrollArea, left)
          } else if (leftViewPosition < 0) {
            const left = scrollArea.scrollLeft + leftViewPosition
            this.setScrollPosition(scrollArea, left)
          }
        }
      })
    })

    const observer = new ResizeObserver(() => {
      children.forEach(tab => {
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
          indicator.classList.remove('-no-animating')
        })
      })
    })
    observer.observe(tabItemEl)
  }

  render() {
    return <Host>
            <div class="rs-tab-bar">
              <div class="scroller">
                <div class="scrollarea">
                  <div class="scrollcontent">
                    <slot />
                    <div class="rs-tab-indicator -no-animating"/>
                  </div>
                </div>
              </div>
            </div>
          </Host>
  }
}
