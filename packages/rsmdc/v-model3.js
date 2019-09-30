const makeFunc = (type, value) => {
  return (e, dataName, vnode, el) => {
    if (type === 'select') {
      typeof dataName === 'object'
        ? vnode.context[dataName[0]][dataName[1]] = e.detail.value
        : vnode.context[dataName] = e.detail.value

    } else if (type === 'checkbox') {
      const vNodeValue = typeof dataName === 'object'
        ? vnode.context[dataName[0]][dataName[1]]
        : vnode.context[dataName]
      const isChecked = el.getAttribute('data-checked') ? true : false
              
      if (typeof vNodeValue === 'object') {
        const index = vNodeValue.findIndex(v => v === value)

        if (index > 1 && isChecked) return

        if (index > -1 && !isChecked) {
          vNodeValue.splice(index, 1)
        } else if (isChecked) {
          vNodeValue.push(value)
        }
      } else {
        typeof dataName === 'object'
          ? vnode.context[dataName[0]][dataName[1]] = e.detail.value
          : vnode.context[dataName] = e.detail.value
      }
    }
  }
}

export const VModel3 = {
  bind(el, binding, vNode) {
    let observer
    const type = vNode.data.attrs.type
    const value = vNode.data.attrs.value
    const dataName = binding.expression

    if (type === 'select' || type === 'checkbox') {
      const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
        ? binding.expression.split('.')
        : binding.expression
      
      const func = makeFunc(type, value)

      if (!vNode.data.on || !vNode.data.on.change) {
        el.addEventListener('change', e => {
          func(e, dataName, vNode, el)
        })
        
      } else {
        const changeEvent = vNode.data.on.change.fns
        vNode.data.on.change.fns = e => {
          func(e, dataName, vNode, el)
          changeEvent(e)
        }
      }
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
    const value = vNode.data.attrs.value
    const type = vNode.data.attrs.type
    const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
      ? binding.expression.split('.')
      : binding.expression
    const func = makeFunc(type, value)

    if (type === 'select' || type === 'checkbox') {
      if (!vNode.data.on || !vNode.data.on.change) return

      const changeEvent = vNode.data.on.change.fns
      vNode.data.on.change.fns = e => {
        func(e, dataName, vNode, el)
        changeEvent(e)
      }
    }
  },
  unbind(el, binding, vNode) {
    const value = vNode.data.attrs.value
    const type = vNode.data.attrs.type
    const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
      ? binding.expression.split('.')
      : binding.expression
    const func = makeFunc(type, value)

    if (type === 'select' || type === 'checkbox') {
      if (vNode.data.on && vNode.data.on.change) return

      el.removeEventListener('change', e => {
        func(e, dataName, vNode, el)
      })
    }
  }
}