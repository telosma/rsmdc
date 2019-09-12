import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-row",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableRow {
  @Element() el: HTMLElement;
  
  dataTableRow: HTMLElement;

  componentDidLoad() {
    this.dataTableRow = this.el.shadowRoot.querySelector(".rs-data-table-row");
  }

  render() {
    return (
      <Host>
        <tr class="rs-data-table-row">
          <slot />
        </tr>
      </Host>
    );
  }
}
