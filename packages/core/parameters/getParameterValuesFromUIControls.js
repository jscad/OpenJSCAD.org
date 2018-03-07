/**
 * extracts the parameter
 * @param {Array} paramControls
 * @param {Boolean} onlyChanged
 * @returns {Object} the parameter values, as an object
 */
module.exports = function getParameterValuesFromUIControls (paramControls, parameterDefinitions, onlyChanged) {
  let paramValues = {}
  let value
  for (var i = 0; i < paramControls.length; i++) {
    const control = paramControls[i]

    switch (control.paramType) {
      case 'choice':
        value = control.options[control.selectedIndex].value
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
  }
  return paramValues
}
