import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-row",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableRow {
  render() {
    return  <Host>
              <tr class="rs-data-table-row">
                <slot />
              </tr>
            </Host>
  }
}
