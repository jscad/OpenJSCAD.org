import validateDesignModule from './validateDesignModule.js'
import normalizeDesignModule from './normalizeDesignModule.js'

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use; Node require or webRequire
 */
export const requireDesignFromModule = (filePath, requireFn) => {
  // requireUncached(mainPath)
  const designRootModule = requireFn(filePath)
  // make sure everything is ok
  validateDesignModule(designRootModule)
  return normalizeDesignModule(designRootModule)
}

export default requireDesignFromModule
