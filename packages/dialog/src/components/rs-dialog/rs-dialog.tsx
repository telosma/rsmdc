import {
  Component,
  Element,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Watch,
  Method
} from "@stencil/core";

@Component({
  tag: "rs-dialog",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Dialog {
  @Element() el: Element;

  dialog: HTMLElement;

  dialogTitle: Element;

  dialogContent: Element;

  @Prop() opened: boolean;
  
  @Prop() scrollable: boolean

  @Event({
    cancelable: false,
    composed: false
  })
  change: EventEmitter;

  @Watch("opened")
  openedHandler() {
    this.isOpened();
  }

  @Watch("scrollable")
  scrollableHandler() {
    this.isScrollable()
  }

  @Method()
  async isOpened() {
    if (this.opened) {
      this.dialog.classList.add("-open");

      document.querySelector("body").style.overflow = "hidden";
      this.dialog.style.visibility = "visible";
      this.el.shadowRoot
        .querySelector(".scrim")
        .addEventListener("click", () => {
          // this.change.emit()
        });
      this.el.shadowRoot
        .querySelector(".container")
        .addEventListener("click", () => {
          // this.change.emit()
        });
    } else {
      this.dialog.classList.remove("-open");
      this.dialog.style.visibility = "hidden";
      document.querySelector("body").style.overflow = "auto";
    }
  }

  @Method()
  async isScrollable() {
    const title = document.querySelector('rs-dialog-title')
    const content = document.querySelector('rs-dialog-content')
  
    if (this.scrollable) {
      this.dialog.classList.add('-scrollable')
      if (title) {
        title.setAttribute('scrollable', 'true')
      }
      if (content) {
        title.setAttribute('scrollable', 'true')
      }
    } else {
      this.dialog.classList.remove("-scrollable");
    }
  }

  @Method()
  async wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  componentDidLoad() {
    this.dialog = this.el.shadowRoot.querySelector('.rs-dialog')
    const slot = this.el.shadowRoot.querySelector('slot')

    const buttonParent = document.createElement("div");
    buttonParent.classList.add('buttons')

    const buttons = slot.assignedElements().filter(e => e.tagName === 'RS-BUTTON')
    buttons.forEach(button => {
      this.wrap(button, buttonParent);
    });

    this.isOpened()
    this.isScrollable()
  }

  render() {
    return (
      <Host>
        <div
          class="rs-dialog -scrollable"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content"
        >
          <div class="container">
            <div class="surface">
              <slot />
            </div>
          </div>
          <div class="scrim" />
        </div>
      </Host>
    );
  }
}
