import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-textfield-trailing",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class TextfieldTrailing {
  @Element() el: HTMLElement;

  trailing: Element;

  render() {
    return (
      <Host>
        <span class="rs-textfield-trailing" />
      </Host>
    );
  }
}