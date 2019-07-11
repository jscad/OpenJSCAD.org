const {Stream} = require('most')

/** The base Subject class, which is an extension of Stream
 * @typedef {Object} Subject
 */
class Subject extends Stream {
  /**
   * Push a new value to the stream
   *
   * @method next
   *
   * @param  {any}   value The value you want to push to the stream
   */
  next (value) {
    this.source.next(value)
  }

  /**
   * Push an error and end the stream
   *
   * @method error
   *
   * @param  {Error} err The error you would like to push to the stream
   */
  error (err) {
    this.source.error(err)
  }

  /**
   * Ends the stream with an optional value
   *
   * @method complete
   *
   * @param  {any} value The value you would like to end the stream on
   */
  complete (value) {
    this.source.complete(value)
  }
}

module.exports = {Subject}
