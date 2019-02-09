
const validateDesignModule = require('./validateDesignModule')

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use: defaults to the standard 'require' under node.js
 */
const requireDesignFromModule = (filePath, requireFn = require) => {
  let scriptRootModule = requireFn(filePath)
  validateDesignModule(scriptRootModule)
  const design = Object.assign(
    {getParameterDefinitions: () => []},
    scriptRootModule
  )
  return design
}

module.exports = requireDesignFromModule
