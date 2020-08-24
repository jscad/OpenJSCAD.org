
/**
 * casts the parameters/ get their correct values based on the
 * raw parameters (passed into the CLI tool for example) and the
 * parameter defintions as present in the jscad script
 * @param {Object} inputParameters: input parameter as an object {paramName: paramValue}
 * @param {Array} parameterDefinitions
 * @returns {Object} the parameter values, as an object
 */
const applyParameterDefinitions = (inputParameters, parameterDefinitions, throwOnNoDefinition = false) => {
  const values = Object.keys(inputParameters).reduce((paramValues, paramName) => {
    let value = inputParameters[paramName]
    let definition = parameterDefinitions.filter((definition) => definition.name === paramName)
    definition = definition.length > 0 ? definition[0] : undefined
    if (definition === undefined) {
      if (throwOnNoDefinition) {
        throw new Error(`Parameter (${paramName}) has no matching definition`)
      }
      return paramValues
    }
    switch (definition.type) {
      case 'choice':
        value = valueForChoices(value, definition)
        break
      case 'float':
      case 'number':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = parseFloat(value)
        } else {
          throw new Error('Parameter (' + paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'int':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = parseInt(value)
        } else {
          throw new Error('Parameter (' + paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'checkbox':
        value = !!value
        break
      case 'radio':
        value = valueForChoices(value, definition)
        break
      case 'slider':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = parseFloat(value)
        } else {
          throw new Error('Parameter (' + paramName + ') is not a valid number (' + value + ')')
        }
        break
    }
    paramValues[paramName] = value
    return paramValues
  }, {})
  return values
}

const isNumber = (value) => (!isNaN(parseFloat(value)) && isFinite(value))

const valueForChoices = (inputValue, definition) => {
  let value = inputValue
  // we try to match values against captions, then parse as numbers if applicable, then fallback to original value
  const valueIndex = definition.captions ? definition.captions.indexOf(value) : definition.values.indexOf(value)
  const valueInDefinition = valueIndex > -1
  const valueInDefinitionCaptionsAndValue = valueInDefinition && definition.values.length >= valueIndex
  value = valueInDefinitionCaptionsAndValue ? definition.values[valueIndex] : value
  value = definition.values.length > 0 && isNumber(definition.values[0]) ? parseFloat(value) : value
  value = definition.values.length > 0 && typeof value === 'boolean' ? !!value : value
  return value
}

module.exports = applyParameterDefinitions
