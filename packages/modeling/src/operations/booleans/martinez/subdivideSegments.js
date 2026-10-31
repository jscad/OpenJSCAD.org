/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { equals } from '../../../maths/vec2/index.js'

import { Tree } from './splaytree.js'
import { computeFields } from './computeFields.js'
import { possibleIntersection } from './possibleIntersection.js'
import { compareSegments } from './compareSegments.js'
import { compareEvents } from "./compareEvents.js"
import {
  INTERSECTION,
  DIFFERENCE
} from './operation.js'

export const subdivideSegments = (eventQueue, subject, clipping, sbbox, cbbox, operation) => {
  const sweepLine = new Tree(compareSegments)
  const sortedEvents = []

  const rightBound = Math.min(sbbox[2], cbbox[2])

  let prev, next, begin

  while (eventQueue.length !== 0) {
    const event = eventQueue.pop()
    sortedEvents.push(event)

    // optimization by bboxes for intersection and difference goes here
    if ((operation === INTERSECTION && event.point[0] > rightBound) ||
        (operation === DIFFERENCE && event.point[0] > sbbox[2])) {
      break
    }

    if (event.left) {
      prev = sweepLine.insert(event)
      begin = sweepLine.minNode()

      next = sweepLine.next(prev)

      if (prev !== begin) prev = sweepLine.prev(prev)
      else prev = null

      const prevEvent = prev ? prev.key : null
      const queueLength = eventQueue.length
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

      // Splitting a neighbour at this event's point can queue events that
      // precede this one (e.g. the left half of a segment divided exactly at
      // our left endpoint). Our fields were computed without them, so take
      // this event out and process it again after them (#155).
      if (eventQueue.length > queueLength) {
        const top = eventQueue.peek()
        if (equals(top.point, event.point) &&
          compareEvents(top, event) === -1 &&
          compareEvents(event, top) === 1
        ) {
          sweepLine.remove(event)
          sortedEvents.pop()
          eventQueue.push(event)
        }
      }
    } else {
      prev = sweepLine.find(event.otherEvent)
      next = prev

      if (prev && next) {
        // FIXME is this correct? begin is assigned if event.left, not every iterration
        if (prev !== begin) prev = sweepLine.prev(prev)
        else prev = null

        next = sweepLine.next(next)
        sweepLine.remove(event.otherEvent)

        if (next && prev) {
          possibleIntersection(prev.key, next.key, eventQueue)
        }
      }
    }
  }
  return sortedEvents
}
