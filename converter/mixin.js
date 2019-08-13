/* eslint-disable vue/use-v-on-exact */
const fs = require('fs')
const { dirPath } = require('./constants')
const { uniq, flattenDeep } = require('lodash')

const getMixinFile = () => {
  const fileName = fs.readdirSync(`${dirPath}`, 'utf8').filter(file => file.match(/^(?!_)mixins/g))[0]
  return fileName ? fs.readFileSync(`${dirPath}/${fileName}`, 'utf8') : ''
}

const getReplaceMixinSelectors = (selectors) => {
  return selectors.map((selector) => {
    const startBraces = selector.match(/{/g)
    const endBraces = selector.match(/}/g)

    if(startBraces.length === endBraces.length) {
      return selector
    }
    return `${selector}}`
  })
}

const excludeImportAndBlank = (text) => {
  return text.replace(/@import(.*?);/g, '').replace(/\s\s/g, '')
}

const extractSelectorsInMixin = (text) => {
  const selectors = text.match(/(\.[a-z|A-Z]|@media).*?;.*?}(}|\s>.*?}|\s.*?})/g)
  return getReplaceMixinSelectors(selectors)
}

const fixSelectorsCorrectFormat = (selectors) => {
  selectors.forEach((selector, i) => {
    selectors[i] = fixCorrectFormat(selector)
  })
}

const fixCorrectFormat = (text) => {
  const startBracesLength = text.match(/{/g).length
  const endBracesLength  = text.match(/}/g).length

  if (startBracesLength > endBracesLength) {
    const diff = startBracesLength - endBracesLength
    const endDrace = '}'.repeat(diff)

    return `${text}${endDrace}`
  } else if (endBracesLength > startBracesLength) {
    const diff = endBracesLength - startBracesLength

    for (let i = 1; i <= diff; i++) {
      const endBracePosition = text.lastIndexOf('}')
      text = text.substring(0, endBracePosition)
    }
    return text
  } else {
    return text
  }
}

const replaceVariablesToString = (text, targets) => {
  targets.forEach(target => {
    const regExp = new RegExp(`\\${target}`, 'g')
    text = text.replace(regExp, `'${target}'`)
  })
  return text
}

const insertImportFilesInScss = (text, files) => {
  const file = files.reduce((res, file) => {
    const value = file.replace('./', '../styles/')
    return res = `${res}${value}\n`
  },'')

  return file + text
}

const extractSassVariables = (text) => {
  const variables = text.match(/\$.*?((?=;)|(?=\)))/g)
  if (variables) {
    variables.forEach((variable, i) => {
      variables[i] = variable.replace(/}|\\|'|"|,|\s/g, '')
        .match(/\$.*?(?=\$|$)/g)
    })
  }
  return uniq(flattenDeep(variables))
}


const createEscapeVariablesScss = (selectors) => {
  fixSelectorsCorrectFormat(selectors)
  selectors.forEach((selector, i) => {
    const sassVariables = extractSassVariables(selector)
    selectors[i] = replaceVariablesToString(selector, sassVariables)
  })
  return selectors
}


module.exports.mixinSelectorsScss = () => {
  const sourceScss = getMixinFile()
  if (!sourceScss) { return }
  const importFiles = sourceScss.match(/@import(.*?);/g)
  const mixinSelectors = extractSelectorsInMixin(excludeImportAndBlank(sourceScss))
  let selectorsScss = createEscapeVariablesScss(mixinSelectors)

  if (importFiles) {
    selectorsScss.forEach((selector, i) => {
      selectorsScss[i] = insertImportFilesInScss(selector, importFiles)
    })
  }
  
  return selectorsScss 
}

module.exports.generateClientMixin = (selectorsStyles) => {
  const sourceScss = getMixinFile()
  if (!sourceScss) { return }
  const importFiles = sourceScss.match(/@import(.*?);/g)
  const replaceScss = excludeImportAndBlank(sourceScss)
  const mixinSelectors = extractSelectorsInMixin(replaceScss)
  fixSelectorsCorrectFormat(mixinSelectors)
  let scss = replaceScss
  mixinSelectors.forEach((selector, i) => {

    let styleText = ''
    for (let n = 0; n < selectorsStyles[i].length; n++) {
      const className = Object.values(selectorsStyles[i][n])[0]
        .replace('--', '')
        .replace(/--.*/, '')
      
      if (className.match(/^host-rs-/)) {
        const text = Object.values(selectorsStyles[i][n])
          .reduce((res, val) => {
            const style = val.replace(/.*---/, '')
            return res = `${res}${style} `
          }, '')

        styleText = `.${className} { ${text} }\n`

      } else {
        styleText = Object.values(selectorsStyles[i][n])
        .reduce((res, val) => {
          return res = `${res}${val}\n`
        }, styleText)

      }
    }
    if (selector.match(/media/)) {
      styleText = selector.replace(/{(.*)}$/, `{${styleText}}`)
    } 
    scss = scss.replace(selector, styleText)
    if (scss.indexOf(styleText) === -1) {
      const endBraces = selector.match(/}+$/g)[0].match(/}/g).join(' ')
      selector = selector.replace(/}+$/g, endBraces)
      scss = scss.replace(selector, styleText)
    }
  })

  if (importFiles) {
    insertImportFilesInScss(scss, importFiles)
  }
  fs.writeFileSync('./src/dist/client-mixins.scss', scss)
}