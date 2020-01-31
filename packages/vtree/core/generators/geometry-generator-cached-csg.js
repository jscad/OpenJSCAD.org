const { flatten } = require('../arrays')
const { omit } = require('../objectUtils')
const modeling = require('@jscad/modeling')

const { cube, cuboid, sphere, cylinder } = modeling.primitivs
const { circle, ellipse, rectangle, square } = modeling.primitives

const { union, difference, intersection } = modeling.booleans
const { translate, rotate, scale, mirror } = modeling.transforms
const { hull, hullChain } = modeling.hulls
const { expand, offset } = modeling.exapnsions
const { extrudeLinear, extrudeRotate, extrudeFromSlices, extrudeRectangular } = modeling.extrusions
const {measureArea, measureVolume, measureBounds} = modeling.measurements
const { color } = modeling.color

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
    // primitives
    cube: () =>cube(node),
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
    hull:() => nodeWithoutParams(node, operands, hull),
    hullChain:() => nodeWithoutParams(node, operands, hullChain),
    //expansions
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
      operands = flatten(node.children).map(n => generate(n, cache))
      const area = operands.reduce((acc, csg) => {
        let tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
          return accSub + triPoly.getTetraFeatures(['area'])
        }, 0)
        return acc + tmpArea
      }, 0)
    },
    measureVolume: () => nodeWithParams(node, operands, measureVolume),
    measureBounds: () => nodeWithParams(node, operands, measureBounds),
  }
  
  const result = lookup[node.type] ? lookup[node.type]() : node

  cache.add(nodeHash, result)
  // lookup[nodeHash] = result

  return result
}

module.exports = generate
