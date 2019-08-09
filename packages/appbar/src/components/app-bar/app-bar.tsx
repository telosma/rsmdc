import { Component, Element, Prop, State, Watch, Method, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-app-bar',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @Prop() fixed: boolean

  @Prop() compactable: boolean

  @State() isDrawer: boolean

  @State() isScrolling: boolean

  appBar: HTMLElement

  appBarTitle: Element

  hasAppBarTool: boolean

  topLimit: number

  itemLength: number

  windowScrollTop: number = 0

  scrollTop: number = 0

  appBarPadding: number = 12

  sectionPadding: number = 4

  @Watch('fixed')
  fixedHandler() {
    this.isFixed()
  }

  @Watch('compactable')
  compactableHandler() {
    this.isCompactable()
  }

  @Watch('isScrolling')
  isScrollingHandler() {
    const height = this.appBar.clientHeight
    this.topLimit = -(height * 2)

    if (this.isScrolling && !this.appBar.classList.contains('-fixed-scrolled')) {
      this.appBar.classList.add('-fixed-scrolled')
    } else if (!this.isScrolling) {
      this.appBar.classList.remove('-fixed-scrolled')
    }
  }

  @Method()
  async isFixed() {
    if (this.fixed) {
      this.appBar.classList.add('-fixed')
    } else {
      this.appBar.classList.remove('-fixed')
    }
  }

  @Method()
  async isCompactable() {
    if (this.compactable) {
      this.appBar.classList.add('-compact')
    } else {
      this.appBar.classList.remove('-compact')
    }
    this.updateAppBarWidth()
  }

  @Method()
  async updateAppBarWidth() {
    const appBarHeight = this.appBar.clientHeight
    const withCollapsedWidth = appBarHeight * this.itemLength + appBarHeight - this.appBarPadding + this.sectionPadding
    this.appBar.style.cssText = `--rs-app-bar-compact-fixed-scrolled-has-action-item---width: ${withCollapsedWidth}px;`
  }
  
  componentDidLoad() {
    this.appBar = this.el.shadowRoot.querySelector('.rs-app-bar')
    const slotEl = this.el.shadowRoot.querySelector('slot')

    this.isFixed()
    this.isCompactable()

    slotEl.addEventListener('slotchange', () => {
      const titleEl = slotEl.assignedNodes().filter(node => node.nodeName === 'RS-APP-BAR-TITLE')[0]
      this.appBarTitle = titleEl
      const toolEl = slotEl.assignedNodes().filter(node => node.nodeName === 'RS-APP-BAR-TOOL')
      const hasAppBarTool = toolEl.length > 0 ? true : false

      if (hasAppBarTool) {
        this.itemLength = Array.from(toolEl[0].childNodes).filter(child => child.nodeType === 1).length
        this.appBar.classList.add('-has-action-item')
        this.updateAppBarWidth()
      }
    })

    window.onscroll = () => {
      let top = window.pageYOffset
      const diff = this.windowScrollTop - top
      this.isScrolling = top > 0

      if (this.fixed || this.compactable) { return }

      if(top < this.windowScrollTop) {
        // scroll up

        if(this.scrollTop === 0) {
          this.windowScrollTop = top
          return
        }

        const scrollTopHarf = this.topLimit / 2
        const startTopPosition = this.scrollTop === this.topLimit 
          ? scrollTopHarf 
          : this.scrollTop + diff
        this.scrollTop  = startTopPosition > 0 ? 0 : startTopPosition
        this.appBar.style.setProperty('top', `${this.scrollTop}px`)
        this.windowScrollTop = top

      } else {
        // scroll down

        const moving = this.scrollTop + diff
        const startTopPosition = -top > this.topLimit 
          ? -top : moving < this.topLimit 
          ? this.topLimit : moving
        this.scrollTop = startTopPosition
        this.appBar.style.setProperty('top', `${this.scrollTop}px`)
        this.windowScrollTop = top    
      }
    }
  }

  render() {
    return  <Host>
              <header class="rs-app-bar">
                <div class="row">
                  <div class="section">
                    <slot></slot>
                  </div>
                </div>
              </header>
              <div class="rs-app-bar-content" />
            </Host>
  }
}
