export default function getParamValues(paramControls) {
  var paramValues = {}
  for (var i = 0; i < paramControls.length; i++) {
    var control = paramControls[i]
    switch (control.paramType) {
      case 'choice':
        paramValues[control.paramName] = control.options[control.selectedIndex].value
        break
      case 'float':
      case 'number':
        var value = control.value
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          paramValues[control.paramName] = parseFloat(value)
        } else {
          throw new Error('Parameter (' + control.paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'int':
        var value = control.value
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          paramValues[control.paramName] = parseInt(value)
        } else {
          throw new Error('Parameter (' + control.paramName + ') is not a valid number (' + value + ')')
        }
        break
      case 'checkbox':
      case 'radio':
        if (control.checked === true && control.value.length > 0) {
          paramValues[control.paramName] = control.value
        } else {
          paramValues[control.paramName] = control.checked
        }
        break
      default:
        paramValues[control.paramName] = control.value
        break
    }
  // console.log(control.paramName+":"+paramValues[control.paramName])
  }
  return paramValues
}
