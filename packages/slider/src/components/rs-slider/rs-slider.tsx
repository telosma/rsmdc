import { Component, Prop, Host, Element, Watch, Method, State, h } from "@stencil/core";
import { RSSlider } from "../../utils/index";

@Component({
  tag: "rs-slider",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Slider {
  @Element() el: HTMLElement

  @Prop() disabled: boolean

  @Prop() min: number = 0

  @Prop() max: number = 50

  @Prop() now: number = 0

  @Prop() countable: boolean

  @Prop() marked: boolean

  @State() count: number

  rsSlider: RSSlider;

  slider: Element;

  @Watch("countable")
  countableHandler() {
    this.isCountable()
  }

  @Watch("disabled")
  disabledHandler() {
    this.isDisabled()
  }

  @Watch("marked")
  markedHandler() {
    this.isMarked()
  }

  @Method()
  async isCountable() {
    if (this.countable) {
      this.slider.classList.add("-discrete")
    } else {
      this.slider.classList.remove("-discrete")
    }
  }

  @Method()
  async isDisabled() {
    if (this.disabled) {
      this.slider.classList.add("-disabled")
    } else {
      this.slider.classList.remove("-disabled")
    }
  }

  @Method()
  async isMarked() {
    if (this.marked) {
      this.slider.classList.add("-display-markers")
    } else {
      this.slider.classList.remove("-display-markers")
    }
  }

  componentDidLoad() {
    this.slider = this.el.shadowRoot.querySelector(".rs-slider")

    this.isDisabled();
    this.isCountable();
    this.isMarked();

    this.rsSlider = new RSSlider(this.slider);

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (
          record.attributeName === "class" &&
          !this.el.classList.contains("hydrated")
        ) {
          this.el.classList.add("hydrated")
        }
      })
    })
    observer.observe(this.el, {
      attributes: true
    })
  }

  render() {
    return (
      <Host>
        <div
          class="rs-slider"
          tabindex="0"
          role="slider"
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          aria-valuenow={this.now}
          aria-label="Select Value"
        >
          <div class="trackcontainer">
            <div class="track" />
            <div class="trackmarkercontainer" />
          </div>
          <div class="thumbcontainer">
            <div class="pin">
              <span class="pinvaluemarker" />
            </div>
            <svg class="thumb" width="21" height="21">
              <circle cx="10.5" cy="10.5" r="7.875" />
            </svg>
            <div class="focusring" />
          </div>
        </div>
      </Host>
    );
  }
}
