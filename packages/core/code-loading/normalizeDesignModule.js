/*
 * Normalize the given design module for internal use.
 */
const normalizeDesignModule = (rootModule) => {
  if (!rootModule) {
    throw new Error('no root module found')
  }
  if (typeof (rootModule) === 'function') {
    console.warn('please use named exports for the main() function')
    rootModule = { main: rootModule }
  }
  if (!rootModule.main) {
    throw new Error('no main() function, check the exports')
  }
  if (!(typeof (rootModule.main) === 'function')) {
    throw new Error('main is not a function, check the exports')
  }
  return rootModule
}

module.exports = normalizeDesignModule
