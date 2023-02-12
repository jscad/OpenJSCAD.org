/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { compareEvents } from './compareEvents.js'
import { Contour } from './contour.js'

/**
 * @param {Array.<SweepEvent>} sortedEvents
 * @return {Array.<SweepEvent>}
 */
const orderEvents = (sortedEvents) => {
  let event, i, len, tmp
  const resultEvents = []
  for (i = 0, len = sortedEvents.length; i < len; i++) {
    event = sortedEvents[i]
    if ((event.left && event.inResult) ||
      (!event.left && event.otherEvent.inResult)) {
      resultEvents.push(event)
    }
  }
  // Due to overlapping edges the resultEvents array can be not wholly sorted
  let sorted = false
  while (!sorted) {
    sorted = true
    for (i = 0, len = resultEvents.length; i < len; i++) {
      if ((i + 1) < len &&
        compareEvents(resultEvents[i], resultEvents[i + 1]) === 1) {
        tmp = resultEvents[i]
        resultEvents[i] = resultEvents[i + 1]
        resultEvents[i + 1] = tmp
        sorted = false
      }
    }
  }

  for (i = 0, len = resultEvents.length; i < len; i++) {
    event = resultEvents[i]
    event.otherPos = i
  }

  // imagine, the right event is found in the beginning of the queue,
  // when his left counterpart is not marked yet
  for (i = 0, len = resultEvents.length; i < len; i++) {
    event = resultEvents[i]
    if (!event.left) {
      tmp = event.otherPos
      event.otherPos = event.otherEvent.otherPos
      event.otherEvent.otherPos = tmp
    }
  }

  return resultEvents
}

/**
 * @param {Number} pos
 * @param {Array.<SweepEvent>} resultEvents
 * @param {Object>} processed
 * @return {Number}
 */
const nextPos = (pos, resultEvents, processed, origPos) => {
  let newPos = pos + 1
  const p = resultEvents[pos].point
  let p1
  const length = resultEvents.length

  if (newPos < length) { p1 = resultEvents[newPos].point }

  while (newPos < length && p1[0] === p[0] && p1[1] === p[1]) {
    if (!processed[newPos]) {
      return newPos
    } else {
      newPos++
    }
    if (newPos < length) {
      p1 = resultEvents[newPos].point
    }
  }

  newPos = pos - 1

  while (processed[newPos] && newPos > origPos) {
    newPos--
  }

  return newPos
}

const initializeContourFromContext = (event, contours, contourId) => {
  const contour = new Contour()
  if (event.prevInResult != null) {
    const prevInResult = event.prevInResult
    // Note that it is valid to query the "previous in result" for its output contour id,
    // because we must have already processed it (i.e., assigned an output contour id)
    // in an earlier iteration, otherwise it wouldn't be possible that it is "previous in
    // result".
    const lowerContourId = prevInResult.outputContourId
    const lowerResultTransition = prevInResult.resultTransition
    if (lowerContourId < 0) {
      contour.holeOf = null
      contour.depth = 0
    } else if (lowerResultTransition > 0) {
      // We are inside. Now we have to check if the thing below us is another hole or
      // an exterior contour.
      const lowerContour = contours[lowerContourId]
      if (lowerContour.holeOf != null) {
        // The lower contour is a hole => Connect the new contour as a hole to its parent,
        // and use same depth.
        const parentContourId = lowerContour.holeOf
        contours[parentContourId].holeIds.push(contourId)
        contour.holeOf = parentContourId
        contour.depth = contours[lowerContourId].depth
      } else {
        // The lower contour is an exterior contour => Connect the new contour as a hole,
        // and increment depth.
        contours[lowerContourId].holeIds.push(contourId)
        contour.holeOf = lowerContourId
        contour.depth = contours[lowerContourId].depth + 1
      }
    } else {
      // We are outside => this contour is an exterior contour of same depth.
      contour.holeOf = null
      contour.depth = contours[lowerContourId].depth
    }
  } else {
    // There is no lower/previous contour => this contour is an exterior contour of depth 0.
    contour.holeOf = null
    contour.depth = 0
  }
  return contour
}

/**
 * @param {Array.<SweepEvent>} sortedEvents
 * @return {Array.<*>} polygons
 */
export const connectEdges = (sortedEvents) => {
  const resultEvents = orderEvents(sortedEvents)
  const len = resultEvents.length

  // "false"-filled array
  const processed = {}
  const contours = []

  for (let i = 0; i < len; i++) {
    if (processed[i]) {
      continue
    }

    const contourId = contours.length
    const contour = initializeContourFromContext(resultEvents[i], contours, contourId)

    // Helper function that combines marking an event as processed with assigning its output contour ID
    const markAsProcessed = (pos) => {
      processed[pos] = true
      if (pos < resultEvents.length && resultEvents[pos]) {
        resultEvents[pos].outputContourId = contourId
      }
    }

    let pos = i
    const origPos = i

    const initial = resultEvents[i].point
    contour.points.push(initial)

    while (true) {
      markAsProcessed(pos)

      pos = resultEvents[pos].otherPos

      markAsProcessed(pos)
      contour.points.push(resultEvents[pos].point)

      pos = nextPos(pos, resultEvents, processed, origPos)

      if (pos === origPos || pos >= resultEvents.length || !resultEvents[pos]) {
        break
      }
    }

    contours.push(contour)
  }

  return contours
}
