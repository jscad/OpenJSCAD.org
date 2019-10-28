const flatten = require('../utils/flatten')

const { cube, sphere, cylinder } = require('@jscad/csg/api').primitives3d
const { circle, square } = require('@jscad/csg/api').primitives2d
const { union, difference, intersection } = require('@jscad/csg/api').booleanOps
const { translate, rotate, scale, mirror, hull, chain_hull } = require('@jscad/csg/api').transformations
const { color } = require('@jscad/csg/api').color
const { linear_extrude, rectangular_extrude, rotate_extrude } = require('@jscad/csg/api').extrusions

const generate = (node, cache) => {
  let result
  let operands
  if (Array.isArray(node)) {
    return flatten(node).map(n => generate(n, cache))
  }

  const { foundData, nodeHash } = cache.find(node)
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
    case 'cylinder':
      result = cylinder(node)
      break
    case 'circle':
      result = circle(node)
      break
    case 'square':
      result = square(node)
      break
    case 'union' :
      operands = flatten(node.children).map(n => generate(n, cache))
      result = union(operands)
      break
    case 'difference' :
      operands = flatten(node.children).map(n => generate(n, cache))
      result = difference(operands)
      break
    case 'intersection' :
      operands = flatten(node.children).map(n => generate(n, cache))
      result = intersection(operands)
      break
    case 'translate':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = translate(node.params, operands)
      break
    case 'rotate':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = rotate(node.params, operands)
      break
    case 'scale':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = scale(node.params, operands)
      break
    case 'mirror':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = mirror(node.params, operands)
      break
    case 'hull':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = hull(operands)
      break
    case 'chain_hull':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = chain_hull(operands)
      break
    case 'color':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = color(node.params, operands)
      break
    case 'linear_extrude':
      operands = flatten(node.children).map(n => generate(n, cache))
      // FIXME: REALLY NEEDED ???
      operands = union(operands)
      result = linear_extrude(node.params, operands)
      break
    case 'rotate_extrude':
      operands = flatten(node.children).map(n => generate(n, cache))
      // FIXME: REALLY NEEDED ???
      operands = union(operands)
      result = rotate_extrude(node.params, operands)
      break
    case 'rectangular_extrude':
      operands = flatten(node.children).map(n => generate(n, cache))
      // operands = flatten(node.children).map(n => generate(n, cache))
      // FIXME: REALLY NEEDED ???
      // operands = union(operands)
      result = rectangular_extrude(operands, node.params)
      break
    default:
      result = node
      break
  }

  cache.add(nodeHash, result)
  // lookup[nodeHash] = result

  return result
}

module.exports = generate
