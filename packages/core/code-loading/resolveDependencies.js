
const fs = require('fs')
const path = require('path')
const detective = require('detective-cjs')

function resolveDependencies (options, rootPath, depth = 0) {
  depth += 1
  const defaults = { maxDepth: 3, relativeOnly: true }
  options = Object.assign({}, defaults, options)

  if (depth > options.maxDepth) {
    return [rootPath]
  }

  const mainScriptAsText = fs.readFileSync(rootPath, 'utf8')
  const rawDependencies = detective(mainScriptAsText)
  const dependencies = Array.from(new Set(rawDependencies))
  // console.log(`rawDependencies of ${rootPath}`, dependencies)
  // FIXME : shamefully stolen from https://github.com/jkroso/node-resolve-module
  function resolve (parent, name) {
    var Module = require('module')
    return Module._resolveFilename(name, {
      paths: Module._nodeModulePaths(path.dirname(parent)),
      filename: parent,
      id: parent
    })
  }
  // const dependencyAbsPaths = dependencies
  // depPath.includes('.') : path.join(mainPath, depPath), depPath)
  const scriptModulePaths = dependencies // [rootPath, ...dependencyAbsPaths]
    .filter(depPath => {
      const results = !options.relativeOnly || (options.relativeOnly && depPath.includes('.'))
      return results
    })

  const scriptModuleAbsPaths = scriptModulePaths.map(depPath => resolve(rootPath, depPath))
  // console.log(`dependencies of ${rootPath}`, scriptModulePaths, scriptModuleAbsPaths, depth)
  const subResults = scriptModuleAbsPaths.map(function (scriptPath) {
    return resolveDependencies(undefined, scriptPath, depth)
  })
  return [rootPath].concat(subResults)
}

module.exports = resolveDependencies
