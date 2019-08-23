import { Component, Element, Host, h } from '@stencil/core';
import { RSDialog } from '../../utils/index';

@Component({
  tag: 'rs-dialog',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Dialog {

  @Element() el: Element

  rsDialog: RSDialog

  dialog: HTMLElement

  componentDidLoad() {
    this.dialog = this.el.shadowRoot.querySelector('.rs-dialog')
    this.rsDialog = new RSDialog(this.dialog)

    // console.log(this.el.shadowRoot.querySelector('.scrim'))
  }

  render() {
    return  <Host>
              <div class="rs-dialog"
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="my-dialog-title"
                  aria-describedby="my-dialog-content">
                <div class="container">
                  <div class="surface">
                    <h2 class="title" id="my-dialog-title">Get this party started?</h2>
                    <div class="content" id="my-dialog-content">
                      Turn up the jams and have a good time.
                    </div>
                    <footer class="actions">
                      <slot></slot>
                      {/* <button type="button" class="rs-button button" data-rs-dialog-action="no">
                        <span class="label">No</span>
                      </button>
                      <button type="button" class="rs-button button" data-rs-dialog-action="yes">
                        <span class="label">Yes</span>
                      </button> */}
                    </footer>
                  </div>
                </div>
                <div class="scrim"></div>
              </div>
            </Host>
  }
}
