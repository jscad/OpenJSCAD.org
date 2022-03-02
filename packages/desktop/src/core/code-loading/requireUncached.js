// from https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate/16060619#16060619
const requireUncached = (moduleName) => {
  /* console.log(`removing ${moduleName} from cache`)
  delete require.cache[require.resolve(moduleName)]

  Object.keys(module.constructor._pathCache).forEach(function (cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey]
    }
  })
  return require(moduleName) */
  const decache = require('decache')
  decache(moduleName)
}

module.exports = requireUncached
