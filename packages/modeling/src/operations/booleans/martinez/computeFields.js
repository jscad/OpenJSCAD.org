/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import {
  NORMAL,
  SAME_TRANSITION,
  DIFFERENT_TRANSITION,
  NON_CONTRIBUTING
} from './edgeType.js'
import {
  INTERSECTION,
  UNION,
  DIFFERENCE,
  XOR
} from './operation.js'

/**
 * @param {SweepEvent} event
 * @param {SweepEvent} prev
 * @param {Operation} operation
 */
export const computeFields = (event, prev, operation) => {
  // compute inOut and otherInOut fields
  if (prev === null) {
    event.inOut = false
    event.otherInOut = true

  // previous line segment in sweepline belongs to the same polygon
  } else {
    if (event.isSubject === prev.isSubject) {
      event.inOut = !prev.inOut
      event.otherInOut = prev.otherInOut

    // previous line segment in sweepline belongs to the clipping polygon
    } else {
      event.inOut = !prev.otherInOut
      event.otherInOut = prev.isVertical() ? !prev.inOut : prev.inOut
    }

    // compute prevInResult field
    if (prev) {
      event.prevInResult = (!inResult(prev, operation) || prev.isVertical()) ? prev.prevInResult : prev
    }
  }

  // check if the line segment belongs to the Boolean operation
  const isInResult = inResult(event, operation)
  if (isInResult) {
    event.resultTransition = determineResultTransition(event, operation)
  } else {
    event.resultTransition = 0
  }
}

const inResult = (event, operation) => {
  switch (event.type) {
    case NORMAL:
      switch (operation) {
        case INTERSECTION:
          return !event.otherInOut
        case UNION:
          return event.otherInOut
        case DIFFERENCE:
          // return (event.isSubject && !event.otherInOut) ||
          //         (!event.isSubject && event.otherInOut)
          return (event.isSubject && event.otherInOut) ||
                  (!event.isSubject && !event.otherInOut)
        case XOR:
          return true
      }
      break
    case SAME_TRANSITION:
      return operation === INTERSECTION || operation === UNION
    case DIFFERENT_TRANSITION:
      return operation === DIFFERENCE
    case NON_CONTRIBUTING:
      return false
  }
  return false
}

const determineResultTransition = (event, operation) => {
  const thisIn = !event.inOut
  const thatIn = !event.otherInOut

  let isIn
  switch (operation) {
    case INTERSECTION:
      isIn = thisIn && thatIn
      break
    case UNION:
      isIn = thisIn || thatIn
      break
    case XOR:
      isIn = thisIn ^ thatIn
      break
    case DIFFERENCE:
      if (event.isSubject) {
        isIn = thisIn && !thatIn
      } else {
        isIn = thatIn && !thisIn
      }
      break
  }
  return isIn ? +1 : -1
}

export default computeFields
