const {cube, sphere} = require('@jscad/csg/api').primitives3d
const {union, difference, intersection} = require('@jscad/csg/api').booleanOps

/* const union = operands => {
  return operands.length === 1 ? operands[0] : operands[0].union(operands.slice(1))
} */
/* const union = (operands) => {
  if (operands.length === 1) {
    return operands[0]
  }
  let output = operands[0]
  for (let i = 0; i < operands.slice(1).length; i++) {
    output = output.union(operands[i])
  }
  return output
  // return operands.length === 1 ? operands[0] : operands[0].union(operands.slice(1))
} */

const generate = (node) => {
  let result
  let operands
  if (Array.isArray(node)) {
    return node.map(n => generate(n))
  }
  switch (node.type) {
    case 'cube':
      result = cube(node)
      break
    case 'sphere':
      result = sphere(node)
      break
    case 'union' :
      operands = node.children.map(n => generate(n).geometry)
      result = union(operands)
      break
    case 'difference' :
      operands = node.children.map(n => generate(n).geometry)
      result = difference(operands)
      break
    case 'intersection' :
      operands = node.children.map(n => generate(n).geometry)
      result = intersection(operands)
      break
  }
  node.geometry = result
  return node
}

module.exports = generate
