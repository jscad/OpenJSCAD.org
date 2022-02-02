/*
 * Normalize the given design module for internal use.
 */
const normalizeDesignModule = (rootModule) => {
  if (!rootModule) {
    throw new Error('no root module found, please check the project structure')
  }
  if (typeof (rootModule) === 'function') {
    console.warn('please refactor the exports, assigning main() as a property, i.e. module.exports = { main }')
    rootModule = { main: rootModule }
  }
  if (!rootModule.main) {
    throw new Error('no main() function found, please check the module.exports')
  }
  if (typeof (rootModule.main) !== 'function') {
    throw new Error('main is not a function, please check the module.exports')
  }
  return rootModule
}

module.exports = normalizeDesignModule
