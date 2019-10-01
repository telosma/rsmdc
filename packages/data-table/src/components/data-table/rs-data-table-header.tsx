import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table-header",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTableHeader {
  @Element() el: HTMLElement;

  componentDidLoad() {
    const slot = this.el.shadowRoot.querySelector('slot')
    const rows = Array.from(slot.assignedElements());

    rows.forEach(row => {
      const rowEl = row.shadowRoot.querySelector('.rs-data-table-row')
      rowEl.classList.add('-header')
    })
  }

  render() {
    return  <Host>
              <thead class="rs-data-table-header">
                <slot />
              </thead>
            </Host>
  }
}
