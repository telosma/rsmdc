import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-select',
  styleUrls: [
    '../../dist/result.css',
    '../../styles/_material-icons.scss'
  ],
  shadow: true
})
export class Select {

  @Element() el: HTMLElement

  @Prop() label: string

  render() {
    return <Host>
              <div class="rs-select">
                <i class="dropdownicon material-icons">arrow_drop_down</i>
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
