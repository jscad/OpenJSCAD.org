/**
 * Extrude From Slices
 * @category Creating Shapes
 * @skillLevel 5
 * @description Demonstrating the advanced extrusion using slices with varying numbers of points.
 * @tags extrude, slice, slices, extrudefromslices, callback
 * @authors Jeff Gay, Moissette Mark, Simon Clark
 * @licence MIT License
 */

import { circle, geom2, extrudeFromSlices, slice, mat4, TAU } from '@jscad/modeling'

export const main = () => {
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
    squareWithHole = slice.fromGeom2(squareWithHole)
    return extrudeFromSlices({
      numberOfSlices: 32,
      callback: (progress, count, base) => {
        const scaleFactor = 1 + (0.03 * Math.cos(3 * TAI / 2 * progress))
        const scaleMatrix = mat4.fromScaling(mat4.create(), [scaleFactor, 2 - scaleFactor, 1])
        const transformMatrix = mat4.fromTranslation(mat4.create(), [0, 0, progress * height])
        return slice.transform(mat4.multiply(mat4.create(), scaleMatrix, transformMatrix), base)
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
          let newSlice = slice.fromGeom2(newPolygon)
          newSlice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, progress * height]), newSlice)
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
