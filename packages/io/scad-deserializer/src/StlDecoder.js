/*
  #	Module:			STL.js
  #
  #	Description:	decode STL 3D file
  #					modified Devon Govett's bmp.js
  #
  #	Reference:
  #		STL specs.	http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
  # 	BMP.js		http://devongovett.github.com/bmp.js/
  #
  # Author(s):		Devon Govett provide a bmp decoding example.
  # 				C.T. Yeung modify to decode STL.
  #
  # History:
  # 20Dec11			1st crack at it								cty
  # 23Dec11			loading vertexies OK
  # 				need to test normal when rendering shades
  #                 rotation is off when passed 180 degrees		cty
  #
  # MIT LICENSE
  # Copyright (c) 2011 CT Yeung
  # Copyright (c) 2011 Devon Govett
  #
  # Permission is hereby granted, free of charge, to any person obtaining a copy of this
  # software and associated documentation files (the "Software"), to deal in the Software
  # without restriction, including without limitation the rights to use, copy, modify, merge,
  # publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
  # to whom the Software is furnished to do so, subject to the following conditions:
  #
  # The above copyright notice and this permission notice shall be included in all copies or
  # substantial portions of the Software.
  #
  # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  # BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  # NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  # DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

var HDR_LEN = 80

function STL (data) {
  var buf = new ArrayBuffer(data.length)
  this.data = new Uint8Array(buf)
  for (var i = 0, dataLen = data.length; i < dataLen; i++) {
    this.data[i] = data.charCodeAt(i)
  }

	  	this.TYPE_ASCII = 'ascii'
  this.TYPE_BINARY = 'binary'
  this.dataType = ''

  this.ASCII_TITLE = 'solid'
  this.TYPE_VERTEX = 'vertex'
  this.TYPE_NORMAL = 'normal'
  this.TYPE_END = 'end'
  this.NOT_ASCII = -1
  this.listVertex = null
  this.listNormal = null
  this.pos = 0

  if (this.data.length < (HDR_LEN + 4)) { throw 'STL file too small: ' + this.data.length }
};

STL.prototype.findEndPos = function (stt) {
	  var i = stt
	  while (i < (this.data.length - 1)) {
		  // seek linefeed
		  if (this.data[i] == 10) { return i }
		  i++
	  }
	  return this.data.length - 1
}

STL.prototype.bin2String = function (sttPos, endPos) {
	  var buf = ''
	  for (var i = sttPos; i < endPos; i++) {
		  var char = this.data[i].toString()
		  buf += String.fromCharCode(char)
	  }
	  return buf.replace('\r', '')
}

STL.prototype.readUInt16 = function () {
  var b1, b2
  b1 = this.data[this.pos++]
  b2 = this.data[this.pos++] << 8
  return b1 | b2
}

STL.prototype.readUInt32 = function () {
  var b1, b2, b3, b4
  b1 = this.data[this.pos++]
  b2 = this.data[this.pos++] << 8
  b3 = this.data[this.pos++] << 16
  b4 = this.data[this.pos++] << 24
  var num = b1 | b2 | b3 | b4
  return num
}

STL.prototype.readReal32 = function () {
	  if (this.data.length <= this.pos + 4)		// over run !!! error condition
  { return 0 }

	  var byteArray = [0, 0, 0, 0]
	  byteArray[3] = this.data[this.pos++]
	  byteArray[2] = this.data[this.pos++]
	  byteArray[1] = this.data[this.pos++]
	  byteArray[0] = this.data[this.pos++]

	  var sign = this.parseSign(byteArray)
	  var exponent = this.parseExponent(byteArray)
	  var mantissa = this.parseSignificand(byteArray)
	  var num = sign * exponent * mantissa
	  return num
}

STL.prototype.parseSign = function (byteArray) {
  if (byteArray[0] & 0x80) { return -1 }
  return 1
}

STL.prototype.parseExponent = function (byteArray) {
  var ex = (byteArray[0] & 0x7F)
  ex = ex << 1

  if ((byteArray[1] & 0x80) != 0) { ex += 0x01 }

  ex = Math.pow(2, ex - 127)
  return ex
}

STL.prototype.parseSignificand = function (byteArray) {
  var num = 0
  var bit
  var mask = 0x40
  for (var i = 1; i < 8; i++) {
    if ((byteArray[1] & mask) != 0) { num += 1 / Math.pow(2, i) }
    mask = mask >> 1
  }
  mask = 0x80
  for (var j = 0; j < 8; j++) {
    if ((byteArray[2] & mask) != 0) { num += 1 / Math.pow(2, j + 8) }
    mask = mask >> 1
  }
  mask = 0x80
  for (var k = 0; k < 8; k++) {
    if ((byteArray[2] & mask) != 0) { num += 1 / Math.pow(2, k + 16) }
    mask = mask >> 1
  }
  return (num + 1)
}

STL.prototype.readNormal = function (index) {
  var sttPos = this.listNormal[index]
	  var endPos = this.findEndPos(sttPos)		// return EOF pos if not found
	  var vString = this.bin2String(sttPos, endPos)
	  var pos = vString.indexOf(this.TYPE_NORMAL)
	  vString = vString.substring(pos + this.TYPE_NORMAL.length + 1, vString.length)
	  var list = vString.split(' ')

	  var normal = new Array()
	  for (var i = 0; i < list.length; i++) {
    if (list[i].length) { normal.push(Number(list[i])) }
	  }

	  if (list.length < 3) { return null }							// invalid normal

  return normal
}

STL.prototype.readVertex = function (index) {
  var sttPos = this.listVertex[index]
	  var endPos = this.findEndPos(sttPos)		// return EOF pos if not found
	  var vString = this.bin2String(sttPos, endPos)
	  var pos = vString.indexOf(this.TYPE_VERTEX)
	  vString = vString.substring(pos + this.TYPE_VERTEX.length + 1, vString.length)
	  var list = vString.split(' ')

	  var vertex = new Array()
	  for (var i = 0; i < list.length; i++) {
    if (list[i].length) { vertex.push(Number(list[i])) }
	  }
	  if (vertex.length != 3) { return null }							// invalid vertex

  return vertex
}

STL.prototype.decode = function () {
  if (this.dataType.length) {
    return this.dataType
  }

  var str = this.bin2String(0, 10).toLocaleLowerCase()
  var endPos = 0
  var sttPos = 0

  if (str.indexOf(this.ASCII_TITLE) >= 0) {
    this.dataType = this.TYPE_ASCII
    this.listVertex = new Array()
    this.listNormal = new Array()

    while (endPos < (this.data.length - 1)) {
      endPos = this.findEndPos(sttPos)		// return EOF pos if not found
      str = this.bin2String(sttPos, endPos)

      if (str.indexOf(this.TYPE_VERTEX) >= 0) {
        this.listVertex.push(sttPos)
      } else if (str.indexOf(this.TYPE_NORMAL) >= 0) {
        this.listNormal.push(sttPos)
      }

      sttPos = endPos + 1
    }
  } else {
    this.dataType = this.TYPE_BINARY
  }

  return this.dataType
}

STL.prototype.getCSG = function () {
  var csgPolygons = []
  var numTriangles

  if (this.dataType == this.TYPE_BINARY) {
    this.pos = HDR_LEN
    numTriangles = this.readUInt32()
  } else {
    this.pos = 0
    numTriangles = this.listVertex.length / 3
  }

  if (this.dataType == this.TYPE_BINARY) {
    for (i = 0; i < numTriangles; i++) {
      var csgVertices = []

      var normal = [0, 0, 0]
      for (var j = 0; j < 3; j++) {
        normal[j] = this.readReal32()
      }

      var csgNormal = new CSG.Vector3D(normal)
      var csgPlane = new CSG.Plane(csgNormal, 1)

      for (var j = 0; j < 3; j++) {
        var x = this.readReal32()
        var y = this.readReal32()
        var z = this.readReal32()
        csgVertices.push(new CSG.Vertex(new CSG.Vector3D(x, y, z)))
      }

      this.pos += 2

      csgPolygons.push(new CSG.Polygon(csgVertices, null, csgPlane))
    }
  } else {
    for (i = 0; i < numTriangles; i++) {
      var csgVertices = []
      for (var j = 0; j < 3; j++) {
        var vtx = this.readVertex(i * 3 + j)
        csgVertices.push(new CSG.Vertex(new CSG.Vector3D(vtx)))
      }
      csgPolygons.push(new CSG.Polygon(csgVertices, null))
    }
  }

  return CSG.fromPolygons(csgPolygons)
}

STL.prototype.getCSGString = function () {
  var csgPolygons = []
  var numTriangles

  if (this.dataType == this.TYPE_BINARY) {
    this.pos = HDR_LEN
    numTriangles = this.readUInt32()
  } else {
    this.pos = 0
    numTriangles = this.listVertex.length / 3
  }

  if (this.dataType == this.TYPE_BINARY) {
    for (i = 0; i < numTriangles; i++) {
      var csgVertices = []

      var normal = [0, 0, 0]
      for (var j = 0; j < 3; j++) {
        normal[j] = this.readReal32()
      }

      var csgPlane = _.template('new CSG.Plane(new CSG.Vector3D([<%=normal%>]), 1)')({ normal: normal })

      for (var j = 0; j < 3; j++) {
        var x = this.readReal32()
        var y = this.readReal32()
        var z = this.readReal32()
        csgVertices.push(_.template('new CSG.Vertex(new CSG.Vector3D([<%=vertex%>]))')({ vertex: [x, y, z] }))
      }
      this.pos += 2

      csgPolygons.push(_.template('new CSG.Polygon([<%=vertices%>], null)')({ vertices: csgVertices }))
    }
  } else {
    for (i = 0; i < numTriangles; i++) {
      var csgVertices = []
      for (var j = 0; j < 3; j++) {
        var vertex = this.readVertex(i * 3 + j)
        csgVertices.push(_.template('new CSG.Vertex(new CSG.Vector3D([<%=vertex%>]))')({ vertex: vertex }))
      }
      csgPolygons.push(_.template('new CSG.Polygon([<%=vertices%>], null)')({ vertices: csgVertices }))
    }
  }

  return _.template('CSG.fromPolygons([<%=polygons%>])')({ polygons: csgPolygons })
}

STL.prototype.drawWireFrame = function (context,		// [in] canvas context
										   w, 			// [in] canvas width
										   h, 			// [in] canvas height
										   mag,			// [in] magnification
										   rX,
										   rY,
										   rZ) {
  var numTriangles
  var i

  if (this.dataType == this.TYPE_BINARY) {
    this.pos = HDR_LEN
    numTriangles = this.readUInt32()
  } else {
    numTriangles = this.listVertex.length / 3
  }

  if (this.dataType == this.TYPE_BINARY) {
    for (i = 0; i < numTriangles; i++) {
      // retrieve normal
      var normal = [0, 0, 0]
      for (var j = 0; j < 3; j++) {
        normal[j] = this.readReal32()
      }

      this.drawTriangles(context, w, h, mag, rX, rY, rZ)

      // var attr = this.readUInt16();				// retrieve attribute
      this.pos += 2
    }
  } else {
    for (i = 0; i < numTriangles; i++) {
      this.triangleIndex = i
      this.drawTriangles(context, w, h, mag, rX, rY, rZ)
    }
  }
}

STL.prototype.drawTriangles = function (context,		// [in] canvas context
  w, 		// [in] canvas width
  h, 		// [in] canvas height
  mag,		// [in] magnification
  rX,		// [in] amount of rotation X
  rY,		// [in] amount of rotation Y
  rZ) {		// [in] amount of rotation Z
  var vtx0 = [0, 0, 0]
  var vtx1 = [0, 0, 0]
  var offX = w / 2
  var offY = h / 2
  context.beginPath()

  // convert rotation from degrees to radian
  var radX = Math.PI / 180.0 * rX
  var radY = Math.PI / 180.0 * rY
  var radZ = Math.PI / 180.0 * rZ

  for (var j = 0; j < 3; j++) {
    if (this.dataType == this.TYPE_ASCII) {
      vtx1 = this.readVertex(this.triangleIndex * 3 + j)
    } else {
      vtx1[0] = this.readReal32()
      vtx1[1] = this.readReal32()
      vtx1[2] = this.readReal32()
    }

    // vtx1[0] = vtx1[0];
    var y = vtx1[1]
    var z = vtx1[2]
    vtx1[1] = Math.cos(radX) * y - Math.sin(radX) * z
    vtx1[2] = Math.sin(radX) * y + Math.cos(radX) * z

    var x = vtx1[0]
    z = vtx1[2]
    vtx1[0] = Math.cos(radY) * x + Math.sin(radY) * z
    // vtx1[1] = vtx1[1];
    vtx1[2] = -Math.sin(radY) * x + Math.cos(radY) * z

    // draw 2 lengths of a triangle
    if (j == 0) {
      context.moveTo(vtx1[0] * mag + offX, vtx1[1] * mag + offY) // move to 1st triangle corner
      vtx0[0] = vtx1[0]
      vtx0[1] = vtx1[1]
      vtx0[2] = vtx1[2]
    } else {
      context.lineTo(vtx1[0] * mag + offX, vtx1[1] * mag + offY)
    }
  }
  // complete triangle
  context.lineTo(vtx0[0] * mag + offX, vtx0[1] * mag + offY)
  // render on canvase
  context.stroke()
  context.closePath()
}

module.exports = STL
