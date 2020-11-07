/**
 * @param  {} parameterDefinitions
 * @param  {} inputParameters
 */
const getParameterValuesFromParameters = (parameterDefinitions, inputParameters) => {
  const parameterValues = {}
  for (const a in parameterDefinitions) { // defaults, given by getParameterDefinitions()
    const x = parameterDefinitions[a]
    if ('default' in x) {
      parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].default
    } else if ('initial' in x) {
      parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].initial
    } else if ('checked' in x) {
      parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].checked
    }
  }
  for (const parameterName in inputParameters) { // given by command-line or other source
    parameterValues[parameterName] = inputParameters[parameterName]
  }
  return parameterValues
}

module.exports = getParameterValuesFromParameters
