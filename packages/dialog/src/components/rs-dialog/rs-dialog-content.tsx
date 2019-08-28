import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-dialog-content',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DialogContent {
  render() {
    return  <Host>
              <div class="rs-dialog-content" id="my-dialog-content">
                <slot />
              </div>
            </Host>
  }
}
