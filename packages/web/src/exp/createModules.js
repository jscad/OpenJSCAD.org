let modules = {
  '@jscad/api': {
    exports: require('@jscad/csg/api')//{cube: () => console.log('you asked for a cube')}
  }
}

const rootModule = new Function('require', 'module', script)
const mockRequire = function (pathToModule) {
  console.log('you asked for', pathToModule)
  const foundModule = modules[pathToModule]
  return foundModule.exports
}
rootModule(mockRequire, modules)