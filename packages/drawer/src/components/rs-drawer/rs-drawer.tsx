import { Component, Element, Prop, Watch, Event, EventEmitter, Method, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-drawer',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Drawer {

  @Element() el: HTMLElement

  @Prop() opened: boolean

  drawer: HTMLElement

  scrim: HTMLElement

  body: HTMLElement

  @Watch('opened')
  openedHandler() {
    if (this.opened) {
      this.openDrawerMotion()
    } else {
      this.closeDrawerMotion()
    }
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async isOpened() {
    if (this.opened) {
      this.openDrawerMotion()
    } else {
      this.closeDrawerMotion()
    }
  }

  @Method()
  async openDrawerMotion() {
    this.drawer.classList.add('-opening')
    this.drawer.classList.add('-animate')
    setTimeout(() => {
      this.drawer.classList.add('-open')
      this.drawer.classList.add('-open-modal')
      this.drawer.classList.remove('-animate')
    }, 200)
  }

  @Method()
  async closeDrawerMotion() {
    this.el.setAttribute('closing', 'closing')
    this.drawer.classList.add('-closing')
    this.drawer.classList.remove('-opening')
    this.drawer.classList.remove('-open-modal')
    setTimeout(() => {
      this.drawer.classList.remove('-open')
      this.drawer.classList.remove('-closing')
      this.el.removeAttribute('closing')
    }, 200)
  }

  componentDidLoad() {
    this.drawer = this.el.shadowRoot.querySelector('.rs-drawer')
    this.scrim = this.el.shadowRoot.querySelector('.scrim')
    this.body = window.document.querySelector('body')
    const slot = this.el.shadowRoot.querySelector('slot')

    slot.addEventListener('slotchange', () => {
      const drawerHeader = Array.from(slot.assignedElements())
        .find(el => el.tagName === 'RS-DRAWER-HEADER')
      const height = drawerHeader
        ? drawerHeader.getBoundingClientRect().height
        : 0
      this.body.style.setProperty('--rs-drawer-content---height', `calc(100vh - ${height}px)`)
    })

    this.isOpened()

    this.scrim.addEventListener('click', () => {
      this.change.emit()
    })
    this.drawer.addEventListener('mouseover', () => {
      this.body.style.setProperty('overflow', 'hidden')
    })
    this.drawer.addEventListener('mouseout', () => {
      this.body.style.setProperty('overflow', 'auto')
    })
  }

  componentDidUnload() {
    this.scrim.removeEventListener('click', () => {
      this.change.emit()
    })
    this.drawer.removeEventListener('mouseover', () => {
      this.body.style.setProperty('overflow', 'hidden')
    })
    this.drawer.removeEventListener('mouseout', () => {
      this.body.style.setProperty('overflow', 'auto')
    })
  }

  render() {
    return  <Host>
              <div class="rs-drawer">
                <div class="content">
                  <slot />
                </div>
                <div class="scrim" />
              </div>
            </Host>
  }
}
