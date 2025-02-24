/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { compareEvents } from './compareEvents.js'
import { DIFFERENCE } from './operation.js'
import { SweepEvent } from './sweepEvent.js'
import { Queue } from './tinyqueue.js'

let externalRingId = 0

const processPolygon = (contourOrHole, isSubject, ringId, queue, bbox, isExteriorRing) => {
  const len = contourOrHole.length - 1
  for (let i = 0; i < len; i++) {
    const s1 = contourOrHole[i]
    const s2 = contourOrHole[i + 1]
    const e1 = new SweepEvent(s1, false, undefined, isSubject)
    const e2 = new SweepEvent(s2, false, e1, isSubject)

    e1.otherEvent = e2

    if (s1[0] === s2[0] && s1[1] === s2[1]) {
      continue // skip collapsed edges, or it breaks
    }

    e1.contourId = e2.contourId = ringId
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
    bbox[0] = Math.min(bbox[0], x)
    bbox[1] = Math.min(bbox[1], y)
    bbox[2] = Math.max(bbox[2], x)
    bbox[3] = Math.max(bbox[3], y)

    // Pushing it so the queue is sorted from left to right,
    // with object on the left having the highest priority.
    queue.push(e1)
    queue.push(e2)
  }
}

export const fillQueue = (subject, clipping, sbbox, cbbox, operation) => {
  const eventQueue = new Queue([], compareEvents)

  for (let i = 0; i < subject.length; i++) {
    const polygonSet = subject[i]
    for (let j = 0; j < polygonSet.length; j++) {
      const isExteriorRing = j === 0
      if (isExteriorRing) externalRingId++
      processPolygon(polygonSet[j], true, externalRingId, eventQueue, sbbox, isExteriorRing)
    }
  }

  for (let i = 0; i < clipping.length; i++) {
    const polygonSet = clipping[i]
    for (let j = 0; j < polygonSet.length; j++) {
      let isExteriorRing = j === 0
      if (operation === DIFFERENCE) isExteriorRing = false
      if (isExteriorRing) externalRingId++
      processPolygon(polygonSet[j], false, externalRingId, eventQueue, cbbox, isExteriorRing)
    }
  }

  return eventQueue
}
