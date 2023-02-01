/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import Tree from './splaytree.js'
import computeFields from './computeFields.js'
import possibleIntersection from './possibleIntersection.js'
import compareSegments from './compareSegments.js'
import {
  INTERSECTION,
  DIFFERENCE
} from './operation.js'

const subdivideSegments = (eventQueue, subject, clipping, sbbox, cbbox, operation) => {
  const sweepLine = new Tree(compareSegments)
  const sortedEvents = []

  const rightbound = Math.min(sbbox[2], cbbox[2])

  let prev, next, begin

  while (eventQueue.length !== 0) {
    let event = eventQueue.pop()
    sortedEvents.push(event)

    // optimization by bboxes for intersection and difference goes here
    if ((operation === INTERSECTION && event.point[0] > rightbound) ||
        (operation === DIFFERENCE && event.point[0] > sbbox[2])) {
      break
    }

    if (event.left) {
      next = prev = sweepLine.insert(event)
      begin = sweepLine.minNode()

      if (prev !== begin) prev = sweepLine.prev(prev)
      else prev = null

      next = sweepLine.next(next)

      const prevEvent = prev ? prev.key : null
      let prevprevEvent
      computeFields(event, prevEvent, operation)
      if (next) {
        if (possibleIntersection(event, next.key, eventQueue) === 2) {
          computeFields(event, prevEvent, operation)
          computeFields(next.key, event, operation)
        }
      }

      if (prev) {
        if (possibleIntersection(prev.key, event, eventQueue) === 2) {
          let prevprev = prev
          if (prevprev !== begin) prevprev = sweepLine.prev(prevprev)
          else prevprev = null

          prevprevEvent = prevprev ? prevprev.key : null
          computeFields(prevEvent, prevprevEvent, operation)
          computeFields(event, prevEvent, operation)
        }
      }
    } else {
      event = event.otherEvent
      next = prev = sweepLine.find(event)

      if (prev && next) {
        if (prev !== begin) prev = sweepLine.prev(prev)
        else prev = null

        next = sweepLine.next(next)
        sweepLine.remove(event)

        if (next && prev) {
          possibleIntersection(prev.key, next.key, eventQueue)
        }
      }
    }
  }
  return sortedEvents
}

export default subdivideSegments
