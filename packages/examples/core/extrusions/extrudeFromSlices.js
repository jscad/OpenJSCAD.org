/*
// title       : Extrude From Slices
// author      : Jeff Gay, Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the advanced extrusion using slices with varying numbers of points.
// file        : extrudeFromSlices.js
// tags        : extrude, slice, slices, extrudefromslices, callback
*/

const { circle } = require('@jscad/modeling').primitives
const { geom2 } = require('@jscad/modeling').geometries
const { extrudeFromSlices, slice } = require('@jscad/modeling').extrusions
const { mat4 } = require('@jscad/modeling').maths

const main = () => {
  // demonstrates manipulating the original base through translation and scale to build a 3D geometry
  const jigglySquare = (height) => {
    let squareWithHole = geom2.create(
      [
        [[-10.0, 10.0], [-10.0, -10.0]],
        [[-10.0, -10.0], [10.0, -10.0]],
        [[10.0, -10.0], [10.0, 10.0]],
        [[10.0, 10.0], [-10.0, 10.0]],
        [[-8.0, -8.0], [-8.0, 8.0]],
        [[8.0, -8.0], [-8.0, -8.0]],
        [[8.0, 8.0], [8.0, -8.0]],
        [[-8.0, 8.0], [8.0, 8.0]]
      ]
    )
    squareWithHole = slice.fromSides(geom2.toSides(squareWithHole))
    return extrudeFromSlices({
      numberOfSlices: 32,
      callback: (progress, count, base) => {
        const scaleFactor = 1 + (0.03 * Math.cos(3 * Math.PI * progress))
        const scaleMatrix = mat4.fromScaling([scaleFactor, 2 - scaleFactor, 1])
        const transformMatrix = mat4.fromTranslation([0, 0, progress * height])
        return slice.transform(mat4.multiply(scaleMatrix, transformMatrix), base)
      }
    }, squareWithHole)
  }

  // demonstrates using successive different slices to build a 3D geometry
  // "base" is unused in this scenario
  const squareToCircleExtrusion = (height) => {
    const base = circle({ radius: 4, segments: 4 })

    return extrudeFromSlices(
      {
        numberOfSlices: 6,
        callback: (progress, count, base) => {
          const newPolygon = circle({ radius: 2 + (5 * progress), segments: 4 + (count * count) })
          let newSlice = slice.fromSides(geom2.toSides(newPolygon))
          newSlice = slice.transform(mat4.fromTranslation([0, 0, progress * height]), newSlice)
          return newSlice
        }
      }, base
    )
  }

  return [
    jigglySquare(4),
    squareToCircleExtrusion(10)
  ]
}

module.exports = { main }
