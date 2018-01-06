/**
 * casts the parameters/ get their correct values based on the
 * raw parameters (passed into the CLI tool for example) and the
 * parameter defintions as present in the jscad script
 * @param {Object} rawParameters
 * @param {Array} parameterDefinitions
 * @returns {Object} the parameter values, as an object
 */
module.exports = function getParameterValues (rawParameters, parameterDefinitions) {
  let paramValues = {}
  Object.keys(rawParameters).forEach(paramName => {
    let value = rawParameters[paramName]
    let definition = parameterDefinitions.filter(definition => definition.name === paramName)
    definition = definition.length > 0 ? definition[0] : undefined
    if (definition === undefined) {
      throw new Error(`Parameter (${paramName}) has no matching definition`)
    }
    switch (definition.type) {
      case 'choice':
        // we try to match values against captions, then parse as numbers if applicable, then fallback to original value
        const valueIndex = definition.captions.indexOf(value)
        const valueInDefinition = valueIndex > -1
        const valueInDefintionCaptionsAndValue = valueInDefinition && definition.values.length >= valueIndex
        // because the whole 'choice' parameter is broken, we have to CAST TO A STRING!
        value = valueInDefintionCaptionsAndValue ? definition.values[valueIndex] : value
        value = `${value}`
        // value = definition.values.length > 0 && isNumber(definition.values[0]) ? parseFloat(value) : value
        // value = definition.values.length > 0 && typeof value === 'boolean' ? !!value : value
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
      case 'radio':
        // FIXME: the way checbox/radios work does NOT make sense : so an arbitrary value OR a boolean is returned ??
        if (definition.value.length > 0) {
          value = definition.value
        } else {
          value = !!value
        }
        break
    }
    paramValues[paramName] = value
  })
  return paramValues
}

function isNumber (value) {
  return (!isNaN(parseFloat(value)) && isFinite(value))
}
