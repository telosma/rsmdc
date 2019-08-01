import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-radio',
  // styleUrl: 'my-component.css',
  shadow: true
})
export class Radio {

  @Prop() id: string

  @Prop() label: string

  render() {
     return <Host>
              <div class="rs-radio">
                <div class="rs-radio__container">
                  <input class="rs-radio__native-control" type="radio" />
                  <div class="rs-radio__background">
                    <div class="rs-radio__outer-circle"></div>
                    <div class="rs-radio__inner-circle"></div>
                  </div>
                </div>
                <label class="rs-radio__label" htmlFor={this.id}>{this.label}</label>
              </div>
            </Host>
  }
}
