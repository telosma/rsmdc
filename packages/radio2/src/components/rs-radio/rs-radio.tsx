import { Component, Prop, Host, h } from "@stencil/core";

@Component({
  tag: "rs-radio",
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class Radio {
  @Prop() id: string;

  @Prop() label: string;

  render() {
    return (
      <Host>
        <div class="rs-radio">
          <div class="container">
            <input class="nativecontrol" type="radio" />
            <div class="background">
              <div class="outercircle" />
              <div class="innercircle" />
            </div>
          </div>
          <label class="label" htmlFor={this.id}>
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
