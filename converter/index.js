const { convertStyle, convertMixin } = require('./convert')

const nodeModulesPath = process.mainModule.paths.filter(path => path.match('rsmdc/node_modules'))[0]

convertStyle(nodeModulesPath)
convertMixin(nodeModulesPath)