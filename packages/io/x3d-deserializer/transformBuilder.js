const { maths, geometries } = require('@jscad/modeling')

// convert the given X3D transform (obj) into a series of JSCAD function invocations
const createTransform = (obj, index, data, options) => {
console.log('createTransform',obj,index)
  const code = `
const createObject${obj.id} = (options) => {
}
`
  return code
}

module.exports = createTransform
