// TODO : this is the same one as in openjscad.org/src/core !! it should be reused!
/**
 * extracts the parameter
 * @param {Array} paramControls
 * @param {Boolean} onlyChanged
 * @returns {Object} the parameter values, as an object
 */
module.exports = function getParameterValues (paramControls, parameterDefinitions, onlyChanged) {
  let paramValues = {}
  let value
  for (var i = 0; i < paramControls.length; i++) {
    const control = paramControls[i]

    switch (control.paramType) {
      case 'choice':
        value = control.options[control.selectedIndex].value
        /* console.log('choice', control, control.paramName)
        // we try to match values against captions, then parse as numbers if applicable, then fallback to original value
        const valueIndex = !definition ? -1 : definition.captions.indexOf(value)
        const valueInDefinition = valueIndex > -1
        // const valueInDefintionCaptionsAndValue = valueInDefinition && definition.values.length >= valueIndex
        value = definition.values.length > 0 && isNumber(definition.values[0]) ? parseFloat(value) : value
        value = definition.values.length > 0 && typeof value === 'boolean' ? !!value : value
        console.log('foo', value) */
        break
      case 'float':
      case 'number':
        value = control.value
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = parseFloat(value)
        } else {
          throw new Error('Parameter (' + control.paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'int':
        value = control.value
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = parseInt(value)
        } else {
          throw new Error('Parameter (' + control.paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'checkbox':
        value = control.checked
        break
      case 'radio':
        if (!control.checked) {
          continue
        }
        value = control.value
        break
      default:
        value = control.value
        break
    }
    if (onlyChanged) {
      if ('initial' in control && control.initial === value) {
        continue
      } else if ('default' in control && control.default === value) {
        continue
      }
    }
    paramValues[control.paramName] = value
  // console.log(control.paramName+":"+paramValues[control.paramName])
  }
  return paramValues
}

function isNumber (value) {
  return (!isNaN(parseFloat(value)) && isFinite(value))
}
