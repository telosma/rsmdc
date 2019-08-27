import { Component, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'rs-snackbar-text',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class snackbarTitle {

  @Element() el: HTMLElement
  
  snackbarTitle: HTMLElement
  
  componentDidLoad() {
    this.snackbarTitle = this.el.shadowRoot.querySelector('.rs-snackbar-title')
    
    const title = document.getElementsByTagName('rs-snackbar-title')
    this.snackbarTitle.innerHTML = title[0].innerHTML
  }

  render() {
    return  <Host>
              <div class="rs-snackbar-title"
                role="status"
                aria-live="polite">
              </div>
            </Host>
  }
}
