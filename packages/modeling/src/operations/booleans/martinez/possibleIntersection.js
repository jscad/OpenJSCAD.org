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
 * and split the segments if an intersection is detected.
 * @param {SweepEvent} se1
 * @param {SweepEvent} se2
 * @param {Queue} queue
 * @return
 *   0=no intersection
 *   1=intersect point
 *   2=overlap, left points cooinciding
 *   3=overlap, right points cooinciding
 *   4=segments overlap
 *   5=segment within segment
 */
export const possibleIntersection = (se1, se2, queue) => {
  // null = no intersection
  // array[1] = point of intersection
  // array[2] = line overlaps, segment of overlap, i.e. two points
  const inter = segmentIntersection(
    se1.point, se1.otherEvent.point,
    se2.point, se2.otherEvent.point
  )

  const nIntersections = inter ? inter.length : 0

  // no intersection of segments
  if (nIntersections === 0) return 0

  // single point of intersection, check the end points
  if ((nIntersections === 1) &&
      (equals(se1.point, se2.point) ||
       equals(se1.otherEvent.point, se2.otherEvent.point))) {
    return 0
  }

  // single point of intersection, divide the segments
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

  // segments overlap, check for same subject/clipping
  if (nIntersections === 2 && se1.isSubject === se2.isSubject) {
    return 0
  }

  // segments overlap, determine the overlap, and divide segments
  // FIXME eliminate this stack
  const segmentEvents = []
  let leftCoincide = false
  let rightCoincide = false

  if (equals(se1.point, se2.point)) {
    leftCoincide = true // linked
  } else if (compareEvents(se1, se2) === 1) {
    segmentEvents.push(se2, se1)
  } else {
    segmentEvents.push(se1, se2)
  }

  if (equals(se1.otherEvent.point, se2.otherEvent.point)) {
    rightCoincide = true
  } else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1) {
    segmentEvents.push(se2.otherEvent, se1.otherEvent)
  } else {
    segmentEvents.push(se1.otherEvent, se2.otherEvent)
  }

  if (leftCoincide) {
    // both line segments are equal or share the left endpoint
    // FIXME: this setting of type should be done outside this function
    se2.type = NON_CONTRIBUTING
    se1.type = (se2.inOut === se1.inOut) ? SAME_TRANSITION : DIFFERENT_TRANSITION

    if (!rightCoincide) {
      // honestly no idea, but changing segmentEvents selection from [2, 1]
      // to [0, 1] fixes the overlapping self-intersecting polygons issue
      divideSegment(segmentEvents[1].otherEvent, segmentEvents[0].point, queue)
    }
    return 2
  }

  // the line segments share the right endpoint
  if (rightCoincide) {
    divideSegment(segmentEvents[0], segmentEvents[1].point, queue)
    return 3
  }

  // no line segment includes totally the other one
  if (segmentEvents[0] !== segmentEvents[3].otherEvent) {
    divideSegment(segmentEvents[0], segmentEvents[1].point, queue)
    divideSegment(segmentEvents[1], segmentEvents[2].point, queue)
    return 4
  }

  // one line segment includes the other one
  divideSegment(segmentEvents[0], segmentEvents[1].point, queue)
  divideSegment(segmentEvents[3].otherEvent, segmentEvents[2].point, queue)

  return 5
}
