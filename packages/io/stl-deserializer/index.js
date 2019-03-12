const { CSG } = require('@jscad/csg')
const { vt2jscad } = require('./vt2jscad')
const { BinaryReader } = require('@jscad/io-utils')

// STL function from http://jsfiddle.net/Riham/yzvGD/35/
// CC BY-SA by Riham
// changes by Rene K. Mueller <spiritdude@gmail.com>
// changes by Mark 'kaosat-dev' Moissette
// 2017/10/14: refactoring, added support for CSG output etc
// 2013/03/28: lot of rework and debugging included, and error handling
// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()
const echo = console.info

/**
* Parse the given stl data and return either a JSCAD script or a CSG/CAG object
* @param {string} input stl data
* @param {string} filename (optional) original filename of AMF source
* @param {object} options options (optional) anonymous object with:
* @param {string} [options.version='0.0.0'] version number to add to the metadata
* @param {boolean} [options.addMetadata=true] toggle injection of metadata (producer, date, source) at the start of the file
* @param {string} [options.output='jscad'] {String} either jscad or csg to set desired output
* @return {CSG/string} either a CAG/CSG object or a string (jscad script)
*/
function deserialize (stl, filename, options) {
  options && options.statusCallback && options.statusCallback({progress: 0})
  const defaults = {version: '0.0.0', addMetaData: true, output: 'jscad'}
  options = Object.assign({}, defaults, options)
  const {version, output, addMetaData} = options

  const isBinary = isDataBinaryRobust(stl)

  stl = isBinary && isBuffer(stl) ? bufferToBinaryString(stl) : stl

  options && options.statusCallback && options.statusCallback({progress: 33})

  const elementFormatterJscad = ({vertices, triangles, normals, colors, index}) => `// object #${index}: triangles: ${triangles.length}\n${vt2jscad(vertices, triangles, null)}`
  const elementFormatterCSG = ({vertices, triangles, normals, colors}) => polyhedron({ points: vertices, polygons: triangles })

  options && options.statusCallback && options.statusCallback({progress: 66})
  
  const deserializer = isBinary ? deserializeBinarySTL : deserializeAsciiSTL
  const elementFormatter = output === 'jscad' ? elementFormatterJscad : elementFormatterCSG
  const outputFormatter = output === 'jscad' ? formatAsJscad : formatAsCsg

  const result = outputFormatter(deserializer(stl, filename, version, elementFormatter), addMetaData, version, filename)
  
  options && options.statusCallback && options.statusCallback({progress: 100})
  return result

  /*
  if (err) src += '// WARNING: import errors: ' + err + ' (some triangles might be misaligned or missing)\n'
  src += '// objects: 1\n// object #1: triangles: ' + totalTriangles + '\n\n'
  src += 'function main() { return '
  src += vt2jscad(vertices, triangles, normals, colors)
  src += '; }' */
}

function bufferToBinaryString (buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  let length = bytes.byteLength
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return binary
}

// taken from https://github.com/feross/is-buffer if we need it more than once, add as dep
function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// transforms input to string if it was not already the case
function ensureString (buf) {
  if (typeof buf !== 'string') {
    let arrayBuffer = new Uint8Array(buf)
    let str = ''
    for (let i = 0; i < buf.byteLength; i++) {
      str += String.fromCharCode(arrayBuffer[i]) // implicitly assumes little-endian
    }
    return str
  } else {
    return buf
  }
}

// reliable binary detection
function isDataBinaryRobust (data) {
  // console.log('data is binary ?')
  const patternVertex = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g
  const text = ensureString(data)
  const isBinary = patternVertex.exec(text) === null
  return isBinary
}

function formatAsJscad (data, addMetaData, version, filename) {
  let code = addMetaData ? `//
  // producer: OpenJSCAD.org Compatibility${version} STL Binary Importer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''

  return code + `function main() { return union(
// objects: ${data.length}
${data.join('\n')}); }
`
}

function formatAsCsg (data) {
  return new CSG().union(data)
}

function deserializeBinarySTL (stl, filename, version, elementFormatter, debug = false) {
  // -- This makes more sense if you read http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
  let vertices = []
  let triangles = []
  let normals = []
  let colors = []
  let converted = 0
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
    if (debug) {
      if (tr % 100 === 0) console.info(`stl importer: converted ${converted} out of ${totalTriangles} triangles`)
    }
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
      echo('bad triangle vertice coords/normal: ', skip)
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
      let w1 = new CSG.Vector3D(v1)
      let w2 = new CSG.Vector3D(v2)
      let w3 = new CSG.Vector3D(v3)
      let e1 = w2.minus(w1)
      let e2 = w3.minus(w1)
      let t = new CSG.Vector3D(no).dot(e1.cross(e2))
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
    converted++
  }

  if (err) {
    console.warn(`WARNING: import errors: ${err} (some triangles might be misaligned or missing)`)
    // FIXME: this used to be added to the output script, which makes more sense
  }

  return [elementFormatter({vertices, triangles, normals, colors})]
}

function deserializeAsciiSTL (stl, filename, version, elementFormatter) {
  let converted = 0
  let o

  // -- Find all models
  const objects = stl.split('endsolid')
  // src += '// objects: ' + (objects.length - 1) + '\n'
  let elements = []
  for (o = 1; o < objects.length; o++) {
    // -- Translation: a non-greedy regex for facet {...} endloop pattern
    let patt = /\bfacet[\s\S]*?endloop/mgi
    let vertices = []
    let triangles = []
    let normals = []
    let vertexIndex = 0
    let err = 0

    let match = stl.match(patt)
    if (match == null) continue
    for (let i = 0; i < match.length; i++) {
      // if(converted%100==0) status('stl to jscad: converted '+converted+' out of '+match.length+ ' facets');
      // -- 1 normal with 3 numbers, 3 different vertex objects each with 3 numbers:
      // let vpatt = /\bfacet\s+normal\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*outer\s+loop\s+vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/mgi;
      // (-?\d+\.?\d*) -1.21223
      // (-?\d+\.?\d*[Ee]?[-+]?\d*)
      let vpatt = /\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi
      let v = vpatt.exec(match[i])
      if (v == null) continue
      if (v.length !== 13) {
        echo('Failed to parse ' + match[i])
        break
      }
      let skip = 0
      for (let k = 0; k < v.length; k++) {
        if (v[k] === 'NaN') {
          echo('bad normal or triangle vertice #' + converted + ' ' + k + ": '" + v[k] + "', skipped")
          skip++
        }
      }
      err += skip
      if (skip) {
        continue
      }
      if (0 && skip) {
        let j = 1 + 3
        let v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]))
        let v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]))
        let v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]))
        echo('recalculate norm', v1, v2, v3)
        let w1 = new CSG.Vector3D(v1)
        let w2 = new CSG.Vector3D(v2)
        let w3 = new CSG.Vector3D(v3)
        let _u = w1.minus(w3)
        let _v = w1.minus(w2)
        let norm = _u.cross(_v).unit()
        j = 1
        v[j++] = norm._x
        v[j++] = norm._y
        v[j++] = norm._z
        skip = false
      }
      let j = 1
      let no = []; no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++]))
      let v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]))
      let v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]))
      let v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]))
      let triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++)

      // -- Add 3 vertices for every triangle
      // TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
      if (skip === 0) {  // checking cw vs ccw
        // E1 = B - A
        // E2 = C - A
        // test = dot( Normal, cross( E1, E2 ) )
        // test > 0: cw, test < 0: ccw
        let w1 = new CSG.Vector3D(v1)
        let w2 = new CSG.Vector3D(v2)
        let w3 = new CSG.Vector3D(v3)
        let e1 = w2.minus(w1)
        let e2 = w3.minus(w1)
        let t = new CSG.Vector3D(no).dot(e1.cross(e2))
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
      elementFormatter({vertices, triangles, index: o})
    )
  }

  return elements
}

// FIXME : just a stand in for now from scad-api, not sure if we should rely on scad-api from here ?
function polyhedron (p) {
  let pgs = []
  let ref = p.triangles || p.polygons
  let colors = p.colors || null

  for (let i = 0; i < ref.length; i++) {
    let pp = []
    for (let j = 0; j < ref[i].length; j++) {
      pp[j] = p.points[ref[i][j]]
    }

    let v = []
    for (let j = ref[i].length - 1; j >= 0; j--) { // --- we reverse order for examples of OpenSCAD work
      v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0], pp[j][1], pp[j][2])))
    }
    let s = CSG.Polygon.defaultShared
    if (colors && colors[i]) {
      s = CSG.Polygon.Shared.fromColor(colors[i])
    }
    pgs.push(new CSG.Polygon(v, s))
  }
  let r = CSG.fromPolygons(pgs)
  return r
}

module.exports = {
  deserialize
}
