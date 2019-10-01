/* eslint-disable vue/use-v-on-exact */
const fs = require('fs')
const { ripples, dirPath } = require('./constants')

const getComponentStyleFileName = () => {
  return fs.readdirSync(`${dirPath}`, 'utf8').filter(file => file.match(/^(?!_)^(?!mixins).*.scss/g))[0]
}

const getComponentStyleFile = () => {
  const fileName = getComponentStyleFileName()
  return fs.readFileSync(`${dirPath}/${fileName}`, 'utf8')
}

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8')
}

const readDir = (dirPath) => {
  return fs.readdirSync(dirPath, 'utf8')
}

const extractMatchWords = (text, searchFormat) => {
  return text.match(searchFormat)
}

const extractDefaultThemeVariables = (nodeModulesPath) => {
  const themeFile = readFile(`${nodeModulesPath}/@rsmdc/theme/_variables.scss`)
  return extractMatchWords(themeFile, /\$rs-theme.*(?=:)/g)
}

const extractComponentVariableFiles = () => {
  return readDir(dirPath).filter(file => extractMatchWords(file, /variable/g))
}

const extractComponentThemeVariables = () => {
  const files = extractComponentVariableFiles()
  const variableFilesTexts = files.map(file => readFile(`${dirPath}/${file}`))
  const themeVariables = variableFilesTexts.reduce((result, text) => {
    const variables = extractMatchWords(text, /(.*?)rs-theme(.*?);/g)
    if (variables) {
      variables.forEach((part, i) => {
        variables[i] = part.replace(/:(.*?);/g, '')
      })
      return result.concat(variables)
    }
  }, [])
  return themeVariables
}

const extractVariables = (nodeModulesPath) => {
  const defaultThemeVariables = extractDefaultThemeVariables(nodeModulesPath)
  const componentThemeVariables = extractComponentThemeVariables()

  return defaultThemeVariables.concat(componentThemeVariables)
}

const excludeThemeVariablesInScss = (sourceScss, variables) => {
  variables.forEach(variable => {
    const regExp = new RegExp(`\\${variable}`, 'g')
    sourceScss = sourceScss.replace(regExp, `'${variable}'`)
  })
  return sourceScss
}

const replaceCssInnerRippleValue = (css, target, value) => {
  const regExp = new RegExp(`var\\(${target}\\)`, 'g')
  return css.replace(regExp, value)
}

const escapeVariableValue = (value) => {
  if (value.match(/'\*'|"\*"/)) {
    return value
  }
  
  if (value.match(/'\$/) || value.match(/"/)) {
    return value.replace(/'|"/, '#{').replace(/'|"/, '}').replace('#{}', '""')
  }
  return value
}

module.exports.styleScss = (nodeModulesPath) => {
  const sourceScss = getComponentStyleFile()
  const themeVariables = extractVariables(nodeModulesPath)

  return excludeThemeVariablesInScss(sourceScss, themeVariables)
}

module.exports.generateStyle = (sourceCss, styles, hostStyles) => {
  const files = extractComponentVariableFiles()
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
    value = escapeVariableValue(value)
    if (value.match(/calc\(/) && files.length > 0) {
      const componentVariables = files.map(file => readFile(`${dirPath}/${file}`))[0].match(/\$.*(?=:)/g)

      componentVariables.forEach(variable => {
        let regExp = new RegExp(`\\${variable}`, 'g')
        value = value.replace(regExp, `#{${variable}}`)

        regExp = new RegExp(`#{#{\\${variable}}}`, 'g')
        value = value.replace(regExp, `#{${variable}}`)
      })
    }
    result = `${result}\n ${prop}: ${value};`
    return result
  }, '')

  let clientStyle = `:root {\n${style}\n}`

  // Define host style
  if (hostStyles.length > 0) {
    hostStyles.forEach(([selector, styleData]) => {

      const text = Object.entries(styleData.attributes)
        .reduce((result, [prop, value]) => {
          if (prop.match(/^--.*?/g) && value.match(/\$.*?/g)) {
            value = `#{${value.replace(/'/g, '')}}`
          }
          return `${result}${prop}: ${value}; `
        }, '')
      
      clientStyle = `${clientStyle}\n${selector} { ${text}}`
    })
  }

  // Add visibility
  let componentsPath = './src/components/'
  const componentName = readDir(componentsPath)[0]
  const componentFiles = readDir(`${componentsPath}${componentName}`)
    .filter(file => file.match(/\.tsx/))
  
  componentFiles.forEach(file => {
    let elementName = file.replace(/\.tsx/, '')
    if (!elementName.match(/rs-/)) {
      elementName = `rs-${elementName}`
    }

    clientStyle = `${clientStyle}\n${elementName} { visibility: visible; }`
  })

  if (!fs.existsSync('./src/dist')) {
    fs.mkdirSync('./src/dist')
  }
  fs.writeFileSync(`./src/dist/result.css`, css)
  fs.writeFileSync(`./src/dist/client-style.scss`, clientStyle)
}