/* eslint-disable vue/use-v-on-exact */
const sass = require('node-sass')
const fs = require('fs')
const CSSJSON = require('cssjson')
const CSSwhat = require('css-what')
const { flattenDeep } = require('lodash')
const { replaceWords, ripples, dirPath } = require('./constants')
const { styleScss, generateStyle } = require('./style')
const { mixinSelectorsScss, generateClientMixin } = require('./mixin')

const getCompileCss = (dirPath, nodeModulesPath, targetScss) => {
  const copyFile = `${dirPath}/copy.scss`
  fs.writeFileSync(copyFile, targetScss)
  const res = sass.renderSync({
    file: copyFile,
    sourceMap: true,
    outFile: './nested.css',
    outputStyle: 'nested',
    includePaths: [nodeModulesPath]
  })
  fs.unlinkSync(copyFile)
  return res.css.toString()
}

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

const replaceAttrToCustomProp = (json, selector) => {
  try {
    const cssProperties = Object.keys(json.attributes)
    const parseSelectors = flattenDeep(CSSwhat.parse(selector))
    const customPropHeader = createCustomPropertyHeader(json, parseSelectors)

    json.attributes = createCustomProperties(cssProperties, customPropHeader)
    json.parseSelectors = parseSelectors
  } catch(e) {
    Object.keys(json.children).forEach(child => {
      json.children[child].parent = selector
    })
    json.selectorName = selector
    json.parseSelectors = ''
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

const mappingSelectors = (customPropJson, sourceJson) => {
  const styles = []
  Object.keys(customPropJson.children).forEach(selector => {
    const cJsonAttrs = Object.values(customPropJson.children[selector].attributes)
    const sJsonAttrs = Object.entries(sourceJson.children[selector].attributes)
    const style = {}
    cJsonAttrs.forEach((attr, i) => {
      const prop = attr.replace(/var\(|\)/g, '')
      const value = sJsonAttrs[i][1].replace(/^'/, '#{').replace(/'/, '}')
      style[sJsonAttrs[i][0]] = `${prop}: ${value};`
    })
    styles.push(style)
  })
  return styles
}


// generate styles
module.exports.convertStyle = (fileName, nodeModulesPath) => {
  const scss = styleScss(fileName)
  const compileCss = getCompileCss(dirPath, nodeModulesPath, scss)
    .replace(/(\/\*(.*?)')|('(.*?)\*\/)/g, '')

  const sourceJson = CSSJSON.toJSON(compileCss)
  const customPropJson= CSSJSON.toJSON(compileCss)

  const css = replaceSassVariablesCss(customPropJson)
  const styles = convertPropToCustomProp(customPropJson, sourceJson)

  generateStyle(css, styles)
}


// generate client mixin 
module.exports.convertMixin = (nodeModulesPath) => {
  const parseMixinScss = mixinSelectorsScss()
  const convertCss = getCompileCss(dirPath, nodeModulesPath, parseMixinScss)

  const sj = CSSJSON.toJSON(convertCss)
  const cj = CSSJSON.toJSON(convertCss)

  Object.keys(cj.children).forEach(selectorName => {
    const children = cj.children[selectorName]
    replaceAttrToCustomProp(children, selectorName)
  })

  generateClientMixin(mappingSelectors(cj, sj))
}
