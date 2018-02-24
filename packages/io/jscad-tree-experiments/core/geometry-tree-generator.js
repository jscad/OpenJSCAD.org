const {cube, sphere} = require('@jscad/csg/api').primitives3d
const {union, difference, intersection} = require('@jscad/csg/api').booleanOps

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
      operands = node.left.map(n => generate(n))
      result = union(operands)
      break
    case 'difference' :
      operands = node.left.map(n => generate(n))
        .concat(node.right.map(n => generate(n)))
      result = difference(operands)
      break
    case 'intersection' :
      operands = node.left.map(n => generate(n))
        .concat(node.right.map(n => generate(n)))
      result = intersection(operands)
      break
  }
  node.geometry = result
  return result
}

module.exports = generate
