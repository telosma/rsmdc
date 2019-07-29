export const VModel3 =  {
  bind(el, binding, vNode) {
    let observer
    const type = vNode.data.attrs.type
    const value = vNode.data.attrs.value
    const dataName = binding.expression

    if (type === 'checkbox') {
      observer = new MutationObserver(() => {
        let dataSet = binding.value
        const isChecked = el.getAttribute('data-checked') ? true : false
        if (typeof binding.value === 'boolean') {
          vNode.context[dataName] = isChecked
        } else if (typeof binding.value === 'string') {
          vNode.context[dataName] = isChecked ? value : ''
        } else {
          const index = dataSet.findIndex(el => el === value)
          
          if (isChecked) {
            dataSet.push(value)
          } else if (index > -1 && !isChecked) {
            dataSet.splice(index, 1)
          }
        }
      })
    } else if (type === 'radio') {
      observer = new MutationObserver(() => {
        const isChecked = el.getAttribute('data-checked') === 'true' ? true : false
        if (!isChecked) { return }

        vNode.context[dataName] = value
      })
    } else if (type === 'select') {
      observer = new MutationObserver(mutations => {
        const mutation = mutations.filter(mu => mu.target.getAttribute('data-selected'))[0]
        if (!mutation) { return }
        
        vNode.context[dataName] = mutation.target.value
      })
    } else if (type === 'text' || type === 'textarea' || type === 'date') {
      observer = new MutationObserver(mutations => {
        const text = mutations[0].target.text
        vNode.context[dataName] = text
      })
    } 

    observer.observe(el, {
      attributes: true,
      subtree: true
    })
  }
}