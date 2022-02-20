/*
 * Blob.js
 *
 * Node and Browserify Compatible
 *
 * Copyright (c) 2015 by Z3 Dev (@zdev/www.z3dev.jp)
 * License: MIT License
 *
 * This implementation uses the Buffer class for all storage.
 * See https://nodejs.org/api/buffer.html
 *
 * URL.createObjectURL(blob)
 *
 * History:
 * 2020/10/07: converted to class
 * 2015/07/02: contributed to OpenJSCAD.org CLI openjscad
 */

/**
 * The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Blob
 */
class Blob {
  /**
   * Returns a newly created Blob object which contains a concatenation of all of the data in the given contents.
   * @param {Array} contents - an array of ArrayBuffer, or String objects that will be put inside the Blob.
   */
  constructor (contents, options) {
    // make the optional options non-optional
    options = options || {}
    // the size of the byte sequence in number of bytes
    this.size = 0 // contents, not allocation
    // the media type, as an ASCII-encoded string in lower case, and parsable as a MIME type
    this.type = ''
    // readability state (CLOSED: true, OPENED: false)
    this.isClosed = false
    // encoding of given strings
    this.encoding = 'utf8'
    // storage
    this.buffer = null
    this.length = 0 // allocation, not contents

    if (!contents) return
    if (!Array.isArray(contents)) return

    // Find content length
    contents.forEach((content) => {
      if (typeof (content) === 'string') {
        this.length += content.length
      } else if (content instanceof ArrayBuffer) {
        this.length += content.byteLength
      }
    })

    // process options if any
    if (options.type) {
      // TBD if type contains any chars outside range U+0020 to U+007E, then set type to the empty string
      // Convert every character in type to lowercase
      this.type = options.type.toLowerCase()
    }
    if (options.endings) {
      // convert the EOL on strings
    }
    if (options.encoding) {
      this.encoding = options.encoding.toLowerCase()
    }
    if (options.length) {
      this.length = options.length
    }

    let wbytes
    let object
    // convert the contents (String, ArrayBufferView, ArrayBuffer, Blob)
    // MAX_LENGTH : 2147483647
    this.buffer = Buffer.allocUnsafe(this.length) // new Buffer(this.length)
    for (let index = 0; index < contents.length; index++) {
      switch (typeof (contents[index])) {
        case 'string':
          wbytes = this.buffer.write(contents[index], this.size, this.encoding)
          this.size = this.size + wbytes
          break
        case 'object':
          object = contents[index] // this should be a reference to an object
          // FIXME if (Buffer.isBuffer(object)) { }
          if (object instanceof ArrayBuffer) {
            const view = new DataView(object)
            for (let bindex = 0; bindex < object.byteLength; bindex++) {
              const xbyte = view.getUint8(bindex)
              wbytes = this.buffer.writeUInt8(xbyte, this.size, false)
              this.size++
            }
          }
          break
        default:
          break
      }
    }
  }

  asBuffer () {
    // return a deep copy as blobs are written to files with full length, not size
    return this.buffer.slice(0, this.size)
  }

  arrayBuffer () {
    return this.buffer.slice(0, this.size)
  }

  slice (start, end, type) {
    start = start || 0
    end = end || this.size
    type = type || ''
    // TODO
    return new Blob()
  }

  stream () {
    // TODO
    return null
  }

  text () {
    // TODO
    return ''
  }

  close () {
    // if state of context objext is already CLOSED then return
    if (this.isClosed) return
    // set the readbility state of the context object to CLOSED and remove storage
    this.isClosed = true
  }

  toString () {
    // TODO
    return ''
  }
}

module.exports = Blob
