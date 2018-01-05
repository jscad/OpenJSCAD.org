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

    switch (definition.type) {
      case 'choice':
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
        break
    }
    paramValues[paramName] = value
  })
  return paramValues
}
