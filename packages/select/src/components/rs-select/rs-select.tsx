import { Component, Element, Watch, Event, EventEmitter, Prop, h } from '@stencil/core'
import {MDCSelect} from '@material/select'

@Component({
  tag: 'rs-select',
  styleUrl: 'rs-select.scss',
  shadow: true
})
export class RsSelect {

  @Element() el: HTMLElement

  @Prop() name: string

  @Prop() value: string

  @Prop() label: string

  @Prop() disabled: boolean;

  selectedIndex: number = 0

  styleType: string = 'filled'
  
  @Event({
    cancelable: false,
    composed: false,
  }) change: EventEmitter

  @Watch('disabled')
  watchHandler(disabled: boolean) {
    const selectElm = this.el.shadowRoot.querySelector('.mdc-select')
    if (disabled) {
      selectElm.classList.add('mdc-select--disabled')
    } else {
      selectElm.classList.remove('mdc-select--disabled')
    }
  }

  mdcSelect: MDCSelect

  componentDidLoad() {
    const selectElm = this.el.shadowRoot.querySelector('.mdc-select')
    const nativeSelectElm = this.el.shadowRoot.querySelector('.mdc-select__native-control')
    const slotElm = this.el.shadowRoot.querySelector('slot')

    slotElm.addEventListener('slotchange', () => {
      nativeSelectElm.innerHTML = ''
      slotElm.assignedElements().forEach(e => {
        nativeSelectElm.append(e.cloneNode(true))
      })
      this.mdcSelect.value = this.value
    })

    this.mdcSelect = new MDCSelect(selectElm)
    this.mdcSelect.listen('MDCSelect:change', () => {
      this.selectedIndex = this.mdcSelect.selectedIndex
      this.value = this.mdcSelect.value
      this.change.emit({ value: this.value, index: this.selectedIndex})
    })

    const style = window.getComputedStyle(this.el)
    this.styleType = style.getPropertyValue('--rs-select-type').trim() || 'filled'
    if (this.styleType === 'outlined') {
      selectElm.classList.add('mdc-select--outlined')
    } else {
      selectElm.classList.remove('mdc-select--outlined')
    }

    if (this.disabled) {
      selectElm.classList.add('mdc-select--disabled')
    } else {
      selectElm.classList.remove('mdc-select--disabled')
    }
  }

  render() {
    return <div class="mdc-select">
            <i class="mdc-select__dropdown-icon"></i>
            <select class="mdc-select__native-control">
            </select>

            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label class="mdc-floating-label">{this.label}</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>

            <label class="mdc-floating-label">{this.label}</label>
            <div class="mdc-line-ripple"></div>

            <slot />
          </div>
  }
}
