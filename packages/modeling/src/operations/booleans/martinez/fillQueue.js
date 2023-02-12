/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import compareEvents from './compareEvents.js'
import { DIFFERENCE } from './operation.js'
import SweepEvent from './sweepEvent.js'
import Queue from './tinyqueue.js'

const max = Math.max
const min = Math.min

let contourId = 0

const processPolygon = (contourOrHole, isSubject, depth, queue, bbox, isExteriorRing) => {
  const len = contourOrHole.length - 1
  let s1, s2, e1, e2
  for (let i = 0; i < len; i++) {
    s1 = contourOrHole[i]
    s2 = contourOrHole[i + 1]
    e1 = new SweepEvent(s1, false, undefined, isSubject)
    e2 = new SweepEvent(s2, false, e1, isSubject)
    e1.otherEvent = e2

    if (s1[0] === s2[0] && s1[1] === s2[1]) {
      continue // skip collapsed edges, or it breaks
    }

    e1.contourId = e2.contourId = depth
    if (!isExteriorRing) {
      e1.isExteriorRing = false
      e2.isExteriorRing = false
    }
    if (compareEvents(e1, e2) > 0) {
      e2.left = true
    } else {
      e1.left = true
    }

    const x = s1[0]
    const y = s1[1]
    bbox[0] = min(bbox[0], x)
    bbox[1] = min(bbox[1], y)
    bbox[2] = max(bbox[2], x)
    bbox[3] = max(bbox[3], y)

    // Pushing it so the queue is sorted from left to right,
    // with object on the left having the highest priority.
    queue.push(e1)
    queue.push(e2)
  }
}

export const fillQueue = (subject, clipping, sbbox, cbbox, operation) => {
  const eventQueue = new Queue([], compareEvents)
  let polygonSet, isExteriorRing, i, ii, j, jj //, k, kk

  for (i = 0, ii = subject.length; i < ii; i++) {
    polygonSet = subject[i]
    for (j = 0, jj = polygonSet.length; j < jj; j++) {
      isExteriorRing = j === 0
      if (isExteriorRing) contourId++
      processPolygon(polygonSet[j], true, contourId, eventQueue, sbbox, isExteriorRing)
    }
  }

  for (i = 0, ii = clipping.length; i < ii; i++) {
    polygonSet = clipping[i]
    for (j = 0, jj = polygonSet.length; j < jj; j++) {
      isExteriorRing = j === 0
      if (operation === DIFFERENCE) isExteriorRing = false
      if (isExteriorRing) contourId++
      processPolygon(polygonSet[j], false, contourId, eventQueue, cbbox, isExteriorRing)
    }
  }

  return eventQueue
}
