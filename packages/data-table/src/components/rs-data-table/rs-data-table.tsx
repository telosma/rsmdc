import { Component, Element, Host, h } from "@stencil/core";

@Component({
  tag: "rs-data-table",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTable {
  @Element() el: HTMLElement;

  dataTable: HTMLElement;


  componentDidLoad() {
    this.dataTable = this.el.shadowRoot.querySelector('.rs-data-table')
    const slot = this.el.shadowRoot.querySelector('slot')

    slot.addEventListener('slotchange', () => {
      const children = Array.from(slot.assignedElements())
      const cellsWitdh = children.map(child => {
        const childSlot = child.shadowRoot.querySelector('slot')
        const rows = Array.from(childSlot.assignedElements())

        return rows.map(row => {
          const rowSlot = row.shadowRoot.querySelector('slot')
          const cells = Array.from(rowSlot.assignedElements().filter(e => e.tagName === 'RS-DATA-TABLE-CELL'))
          return cells.map(cell => cell.getBoundingClientRect().width)
        })
      })

      const cells = children.map(child => {
        const childSlot = child.shadowRoot.querySelector('slot')
        const rows = Array.from(childSlot.assignedElements())

        return rows.map(row => {
          const rowSlot = row.shadowRoot.querySelector('slot')
          return Array.from(rowSlot.assignedElements().filter(e => e.tagName === 'RS-DATA-TABLE-CELL'))
        })
      })

      const flatCells = cells[0].concat(cells[1])
      const b = []
      for (let i = 0; i < flatCells[0].length; i++) {
        const arr = []
        for (let n = 0; n < flatCells[0].length; n++) {
          if (flatCells[n]) {
            arr.push(flatCells[n][i])
          }
        }
        b.push(arr)
      }
      console.log(b)

      const flatCellsWidth = cellsWitdh[0].concat(cellsWitdh[1])
      console.log(flatCellsWidth)
      const a = []
      for (let i = 0; i < flatCellsWidth[0].length; i++) {
        const arr = []
        for (let n = 0; n < flatCellsWidth[0].length; n++) {
          if (flatCellsWidth[n] && !isNaN(n)) {
            arr.push(flatCellsWidth[n][i])
          }
        }
        a.push(arr)
        const maxWidth = Math.max.apply(null, arr)
        b[i].forEach(cell => {
          cell.style.width = `${maxWidth}px`
        })
      }
      console.log(a) 
      
    })
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
