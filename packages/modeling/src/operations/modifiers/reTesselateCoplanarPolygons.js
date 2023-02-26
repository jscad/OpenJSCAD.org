import { EPS } from '../../maths/constants.js'
import { interpolateBetween2DPointsForY } from '../../maths/utils/index.js'
import { OrthoNormalBasis } from '../../maths/OrthoNormalBasis.js'

import * as line2 from '../../maths/line2/index.js'
import * as vec2 from '../../maths/vec2/index.js'

import { insertSorted, fnNumberSort } from '../../utils/index.js'

import * as poly3 from '../../geometries/poly3/index.js'

/*
 * Retesselation for a set of COPLANAR polygons.
 * @param {poly3[]} sourcePolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
export const reTesselateCoplanarPolygons = (sourcePolygons) => {
  if (sourcePolygons.length < 2) return sourcePolygons

  const destPolygons = []
  const numPolygons = sourcePolygons.length
  const plane = poly3.plane(sourcePolygons[0])
  const orthobasis = new OrthoNormalBasis(plane)
  const polygonVertices2d = [] // array of array of Vector2D
  const polygonTopVertexIndexes = [] // array of indexes of topmost vertex per polygon
  const topy2polygonIndexes = new Map()
  const yCoordinateToPolygonIndexes = new Map()

  // convert all polygon vertices to 2D
  // Make a list of all encountered y coordinates
  // And build a map of all polygons that have a vertex at a certain y coordinate:
  const yCoordinateBins = new Map()
  const yCoordinateBinningFactor = 10 / EPS
  for (let polygonIndex = 0; polygonIndex < numPolygons; polygonIndex++) {
    const poly3d = sourcePolygons[polygonIndex]
    let vertices2d = []
    let numVertices = poly3d.vertices.length
    let minIndex = -1
    if (numVertices > 0) {
      let miny
      let maxy
      for (let i = 0; i < numVertices; i++) {
        let pos2d = orthobasis.to2D(poly3d.vertices[i])
        // perform binning of y coordinates: If we have multiple vertices very
        // close to each other, give them the same y coordinate:
        const yCoordinateBin = Math.floor(pos2d[1] * yCoordinateBinningFactor)
        let newY
        if (yCoordinateBins.has(yCoordinateBin)) {
          newY = yCoordinateBins.get(yCoordinateBin)
        } else if (yCoordinateBins.has(yCoordinateBin + 1)) {
          newY = yCoordinateBins.get(yCoordinateBin + 1)
        } else if (yCoordinateBins.has(yCoordinateBin - 1)) {
          newY = yCoordinateBins.get(yCoordinateBin - 1)
        } else {
          newY = pos2d[1]
          yCoordinateBins.set(yCoordinateBin, pos2d[1])
        }
        pos2d = vec2.fromValues(pos2d[0], newY)
        vertices2d.push(pos2d)
        const y = pos2d[1]
        if ((i === 0) || (y < miny)) {
          miny = y
          minIndex = i
        }
        if ((i === 0) || (y > maxy)) {
          maxy = y
        }
        let polygonIndexes = yCoordinateToPolygonIndexes.get(y)
        if (!polygonIndexes) {
          polygonIndexes = {} // PERF
          yCoordinateToPolygonIndexes.set(y, polygonIndexes)
        }
        polygonIndexes[polygonIndex] = true
      }
      if (miny >= maxy) {
        // degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
        vertices2d = []
        numVertices = 0
        minIndex = -1
      } else {
        let polygonIndexes = topy2polygonIndexes.get(miny)
        if (!polygonIndexes) {
          polygonIndexes = []
          topy2polygonIndexes.set(miny, polygonIndexes)
        }
        polygonIndexes.push(polygonIndex)
      }
    } // if(numVertices > 0)
    // reverse the vertex order:
    vertices2d.reverse()
    minIndex = numVertices - minIndex - 1
    polygonVertices2d.push(vertices2d)
    polygonTopVertexIndexes.push(minIndex)
  }

  const yCoordinates = []
  yCoordinateToPolygonIndexes.forEach((polylist, y) => yCoordinates.push(y))
  yCoordinates.sort(fnNumberSort)

  // Now we will iterate over all y coordinates, from lowest to highest y coordinate
  // activePolygons: source polygons that are 'active', i.e. intersect with our y coordinate
  //   Is sorted so the polygons are in left to right order
  // Each element in activePolygons has these properties:
  //        polygonIndex: the index of the source polygon (i.e. an index into the sourcePolygons
  //                      and polygonVertices2d arrays)
  //        leftVertexIndex: the index of the vertex at the left side of the polygon (lowest x)
  //                         that is at or just above the current y coordinate
  //        rightVertexIndex: ditto at right hand side of polygon
  //        topLeft, bottomLeft: coordinates of the left side of the polygon crossing the current y coordinate
  //        topRight, bottomRight: coordinates of the right hand side of the polygon crossing the current y coordinate
  let activePolygons = []
  let prevOutPolygonRow = []
  for (let yIndex = 0; yIndex < yCoordinates.length; yIndex++) {
    const newOutPolygonRow = []
    const yCoordinate = yCoordinates[yIndex]

    // update activePolygons for this y coordinate:
    // - Remove any polygons that end at this y coordinate
    // - update leftVertexIndex and rightVertexIndex (which point to the current vertex index
    //   at the left and right side of the polygon
    // Iterate over all polygons that have a corner at this y coordinate:
    const polygonIndexesWithCorner = yCoordinateToPolygonIndexes.get(yCoordinate)
    for (let activePolygonIndex = 0; activePolygonIndex < activePolygons.length; ++activePolygonIndex) {
      const activePolygon = activePolygons[activePolygonIndex]
      const polygonIndex = activePolygon.polygonIndex
      if (polygonIndexesWithCorner[polygonIndex]) {
        // this active polygon has a corner at this y coordinate:
        const vertices2d = polygonVertices2d[polygonIndex]
        const numVertices = vertices2d.length
        let newLeftVertexIndex = activePolygon.leftVertexIndex
        let newRightVertexIndex = activePolygon.rightVertexIndex
        // See if we need to increase leftVertexIndex or decrease rightVertexIndex:
        while (true) {
          let nextLeftVertexIndex = newLeftVertexIndex + 1
          if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0
          if (vertices2d[nextLeftVertexIndex][1] !== yCoordinate) break
          newLeftVertexIndex = nextLeftVertexIndex
        }
        let nextRightVertexIndex = newRightVertexIndex - 1
        if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1
        if (vertices2d[nextRightVertexIndex][1] === yCoordinate) {
          newRightVertexIndex = nextRightVertexIndex
        }
        if ((newLeftVertexIndex !== activePolygon.leftVertexIndex) && (newLeftVertexIndex === newRightVertexIndex)) {
          // We have increased leftVertexIndex or decreased rightVertexIndex, and now they point to the same vertex
          // This means that this is the bottom point of the polygon. We'll remove it:
          activePolygons.splice(activePolygonIndex, 1)
          --activePolygonIndex
        } else {
          activePolygon.leftVertexIndex = newLeftVertexIndex
          activePolygon.rightVertexIndex = newRightVertexIndex
          activePolygon.topLeft = vertices2d[newLeftVertexIndex]
          activePolygon.topRight = vertices2d[newRightVertexIndex]
          let nextLeftVertexIndex = newLeftVertexIndex + 1
          if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0
          activePolygon.bottomLeft = vertices2d[nextLeftVertexIndex]
          let nextRightVertexIndex = newRightVertexIndex - 1
          if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1
          activePolygon.bottomRight = vertices2d[nextRightVertexIndex]
        }
      } // if polygon has corner here
    } // for activePolygonIndex
    let nextYcoordinate
    if (yIndex >= yCoordinates.length - 1) {
      // last row, all polygons must be finished here:
      activePolygons = []
      nextYcoordinate = null
    } else { // yIndex < yCoordinates.length-1
      nextYcoordinate = Number(yCoordinates[yIndex + 1])
      const middleYcoordinate = 0.5 * (yCoordinate + nextYcoordinate)
      // update activePolygons by adding any polygons that start here:
      const startingPolygonIndexes = topy2polygonIndexes.get(yCoordinate)
      for (const polygonIndexKey in startingPolygonIndexes) {
        const polygonIndex = startingPolygonIndexes[polygonIndexKey]
        const vertices2d = polygonVertices2d[polygonIndex]
        const numVertices = vertices2d.length
        const topVertexIndex = polygonTopVertexIndexes[polygonIndex]
        // the top of the polygon may be a horizontal line. In that case topVertexIndex can point to any point on this line.
        // Find the left and right topmost vertices which have the current y coordinate:
        let topLeftVertexIndex = topVertexIndex
        while (true) {
          let i = topLeftVertexIndex + 1
          if (i >= numVertices) i = 0
          if (vertices2d[i][1] !== yCoordinate) break
          if (i === topVertexIndex) break // should not happen, but just to prevent endless loops
          topLeftVertexIndex = i
        }
        let topRightVertexIndex = topVertexIndex
        while (true) {
          let i = topRightVertexIndex - 1
          if (i < 0) i = numVertices - 1
          if (vertices2d[i][1] !== yCoordinate) break
          if (i === topLeftVertexIndex) break // should not happen, but just to prevent endless loops
          topRightVertexIndex = i
        }
        let nextLeftVertexIndex = topLeftVertexIndex + 1
        if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0
        let nextRightVertexIndex = topRightVertexIndex - 1
        if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1
        const newActivePolygon = {
          polygonIndex,
          leftVertexIndex: topLeftVertexIndex,
          rightVertexIndex: topRightVertexIndex,
          topLeft: vertices2d[topLeftVertexIndex],
          topRight: vertices2d[topRightVertexIndex],
          bottomLeft: vertices2d[nextLeftVertexIndex],
          bottomRight: vertices2d[nextRightVertexIndex]
        }
        insertSorted(activePolygons, newActivePolygon, (el1, el2) => {
          const x1 = interpolateBetween2DPointsForY(el1.topLeft, el1.bottomLeft, middleYcoordinate)
          const x2 = interpolateBetween2DPointsForY(el2.topLeft, el2.bottomLeft, middleYcoordinate)
          if (x1 > x2) return 1
          if (x1 < x2) return -1
          return 0
        })
      } // for(let polygonIndex in startingPolygonIndexes)
    } //  yIndex < yCoordinates.length-1

    // Now activePolygons is up to date
    // Build the output polygons for the next row in newOutPolygonRow:
    for (const activePolygonKey in activePolygons) {
      const activePolygon = activePolygons[activePolygonKey]

      let x = interpolateBetween2DPointsForY(activePolygon.topLeft, activePolygon.bottomLeft, yCoordinate)
      const topLeft = vec2.fromValues(x, yCoordinate)
      x = interpolateBetween2DPointsForY(activePolygon.topRight, activePolygon.bottomRight, yCoordinate)
      const topRight = vec2.fromValues(x, yCoordinate)
      x = interpolateBetween2DPointsForY(activePolygon.topLeft, activePolygon.bottomLeft, nextYcoordinate)
      const bottomLeft = vec2.fromValues(x, nextYcoordinate)
      x = interpolateBetween2DPointsForY(activePolygon.topRight, activePolygon.bottomRight, nextYcoordinate)
      const bottomRight = vec2.fromValues(x, nextYcoordinate)
      const outPolygon = {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        leftLine: line2.fromPoints(line2.create(), topLeft, bottomLeft),
        rightLine: line2.fromPoints(line2.create(), bottomRight, topRight)
      }
      if (newOutPolygonRow.length > 0) {
        const prevOutPolygon = newOutPolygonRow[newOutPolygonRow.length - 1]
        const d1 = vec2.distance(outPolygon.topLeft, prevOutPolygon.topRight)
        const d2 = vec2.distance(outPolygon.bottomLeft, prevOutPolygon.bottomRight)
        if ((d1 < EPS) && (d2 < EPS)) {
          // we can join this polygon with the one to the left:
          outPolygon.topLeft = prevOutPolygon.topLeft
          outPolygon.leftLine = prevOutPolygon.leftLine
          outPolygon.bottomLeft = prevOutPolygon.bottomLeft
          newOutPolygonRow.splice(newOutPolygonRow.length - 1, 1)
        }
      }
      newOutPolygonRow.push(outPolygon)
    } // for(activePolygon in activePolygons)
    if (yIndex > 0) {
      // try to match the new polygons against the previous row:
      const prevContinuedIndexes = new Set()
      const matchedIndexes = new Set()
      for (let i = 0; i < newOutPolygonRow.length; i++) {
        const thisPolygon = newOutPolygonRow[i]
        for (let ii = 0; ii < prevOutPolygonRow.length; ii++) {
          if (!matchedIndexes.has(ii)) { // not already processed?
            // We have a match if the sidelines are equal or if the top coordinates
            // are on the sidelines of the previous polygon
            const prevPolygon = prevOutPolygonRow[ii]
            if (vec2.distance(prevPolygon.bottomLeft, thisPolygon.topLeft) < EPS) {
              if (vec2.distance(prevPolygon.bottomRight, thisPolygon.topRight) < EPS) {
                // Yes, the top of this polygon matches the bottom of the previous:
                matchedIndexes.add(ii)
                // Now check if the joined polygon would remain convex:
                const v1 = line2.direction(thisPolygon.leftLine)
                const v2 = line2.direction(prevPolygon.leftLine)
                const d1 = v1[0] - v2[0]

                const v3 = line2.direction(thisPolygon.rightLine)
                const v4 = line2.direction(prevPolygon.rightLine)
                const d2 = v3[0] - v4[0]

                const leftLineContinues = Math.abs(d1) < EPS
                const rightLineContinues = Math.abs(d2) < EPS
                const leftLineIsConvex = leftLineContinues || (d1 >= 0)
                const rightLineIsConvex = rightLineContinues || (d2 >= 0)
                if (leftLineIsConvex && rightLineIsConvex) {
                  // yes, both sides have convex corners:
                  // This polygon will continue the previous polygon
                  thisPolygon.outPolygon = prevPolygon.outPolygon
                  thisPolygon.leftLineContinues = leftLineContinues
                  thisPolygon.rightLineContinues = rightLineContinues
                  prevContinuedIndexes.add(ii)
                }
                break
              }
            }
          } // if(!prevContinuedIndexes.has(ii))
        } // for ii
      } // for i
      for (let ii = 0; ii < prevOutPolygonRow.length; ii++) {
        if (!prevContinuedIndexes.has(ii)) {
          // polygon ends here
          // Finish the polygon with the last point(s):
          const prevPolygon = prevOutPolygonRow[ii]
          prevPolygon.outPolygon.rightPoints.push(prevPolygon.bottomRight)
          if (vec2.distance(prevPolygon.bottomRight, prevPolygon.bottomLeft) > EPS) {
            // polygon ends with a horizontal line:
            prevPolygon.outPolygon.leftPoints.push(prevPolygon.bottomLeft)
          }
          // reverse the left half so we get a counterclockwise circle:
          prevPolygon.outPolygon.leftPoints.reverse()
          const points2d = prevPolygon.outPolygon.rightPoints.concat(prevPolygon.outPolygon.leftPoints)
          const vertices3d = points2d.map((point2d) => orthobasis.to3D(point2d))
          const polygon = poly3.fromPointsAndPlane(vertices3d, plane) // TODO support shared

          // if we let empty polygon out, next retesselate will crash
          if (polygon.vertices.length) destPolygons.push(polygon)
        }
      }
    } // if(yIndex > 0)
    for (let i = 0; i < newOutPolygonRow.length; i++) {
      const thisPolygon = newOutPolygonRow[i]
      if (!thisPolygon.outPolygon) {
        // polygon starts here:
        thisPolygon.outPolygon = {
          leftPoints: [],
          rightPoints: []
        }
        thisPolygon.outPolygon.leftPoints.push(thisPolygon.topLeft)
        if (vec2.distance(thisPolygon.topLeft, thisPolygon.topRight) > EPS) {
          // we have a horizontal line at the top:
          thisPolygon.outPolygon.rightPoints.push(thisPolygon.topRight)
        }
      } else {
        // continuation of a previous row
        if (!thisPolygon.leftLineContinues) {
          thisPolygon.outPolygon.leftPoints.push(thisPolygon.topLeft)
        }
        if (!thisPolygon.rightLineContinues) {
          thisPolygon.outPolygon.rightPoints.push(thisPolygon.topRight)
        }
      }
    }
    prevOutPolygonRow = newOutPolygonRow
  } // for yIndex
  return destPolygons
}
