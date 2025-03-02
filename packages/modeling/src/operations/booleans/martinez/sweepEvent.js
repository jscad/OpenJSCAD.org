import { NORMAL } from './edgeType.js'

export class SweepEvent {
  /**
   * Sweepline event
   *
   * @class {SweepEvent}
   * @param {Array.<Number>} point
   * @param {boolean} left
   * @param {SweepEvent=} otherEvent
   * @param {boolean} isSubject
   * @param {number} type OPTIONAL
   */
  constructor (point, left, otherEvent, isSubject, type = NORMAL) {
    /**
     * Is left endpoint?
     * @type {Boolean}
     */
    this.left = left

    /**
     * @type {Array.<Number>}
     */
    this.point = point

    /**
     * Other edge reference
     * @type {SweepEvent}
     */
    this.otherEvent = otherEvent

    /**
     * Belongs to source or clipping polygon
     * @type {Boolean}
     */
    this.isSubject = isSubject

    /**
     * Edge contribution type
     * @type {Number}
     */
    this.type = type

    /**
     * In-out transition for the sweepline crossing polygon
     * @type {Boolean}
     */
    this.inOut = false

    /**
     * @type {Boolean}
     */
    this.otherInOut = false

    /**
     * Previous event in result?
     * @type {SweepEvent}
     */
    this.prevInResult = null

    /**
     * Type of result transition (0 = not in result, +1 = out-in, -1, in-out)
     * @type {Number}
     */
    this.resultTransition = 0

    // connection step

    /**
     * @type {Number}
     */
    this.otherPos = -1

    /**
     * @type {Number}
     */
    this.outputContourId = -1

    this.isExteriorRing = true // TODO: Looks unused, remove?
  }

  /**
   * @param {Array.<Number>} p
   * @return {Boolean}
   */
  isBelow (p) {
    const p0 = this.point
    const p1 = this.otherEvent.point
    return this.left
      ? (p0[0] - p[0]) * (p1[1] - p[1]) - (p1[0] - p[0]) * (p0[1] - p[1]) > 0
      // signedArea(this.point, this.otherEvent.point, p) > 0 :
      : (p1[0] - p[0]) * (p0[1] - p[1]) - (p0[0] - p[0]) * (p1[1] - p[1]) > 0
    // signedArea(this.otherEvent.point, this.point, p) > 0
  }

  /**
   * @param {Array.<Number>} p
   * @return {Boolean}
   */
  isAbove (p) {
    return !this.isBelow(p)
  }

  /**
   * @return {Boolean}
   */
  isVertical () {
    return this.point[0] === this.otherEvent.point[0]
  }

  /**
   * Does event belong to result?
   * @return {Boolean}
   */
  get inResult () {
    return this.resultTransition !== 0
  }
}
