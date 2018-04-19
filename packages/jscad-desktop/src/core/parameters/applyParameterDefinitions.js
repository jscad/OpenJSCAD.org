
/**
 * casts the parameters/ get their correct values based on the
 * raw parameters (passed into the CLI tool for example) and the
 * parameter defintions as present in the jscad script
 * @param {Object} rawParameters
 * @param {Array} parameterDefinitions
 * @returns {Object} the parameter values, as an object
 */
module.exports = function applyParameterDefinitions (rawParameters, parameterDefinitions, throwOnNoDefinition = false) {
  return Object.keys(rawParameters).reduce((paramValues, paramName) => {
    let value = rawParameters[paramName]
    let definition = parameterDefinitions.filter(definition => definition.name === paramName)
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
}

const isNumber = value => {
  return (!isNaN(parseFloat(value)) && isFinite(value))
}
const valueForChoices = (inputValue, definition) => {
  let value = inputValue
  // we try to match values against captions, then parse as numbers if applicable, then fallback to original value
  const valueIndex = definition.captions.indexOf(value)
  const valueInDefinition = valueIndex > -1
  const valueInDefintionCaptionsAndValue = valueInDefinition && definition.values.length >= valueIndex
  value = valueInDefintionCaptionsAndValue ? definition.values[valueIndex] : value
  value = definition.values.length > 0 && isNumber(definition.values[0]) ? parseFloat(value) : value
  value = definition.values.length > 0 && typeof value === 'boolean' ? !!value : value
  return value
}
