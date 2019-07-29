/* eslint-disable vue/use-v-on-exact */
const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
const CSSJSON = require('cssjson')
const CSSwhat = require('css-what')
const { flattenDeep } = require('lodash')

const replaceWords = {
  tag: 'TA',
  pseudo: 'PS',
  'pseudo-element': 'PE',
  attribute: 'AT',
  universal: 'UN',
  child: 'CH',
  parent: 'PA',
  sibling: 'SI',
  adjacent: 'AD',
  descendant: 'DE'
}

const ripples = ['--rs-ripple-fg-size', '--rs-ripple-left', '--rs-ripple-top', '--rs-ripple-fg-scale', '--rs-ripple-fg-translate-end', '--rs-ripple-fg-translate-start']

const sourceScss = fs.readFileSync('./packages/checkbox-test/src/styles/checkbox.scss', 'utf8')
const variableFiles = fs.readdirSync('./packages/checkbox-test/src/styles', 'utf8')
  .filter(file => file.match(/variable/))
const variableFilesTexts = variableFiles.map(file => fs.readFileSync(`./packages/checkbox-test/src/styles/${file}`, 'utf8'))
const getThemeVariables = (fileTexts) => {
  const themeVariables = fileTexts.map(text => {
    const themeVariableParts = text.match(/(.*?)rs-theme-prop(.*?);/g)
    const themeVariables = themeVariableParts ? themeVariableParts.map(part => part.replace(/:(.*?);/g, '')) : ''
    return themeVariables
  })
    .filter(value => value)

  return flattenDeep(themeVariables)
}

const themeVariables = getThemeVariables(variableFilesTexts)

let copyScss = sourceScss
themeVariables.forEach(variable => {
  const regExp = new RegExp(`\\${variable}`, 'g')
  copyScss = copyScss.replace(regExp, `'${variable}'`)
})

fs.writeFileSync('./packages/checkbox-test/src/styles/copy.scss', copyScss)


const result = sass.renderSync({
  file: './packages/checkbox-test/src/styles/copy.scss',
  sourceMap: true,
  outFile: './nested.css',
  outputStyle: 'nested',
  includePaths: [path.resolve(__dirname, 'node_modules')]
})

fs.unlinkSync('./packages/checkbox-test/src/styles/copy.scss')


const compileCss = result.css.toString()
  .replace(/(\/\*(.*?)')|('(.*?)\*\/)/g, '')

const sourceJson = CSSJSON.toJSON(compileCss)
const customPropJson= CSSJSON.toJSON(compileCss)

const getCssRule = (cssToJson) => {
  if(!cssToJson.parent) { return }
  const cssRuleName = cssToJson.parent.match(/(?<=@)(.*?)(?= )/g)[0]
  return cssRuleName
}

const createCustomPropertyHeader = (cssToJson, selectors) => {
  const prefix = getCssRule(cssToJson) ? `--${getCssRule(cssToJson)}--` : '--'

  return selectors.reduce((customPropName, parseSelector) => {
    const type = parseSelector.type

    if(type === 'attribute') {
      customPropName = parseSelector.name !== 'class' ? `${customPropName}N${parseSelector.name}V${parseSelector.value}` : `${customPropName}${parseSelector.value}`

    } else if (type === 'pseudo-element' || type === 'tag') {
      customPropName = `${customPropName}${replaceWords[type]}${parseSelector.name}`

    } else if (type === 'pseudo') {
      let data = parseSelector.data ? parseSelector.data : ''
      if (typeof data === 'object') {
        data = `V${flattenDeep(parseSelector.data)[0].value}`
      }
      customPropName = `${customPropName}${replaceWords[type]}${parseSelector.name}${data}`

    } else if (type === 'universal' || type === 'child' || type ==='parent' || type ==='sibling' || type === 'adjacent' || type === 'descendant') {
      customPropName = `${customPropName}${replaceWords[type]}`

    }
    return customPropName
  }, prefix)
}

const createCustomProperties = (cssProperties, customPropHeader) => {
  const obj = {}
  cssProperties.forEach(cssProp => {
    const value = ripples.find(ripple => ripple === cssProp) ? `var(${cssProp})` : `var(${customPropHeader}---${cssProp})`
    obj[cssProp] = value
  })
  return obj
}

const replaceAttrToCustomProp = (cssToJson, selector) => {
  try {
    const cssProperties = Object.keys(cssToJson.attributes)
    const parseSelectors = flattenDeep(CSSwhat.parse(selector))
    const customPropHeader = createCustomPropertyHeader(cssToJson, parseSelectors)

    cssToJson.attributes = createCustomProperties(cssProperties, customPropHeader)
    cssToJson.parseSelectors = parseSelectors
  } catch(e) {
    Object.keys(cssToJson.children).forEach(child => {
      cssToJson.children[child].parent = selector
    })
    cssToJson.selectorName = selector
    cssToJson.parseSelectors = ''
  }
}

const replaceSassVariablesCss = (customPropJson) => {
  Object.keys(customPropJson.children).forEach(selectorName => {
    const children = customPropJson.children[selectorName]
    replaceAttrToCustomProp(customPropJson.children[selectorName], selectorName)
    if(children.parseSelectors === '' && selectorName.match(/media/)) {
      Object.keys(children.children).forEach(selector => {
        replaceAttrToCustomProp(children.children[selector], selector)
      })
    }
  })
  return CSSJSON.toCSS(customPropJson)
}

const setStyles = (obj, customPropJson, sourceJson) => {
  const attributes = customPropJson.attributes
  Object.entries(attributes).forEach(([prop, value]) => {
    const customProp = value.replace(/var\(|\)/g, '')
    obj[customProp] = sourceJson.attributes[prop]
  })
}

const convertPropToCustomProp = (customPropJson, sourceJson) => {
  const styles = {}
  Object.keys(customPropJson.children).forEach(selector => {
    const cJson = customPropJson.children[selector]
    const sJson = sourceJson.children[selector]
    setStyles(styles, cJson, sJson)
    if(selector.match(/media/)) {
      Object.keys(cJson.children).forEach(childSelector => {
        setStyles(styles, cJson.children[childSelector], sJson.children[childSelector])  
      })
    }
  })
  return styles
}

const replaceCssInnerRippleValue = (css, target, value) => {
  const regExp = new RegExp(`var\\(${target}\\)`, 'g')
  return css.replace(regExp, value)
}

let css = replaceSassVariablesCss(customPropJson)
const propToCustomProp = convertPropToCustomProp(customPropJson, sourceJson)
const componentName = 'rs-checkbox'

const style = Object.entries(propToCustomProp).reduce((result, [prop, value]) => {
  if(typeof value === 'object') {
    value = value[value.length-1]
  }
  const regExp = new RegExp(`${ripples.toString().replace(/,/g, '|')}`, 'g')
  if(value.match(regExp)) {
    css = replaceCssInnerRippleValue(css, prop, value)
  }

  prop = prop.match(/\$rs-theme/) ? prop.replace(/(.*?)(?=\$)/g, '') : prop
  value = value.match(/'\$/) || value.match(/"/) ? value.replace(/'|"/, '#{').replace(/'|"/, '}').replace('#{}', '""') : value
  result = `${result}\n ${prop}: ${value};`
  return result
}, '')
const mixin = `${componentName} {\n${style}\n}`

fs.writeFileSync('./packages/checkbox-test/src/styles/result.css', css)
fs.writeFileSync(`./packages/checkbox-test/src/mixins.scss`, mixin)