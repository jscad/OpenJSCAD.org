
const validateDesignModule = require('./validateDesignModule')
const normalizeDesignModule = require('./normalizeDesignModule')

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use: defaults to the standard 'require' under node.js
 */
const requireDesignFromModule = (filePath, requireFn = require) => {
  // const requireUncached = require('../code-loading/requireUncached')
  // TODO: only uncache when needed
  // requireUncached(mainPath)
  const designRootModule = requireFn(filePath)
  // make sure everything is ok
  validateDesignModule(designRootModule)
  return normalizeDesignModule(designRootModule)
}

module.exports = requireDesignFromModule
