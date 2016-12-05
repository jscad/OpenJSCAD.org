const fs = require('fs')
const path = require('path')

function generateOutputData (outputFormat, src, gMainParam, meta, CSG, CAG, lib, Blob) {
  let data
  if (outputFormat === 'jscad' || outputFormat === 'js') {
    data = new Blob([src], { type: 'application/javascript' })
  } else {
    const scad = fs.readFileSync(path.resolve(lib, './openscad.js')) // FIXME : UGHH these are helper functions !!
    // console.log("render jscad to "+outputFormat)
    // console.log(JSON.stringify(gMainParam))
    const fullSrc = `${src}\n${scad}\nmain(_getParameterDefinitions(${JSON.stringify(gMainParam)}))\n`
    let csg = eval(fullSrc) // src + '\n' + scad + '\nmain(_getParameterDefinitions(' + JSON.stringify(gMainParam) + '))\n') // *.jscad + openscad.js + main()

    if (csg.length) {
      var o = csg[0]
      if (o instanceof CAG) {
        o = o.extrude({offset: [0, 0, 0.1]})
      }
      for (let i = 1; i < csg.length; i++) {
        var c = csg[i]
        if (c instanceof CAG) {
          c = c.extrude({offset: [0, 0, 0.1]})
        }
        o = o.unionForNonIntersecting(c)
      }
      csg = o
    }

    const outputFormatHandlers = {
      'amf': () => csg.toAMFString(meta), // CSG to AMF
      'stlb': () => csg.toStlBinary(), // CSG to STL BINARY
      'stl': () => csg.toStlString(), // CSG to STL ASCII
      'stla': () => csg.toStlString(), // CSG to STL ASCII
      'dxf': () => cag.toDxf(), // CAG to DXF
      'svg': () => cag.toSvg(), // CAG to SVG
      'x3d': () => csg.toX3D(), // CSG to X3D Only possible via browsers
      'json': () => csg.toJSON(), // CSG or CAG to JSON
      undefined: () => {
        console.log('ERROR: only jscad, stl, amf, dxf, svg or json as output format')
        process.exit(1)
      }
    }
    data = outputFormatHandlers[outputFormat]()
  }
  console.log(`Blob: type [${data.type}] size [${data.size}]`)
  return data
}
module.exports = generateOutputData
