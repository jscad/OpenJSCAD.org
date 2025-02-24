/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { compareEvents } from './compareEvents.js'
import { Contour } from './contour.js'

/**
 * @param {SweepEvent[]} sortedEvents
 * @return {SweepEvent[]}
 */
const orderEvents = (sortedEvents) => {
  const resultEvents = []
  sortedEvents.forEach((e) => {
    if ((e.left && e.inResult) || (!e.left && e.otherEvent.inResult)) {
      resultEvents.push(e)
    }
  })
  // Due to overlapping edges the resultEvents array can be not wholly sorted
  let sorted = false
  while (!sorted) {
    sorted = true
    const len = resultEvents.length
    for (let i = 0; i < len; i++) {
      if ((i + 1) < len &&
        compareEvents(resultEvents[i], resultEvents[i + 1]) === 1) {
        const tmp = resultEvents[i]
        resultEvents[i] = resultEvents[i + 1]
        resultEvents[i + 1] = tmp
        sorted = false
      }
    }
  }
  // and index
  resultEvents.forEach((e, i) => { e.otherPos = i })

  // imagine, the right event is found in the beginning of the queue,
  // when his left counterpart is not marked yet
  resultEvents.forEach((e) => {
    if (!e.left) {
      const otherPos = e.otherPos
      e.otherPos = e.otherEvent.otherPos
      e.otherEvent.otherPos = otherPos
    }
  })

  return resultEvents
}

/**
 * @param {number} pos
 * @param {SweepEvent[]} resultEvents
 * @param {object} processed
 * @return {number}
 */
const nextPos = (pos, resultEvents, processed, origPos) => {
  const length = resultEvents.length

  const p0 = resultEvents[pos].point

  let newPos = pos + 1
  let p1
  if (newPos < length) { p1 = resultEvents[newPos].point }

  while (newPos < length && p1[0] === p0[0] && p1[1] === p0[1]) {
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
  const contour = new Contour() // default is exterior contour of depth 0

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
      contour.depth = contours[lowerContourId].depth
    }
  }
  return contour
}

/**
 * @param {Array.<SweepEvent>} sortedEvents
 * @return array of Contour
 */
export const connectEdges = (sortedEvents) => {
  const resultEvents = orderEvents(sortedEvents)
  const evlen = resultEvents.length

  const processed = []
  const contours = []

  for (let i = 0; i < evlen; i++) {
    if (processed[i]) {
      continue
    }

    const contourId = contours.length
    const contour = initializeContourFromContext(resultEvents[i], contours, contourId)

    // Helper function that combines marking an event as processed with assigning its output contour ID
    const markAsProcessed = (pos) => {
      processed[pos] = true
      if (pos < evlen) {
        resultEvents[pos].outputContourId = contourId
      }
    }

    let pos = i
    const origPos = i

    contour.points.push(resultEvents[pos].point)

    while (true) {
      markAsProcessed(pos)

      pos = resultEvents[pos].otherPos

      markAsProcessed(pos)
      contour.points.push(resultEvents[pos].point)

      pos = nextPos(pos, resultEvents, processed, origPos)

      if (pos === origPos || pos >= evlen) {
        break
      }
    }

    contours.push(contour)
  }

  return contours
}
