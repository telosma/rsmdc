import { Component, Element, Prop, State, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-app-bar-tool',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBar {

  @Element() el: HTMLElement

  @Prop() first: string

  @Prop() middle: string

  @Prop() last: string

  @State() top: string

  componentDidLoad() {
    // TODO (If host component has other classname, disappear this component when properties changes)
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.attributeName === 'class' && !this.el.classList.contains('hydrated')) {
          this.el.classList.add('hydrated')
        }
        if (record.attributeName === 'class' && !this.el.classList.contains('rs-app-bar-tool-host')) {
          this.el.classList.add('rs-app-bar-tool-host')
        }
      })
    })
    observer.observe(this.el, {
      attributes: true
    })
  }

  render() {
    return  <Host class="rs-app-bar-tool-host">
              <div class="rs-app-bar-tool">
                <slot />
              </div>
            </Host>
  }
}
