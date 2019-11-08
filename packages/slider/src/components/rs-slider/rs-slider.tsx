import { Component, Prop, Host, Element, Event, EventEmitter, Watch, Method, h } from "@stencil/core";
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

  @Prop({
    mutable: true
  }) now: number = 0

  @Prop() countable: boolean

  @Prop() marked: boolean

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

  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

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
    } addEventListener
  }

  componentDidLoad() {
    this.slider = this.el.shadowRoot.querySelector(".rs-slider")
    this.isMarked();
    this.isCountable();
    this.rsSlider = new RSSlider(this.slider);
    this.isDisabled();
  }

  render() {
    return <Host>
            <div
              class="rs-slider"
              tabindex="0"
              role="slider"
              aria-valuemin={this.min}
              aria-valuemax={this.max}
              aria-valuenow={this.now}
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
  }
}
