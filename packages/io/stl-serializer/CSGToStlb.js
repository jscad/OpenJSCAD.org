const { geometry } = require('@jscad/modeling')

// see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL

// objects must be an array of 3D geometries
const serializeBinary = (objects, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })

  // first check if the host is little-endian:
  let buffer = new ArrayBuffer(4)
  let int32buffer = new Int32Array(buffer, 0, 1)
  let int8buffer = new Int8Array(buffer, 0, 4)
  int32buffer[0] = 0x11223344
  if (int8buffer[0] !== 0x44) {
    throw new Error('Binary STL output is currently only supported on little-endian (Intel) processors')
  }

  let numtriangles = 0
  let numpolygons = 0
  objects.forEach((object, i) => {
    let polygons = geometry.geom3.toPolygons(object)
    polygons.forEach((polygon) => {
      let numvertices = polygon.vertices.length
      let thisnumtriangles = (numvertices >= 3) ? numvertices - 2 : 0
      numtriangles += thisnumtriangles
      numpolygons += 1
    })
  })

  let headerarray = new Uint8Array(80)
  for (let i = 0; i < 80; i++) {
    headerarray[i] = 65
  }

  let ar1 = new Uint32Array(1)
  ar1[0] = numtriangles

  // write the triangles to allTrianglesBuffer:
  let allTrianglesBuffer = new ArrayBuffer(50 * numtriangles)
  let allTrianglesBufferAsInt8 = new Int8Array(allTrianglesBuffer)

  // a tricky problem is that a Float32Array must be aligned at 4-byte boundaries (at least in certain browsers)
  // while each triangle takes 50 bytes. Therefore we write each triangle to a temporary buffer, and copy that
  // into allTrianglesBuffer:
  let triangleBuffer = new ArrayBuffer(50)
  let triangleBufferAsInt8 = new Int8Array(triangleBuffer)

  // each triangle consists of 12 floats:
  let triangleFloat32array = new Float32Array(triangleBuffer, 0, 12)
  // and one uint16:
  let triangleUint16array = new Uint16Array(triangleBuffer, 48, 1)

  let byteoffset = 0
  let p = 0
  objects.forEach((object) => {
    let polygons = geometry.geom3.toPolygons(object)
    polygons.forEach((polygon) => {
      let vertices = polygon.vertices
      let numvertices = vertices.length
      let plane = polygon.plane
      for (let i = 0; i < numvertices - 2; i++) {
        triangleFloat32array[0] = plane[0]
        triangleFloat32array[1] = plane[1]
        triangleFloat32array[2] = plane[2]
        let arindex = 3
        for (let v = 0; v < 3; v++) {
          let vv = v + ((v > 0) ? i : 0)
          let vertex = vertices[vv]
          triangleFloat32array[arindex++] = vertex[0]
          triangleFloat32array[arindex++] = vertex[1]
          triangleFloat32array[arindex++] = vertex[2]
        }
        triangleUint16array[0] = 0
        // copy the triangle into allTrianglesBuffer:
        allTrianglesBufferAsInt8.set(triangleBufferAsInt8, byteoffset)
        byteoffset += 50
      }
      p += 1
      options.statusCallback && options.statusCallback({ progress: 100 * p / numpolygons })
    })
  })
  options.statusCallback && options.statusCallback({ progress: 100 })
  return [headerarray.buffer, ar1.buffer, allTrianglesBuffer] // 'blobable array'
}

module.exports = {
  serializeBinary
}
