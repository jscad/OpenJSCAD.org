/**
 * @param  {} parameterDefinitions
 * @param  {} inputParameters
 */
module.exports = function getParameterValuesFromParameters (parameterDefinitions, inputParameters) {
  let parameterValues = {}
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
  for (let parameterName in inputParameters) { // given by command-line or other source
    parameterValues[parameterName] = inputParameters[parameterName]
  }
  return parameterValues
}
