// BinaryReader
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

// Original
// + Jonas Raoni Soares Silva
// @ http://jsfromhell.com/classes/binary-deserializer [rev. #1]

function BinaryReader (data) {
  this._buffer = data
  this._pos = 0
};

BinaryReader.prototype = {

   /* Public */

  readInt8: function () { return this._decodeInt(8, true) },
  readUInt8: function () { return this._decodeInt(8, false) },
  readInt16: function () { return this._decodeInt(16, true) },
  readUInt16: function () { return this._decodeInt(16, false) },
  readInt32: function () { return this._decodeInt(32, true) },
  readUInt32: function () { return this._decodeInt(32, false) },

  readFloat: function () { return this._decodeFloat(23, 8) },
  readDouble: function () { return this._decodeFloat(52, 11) },

  readChar: function () { return this.readString(1) },
  readString: function (length) {
    this._checkSize(length * 8)
    var result = this._buffer.substr(this._pos, length)
    this._pos += length
    return result
  },

  seek: function (pos) {
    this._pos = pos
    this._checkSize(0)
  },

  getPosition: function () {
    return this._pos
  },

  getSize: function () {
    return this._buffer.length
  },

   /* Private */

  _decodeFloat: function (precisionBits, exponentBits) {
    var length = precisionBits + exponentBits + 1
    var size = length >> 3
    this._checkSize(length)

    var bias = Math.pow(2, exponentBits - 1) - 1
    var signal = this._readBits(precisionBits + exponentBits, 1, size)
    var exponent = this._readBits(precisionBits, exponentBits, size)
    var significand = 0
    var divisor = 2
    var curByte = 0 // length + (-precisionBits >> 3) - 1;
    do {
      var byteValue = this._readByte(++curByte, size)
      var startBit = precisionBits % 8 || 8
      var mask = 1 << startBit
      while (mask >>= 1) {
        if (byteValue & mask) {
          significand += 1 / divisor
        }
        divisor *= 2
      }
    } while (precisionBits -= startBit)

    this._pos += size

    return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
         : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
         : Math.pow(2, exponent - bias) * (1 + significand) : 0)
  },

  _decodeInt: function (bits, signed) {
    var x = this._readBits(0, bits, bits / 8), max = Math.pow(2, bits)
    var result = signed && x >= max / 2 ? x - max : x

    this._pos += bits / 8
    return result
  },

   // shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
  _shl: function (a, b) {
    for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
    return a
  },

  _readByte: function (i, size) {
    return this._buffer.charCodeAt(this._pos + size - i - 1) & 0xff
  },

  _readBits: function (start, length, size) {
    var offsetLeft = (start + length) % 8
    var offsetRight = start % 8
    var curByte = size - (start >> 3) - 1
    var lastByte = size + (-(start + length) >> 3)
    var diff = curByte - lastByte

    var sum = (this._readByte(curByte, size) >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1)

    if (diff && offsetLeft) {
      sum += (this._readByte(lastByte++, size) & ((1 << offsetLeft) - 1)) << (diff-- << 3) - offsetRight
    }

    while (diff) {
      sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight)
    }

    return sum
  },

  _checkSize: function (neededBits) {
    if (!(this._pos + Math.ceil(neededBits / 8) < this._buffer.length)) {
         // throw new Error("Index out of bound");
    }
  }
}

module.exports = BinaryReader
