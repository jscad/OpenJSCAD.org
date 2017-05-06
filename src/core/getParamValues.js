/**
 * extracts the parameter
 * @param {Array} paramControls
 * @param {Boolean} onlyChanged
 * @returns {Object} the parameter values, as an object
 */
module.exports = function getParamValues (paramControls, onlyChanged) {
  let paramValues = {}
  let value
  for (var i = 0; i < paramControls.length; i++) {
    var control = paramControls[i]
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
      case 'radio':
        if (control.checked === true && control.value.length > 0) {
          value = control.value
        } else {
          value = control.checked
        }
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
