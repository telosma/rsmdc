import { Component, Element, Prop, Watch, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-app-bar-title',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBarTitle {

  @Element() el: HTMLElement

  @Prop() scrolling: string

  appBarTitle: HTMLElement

  @Watch('scrolling')
  scrollingHandler() {
    if (this.scrolling) {
      this.appBarTitle.classList.add('-fixed-scrolled')
    } else {
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
