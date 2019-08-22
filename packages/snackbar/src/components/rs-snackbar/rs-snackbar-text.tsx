import { Component, Element, h, Host } from '@stencil/core';

@Component({
  tag: 'rs-snackbar-text',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class SnackbarText {

  @Element() el: HTMLElement
  
  snackbarText: HTMLElement
  
  componentDidLoad() {
    this.snackbarText = this.el.shadowRoot.querySelector('.rs-snackbar-text')
    
    const text = document.getElementsByTagName('rs-snackbar-text')
    this.snackbarText.innerHTML = text[0].innerHTML
  }

  render() {
    return  <Host>
              <div class="rs-snackbar-text"
                role="status"
                aria-live="polite">
              </div>
            </Host>
  }
}
