const { vt2jscad } = require('./vt2jscad')
const {CSG} = require('@jscad/csg')

/**
 * Parse the given obj data and return either a JSCAD script or a CSG/CAG object
 * @param  {string} input obj data
 * @param {string} filename (optional) original filename of AMF source
 * @param {object} options options (optional) anonymous object with:
 * @param {string} [options.version='0.0.0'] version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] toggle injection of metadata (producer, date, source) at the start of the file
 * @param {string} [options.output='jscad'] {String} either jscad or csg to set desired output
 * @return {CSG/string} either a CAG/CSG object or a string (jscad script)
 */
function deserialize (input, filename, options) { // http://en.wikipedia.org/wiki/Wavefront_.obj_file
  options && options.statusCallback && options.statusCallback({progress: 0})
  const defaults = {version: '0.0.0', addMetaData: true, output: 'jscad'}
  options = Object.assign({}, defaults, options)
  const {output} = options

  const {positions, faces} = getPositionsAndFaces(input, options)
  const result = output === 'jscad' ? stringify({positions, faces, options}) : objectify({positions, faces, options})
  options && options.statusCallback && options.statusCallback({progress: 100})
  return result
}

const getPositionsAndFaces = (data, options) => {
  let lines = data.split(/\n/)
  let positions = []
  let faces = []

  for (let i = 0; i < lines.length; i++) {
    let s = lines[i]
    let a = s.split(/\s+/)

    if (a[0] === 'v') {
      positions.push([a[1], a[2], a[3]])
    } else if (a[0] === 'f') {
      let fc = []
      let skip = 0

      for (let j = 1; j < a.length; j++) {
        let c = a[j]
        c = c.replace(/\/.*$/, '') // -- if coord# is '840/840' -> 840
        c-- // -- starts with 1, but we start with 0
        if (c >= positions.length) {
          skip++
        }
        if (skip === 0) {
          fc.push(c)
        }
      }
         // fc.reverse();
      if (skip === 0) {
        faces.push(fc)
      }
    } else {
      // vn vt and all others disregarded
    }
    options && options.statusCallback && options.statusCallback({progress: 90 * i / lines.length})  //getPositionsAndFaces is 90% of total
  }
  return {positions, faces}
}

const objectify = ({positions, faces}) => {
  return CSG.polyhedron({points: positions, faces})
}

const stringify = ({positions, faces, addMetaData, filename, version}) => {
  let code = addMetaData ? `//
  // producer: OpenJSCAD.org Compatibility${version} OBJ deserializer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''
  // if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
  code += `// objects: 1
// object #1: polygons: ${faces.length}
function main() { return
${vt2jscad(positions, faces)}
}
  `
  return code
}

module.exports = {
  deserialize
}
