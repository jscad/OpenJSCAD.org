import { SweepEvent } from './sweepEvent.js'
import { compareEvents } from './compareEvents.js'

/**
 * @param {SweepEvent} se
 * @param {Array.<Number>} p
 * @param {Queue} queue
 * @return {Queue}
 */
export const divideSegment = (se, p, queue) => {
  const r = new SweepEvent(p, false, se, se.isSubject)
  const l = new SweepEvent(p, true, se.otherEvent, se.isSubject)

  r.contourId = l.contourId = se.contourId

  // avoid a rounding error. The left event would be processed after the right event
  if (compareEvents(l, se.otherEvent) > 0) {
    se.otherEvent.left = true
    l.left = false
  }

  // avoid a rounding error. The left event would be processed after the right event
  // if (compareEvents(se, r) > 0) {}

  se.otherEvent.otherEvent = l
  se.otherEvent = r

  queue.push(l)
  queue.push(r)

  return queue
}
