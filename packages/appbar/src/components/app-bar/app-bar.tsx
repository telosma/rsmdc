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

  appBarTool: Element

  hasAppBarTool: boolean

  itemLength: number = 0

  appBarPadding: number = 12

  sectionPadding: number = 4

  appbarHeight: number = 0

  prevWindowScrollTop: number = 0

  topPosition: number = 0

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
    if (this.isScrolling && !this.appBar.classList.contains('-fixed-scrolled')) {
      this.appBar.classList.add('-fixed-scrolled')
      
      if (this.appBarTitle) { 
        this.appBarTitle.setAttribute('scrolling', 'true')
      }
      if (this.appBarTool) { 
        this.appBarTool.setAttribute('scrolling', 'true')
      }
    } else if (!this.isScrolling) {
      this.appBar.classList.remove('-fixed-scrolled')

      if (this.appBarTitle) { 
        this.appBarTitle.removeAttribute('scrolling')
      }
      if (this.appBarTool) { 
        this.appBarTool.removeAttribute('scrolling')
      }
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
    if (this.itemLength > 0) {
      this.updateAppBarWidth()
    }
  }

  @Method()
  async updateAppBarWidth() {
    const appBarHeight = this.appBar.clientHeight
    const withCollapsedWidth = appBarHeight * this.itemLength + appBarHeight - this.appBarPadding + this.sectionPadding
    this.appBar.style.cssText = `--rs-app-bar-compact-fixed-scrolled-has-action-item---width: ${withCollapsedWidth}px;`
  }

  @Method()
  async selectAppBarTitle() {
    const slotEl = this.el.shadowRoot.querySelector('slot')

    const appBarTitles = Array.from(slotEl.assignedElements().filter(element => element.tagName === 'RS-APP-BAR-TITLE'))
    if (appBarTitles.length > 0) {
      this.appBarTitle = appBarTitles[0]
    }
  }

  @Method()
  async selectAppBarTool() {
    const slotEl = this.el.shadowRoot.querySelector('slot')

    const appBarTools = Array.from(slotEl.assignedElements().filter(element => element.tagName === 'RS-APP-BAR-TOOL'))
    if (appBarTools.length > 0) {
      this.appBarTool = appBarTools[0]
    }
  }

  @Method()
  async hasAppBarItems() {
    if (!this.appBarTool) { return }
    this.itemLength = Array.from(this.appBarTool.childNodes).filter(child => child.nodeType === 1).length

    if (this.itemLength > 0) {
      this.appBar.classList.add('-has-action-item')
      this.updateAppBarWidth()
    } else {
      this.appBar.classList.remove('-has-action-item')
    }
  }

  async scrollAppbarMotion(top, movingDiff) {
    if(top < this.prevWindowScrollTop) {
      // scroll up

      this.topPosition =  this.topPosition < -this.appbarHeight
        ? -this.appbarHeight
        : this.topPosition + movingDiff
      this.topPosition = this.topPosition > 0
        ? 0
        : this.topPosition

      this.appBar.style.setProperty('top', `${this.topPosition}px`)
      this.prevWindowScrollTop = top
    } else {
      // scroll down
      this.topPosition = -top > -this.appbarHeight
        ? -top
        : this.topPosition + movingDiff
      this.appBar.style.setProperty('top', `${this.topPosition}px`)
      this.prevWindowScrollTop = top    
    }
  }
  
  async componentDidLoad() {
    this.appBar = this.el.shadowRoot.querySelector('.rs-app-bar')
    await this.selectAppBarTitle()
    await this.selectAppBarTool()
    await this.hasAppBarItems()
    
    this.isFixed()
    this.isCompactable()

    window.onscroll = () => {
      const top = window.pageYOffset
      const movingDiff = this.prevWindowScrollTop - top
      this.appbarHeight = this.appBar.clientHeight
      this.isScrolling = top > 0

      if (this.fixed || this.compactable) { return }

      this.scrollAppbarMotion(top, movingDiff)
    }
  }

  componentDidRender() {
    if (this.appBar) {
      this.selectAppBarTool()
      this.hasAppBarItems()
    }
  }

  render() {
    return  <Host>
              <header class="rs-app-bar">
                <div class="row">
                  <div class="section">
                    <slot />
                  </div>
                </div>
              </header>
              <div class="rs-app-bar-content" />
            </Host>
  }
}
