const commander = require('commander')
const { convertStyle, convertMixin } = require('./convert')

const nodeModulesPath = process.mainModule.paths.filter(path => path.match('rsmdc/node_modules'))[0]
const styleFileName = commander.parse(process.argv).args[0]

convertStyle(styleFileName, nodeModulesPath)
convertMixin(nodeModulesPath)