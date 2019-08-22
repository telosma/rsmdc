import { Component, Element, h, Host, Prop, Watch, Method } from '@stencil/core';
import { RSSnackbar } from '../../utils/index'

@Component({
  tag: 'rs-snackbar',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Snackbar {

  @Element() el: Element

  @Prop() opened: boolean

  @Prop() stacked: boolean

  @Prop() leading: boolean

  rsSnackbar: RSSnackbar
  
  snackbar: HTMLElement

  snackbarText: Element
  

  @Watch('opened')
  openedHandler() {
    this.isOpened()
  }

  @Watch('stacked')
  stackedHandler() {
    this.isStacked()
  }

  @Watch('leading')
  leadingHandler() {
    this.isLeading()
  }
 
  @Method()
  async isStacked() {
    if (this.stacked) {
      this.snackbar.classList.add('-stacked')
    } else {
      this.snackbar.classList.remove('-stacked')
    }
  }

  @Method()
  async isLeading() {
    if (this.leading) {
      this.snackbar.classList.add('-leading')
    } else {
      this.snackbar.classList.remove('-leading')
    }
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.snackbar.classList.add('-open')
      // this.snackbar.style.opacity = "1"
      // setTimeout(() => {
      //   this.snackbar.style.opacity = "0"
      //   this.snackbar.style.transition = "180ms"
      // }, 5000)
    } else {
      this.snackbar.classList.remove('-open')
    }
  }

  componentDidLoad() {
    this.snackbar = this.el.shadowRoot.querySelector('.rs-snackbar')
    this.rsSnackbar = new RSSnackbar(this.snackbar)

    console.log(this.el.shadowRoot.querySelector('.rs-snackbar'))
    
    this.isOpened()
    this.isStacked()
    this.isLeading()

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.attributeName === 'class' && !this.el.classList.contains('hydrated')) {
          this.el.classList.add('hydrated')
        }
      })
    })
    observer.observe(this.el, {
      attributes: true
    })

  }
  
  render() {
    return  <Host>
              <div class="rs-snackbar">
                <div class="surface">
                  <slot></slot>
                  <div class="actions"></div>
                </div>
              </div>
            </Host>
  }
}
