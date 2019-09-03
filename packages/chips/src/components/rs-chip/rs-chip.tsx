import { Component, Element, Host, h, Prop, Method, Watch } from '@stencil/core'
import { RSChip } from "../../utils/index";

@Component({
  tag: "rs-chip",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Chip {
  @Element() el: Element;

  chip: HTMLElement;

  rsChip: RSChip;

  @Prop() selected: boolean;

  @Prop() shaped: boolean;

  @Watch("selected")
  selectedHandler() {
    this.isSelected();
  }

  @Watch("shaped")
  shapedHandler() {
    this.isShaped();
  }

  @Method()
  async isSelected() {
    if (this.selected) {
      this.chip.classList.add("-selected");
    } else {
      this.chip.classList.remove("-selected");
    }
  }

  @Method()
  async isShaped() {
    if (this.shaped) {
      this.chip.classList.add("-shaped");
    } else {
      this.chip.classList.remove("-shaped");
    }
  }

  @Method()
  async activateRipple() {
    this.rsChip.ripple.activate();
    setTimeout(() => {
      // TODO
      this.rsChip.ripple.deactivate();
    }, 200);
  }

  componentDidLoad() {
    this.chip = this.el.shadowRoot.querySelector(".rs-chip");
    this.rsChip = new RSChip(this.chip);

    this.isSelected();
    this.isShaped();
    
    this.el.shadowRoot
      .querySelector(".rs-chip")
      .addEventListener("click", () => {
        this.activateRipple();
      });

  }

  render() {
    return (
      <Host>
        <button class="rs-chip">
          <span class="label">
            <slot />
          </span>
        </button>
      </Host>
    );
  }
}
