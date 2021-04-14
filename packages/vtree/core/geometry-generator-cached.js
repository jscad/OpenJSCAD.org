const { flatten } = require('./arrays')
const { cube, sphere, cylinder } = require('@jscad/csg/api').primitives3d
const { circle, square } = require('@jscad/csg/api').primitives2d
const { union, difference, intersection } = require('@jscad/csg/api').booleanOps
const { translate, rotate, scale, mirror, hull, chain_hull, contract } = require('@jscad/csg/api').transformations
const { colorize } = require('@jscad/csg/api').colors
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
  // console.log('node.type', node.type, node)
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
      // FIXME : circle is weird, will not accept empty object as param
      // node keys length === 1 means only node.type is in there: ie no params
      if (Object.keys(node).length === 1) {
        result = circle()
      } else {
        result = circle(node)
      }
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
      // console.log('translate::::', node.params, operands)
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
    case 'contract':
      console.log('contract', node)
      operands = flatten(node.children).map(n => generate(n, cache))
      // FIXME: REALLY NEEDED ???
      operands = union(operands)
      result = contract(node.radius, node.n, operands)
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
    case 'colorize':
      operands = flatten(node.children).map(n => generate(n, cache))
      result = colorize(node.params, operands)
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
    case 'measureArea':
      // console.log('actual measure Area')
      operands = flatten(node.children).map(n => generate(n, cache))
      result = operands.reduce((acc, csg) => {
        const tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
          return accSub + triPoly.getTetraFeatures(['area'])
        }, 0)
        return acc + tmpArea
      }, 0)
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
