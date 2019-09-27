export const VModel3 = {
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
          if (index > -1 && isChecked) {
            return
          } else if (index > -1 && !isChecked) {
            dataSet.splice(index, 1)
          } else if (isChecked) {
            dataSet.push(value)
          }
        }
      })

      observer.observe(el, {
        attributes: true,
        subtree: true
      })  
    } else if (type === 'radio') {
      observer = new MutationObserver(() => {
        const isChecked = el.getAttribute('data-checked') ? true : false
        if (!isChecked) { return }
        vNode.context[dataName] = value
      })

      observer.observe(el, {
        attributes: true,
        subtree: true
      })  
    } else if (type === 'select') {
      const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
        ? binding.expression.split('.')
        : binding.expression

      const func = e => {
        typeof dataName === 'object'
          ? vNode.context[dataName[0]][dataName[1]] = e.detail.value
          : vNode.context[dataName] = e.detail.value
      }

      if (!vNode.data.on || !vNode.data.on.change) {
        el.addEventListener('change', e => {
          func(e)
        })

      } else {
        const changeEvent = vNode.data.on.change.fns
        vNode.data.on.change.fns = e => {
          func(e)
          changeEvent(e)
        }
      }
      return
    } else if (type === 'text' || type === 'textarea' || type === 'date') {
      observer = new MutationObserver(mutations => {
        const text = mutations[0].target.text
        const dataNames = dataName.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
        const objectName = dataName.replace(/\..*/, '')

        if (dataNames || objectName !== dataName) {
          const data = dataNames[0].replace(/\./, '')

          vNode.context.$data[objectName][data] = text
        } else {
          vNode.context[dataName] = text
        }
      })

      observer.observe(el, {
        attributes: true,
        subtree: true
      })
    } 
  },
  componentUpdated(el, binding, vNode) {
    const type = vNode.data.attrs.type
    const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
      ? binding.expression.split('.')
      : binding.expression

    if (type === 'select') {
      const func = e => {
        typeof dataName === 'object'
          ? vNode.context[dataName[0]][dataName[1]] = e.detail.value
          : vNode.context[dataName] = e.detail.value
      }
    
      if (!vNode.data.on || !vNode.data.on.change) return

      const changeEvent = vNode.data.on.change.fns
      vNode.data.on.change.fns = e => {
        func(e)
        changeEvent(e)
      }
    }
  },
  unbind(el, binding, vNode) {
    const type = vNode.data.attrs.type
    const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
      ? binding.expression.split('.')
      : binding.expression

    if (type === 'select') {
      const func = e => {
        typeof dataName === 'object'
          ? vNode.context[dataName[0]][dataName[1]] = e.detail.value
          : vNode.context[dataName] = e.detail.value
      }

      if (vNode.data.on && vNode.data.on.change) return

      el.removeEventListener('change', e => {
        func(e)
      })
    }
  }
}