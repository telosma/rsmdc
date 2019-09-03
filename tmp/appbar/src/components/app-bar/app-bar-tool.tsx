import { Component, Element, Prop, Host, h } from '@stencil/core'

@Component({
  tag: 'rs-app-bar-tool',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class AppBarTool {

  @Element() el: HTMLElement

  @Prop() scrolling: string
  
  render() {
    return  <Host>
              <div class="rs-app-bar-tool">
                <slot />
              </div>
            </Host>
  }
}
