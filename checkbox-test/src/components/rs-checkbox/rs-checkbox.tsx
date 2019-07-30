import { Component, Element, Prop, h } from '@stencil/core';
import { RSCheckbox } from '../../utils/index'

@Component({
  tag: 'rs-checkbox',
  styleUrl: '../../styles/result.css',
  shadow: true
})
export class MyComponent {

  @Element() el: HTMLElement

  @Prop() id: string

  @Prop() name: string

  @Prop() label: string

  @Prop() value: string

  @Prop() checked: boolean

  @Prop() disabled: boolean

  @Prop() indeterminate: boolean

  componentDidLoad() {
    const checkbox = this.el.shadowRoot.querySelector('.container')
    new RSCheckbox(checkbox)
  }

  render() {
    return <div class="rs-checkbox">
              <div class="container">
                <input type="checkbox" class="nativecontrol" />
                <div class="background">
                  <svg class="checkmark" viewBox="0 0 24 24">
                    <path class="checkmarkpath" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                  </svg>
                  <div class="mixedmark" />
                </div>
              </div>
            </div>
  }
}
