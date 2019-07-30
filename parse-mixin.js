/* eslint-disable vue/use-v-on-exact */
const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
// const converter = require('sass-convert')

const s = /\.([a-z]|[A-Z]).*?}/

const sourceScss = fs.readFileSync('./packages/checkbox-test/src/styles/_rs-mixins.scss', 'utf8')
let copyScss = sourceScss



// copyScss = copyScss.replace(/@import(.*?);/g, '')
//   .replace(/\/\/(.*)/g, '')
//   .replace(/\n/g, '')

copyScss = copyScss.replace(/@import(.*?);/g, '')
  .replace(/\/\/(.*)/g, '')
  .replace(/(@|\$.*:).*/g, '')
  .replace(/\s\s/g, '')
const selectors = copyScss.match(/\..*/g)
selectors.forEach((selector, i) => {
  if(selector.match(/}\s}\s}/)) {
    selectors[i] = selector.replace(/}\s}\s}/, '} }')
  }
  
})

const text = selectors.reduce((res, selector) => {
  res = `${res}\n${selector}`
  return res
}, '')




  // .replace(/}}/g, '')

    // .replace(/\{|\}/g, '')


  
// const contents = copyScss.match(/(\.|>|&|\[).*?}/g)
fs.writeFileSync('./packages/checkbox-test/src/styles/copy.scss', text)
// fs.writeFileSync('./packages/checkbox-test/src/styles/copy.scss', copyScss)


// const result = sass.renderSync({
//   file: './packages/checkbox-test/src/styles/copy.scss',
//   sourceMap: true,
//   outFile: './nested.css',
//   outputStyle: 'nested',
//   includePaths: [path.resolve(__dirname, 'node_modules')]
// })

// fs.writeFileSync('./packages/checkbox-test/src/styles/copy2.scss', result.css.toString())
