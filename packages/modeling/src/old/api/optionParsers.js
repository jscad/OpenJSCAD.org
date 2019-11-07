const vec2 = require('../core/math/vec2')
const vec3 = require('../core/math/vec3')

// Parse an option from the options object
// If the option is not present, return the default value
const parseOption = function (options, optionname, defaultvalue) {
  let result = defaultvalue
  if (options && optionname in options) {
    result = options[optionname]
  }
  return result
}

// Parse an option and force into a Vector3D. If a scalar is passed it is converted
// into a vector with equal x,y,z
// input can be either a scalar, a 3d array of floats
const parseOptionAs3DVector = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  result = vec3.fromVarious(result) // new Vector3D(result)
  return result
}

const parseOptionAs3DVectorList = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  return result.map(function (res) {
    return new Vector3D(res)
  })
}

// Parse an option and force into a Vector2D. If a scalar is passed it is converted
// into a vector with equal x,y
// input can be either a scalar, a 2d array of floats
const parseOptionAs2DVector = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  result = vec2.fromVarious(result) // new Vector2D(result)
  return result
}

const parseOptionAsFloat = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  if (typeof (result) === 'string') {
    result = Number(result)
  }
  if (isNaN(result) || typeof (result) !== 'number') {
    throw new Error('Parameter ' + optionname + ' should be a number')
  }
  return result
}

const parseOptionAsInt = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  result = Number(Math.floor(result))
  if (isNaN(result)) {
    throw new Error('Parameter ' + optionname + ' should be a number')
  }
  return result
}

const parseOptionAsBool = function (options, optionname, defaultvalue) {
  let result = parseOption(options, optionname, defaultvalue)
  if (typeof (result) === 'string') {
    if (result === 'true') result = true
    else if (result === 'false') result = false
    else if (result === 0) result = false
  }
  result = !!result
  return result
}

module.exports = {
  parseOption,
  parseOptionAsInt,
  parseOptionAsFloat,
  parseOptionAsBool,
  parseOptionAs3DVector,
  parseOptionAs2DVector,
  parseOptionAs3DVectorList
}
