import { Component, Element, Host, h, Prop, Watch, Method } from "@stencil/core";

@Component({
  tag: "rs-data-table",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTable {
  @Element() el: HTMLElement;

  @Prop() fixed: boolean;

  dataTableBody: Element

  dataTableHeader: Element

  @Watch("fixed")
  fixedHandler() {
    this.isFixed();
  }

  @Method()
  async isFixed() {
    if (this.fixed) {
      this.dataTableBody.setAttribute(
        "style",
        "display: block; overflow: scroll;"
      );
      this.dataTableHeader.setAttribute(
        "style",
        "display: block;"
      );
    } else {
      this.dataTableBody.setAttribute(
        "style",
        "display: inherit; overflow: auto;"
      );
    }
  }

  componentDidLoad() {
    const slot = this.el.shadowRoot.querySelector("slot");
    
    slot.addEventListener("slotchange", () => {
      const children = Array.from(slot.assignedElements());
      this.dataTableHeader = children.find(child => child.tagName === 'RS-DATA-TABLE-HEADER')
      this.dataTableBody = children.find(child => child.tagName === 'RS-DATA-TABLE-BODY')

      // adjust cell width to most long width
      const cells = children.map(child => {
        const childSlot = child.shadowRoot.querySelector("slot");
        const rows = Array.from(childSlot.assignedElements());

        return rows.map(row => {
          const rowSlot = row.shadowRoot.querySelector("slot");
          return Array.from(
            rowSlot
              .assignedElements()
              .filter(e => e.tagName === "RS-DATA-TABLE-CELL")
          );
        });
      });
      const flatCells = cells[0].concat(cells[1]);

      const cellsWidth = children.map(child => {
        const childSlot = child.shadowRoot.querySelector("slot");
        const rows = Array.from(childSlot.assignedElements());

        return rows.map(row => {
          const rowSlot = row.shadowRoot.querySelector("slot");
          const cells = Array.from(
            rowSlot
              .assignedElements()
              .filter(e => e.tagName === "RS-DATA-TABLE-CELL")
          );
          return cells.map(cell => cell.getBoundingClientRect().width);
        });
      });
      const flatCellsWidth = cellsWidth[0].concat(cellsWidth[1]);


      const verticalCells = [];
      for (let i = 0; i < flatCells.length; i++) {
        const arr = [];
        for (let n = 0; n < flatCells.length; n++) {
          if (flatCells[n]) {
            arr.push(flatCells[n][i]);
          }
        }
        verticalCells.push(arr);
      }

      const verticalCellsWidth = [];
      for (let i = 0; i < flatCellsWidth.length; i++) {
        const arr = [];
        for (let n = 0; n < flatCellsWidth.length; n++) {
          if (flatCellsWidth[n] && !isNaN(n)) {
            arr.push(flatCellsWidth[n][i]);
          }
        }
        verticalCellsWidth.push(arr);
        const maxWidth = Math.max.apply(null, arr);
        verticalCells[i].forEach(cell => {
          if (cell) {
            const checkboxes = Array.from(
              cell.shadowRoot.querySelector("slot").assignedElements()
            );
            if (checkboxes.length === 0) {
              cell.style.width = `${maxWidth}px`;
            }
          }
        });
      }
      this.isFixed();
    });
  }

  render() {
    return (
      <Host>
        <div class="rs-data-table">
          <table class="table" aria-label="Dessert calories">
            <slot />
          </table>
        </div>
      </Host>
    );
  }
}
