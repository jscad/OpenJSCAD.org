const { flatten } = require('@jscad/array-utils')
const modeling = require('@jscad/modeling')

const { cube, cuboid, sphere, cylinder } = modeling.primitives
const { circle, ellipse, rectangle, square } = modeling.primitives

const { union, difference, intersection } = modeling.booleans
const { translate, rotate, scale, mirror } = modeling.transforms
const { hull, hullChain } = modeling.hulls
const { expand, offset } = modeling.expansions
const { extrudeLinear, extrudeRotate, extrudeFromSlices, extrudeRectangular } = modeling.extrusions
const { measureArea, measureVolume, measureBounds } = modeling.measurements
const { color } = modeling.color

/** genere actual 'genometry' based on vtree node(s)
 * @param  {} node
 * @param  {} cache
 */
const generate = (node, cache) => {
  let operands
  if (Array.isArray(node)) {
    return flatten(node).map(n => generate(n, cache))
  }

  const { foundData, nodeHash } = cache.find(node)
  if (foundData) {
    return foundData
  }

  const nodeWithoutParams = (node, operands, fn) => {
    operands = flatten(node.children).map(n => generate(n, cache))
    return fn(operands)
  }
  const nodeWithParams = (node, operands, fn) => {
    operands = flatten(node.children).map(n => generate(n, cache))
    return fn(node.params, operands)
  }

  const lookup = {
    // various
    color: () => nodeWithParams(node, operands, color),
    // primitives
    cube: () => cube(node),
    cuboid: () => cuboid(node),
    sphere: () => sphere(node),
    cylinder: () => cylinder(node),
    circle: () => circle(node),
    ellipse: () => ellipse(node),
    rectangle: () => rectangle(node),
    square: () => square(node),
    // color

    // booelans
    union: () => nodeWithoutParams(node, operands, union),
    difference: () => nodeWithoutParams(node, operands, difference),
    intersection: () => nodeWithoutParams(node, operands, intersection),
    // transforms
    translate: () => nodeWithParams(node, operands, translate),
    rotate: () => nodeWithParams(node, operands, rotate),
    scale: () => nodeWithParams(node, operands, scale),
    mirror: () => nodeWithParams(node, operands, mirror),
    // hulls
    hull: () => nodeWithoutParams(node, operands, hull),
    hullChain: () => nodeWithoutParams(node, operands, hullChain),
    // expansions
    expand: () => nodeWithParams(node, operands, expand),
    offset: () => nodeWithParams(node, operands, offset),
    // extrusions
    // TODO: do we need an explicit operands = union(operands)
    extrudeLinear: () => nodeWithParams(node, operands, extrudeLinear),
    extrudeRotate: () => nodeWithParams(node, operands, extrudeRotate),
    extrudeRectangular: () => nodeWithParams(node, operands, extrudeRectangular),
    extrudeFromSlices: () => nodeWithParams(node, operands, extrudeFromSlices),
    // measurements
    measureArea: () => {
      // first generate the actual geometry for the items, then compute
      return measureArea(flatten(node.children).map(n => generate(n, cache)))
    },
    measureVolume: () => {
      // first generate the actual geometry for the items, then compute
      return measureVolume(flatten(node.children).map(n => generate(n, cache)))
    },
    measureBounds: () => {
      // first generate the actual geometry for the items, then compute
      return measureBounds(flatten(node.children).map(n => generate(n, cache)))
    }
  }

  const result = lookup[node.type] ? lookup[node.type]() : node

  cache.add(nodeHash, result)
  // lookup[nodeHash] = result

  return result
}

module.exports = generate
