import { Component, Element, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-dialog-content',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DialogContent {

  @Element() el: Element

  dialogContent: HTMLElement

  componentDidLoad() {
    this.dialogContent = this.el.shadowRoot.querySelector('.rs-dialog-content')
    const content = document.getElementsByTagName('rs-dialog-content')

    this.dialogContent.innerHTML = content[0].innerHTML
  }

  render() {
    return <Host>
      <div class="rs-dialog-content" id="my-dialog-content">
        {/* <ul class="rs-list">
          <li class="item" tabindex="0">
            <span class="graphic">
              <div class="rs-radio">
                <input
                  class="nativecontrol"
                  type="radio"
                  id="test-dialog-baseline-confirmation-radio-1"
                  name="test-dialog-baseline-confirmation-radio-group"
                  checked
                />
                <div class="background">
                  <div class="outercircle"></div>
                  <div class="innercircle"></div>
                </div>
              </div>
            </span>
            <label
              class="text"
            >None</label
            >
          </li>
        </ul> */}
      </div>
    </Host>
  }
}
