import { CSG } from '@jscad/csg'
import { vt2jscad } from './vt2jscad'
// STL function from http://jsfiddle.net/Riham/yzvGD/35/
// CC BY-SA by Riham
// changes by Rene K. Mueller <spiritdude@gmail.com>
//
// 2013/03/28: lot of rework and debugging included, and error handling
// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()
const echo = console.info

export function parseSTL (stl, fn, options) {
  const defaults = {version: '0.0.0'}
  options = Object.assign({}, defaults, options)
  const {version} = options

  var isAscii = true

  for (var i = 0; i < stl.length; i++) {
    if (stl[i].charCodeAt(0) == 0) {
      isAscii = false
      break
    }
  }
  var src
  if (!isAscii) {
    src = parseBinarySTL(stl, fn, version)
  } else {
    src = parseAsciiSTL(stl, fn, version)
  }
  return src
}

export function parseBinarySTL (stl, fn, version) {
    // -- This makes more sense if you read http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
  var vertices = []
  var triangles = []
  var normals = []
  var colors = []
  var vertexIndex = 0
  var converted = 0
  var err = 0
  var mcolor = null
  var umask = parseInt('01000000000000000', 2)
  var rmask = parseInt('00000000000011111', 2)
  var gmask = parseInt('00000001111100000', 2)
  var bmask = parseInt('00111110000000000', 2)
  var br = new BinaryReader(stl)

  var m = 0, c = 0, r = 0, g = 0, b = 0, a = 0
  for (var i = 0; i < 80; i++) {
    switch (m) {
      case 6:
        r = br.readUInt8()
        m += 1
        continue
      case 7:
        g = br.readUInt8()
        m += 1
        continue
      case 8:
        b = br.readUInt8()
        m += 1
        continue
      case 9:
        a = br.readUInt8()
        m += 1
        continue
      default:
        c = br.readChar()
        switch (c) {
          case 'C':
          case 'O':
          case 'L':
          case 'R':
          case '=':
            m += 1
          default:
            break
        }
        break
    }
  }
  if (m == 10) { // create the default color
    mcolor = [r / 255, g / 255, b / 255, a / 255]
  }

  var totalTriangles = br.readUInt32() // Read # triangles

  for (var tr = 0; tr < totalTriangles; tr++) {
        // if(tr%100==0) status('stl importer: converted '+converted+' out of '+totalTriangles+' triangles');
        /*
             REAL32[3] . Normal vector
             REAL32[3] . Vertex 1
             REAL32[3] . Vertex 2
             REAL32[3] . Vertex 3
                UINT16 . Attribute byte count */
        // -- Parse normal
    var no = []; no.push(br.readFloat()); no.push(br.readFloat()); no.push(br.readFloat())

        // -- Parse every 3 subsequent floats as a vertex
    var v1 = []; v1.push(br.readFloat()); v1.push(br.readFloat()); v1.push(br.readFloat())
    var v2 = []; v2.push(br.readFloat()); v2.push(br.readFloat()); v2.push(br.readFloat())
    var v3 = []; v3.push(br.readFloat()); v3.push(br.readFloat()); v3.push(br.readFloat())

    var skip = 0
    if (1) {
      for (var i = 0; i < 3; i++) {
        if (isNaN(v1[i])) skip++
        if (isNaN(v2[i])) skip++
        if (isNaN(v3[i])) skip++
        if (isNaN(no[i])) skip++
      }
      if (skip > 0) {
        echo('bad triangle vertice coords/normal: ', skip)
      }
    }
    err += skip
        // -- every 3 vertices create a triangle.
    var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++)

    var abc = br.readUInt16()
    var color = null
    if (m == 10) {
      var u = (abc & umask) // 0 if color is unique for this triangle
      var r = (abc & rmask) / 31
      var g = ((abc & gmask) >>> 5) / 31
      var b = ((abc & bmask) >>> 10) / 31
      var a = 255
      if (u == 0) {
        color = [r, g, b, a]
      } else {
        color = mcolor
      }
      colors.push(color)
    }

        // -- Add 3 vertices for every triangle
        // -- TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
    if (skip == 0) {  // checking cw vs ccw, given all normal/vertice are valid
           // E1 = B - A
           // E2 = C - A
           // test = dot( Normal, cross( E1, E2 ) )
           // test > 0: cw, test < 0 : ccw
      var w1 = new CSG.Vector3D(v1)
      var w2 = new CSG.Vector3D(v2)
      var w3 = new CSG.Vector3D(v3)
      var e1 = w2.minus(w1)
      var e2 = w3.minus(w1)
      var t = new CSG.Vector3D(no).dot(e1.cross(e2))
      if (t > 0) {    // 1,2,3 -> 3,2,1
        var tmp = v3
        v3 = v1
        v1 = tmp
      }
    }
    vertices.push(v1)
    vertices.push(v2)
    vertices.push(v3)
    triangles.push(triangle)
    normals.push(no)
    converted++
  }
  var src = ''
  src += '// producer: OpenJSCAD Compatibility (' + version + ') STL Binary Importer\n'
  src += '// date: ' + (new Date()) + '\n'
  src += '// source: ' + fn + '\n'
  src += '\n'
  if (err) src += '// WARNING: import errors: ' + err + ' (some triangles might be misaligned or missing)\n'
  src += '// objects: 1\n// object #1: triangles: ' + totalTriangles + '\n\n'
  src += 'function main() { return '
  src += vt2jscad(vertices, triangles, normals, colors)
  src += '; }'
  return src
}

export function parseAsciiSTL (stl, fn, version) {
  var src = ''
  var n = 0
  var converted = 0
  var o

  src += '// producer: OpenJSCAD Compatibility (' + version + ') STL ASCII Importer\n'
  src += '// date: ' + (new Date()) + '\n'
  src += '// source: ' + fn + '\n'
  src += '\n'
  src += 'function main() { return union(\n'
    // -- Find all models
  var objects = stl.split('endsolid')
  src += '// objects: ' + (objects.length - 1) + '\n'

  for (o = 1; o < objects.length; o++) {
        // -- Translation: a non-greedy regex for facet {...} endloop pattern
    var patt = /\bfacet[\s\S]*?endloop/mgi
    var vertices = []
    var triangles = []
    var normals = []
    var vertexIndex = 0
    var err = 0

    var match = stl.match(patt)
    if (match == null) continue
    for (var i = 0; i < match.length; i++) {
            // if(converted%100==0) status('stl to jscad: converted '+converted+' out of '+match.length+ ' facets');
            // -- 1 normal with 3 numbers, 3 different vertex objects each with 3 numbers:
            // var vpatt = /\bfacet\s+normal\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*outer\s+loop\s+vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/mgi;
                                         // (-?\d+\.?\d*) -1.21223
                                         // (-?\d+\.?\d*[Ee]?[-+]?\d*)
      var vpatt = /\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi
      var v = vpatt.exec(match[i])
      if (v == null) continue
      if (v.length != 13) {
        echo('Failed to parse ' + match[i])
        break
      }
      var skip = 0
      for (var k = 0; k < v.length; k++) {
        if (v[k] == 'NaN') {
          echo('bad normal or triangle vertice #' + converted + ' ' + k + ": '" + v[k] + "', skipped")
          skip++
        }
      }
      err += skip
      if (skip) {
        continue
      }
      if (0 && skip) {
        var j = 1 + 3
        var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]))
        var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]))
        var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]))
        echo('recalculate norm', v1, v2, v3)
        var w1 = new CSG.Vector3D(v1)
        var w2 = new CSG.Vector3D(v2)
        var w3 = new CSG.Vector3D(v3)
        var _u = w1.minus(w3)
        var _v = w1.minus(w2)
        var norm = _u.cross(_v).unit()
        j = 1
        v[j++] = norm._x
        v[j++] = norm._y
        v[j++] = norm._z
        skip = false
      }
      var j = 1
      var no = []; no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++]))
      var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]))
      var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]))
      var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]))
      var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++)

            // -- Add 3 vertices for every triangle
            //    TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
      if (skip == 0) {  // checking cw vs ccw
               // E1 = B - A
               // E2 = C - A
               // test = dot( Normal, cross( E1, E2 ) )
               // test > 0: cw, test < 0: ccw
        var w1 = new CSG.Vector3D(v1)
        var w2 = new CSG.Vector3D(v2)
        var w3 = new CSG.Vector3D(v3)
        var e1 = w2.minus(w1)
        var e2 = w3.minus(w1)
        var t = new CSG.Vector3D(no).dot(e1.cross(e2))
        if (t > 0) {      // 1,2,3 -> 3,2,1
          var tmp = v3
          v3 = v1
          v1 = tmp
        }
      }
      vertices.push(v1)
      vertices.push(v2)
      vertices.push(v3)
      normals.push(no)
      triangles.push(triangle)
      converted++
    }
    if (n++) src += ','
    if (err) src += '// WARNING: import errors: ' + err + ' (some triangles might be misaligned or missing)\n'
    src += '// object #' + (o) + ': triangles: ' + match.length + '\n'
    src += vt2jscad(vertices, triangles, normals)
  }
  src += '); }\n'
  return src
}

// BinaryReader
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

// Original
// + Jonas Raoni Soares Silva
// @ http://jsfromhell.com/classes/binary-parser [rev. #1]

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
