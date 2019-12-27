const makeFunc = (type, value) => {
  return (e, dataName, vnode, el) => {
    if (type === 'checkbox') {
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
    } else {
      typeof dataName === 'object'
        ? vnode.context[dataName[0]][dataName[1]] = e.detail.value
        : vnode.context[dataName] = e.detail.value
    }
  }
}

export const VModel3 = {
  bind(el, binding, vNode) {
    const type = vNode.data.attrs.type
    const value = vNode.data.attrs.value
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

    if (!vNode.data.on || !vNode.data.on.input) {
      el.addEventListener('input', e => {
        func(e, dataName, vNode, el)
      })      
    } else {
      const inputEvent = vNode.data.on.input.fns
      vNode.data.on.input.fns = e => {
        func(e, dataName, vNode, el)
        inputEvent(e)
      }
    }
  },
  componentUpdated(el, binding, vNode) {
    const value = vNode.data.attrs.value
    const type = vNode.data.attrs.type
    const dataName = binding.expression.match(/\..*?[a-z|A-Z].*?(?=\.|$)/g)
      ? binding.expression.split('.')
      : binding.expression
    const func = makeFunc(type, value)

    if (!vNode.data.on) return

    if (vNode.data.on.change) {
      const changeEvent = vNode.data.on.change.fns
      vNode.data.on.change.fns = e => {
        func(e, dataName, vNode, el)
        changeEvent(e)
      }
    }
    if (vNode.data.on.input) {
      const inputEvent = vNode.data.on.input.fns
      vNode.data.on.input.fns = e => {
        if (typeof e.detail === 'number') return

        func(e, dataName, vNode, el)
        inputEvent(e)
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

    if (!vNode.data.on || !vNode.data.on.change) {
      el.removeEventListener('change', e => {
        func(e, dataName, vNode, el)
      })  
    }

    if (!vNode.data.on || !vNode.data.on.input) {
      el.removeEventListener('input', e => {
        func(e, dataName, vNode, el)
      })  
    }
  }
}