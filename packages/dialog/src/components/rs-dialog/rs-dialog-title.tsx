import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-dialog-title',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DialogTitle {
  render() {
    return  <Host>
              <h2 class="rs-dialog-title" id="my-dialog-title">
                <slot />
              </h2>
            </Host>
  }
}
