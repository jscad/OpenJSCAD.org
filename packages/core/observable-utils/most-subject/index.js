/* @flow */
const {Subject} = require('./Subject')
const {SubjectSource} = require('./source/SubjectSource')
const {HoldSubjectSource} = require('./source/HoldSubjectSource')

/**
 * Creates a new Subject
 *
 * @return {Subject} {@link Subject}
 *
 * @example
 * const {subject} = require( 'most-subject'
 *
 * const stream = subject()
 *
 * stream.map(fn).observe(x => console.log(x))
 * // 1
 * // 2
 *
 * stream.next(1)
 * stream.next(2)
 * setTimeout(() => stream.complete(), 10)
 */
function subject () {
  return new Subject(new SubjectSource())
}

/**
 * Create a subject with a buffer to keep = require( missing events.
 *
 * @param  {number}    bufferSize =             1 The maximum size of the
 * buffer to create.
 *
 * @return {Subject} {@link Subject}
 *
 * @example
 * const {holdSubject} = require( 'most-subject'
 *
 * const stream = holdSubject(3)
 *
 * stream.next(1)
 * stream.next(2)
 * stream.next(3)
 *
 * stream.map(fn).observe(x => console.log(x))
 * // 1
 * // 2
 * // 3
 *
 * setTimeout(() => stream.complete(), 10)
 */
function holdSubject (bufferSize = 1) {
  if (bufferSize <= 0) {
    throw new Error('First and only argument to holdSubject `bufferSize` ' +
      'must be an integer 1 or greater')
  }
  return new Subject(new HoldSubjectSource(bufferSize))
}
module.exports = {subject, holdSubject}
