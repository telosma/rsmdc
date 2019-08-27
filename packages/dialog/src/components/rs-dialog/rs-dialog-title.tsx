import { Component, Element, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-dialog-title',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DialogTitle {

  @Element() el: Element

  dialogTitle: HTMLElement

  componentDidLoad() {
    this.dialogTitle = this.el.shadowRoot.querySelector('.rs-dialog-title')
    const title = document.getElementsByTagName('rs-dialog-title')
    
    this.dialogTitle.innerHTML = title[0].innerHTML
  }

  render() {
    return  <Host>
              <h2 class="rs-dialog-title" id="my-dialog-title">
              </h2>
            </Host>
  }
}
