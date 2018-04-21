const getParameterValuesFromParameters = require('./getParameterValuesFromParameters')
const applyParameterDefinitions = require('./applyParameterDefinitions')

const doesModuleExportParameterDefiniitions = moduleToCheck => {
  return moduleToCheck && 'getParameterDefinitions' in moduleToCheck
}

const getRawParameterDefinitionsAndValues = (scriptRootModule) => {
  let parameterValues = {}
  let parameterDefinitions = []
  if (doesModuleExportParameterDefiniitions(scriptRootModule)) {
    parameterDefinitions = scriptRootModule.getParameterDefinitions() || []
    parameterValues = getParameterValuesFromParameters(scriptRootModule.getParameterDefinitions)
  }

  return {parameterDefinitions, parameterValues}
}

const getFinalParameterDefintionsAndValues = (design, overrides) => {
  let {parameterDefinitions, parameterValues} = getRawParameterDefinitionsAndValues(design)
  parameterValues = Object.assign({}, parameterValues, overrides)
  parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, parameterDefinitions) : parameterValues

  return {parameterValues, parameterDefinitions}
}

module.exports = getFinalParameterDefintionsAndValues
