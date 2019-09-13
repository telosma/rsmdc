import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-cell",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableCell {

  @Element() el: HTMLElement;

  componentDidLoad() {
    const cell = this.el.shadowRoot.querySelector(
      ".rs-data-table-cell"
    );
    const slot = this.el.shadowRoot.querySelector("slot");

    const checkboxes = Array.from(
      slot.assignedElements().filter(e => e.tagName === "RS-CHECKBOX")
    );
    if (checkboxes.length === 0) return
    
    cell.classList.add("-checkbox");
    (cell as HTMLElement).style.paddingRight = "0px";
    this.el.style.justifyContent = "flex-start";
  }

  render() {
    return (
      <Host>
        <td class="rs-data-table-cell">
          <slot />
        </td>
      </Host>
    );
  }
}
