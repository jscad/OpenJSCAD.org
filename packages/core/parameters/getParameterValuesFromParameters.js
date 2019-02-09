/**
 * @param  {} getParameterDefinitions
 * @param  {} inputParameters
 */
module.exports = function getParameterValuesFromParameters (getParameterDefinitions, inputParameters) {
  if (typeof getParameterDefinitions !== 'undefined') {
    let parameterValues = {}
    const parameterDefinitions = getParameterDefinitions()
    for (let a in parameterDefinitions) { // defaults, given by getParameterDefinitions()
      let x = parameterDefinitions[a]
      if ('default' in x) {
        parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].default
      } else if ('initial' in x) {
        parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].initial
      } else if ('checked' in x) {
        parameterValues[parameterDefinitions[a].name] = parameterDefinitions[a].checked
      }
    }
    for (let parameterName in inputParameters) { // given by command-line
      parameterValues[parameterName] = inputParameters[parameterName]
    }
    return parameterValues
  } else {
    return inputParameters
  }
}
