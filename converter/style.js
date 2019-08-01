/* eslint-disable vue/use-v-on-exact */
const fs = require('fs')
const { flattenDeep } = require('lodash')
const { ripples, dirPath } = require('./constants')

const getComponentStyleFileName = () => {
  return fs.readdirSync(`${dirPath}`, 'utf8').filter(file => file.match(/^(?!_)^(?!mixins).*.scss/g))[0]
}

const getComponentStyleFile = () => {
  const fileName = getComponentStyleFileName()
  return fs.readFileSync(`${dirPath}/${fileName}`, 'utf8')
}

const getThemeVariables = (files) => {
  const variableFilesTexts = files.map(file => fs.readFileSync(`${dirPath}/${file}`, 'utf8'))
  const themeVariables = variableFilesTexts.map(text => {
    const themeVariableParts = text.match(/(.*?)rs-theme-prop(.*?);/g)
    const themeVariables = themeVariableParts ? themeVariableParts.map(part => part.replace(/:(.*?);/g, '')) : ''
    return themeVariables
  })
    .filter(value => value)

  return flattenDeep(themeVariables)
}

const replaceCssInnerRippleValue = (css, target, value) => {
  const regExp = new RegExp(`var\\(${target}\\)`, 'g')
  return css.replace(regExp, value)
}


module.exports.styleScss = () => {
  const sourceScss = getComponentStyleFile()
  const variableFiles = fs.readdirSync(dirPath, 'utf8').filter(file => file.match(/variable/))
  const themeVariables = getThemeVariables(variableFiles)

  let scss = sourceScss
  themeVariables.forEach(variable => {
    const regExp = new RegExp(`\\${variable}`, 'g')
    scss = scss.replace(regExp, `'${variable}'`)
  })

  return scss
}

module.exports.generateStyle = (sourceCss, styles) => {
  const fileName = getComponentStyleFileName()
  let css = sourceCss

  const style = Object.entries(styles).reduce((result, [prop, value]) => {
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
  const clientStyle = `:root {\n${style}\n}`
  fs.writeFileSync(`${dirPath}/result.css`, css)
  fs.writeFileSync(`./src/client-${fileName}`, clientStyle)
}