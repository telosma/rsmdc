import { Component, Element, Method, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-body",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableBody {
  @Element() el: HTMLElement;

  rows: Element[]

  checkboxes: Element[]

  @Method()
  async isCheckboxChecked(checkbox, row) {
    if (checkbox.getAttribute('data-checked')) {
      row.classList.add("-selected");
    } else {
      row.classList.remove("-selected");
    } 
  }

  componentDidLoad() {
    const slot = this.el.shadowRoot.querySelector('slot')

    this.rows = Array.from(slot.assignedElements());

    this.checkboxes = this.rows.map(row => {
      const cells = Array.from(row
        .shadowRoot
        .querySelector('slot')
        .assignedElements()
      )

      if (cells.length > 0) {
        const checkbox = Array.from(cells[0]
          .shadowRoot
          .querySelector("slot")
          .assignedElements()
        )[0]
        return checkbox
      }
    })

    this.checkboxes.forEach((checkbox, i) => {
      const row = this.rows[i]
        .shadowRoot
        .querySelector('.rs-data-table-row')
      this.isCheckboxChecked(checkbox, row)

      checkbox.addEventListener('change', () => {
        this.isCheckboxChecked(checkbox, row)
      })
    })
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
