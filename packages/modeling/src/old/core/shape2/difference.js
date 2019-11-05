const geom2 = require('../geometry/geom2')
const clone = require('./clone')
const create = require('./create')
const flatten = require('../utils/flatten')
const toArray = require('../utils/toArray')

// FIXME: double check this algorithm, or even better, swap it out with something not reliant
// on converting to 3D and back !!!
// TODO: except for the use of geom2 vs geom3 this is identical to shape3's difference
/**
   * Return a new Shape2 solid representing space in this solid but
   * not in the given solids.
   * Immutable: Neither this solid nor the given solids are modified.
   * @typedef  {import('./create').Shape2} Shape2
   * @param {Shape2[]} shapes - list of Shape2 objects
   * @returns {Shape2} new Shape2 object
   * @example
   * let C = difference(A, B)
   * @example
   * +-------+            +-------+
   * |       |            |   C   |
   * |   A   |            |       |
   * |    +--+----+   =   |    +--+
   * +----+--+    |       +----+
   *      |   B   |
   *      |       |
   *      +-------+
   */
const difference = (...shapes) => {
  shapes = flatten(toArray(shapes))
  if (shapes.length < 2) {
    throw new Error(`please provide at least two operands for a boolean difference.(${shapes.length} given)`)
  }
  // first we transform all geometries to 'bake in' the transforms
  // FIXME: very inneficient, may transform the same geometries multiple times if multiple booleans are applie
  // to the same shapes
  const updatedGeoms = shapes.map(shape => geom2.transform(shape.transforms, shape.geometry))
  const newGeometry = geom2.difference(updatedGeoms)
  /* this means that the new shape:
   - has default transforms (reset)
   - does not get any attributes or data from the input shapes
  */
  const newShape = create()
  newShape.geometry = newGeometry
  return newShape
}

module.exports = difference
