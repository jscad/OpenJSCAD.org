const getParameterValuesFromParameters = require('./getParameterValuesFromParameters')
const applyParameterDefinitions = require('./applyParameterDefinitions')

const doesModuleExportParameterDefiniitions = moduleToCheck => {
  return moduleToCheck && 'getParameterDefinitions' in moduleToCheck
}

const getRawParameterDefinitionsAndValues = (rootModule, overrides) => {
  let parameterValues = {}
  let parameterDefinitions = []
  if (doesModuleExportParameterDefiniitions(rootModule)) {
    parameterDefinitions = rootModule.getParameterDefinitions(overrides) || []
    parameterValues = getParameterValuesFromParameters(parameterDefinitions)
  }
  return { parameterDefinitions, parameterValues }
}

const getAllParameterDefintionsAndValues = (rootModule, overrides) => {
  let { parameterDefinitions, parameterValues } = getRawParameterDefinitionsAndValues(rootModule, overrides)
  parameterValues = Object.assign({}, parameterValues, overrides)
  parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, parameterDefinitions) : parameterValues

  return { parameterValues, parameterDefinitions }
}

module.exports = getAllParameterDefintionsAndValues
