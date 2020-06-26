const getParameterValuesFromParameters = require('./getParameterValuesFromParameters')
const applyParameterDefinitions = require('./applyParameterDefinitions')

const doesModuleExportParameterDefiniitions = (moduleToCheck) => moduleToCheck && 'getParameterDefinitions' in moduleToCheck

const getRawParameterDefinitionsAndValues = (rootModule, overrides) => {
  let parameterValues = {}
  let parameterDefinitions = []
  if (doesModuleExportParameterDefiniitions(rootModule)) {
    parameterDefinitions = rootModule.getParameterDefinitions(overrides) || []
    parameterValues = getParameterValuesFromParameters(parameterDefinitions)
  }
  return { parameterDefinitions, parameterValues }
}

/** given the root/main module and optional parameter value overrides,
 * returns parameterDefinitions & 'default' parameter values
 * the overrides are passed for to enable the parameter definitions to access the PREVIOUS
 * version of the parameter values
 * @param  {Module} rootModule an object with a structure like { main: function, getParameterDefinitions: function}
 * getParameterDefinitions is optional
 * @param  {Object} overrides an object containing parameter values, used as overrides
 * @returns {Object} { parameterValues, parameterDefinitions }
 */
const getAllParameterDefintionsAndValues = (rootModule, overrides) => {
  let { parameterDefinitions, parameterValues } = getRawParameterDefinitionsAndValues(rootModule, overrides)
  parameterValues = Object.assign({}, parameterValues, overrides)
  parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, parameterDefinitions) : parameterValues

  return { parameterValues, parameterDefinitions }
}

module.exports = getAllParameterDefintionsAndValues
