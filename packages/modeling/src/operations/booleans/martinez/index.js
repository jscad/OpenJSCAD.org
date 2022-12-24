/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import subdivideSegments from './subdivide_segments.js'
import connectEdges from './connect_edges.js'
import fillQueue from './fill_queue.js'
import {
  INTERSECTION,
  DIFFERENCE,
  UNION,
  XOR
} from './operation.js'
import * as geom2 from '../../../geometries/geom2/index.js'

const EMPTY = []

/*
 * Fast path for trivial operations like intersection with empty geometry
 * Returns null if operation is non-trivial
 */
const trivialOperation = (subject, clipping, operation) => {
  let result = null
  if (subject.length * clipping.length === 0) {
    if (operation === INTERSECTION) {
      return EMPTY
    } else if (operation === DIFFERENCE) {
      result = subject
    } else if (operation === UNION ||
               operation === XOR) {
      result = (subject.length === 0) ? clipping : subject
    }
  }
  if (result === EMPTY) {
    return geom2.create()
  } else if (result) {
    return geom2.fromOutlines(result.flat())
  } else {
    return null
  }
}

/*
 * Fast path for non-intersection subjects
 * Returns null if operation is non-trivial
 */
const compareBBoxes = (subject, clipping, sbbox, cbbox, operation) => {
  let result = null
  if (sbbox[0] > cbbox[2] ||
      cbbox[0] > sbbox[2] ||
      sbbox[1] > cbbox[3] ||
      cbbox[1] > sbbox[3]) {
    if (operation === INTERSECTION) {
      result = EMPTY
    } else if (operation === DIFFERENCE) {
      result = subject
    } else if (operation === UNION ||
               operation === XOR) {
      result = subject.concat(clipping)
    }
  }
  if (result === EMPTY) {
    return geom2.create()
  } else if (result) {
    return geom2.fromOutlines(result.flat())
  } else {
    return null
  }
}

/*
 * Convert from geom2 to martinez data structure
 */
const toMartinez = (geometry) => {
  const outlines = geom2.toOutlines(geometry)
  outlines.forEach((outline) => {
    // Martinez expects first point == last point
    outline.push(outline[0])
  })
  return [outlines]
}

export default function boolean (subjectGeom, clippingGeom, operation) {
  // Convert from geom2 to outlines
  const subject = toMartinez(subjectGeom)
  const clipping = toMartinez(clippingGeom)

  let trivial = trivialOperation(subject, clipping, operation)
  if (trivial) {
    return trivial
  }
  const sbbox = [Infinity, Infinity, -Infinity, -Infinity]
  const cbbox = [Infinity, Infinity, -Infinity, -Infinity]

  // console.time('fill queue')
  const eventQueue = fillQueue(subject, clipping, sbbox, cbbox, operation)
  // console.timeEnd('fill queue')

  trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation)
  if (trivial) {
    return trivial
  }
  // console.time('subdivide edges')
  const sortedEvents = subdivideSegments(eventQueue, subject, clipping, sbbox, cbbox, operation)
  // console.timeEnd('subdivide edges')

  // console.time('connect vertices')
  const contours = connectEdges(sortedEvents, operation)
  // console.timeEnd('connect vertices')

  // Convert contours to geom2
  const polygons = []
  for (let i = 0; i < contours.length; i++) {
    const contour = contours[i]
    if (contour.isExterior()) {
      // The exterior ring goes first
      const rings = [contour.points]
      // Followed by holes if any
      for (let j = 0; j < contour.holeIds.length; j++) {
        const holeId = contour.holeIds[j]
        const holePoints = contours[holeId].points
        const hole = []
        for (let k = holePoints.length - 2; k >= 0; k--) {
          hole.push(holePoints[k])
        }
        rings.push(hole)
      }
      polygons.push(rings)
    }
  }

  if (polygons) {
    return geom2.fromOutlines(polygons.flat())
  } else {
    return geom2.create()
  }
}
