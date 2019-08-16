import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-select',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Select {

  @Element() el: HTMLElement

  @Prop() label: string

  render() {
    return <Host>
              <div class="rs-select">
                <i class="dropdownicon"></i>
                <select class="nativecontrol">
                  <slot></slot>
                </select>
                <label class="label">{this.label}</label>
                <div class="ripple"></div>
              </div>
              <div class="outline">
                <div class="leading"></div>
                <div class="notch">
                  <label class="label -outlined">{this.label}</label>
                </div>
                <div class="trailing"></div>
              </div>
            </Host>
  }
}
