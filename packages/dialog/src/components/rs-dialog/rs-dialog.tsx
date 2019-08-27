import { Component, Element, Host, h, Prop, Watch, Method } from '@stencil/core'
import { RSDialog } from '../../utils/index'

@Component({
  tag: 'rs-dialog',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Dialog {

  @Element() el: Element

  rsDialog: RSDialog

  dialog: HTMLElement

  dialogTitle: Element

  dialogContent: Element

  

  @Prop() opened: boolean
  
  @Prop() scrolling: string



  @Watch("opened")
  openedHandler() {
    this.isOpened()
  }

  @Watch("scrolling")
  scrollingHandler() {
    this.isScrolling()
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.dialog.classList.add('-open')

      document.getElementsByTagName('body')[0].style.overflow = "hidden"
      this.dialog.style.visibility = 'visible'

      this.el.shadowRoot.querySelector('.scrim').addEventListener('click', () => {
        this.dialog.style.visibility = 'hidden'
        document.getElementsByTagName('body')[0].style.overflow = "scroll"

      })
    } else {
      this.dialog.classList.remove('-open')
    }
  }

  @Method()
  async isScrolling() {
    if (this.scrolling) {
      this.dialog.classList.add('-scrollable')

      const title = document.getElementsByTagName('rs-dialog-title')[0]
      const content = document.getElementsByTagName('rs-dialog-content')[0]

      if (title != null && content != null) {
        title.style.borderBottom = 'solid 1px rgba(0,0,0,.12)'
        content.style.borderBottom = 'solid 1px rgba(0,0,0,.12)'
      }
    } else {
      this.dialog.classList.remove('-scrollable')
    }
  }

  

  componentDidLoad() {
    this.dialog = this.el.shadowRoot.querySelector('.rs-dialog')
    this.rsDialog = new RSDialog(this.dialog)

    const title = document.getElementsByTagName('rs-dialog-title')[0]
    const content = document.getElementsByTagName('rs-dialog-content')[0]
    if (title != null && content != null) {
      document.getElementsByTagName('rs-dialog-content')[0].style.paddingTop = '0' 
    }


    const buttons = document.createElement("div");

    buttons.classList.add('buttons')

    const button = document.getElementsByTagName('rs-button')[0]
    const button1 = document.getElementsByTagName('rs-button')[1]
    
    wrap(button, buttons)
    wrap(button1, buttons)
    function wrap(element, wrapper) {
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    }


    
    this.isOpened()
    this.isScrolling()
  }

  render() {
    return  <Host>
              <div
                class="rs-dialog -scrollable"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="my-dialog-title"
                aria-describedby="my-dialog-content"
              >
                <div class="container">
                  <div class="surface">
                    <slot></slot>
                  </div>
                </div>
                <div class="scrim"></div>
              </div>

            </Host>
  }
}
