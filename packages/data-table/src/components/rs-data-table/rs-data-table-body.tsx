import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-body",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableBody {
  @Element() el: HTMLElement;

  componentDidLoad() {
    
  }

  render() {
    return (
      <Host>
        <tbody class="rs-data-table-body">
          <slot />
        </tbody>
      </Host>
    );
  }
}
