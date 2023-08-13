/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { equals } from '../../../maths/vec2/index.js'
import { divideSegment } from './divideSegment.js'
import { segmentIntersection } from './segmentIntersection.js'
import { compareEvents } from './compareEvents.js'
import {
  NON_CONTRIBUTING,
  SAME_TRANSITION,
  DIFFERENT_TRANSITION
} from './edgeType.js'

/**
 * @param {SweepEvent} se1
 * @param {SweepEvent} se2
 * @param {Queue} queue
 * @return {number}
 */
export const possibleIntersection = (se1, se2, queue) => {
  // that disallows self-intersecting polygons,
  // did cost us half a day, so I'll leave it
  // out of respect
  // if (se1.isSubject === se2.isSubject) return
  const inter = segmentIntersection(
    se1.point, se1.otherEvent.point,
    se2.point, se2.otherEvent.point
  )

  const nIntersections = inter ? inter.length : 0
  if (nIntersections === 0) return 0 // no intersection

  // the line segments intersect at an endpoint of both line segments
  if ((nIntersections === 1) &&
      (equals(se1.point, se2.point) ||
       equals(se1.otherEvent.point, se2.otherEvent.point))) {
    return 0
  }

  if (nIntersections === 2 && se1.isSubject === se2.isSubject) {
    return 0
  }

  // The line segments associated to se1 and se2 intersect
  if (nIntersections === 1) {
    // if the intersection point is not an endpoint of se1
    if (!equals(se1.point, inter[0]) && !equals(se1.otherEvent.point, inter[0])) {
      divideSegment(se1, inter[0], queue)
    }

    // if the intersection point is not an endpoint of se2
    if (!equals(se2.point, inter[0]) && !equals(se2.otherEvent.point, inter[0])) {
      divideSegment(se2, inter[0], queue)
    }
    return 1
  }

  // The line segments associated to se1 and se2 overlap
  const events = []
  let leftCoincide = false
  let rightCoincide = false

  if (equals(se1.point, se2.point)) {
    leftCoincide = true // linked
  } else if (compareEvents(se1, se2) === 1) {
    events.push(se2, se1)
  } else {
    events.push(se1, se2)
  }

  if (equals(se1.otherEvent.point, se2.otherEvent.point)) {
    rightCoincide = true
  } else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1) {
    events.push(se2.otherEvent, se1.otherEvent)
  } else {
    events.push(se1.otherEvent, se2.otherEvent)
  }

  if ((leftCoincide && rightCoincide) || leftCoincide) {
    // both line segments are equal or share the left endpoint
    se2.type = NON_CONTRIBUTING
    se1.type = (se2.inOut === se1.inOut) ? SAME_TRANSITION : DIFFERENT_TRANSITION

    if (leftCoincide && !rightCoincide) {
      // honestly no idea, but changing events selection from [2, 1]
      // to [0, 1] fixes the overlapping self-intersecting polygons issue
      divideSegment(events[1].otherEvent, events[0].point, queue)
    }
    return 2
  }

  // the line segments share the right endpoint
  if (rightCoincide) {
    divideSegment(events[0], events[1].point, queue)
    return 3
  }

  // no line segment includes totally the other one
  if (events[0] !== events[3].otherEvent) {
    divideSegment(events[0], events[1].point, queue)
    divideSegment(events[1], events[2].point, queue)
    return 3
  }

  // one line segment includes the other one
  divideSegment(events[0], events[1].point, queue)
  divideSegment(events[3].otherEvent, events[2].point, queue)

  return 3
}
