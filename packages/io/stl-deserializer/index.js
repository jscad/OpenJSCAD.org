const { math, primitives } = require('@jscad/modeling')

const { BinaryReader } = require('@jscad/io-utils')

// STL function from http://jsfiddle.net/Riham/yzvGD/35/
// CC BY-SA by Riham
// changes by Rene K. Mueller <spiritdude@gmail.com>
// changes by Mark 'kaosat-dev' Moissette
// 2017/10/14: refactoring, added support for object output etc
// 2013/03/28: lot of rework and debugging included, and error handling
// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()

/**
* Parse the given stl data and return either a JSCAD script OR a list of geometries
* @param {string} input stl data
* @param {string} filename (optional) original filename of AMF source
* @param {object} options options (optional) anonymous object with:
* @param {string} [options.version='0.0.0'] version number to add to the metadata
* @param {boolean} [options.addMetadata=true] toggle injection of metadata (producer, date, source) at the start of the file
* @param {string} [options.output='jscad'] {String} either jscad or geometry to set desired output
* @return {[geometries]|string} a list of geometries OR a jscad script (string)
*/
const deserialize = (stl, filename, options) => {
  // console.log('***** deserialize', stl.length, filename, options)
  const defaults = {
    version: '0.0.0',
    addMetaData: true,
    output: 'jscad'
  }
  options = Object.assign({}, defaults, options)

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  const { version, output, addMetaData } = options

  const isBinary = isDataBinaryRobust(stl)

  stl = isBinary && isBuffer(stl) ? bufferToBinaryString(stl) : stl

  options && options.statusCallback && options.statusCallback({ progress: 33 })

  const elementFormatterJscad = ({ vertices, triangles, normals, colors, index }) => toScript(vertices, triangles, null, colors, index)
  const elementFormatterObject = ({ vertices, triangles, normals, colors }) => toPolyhedron(vertices, triangles, null, colors)

  options && options.statusCallback && options.statusCallback({ progress: 66 })

  const deserializer = isBinary ? deserializeBinarySTL : deserializeAsciiSTL
  const elementFormatter = output === 'jscad' ? elementFormatterJscad : elementFormatterObject
  const outputFormatter = output === 'jscad' ? formatAsJscad : formatAsCsg

  const result = outputFormatter(deserializer(stl, filename, version, elementFormatter), addMetaData, version, filename)

  options && options.statusCallback && options.statusCallback({ progress: 100 })
  return result

  /*
  TODO if (err) src += '// WARNING: import errors: ' + err + ' (some triangles might be misaligned or missing)\n'
  */
}

const bufferToBinaryString = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  let length = bytes.byteLength
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return binary
}

// taken from https://github.com/feross/is-buffer if we need it more than once, add as dep
const isBuffer = (obj) => {
  return (!!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj))
}

// transforms input to string if it was not already the case
const ensureString = (buf) => {
  if (typeof buf !== 'string') {
    let arrayBuffer = new Uint8Array(buf)
    let str = ''
    for (let i = 0; i < buf.byteLength; i++) {
      str += String.fromCharCode(arrayBuffer[i]) // implicitly assumes little-endian
    }
    return str
  }
  return buf
}

// reliable binary detection
const isDataBinaryRobust = (data) => {
  const patternVertex = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g
  const text = ensureString(data)
  const isBinary = patternVertex.exec(text)
  return (isBinary === null)
}

const formatAsJscad = (data, addMetaData, version, filename) => {
  // console.log('***** formatAsJscad')
  let code = ''
  if (addMetaData) {
    code = `
  //
  // producer: OpenJSCAD.org ${version} - STL Deserializer
  // date: ${new Date()}
  // source: ${filename}
  // objects: ${data.length}
  //
  `
  }
  code += `const {primitives} = require('@jscad/modeling')\n`
  code += data.join('\n')
  code += `
const main = () => {
 return [${data.map((d, i) => `solid${i + 1}()`)}]
}

module.exports = {main}
`
  return code
}

const formatAsCsg = (data) => data

/*
 * @see http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
 */
const deserializeBinarySTL = (stl, filename, version, elementFormatter) => {
  // console.log('***** deserializeBinary: ', stl.length)
  let vertices = []
  let triangles = []
  let normals = []
  let colors = []
  let vertexIndex = 0
  let err = 0
  let mcolor = null
  let umask = parseInt('01000000000000000', 2)
  let rmask = parseInt('00000000000011111', 2)
  let gmask = parseInt('00000001111100000', 2)
  let bmask = parseInt('00111110000000000', 2)
  let br = new BinaryReader(stl)

  let m = 0
  let c = 0
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  for (let i = 0; i < 80; i++) {
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
            break
          default:
            break
        }
        break
    }
  }
  if (m === 10) { // create the default color
    mcolor = [r / 255, g / 255, b / 255, a / 255]
  }

  let totalTriangles = br.readUInt32() // Read # triangles

  for (let tr = 0; tr < totalTriangles; tr++) {
    /*
      REAL32[3] . Normal vector
      REAL32[3] . Vertex 1
      REAL32[3] . Vertex 2
      REAL32[3] . Vertex 3
      UINT16 . Attribute byte count */
    // -- Parse normal
    let no = []; no.push(br.readFloat()); no.push(br.readFloat()); no.push(br.readFloat())

    // -- Parse every 3 subsequent floats as a vertex
    let v1 = []; v1.push(br.readFloat()); v1.push(br.readFloat()); v1.push(br.readFloat())
    let v2 = []; v2.push(br.readFloat()); v2.push(br.readFloat()); v2.push(br.readFloat())
    let v3 = []; v3.push(br.readFloat()); v3.push(br.readFloat()); v3.push(br.readFloat())

    let skip = 0

    for (let i = 0; i < 3; i++) {
      if (isNaN(v1[i])) skip++
      if (isNaN(v2[i])) skip++
      if (isNaN(v3[i])) skip++
      if (isNaN(no[i])) skip++
    }
    if (skip > 0) {
      console.log('bad triangle vertice coords/normal: ', skip)
    }

    err += skip
    // -- every 3 vertices create a triangle.
    let triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++)

    let abc = br.readUInt16()
    let color = null
    if (m === 10) {
      let u = (abc & umask) // 0 if color is unique for this triangle
      let r = (abc & rmask) / 31
      let g = ((abc & gmask) >>> 5) / 31
      let b = ((abc & bmask) >>> 10) / 31
      let a = 255
      if (u === 0) {
        color = [r, g, b, a]
      } else {
        color = mcolor
      }
      colors.push(color)
    }

    // -- Add 3 vertices for every triangle
    // -- TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
    if (skip === 0) { // checking cw vs ccw, given all normal/vertice are valid
      // E1 = B - A
      // E2 = C - A
      // test = dot( Normal, cross( E1, E2 ) )
      // test > 0: cw, test < 0 : ccw
      let e1 = math.vec3.subtract(v2, v1)
      let e2 = math.vec3.subtract(v3, v1)
      let cr = math.vec3.cross(e1, e2)
      let t = math.vec3.dot(no, cr)
      if (t > 0) { // 1,2,3 -> 3,2,1
        let tmp = v3
        v3 = v1
        v1 = tmp
      }
    }
    vertices.push(v1)
    vertices.push(v2)
    vertices.push(v3)
    triangles.push(triangle)
    normals.push(no)
  }

  if (err) {
    console.warn(`WARNING: import errors: ${err} (some triangles might be misaligned or missing)`)
    // FIXME: this used to be added to the output script, which makes more sense
  }

  return [elementFormatter({ vertices, triangles, normals, colors, index: 1 })]
}

const deserializeAsciiSTL = (stl, filename, version, elementFormatter) => {
  // console.log('***** deserializeAscii: '+stl.length)
  let converted = 0

  // -- Find all models
  const objects = stl.split('endsolid')
  let elements = []
  for (let o = 1; o < objects.length; o++) {
    // -- Translation: a non-greedy regex for facet {...} endloop pattern
    let patt = /\bfacet[\s\S]*?endloop/mgi
    let vertices = []
    let triangles = []
    let normals = []
    let colors = []
    let vertexIndex = 0
    let err = 0

    let match = stl.match(patt)
    if (match == null) continue
    for (let i = 0; i < match.length; i++) {
      // -- 1 normal with 3 numbers, 3 different vertex objects each with 3 numbers:
      let vpatt = /\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi
      let v = vpatt.exec(match[i])
      if (v == null) continue
      if (v.length !== 13) {
        console.log('Failed to parse ' + match[i])
        break
      }
      let skip = 0
      for (let k = 0; k < v.length; k++) {
        if (v[k] === 'NaN') {
          console.log('bad normal or triangle vertice #' + converted + ' ' + k + ": '" + v[k] + "', skipped")
          skip++
        }
      }
      err += skip
      if (skip) {
        continue
      }

      let j = 1
      let no = []; no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++]))
      let v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]))
      let v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]))
      let v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]))
      let triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++)

      // -- Add 3 vertices for every triangle
      // TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
      if (skip === 0) {
        // checking cw vs ccw
        // E1 = B - A
        // E2 = C - A
        // test = dot( Normal, cross( E1, E2 ) )
        // test > 0: cw, test < 0: ccw
        let e1 = math.vec3.subtract(v2, v1)
        let e2 = math.vec3.subtract(v3, v1)
        let cr = math.vec3.cross(e1, e2)
        let t = math.vec3.dot(no, cr)
        if (t > 0) { // 1,2,3 -> 3,2,1
          let tmp = v3
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
    if (err) {
      console.warn(`WARNING: import errors: ${err} (some triangles might be misaligned or missing)`)
      // FIXME: this used to be added to the output script, which makes more sense
    }

    elements.push(
      elementFormatter({ vertices, triangles, colors, index: o })
    )
  }

  return elements
}

/*
 * Convert the given points, faces(triangles), normals, colors to geometry (polyhedron).
 */
const toPolyhedron = (points, faces, normals, colors) => {
  const options = {
    orientation: 'inward',
    points,
    faces,
    colors
  }
  return primitives.polyhedron(options)
}

/*
 * Convert the given points, faces(triangles), normals, colors to JSCAD script.
 */
const toScript = (points, faces, normals, colors, index) => {
  // console.log('***** toScript',index,points.length,faces.length,colors.length)

  let src = `
//
// solid ${index} : ${points.length} points, ${faces.length} faces, ${colors.length} colors
//
const solid${index} = () => {
`

  src += `  const points = [\n`
  for (let i = 0; i < points.length; i++) {
    src += `    [${points[i]}],\n`
  }
  src += '  ]\n'

  src += `  const faces = [\n`
  for (let i = 0; i < faces.length; i++) {
    src += `    [${faces[i]}],\n`
  }
  src += '  ]\n'

  if (colors && faces.length === colors.length) {
    src += `  const colors = [\n`
    for (let i = 0; i < colors.length; i++) {
      src += `    [${colors[i]}],\n`
    }
    src += '  ]\n'
  } else {
    src += `  const colors = null\n`
  }
  src += `  return primitives.polyhedron({points, faces, colors, orientation: 'inside'})\n}\n`
  return src
}

module.exports = {
  deserialize
}
