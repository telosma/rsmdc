import { Component, Host, h, Element, Prop, Watch, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'rs-menu',
  styleUrl: "../../dist/result.css",
  shadow: true
})
  
export class Menu {

  @Element() el: Element;

  menu: HTMLElement

  listItems: Element[]

  @Prop() opened: boolean

  @Watch("opened")
  openeddHandler() {
    this.isOpened();
  }

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Method()
  async isOpened() {
    if (this.opened) {
      this.menu.classList.add('-opened')
    } else {
      this.menu.classList.remove("-opened");
    }
  }
    
  componentDidLoad() {
    this.menu = this.el.shadowRoot.querySelector('.rs-menu')
    this.isOpened()
    const list = Array.from(this.el.shadowRoot
      .querySelector('slot')
      .assignedElements())[0]
    this.listItems = Array.from(list.shadowRoot
      .querySelector('slot')
      .assignedElements())
      .filter(el => el.tagName === 'RS-LIST-ITEM')
    
    this.listItems.forEach(item => {
      item.addEventListener('click', () => {
        const text = Array.from(item.shadowRoot
          .querySelector('slot')
          .assignedElements())
          .find(el => el.tagName === 'RS-LIST-TEXT')

        if (!text) return this.change.emit()
        this.change.emit({ value: text.innerHTML }) 
      })
    })
  }

  componentDidUnLoad() {
    this.listItems.forEach(item => {
      item.removeEventListener('click', () => {
        const text = Array.from(item.shadowRoot
          .querySelector('slot')
          .assignedElements())
          .find(el => el.tagName === 'RS-LIST-TEXT')
        
        if (!text) return this.change.emit()
        this.change.emit({ value: text.innerHTML }) 
      })
    })
  }

  render() {
    return  <Host>
              <div
                class="rs-menu rs-menu-surface">
                <slot />
              </div>
          </Host>
  }
}
