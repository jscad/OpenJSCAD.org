// BinaryReader
// Converted to ES5 Class by @z3dev
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

// Original
// + Jonas Raoni Soares Silva
// @ http://jsfromhell.com/classes/binary-deserializer [rev. #1]

class BinaryReader {
  /*
   * Construct a BinaryReader from the given data.
   * The data is a string created from the specified sequence of UTF-16 code units.
   * See String.fromCharCode()
   * See _readByte() below
   */
  constructor (data) {
    this._buffer = data
    this._pos = 0
  }

  /* Public */
  readInt8 () { return this._decodeInt(8, true) }
  readUInt8 () { return this._decodeInt(8, false) }
  readInt16 () { return this._decodeInt(16, true) }
  readUInt16 () { return this._decodeInt(16, false) }
  readInt32 () { return this._decodeInt(32, true) }
  readUInt32 () { return this._decodeInt(32, false) }

  readFloat () { return this._decodeFloat(23, 8) }
  readDouble () { return this._decodeFloat(52, 11) }

  readChar () { return this.readString(1) }
  readString (length) {
    this._checkSize(length * 8)
    const result = this._buffer.substr(this._pos, length)
    this._pos += length
    return result
  }

  seek (pos) {
    this._pos = pos
    this._checkSize(0)
  }

  getPosition () {
    return this._pos
  }

  getSize () {
    return this._buffer.length
  }

  /* Private */
  _decodeFloat (precisionBits, exponentBits) {
    const length = precisionBits + exponentBits + 1
    const size = length >> 3
    this._checkSize(length)

    const bias = Math.pow(2, exponentBits - 1) - 1
    const signal = this._readBits(precisionBits + exponentBits, 1, size)
    const exponent = this._readBits(precisionBits, exponentBits, size)
    let significand = 0
    let divisor = 2
    let curByte = 0 // length + (-precisionBits >> 3) - 1;
    let startBit = 0
    do {
      const byteValue = this._readByte(++curByte, size)
      startBit = precisionBits % 8 || 8
      let mask = 1 << startBit
      while ((mask >>= 1)) {
        if (byteValue & mask) {
          significand += 1 / divisor
        }
        divisor *= 2
      }
    } while ((precisionBits -= startBit))

    this._pos += size

    return exponent === (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
      : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
          : Math.pow(2, exponent - bias) * (1 + significand) : 0)
  }

  _decodeInt (bits, signed) {
    const x = this._readBits(0, bits, bits / 8)
    const max = Math.pow(2, bits)
    const result = signed && x >= max / 2 ? x - max : x

    this._pos += bits / 8
    return result
  }

  // shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
  _shl (a, b) {
    for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) === 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
    return a
  }

  _readByte (i, size) {
    return this._buffer.charCodeAt(this._pos + size - i - 1) & 0xff
  }

  _readBits (start, length, size) {
    const offsetLeft = (start + length) % 8
    const offsetRight = start % 8
    const curByte = size - (start >> 3) - 1
    let lastByte = size + (-(start + length) >> 3)
    let diff = curByte - lastByte

    let sum = (this._readByte(curByte, size) >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1)

    if (diff && offsetLeft) {
      sum += (this._readByte(lastByte++, size) & ((1 << offsetLeft) - 1)) << (diff-- << 3) - offsetRight
    }

    while (diff) {
      sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight)
    }

    return sum
  }

  _checkSize (neededBits) {
    if (!(this._pos + Math.ceil(neededBits / 8) < this._buffer.length)) {
      // throw new Error("Index out of bound");
    }
  }
}

module.exports = BinaryReader
