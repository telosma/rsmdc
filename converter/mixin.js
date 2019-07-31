/* eslint-disable vue/use-v-on-exact */
const fs = require('fs')

const getMixinFile = (dirPath) => {
  const fileName = fs.readdirSync(`${dirPath}/src/styles`, 'utf8').filter(file => file.match(/mixins/g))[0]
  return fs.readFileSync(`${dirPath}/src/styles/${fileName}`, 'utf8')
}

const replaceSourceScss = (text) => {
  return text.replace(/@import(.*?);/g, '').replace(/\s\s/g, '')
}

const getSelectorsInMixin = (scssText) => {
  const selectors = scssText.match(/(\.).*?}\s/g)
  return getReplaceMixinSelectors(selectors)
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

const getSelectorsScss = (selectors) => {
  let text = selectors.reduce((res, selector) => {
    res = `${res}\n${selector}`
    return res
  }, '')
  const sassVariables = text.match(/\$.*?(?=;)/g, '')
    .filter((variable, i, self) => {
      return self.indexOf(variable) === i
    })

  sassVariables.forEach(variable => {
    const regExp = new RegExp(`\\${variable}`, 'g')
    text = text.replace(regExp, `'${variable}'`)
  })

  return text
}


module.exports.mixinSelectorsScss = (dirPath) => {
  const sourceScss = getMixinFile(dirPath)
  const replaceScss = replaceSourceScss(sourceScss)
  const mixinSelectors = getSelectorsInMixin(replaceScss)

  const scss = getSelectorsScss(mixinSelectors)
  return scss
}

module.exports.generateClientMixin = (replaceValues, dirPath) => {
  const sourceScss = getMixinFile(dirPath)
  const replaceScss = replaceSourceScss(sourceScss)
  const mixinSelectors = getSelectorsInMixin(replaceScss)
  const importFiles = sourceScss.match(/@import(.*?);/g)

  let scss = replaceScss
  let values = replaceValues
  mixinSelectors.forEach(selector => {
    let word = ''
    const insertValueslength = selector.match(/{.*?(}|;>|;&|;\+|;~)/g).length
    for(let i = 0; i < insertValueslength; i++) {
      word = Object.values(values[i])
        .reduce((res, val) => {
          return res = `${res}${val}\n`
        }, word)
    }
    values = values.slice(insertValueslength)
    scss = scss.replace(selector, word)
  })

  const files = importFiles.reduce((res, file) => {
    const value = file.replace('./', './styles/')
    return res = `${res}${value}\n`
  },'')

  scss = files + scss
  fs.writeFileSync(`${dirPath}/src/mixins.scss`, scss)
}