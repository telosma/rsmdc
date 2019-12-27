import { Component, Host, h, Element, Method } from '@stencil/core'

@Component({
  tag: 'rs-image-list-label',
  styleUrl: '../../dist/result.css',
  shadow: true
})

export class ImageListLabel{

  @Element() el: Element

  imageListLabel: HTMLElement

  @Method()
  async wrap(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element)
    wrapper.appendChild(element)
  }

  componentDidLoad() {
    this.imageListLabel = this.el.shadowRoot.querySelector('.rs-image-list-label')

    const slot = this.el.shadowRoot.querySelector('slot')
    
    const textParent = document.createElement('span')
    textParent.classList.add('text')
    
    const texts = slot.assignedNodes().filter(node => node.nodeType === 3)
    texts.forEach(text => {
      this.wrap(text, textParent)
    })
  }

  render() {
    return  <Host>
              <div class="rs-image-list-label">
                <slot />
              </div>
            </Host>
  }
}
