import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-row",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableRow {
  @Element() el: HTMLElement;
  
  dataTableRow: HTMLElement

  componentDidLoad() { 
    this.dataTableRow = this.el.shadowRoot.querySelector('.rs-data-table-row')
    const slot = this.el.shadowRoot.querySelector('slot')

    const cells = Array.from(slot.assignedElements().filter(e => e.tagName === 'RS-DATA-TABLE-CELL'))
    if (cells.length === 0) { return }

    const checkbox = Array.from(cells[0].shadowRoot.querySelector('slot').assignedElements())[0]
    if (checkbox.hasAttribute('checked')) {
      this.dataTableRow.classList.add("-selected");
    } else {
      this.dataTableRow.classList.remove("-selected");
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.hasAttribute('checked')) {
        this.dataTableRow.classList.add("-selected");
      } else {
        this.dataTableRow.classList.remove("-selected");
      }
    })
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
