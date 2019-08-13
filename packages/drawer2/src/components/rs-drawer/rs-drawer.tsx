import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rs-drawer',
  styleUrl: '../../dist/result.css',
  shadow: true
})
export class Drawer {

  @Prop() opened: boolean

  render() {
    return <div></div>
  }
}
