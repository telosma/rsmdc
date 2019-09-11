import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-header",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableHeader {
  @Element() el: HTMLElement;

  componentDidLoad() {}

  render() {
    return (
      <Host>
        <thead class="rs-data-table-header">
          <slot />
        </thead>
      </Host>
    );
  }
}
