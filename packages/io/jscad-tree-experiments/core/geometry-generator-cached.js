const {cube, sphere} = require('@jscad/csg/api').primitives3d
const {union, difference, intersection} = require('@jscad/csg/api').booleanOps
const {translate, rotate, scale} = require('@jscad/csg/api').transformations

const hash = require('object-hash')

const generate = (node, lookup) => {
  let result
  let operands
  if (Array.isArray(node)) {
    return node.map(n => generate(n, lookup))
  }
  const nodeHash = hash(node)
  const foundData = lookup[nodeHash]
  if (foundData) {
    return foundData
  }
  switch (node.type) {
    case 'cube':
      result = cube(node)
      break
    case 'sphere':
      result = sphere(node)
      break
    case 'union' :
      operands = node.children.map(n => generate(n, lookup))
      result = union(operands)
      break
    case 'difference' :
      operands = node.children.map(n => generate(n, lookup))
      result = difference(operands)
      break
    case 'intersection' :
      operands = node.children.map(n => generate(n, lookup))
      result = intersection(operands)
      break
    case 'translate':
      operands = node.children.map(n => generate(n, lookup))
      result = translate(node.params, operands)
      break
    case 'rotate':
      operands = node.children.map(n => generate(n, lookup))
      result = rotate(node.params, operands)
      break
    case 'scale':
      operands = node.children.map(n => generate(n, lookup))
      result = scale(node.params, operands)
      break
  }

  lookup[nodeHash] = result

  return result
}

module.exports = generate
