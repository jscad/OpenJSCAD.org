const createObject = require('./objectBuilder')
const parse = require('./parse')

const translate = function (src, filename, options) {
  options && options.statusCallback && options.statusCallback({progress: 0})
  filename = filename || 'amf'
  const defaults = {pxPmm: require('./constants').pxPmm, version: '0.0.0', addMetaData: true}
  options = Object.assign({}, defaults, options)
  const {version, pxPmm, addMetaData} = options

  // parse the AMF source
  const {amfObj, amfMaterials, amfTextures, amfConstels} = parse(src, pxPmm)
  // convert the internal objects to JSCAD code
  let code = addMetaData ? `//
  // producer: OpenJSCAD.org ${version} AMF deserializer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''

  if (!amfObj) {
    throw new Error('AMF parsing failed, no valid AMF data retrieved')
  }

  options && options.statusCallback && options.statusCallback({progress: 50})
  
  const scadCode = codify(amfObj, {amfMaterials, amfTextures, amfConstels})
  code += scadCode
  
  options && options.statusCallback && options.statusCallback({progress: 100})
  return code
}

//
// convert the internal repreentation into JSCAD code
//
function codify (amf, data) {
  if (amf.type !== 'amf' || (!amf.objects)) throw new Error('AMF malformed')
  let code = ''

  // hack due to lack of this in array map()
  let objects = amf.objects
  let materials = data.amfMaterials

  // convert high level definitions
  function createDefinition (obj, didx) {
    // console.log(materials.length);
    switch (obj.type) {
      case 'object':
        code += createObject(obj, didx, data, {csg: false})
        break
      case 'metadata':
        break
      case 'material':
        break
      default:
        console.log('Warning: unknown definition: ' + obj.type)
        break
    }
  }

  // start everthing
  code = `// Objects  : ${objects.length}
// Materials: ${materials.length}

// helper functions
`

  if (amf.scale !== 1.0) {
    code += 'let SCALE = ' + amf.scale + '; // scaling units (' + amf.unit + ')\n'
    code += 'let VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x*SCALE,y*SCALE,z*SCALE)); };\n'
  } else {
    code += 'let VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); };\n'
  }
  code += `let PP = function(a) { return new CSG.Polygon(a); };

function main() {
  let csgs = [];
`
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i]
    if (obj.type === 'object') {
      code += '  csgs.push(createObject' + obj.id + '());\n'
    }
  }
  code += `  return union(csgs);
}

`

  objects.map(createDefinition, data)
  return code
}

module.exports = translate
