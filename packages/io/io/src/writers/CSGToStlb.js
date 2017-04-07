import makeBlob from '../utils/Blob'
const Blob = makeBlob()

// see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
export default function CSGToStlb (CSG) {
  // first check if the host is little-endian:
  var buffer = new ArrayBuffer(4)
  var int32buffer = new Int32Array(buffer, 0, 1)
  var int8buffer = new Int8Array(buffer, 0, 4)
  int32buffer[0] = 0x11223344
  if (int8buffer[0] != 0x44) {
    throw new Error('Binary STL output is currently only supported on little-endian (Intel) processors')
  }

  var numtriangles = 0
  CSG.polygons.map(function (p) {
    var numvertices = p.vertices.length
    var thisnumtriangles = (numvertices >= 3) ? numvertices - 2 : 0
    numtriangles += thisnumtriangles
  })
  var headerarray = new Uint8Array(80)
  for (var i = 0; i < 80; i++) {
    headerarray[i] = 65
  }
  var ar1 = new Uint32Array(1)
  ar1[0] = numtriangles
  // write the triangles to allTrianglesBuffer:
  var allTrianglesBuffer = new ArrayBuffer(50 * numtriangles)
  var allTrianglesBufferAsInt8 = new Int8Array(allTrianglesBuffer)
  // a tricky problem is that a Float32Array must be aligned at 4-byte boundaries (at least in certain browsers)
  // while each triangle takes 50 bytes. Therefore we write each triangle to a temporary buffer, and copy that
  // into allTrianglesBuffer:
  var triangleBuffer = new ArrayBuffer(50)
  var triangleBufferAsInt8 = new Int8Array(triangleBuffer)
  // each triangle consists of 12 floats:
  var triangleFloat32array = new Float32Array(triangleBuffer, 0, 12)
  // and one uint16:
  var triangleUint16array = new Uint16Array(triangleBuffer, 48, 1)
  var byteoffset = 0
  CSG.polygons.map(function (p) {
    var numvertices = p.vertices.length
    for (var i = 0; i < numvertices - 2; i++) {
      var normal = p.plane.normal
      triangleFloat32array[0] = normal._x
      triangleFloat32array[1] = normal._y
      triangleFloat32array[2] = normal._z
      var arindex = 3
      for (var v = 0; v < 3; v++) {
        var vv = v + ((v > 0) ? i : 0)
        var vertexpos = p.vertices[vv].pos
        triangleFloat32array[arindex++] = vertexpos._x
        triangleFloat32array[arindex++] = vertexpos._y
        triangleFloat32array[arindex++] = vertexpos._z
      }
      triangleUint16array[0] = 0
      // copy the triangle into allTrianglesBuffer:
      allTrianglesBufferAsInt8.set(triangleBufferAsInt8, byteoffset)
      byteoffset += 50
    }
  })
  return new Blob([headerarray.buffer, ar1.buffer, allTrianglesBuffer], {
    type: 'application/sla'
  })
}
