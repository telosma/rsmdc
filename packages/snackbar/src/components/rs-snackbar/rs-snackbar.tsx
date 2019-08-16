import { Component, Prop, h, Host } from '@stencil/core';
import { RSSnackbar } from '../../utils/index'

@Component({
  tag: 'rs-snackbar',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Snackbar {

  @Prop() first: string

  @Prop() middle: string

  @Prop() last: string

  rsSnackbar: RSSnackbar

  snackbar: Element

  // componentDidLoad() {
  //   this.snackbar = this.el.shadowRoot.querySelector('.rs-snackbar')
  // }
  
  render() {
    return  <Host>
              <div class="rs-snackbar">
                <div class="surface">
                  <div class="label"
                    role="status"
                    aria-live="polite">
                    Can't send photo. Retry in 5 seconds.
                  </div>
                  <div class="actions">
                    <button type="button" class="action">Retry</button>
                  </div>
                </div>
              </div>
            </Host>
  }
}
