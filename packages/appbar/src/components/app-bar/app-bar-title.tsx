import { Component, Element, State, Watch, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-app-bar-title',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @State() isScrolling: boolean

  appBarTitle: HTMLElement

  @Watch('isScrolling')
  isScrollingHandler() {
    if (this.isScrolling && !this.appBarTitle.classList.contains('-fixed-scrolled')) {
      this.appBarTitle.classList.add('-fixed-scrolled')
    } else if (!this.isScrolling) {
      this.appBarTitle.classList.remove('-fixed-scrolled')
    }
  }

  componentDidLoad() {
    this.appBarTitle = this.el.shadowRoot.querySelector('.rs-app-bar-title')
  }
  
  render() {
    return  <Host>
              <h1 class="rs-app-bar-title">
                <slot />
              </h1>
            </Host>
  }
}
