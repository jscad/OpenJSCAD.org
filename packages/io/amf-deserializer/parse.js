const sax = require('sax')
const {amfMesh,
amfVertices,
amfCoordinates,
amfX,
amfY,
amfZ,
amfNormal,
amfVolume,
amfTriangle,
amfV1,
amfV2,
amfV3,
amfVertex,
amfEdge,
amfMetadata,
amfMaterial,
amfColor,
amfR,
amfG,
amfB,
amfA,
amfMap,
amfU1,
amfU2,
amfU3} = require('./helpers')
const {inchMM} = require('./constants')

let amfLast = null // last object found
let amfDefinition = 0 // definitions beinging created
// 0-AMF,1-object,2-material,3-texture,4-constellation,5-metadata
// high level elements / definitions
let amfObjects = [] // list of objects
let amfMaterials = [] // list of materials
let amfTextures = [] // list of textures
let amfConstels = [] // list of constellations
// let amfMetadata = [] // list of metadata
let amfObj = null // amf in object form

function amfAmf (element) {
  // default SVG with no viewport
  let obj = {type: 'amf', unit: 'mm', scale: 1.0}

  if ('UNIT' in element) { obj.unit = element.UNIT.toLowerCase() }
  // set scaling
  switch (obj.unit.toLowerCase()) {
    case 'inch':
      obj.scale = inchMM
      break
    case 'foot':
      obj.scale = inchMM * 12.0
      break
    case 'meter':
      obj.scale = 1000.0
      break
    case 'micron':
      obj.scale = 0.001
      break
    case 'millimeter':
    default:
      break
  }

  obj.objects = []
  return obj
}

const amfObject = function (element) {
  let obj = {type: 'object', id: 'JSCAD' + (amfObjects.length)} // default ID

  if ('ID' in element) { obj.id = element.ID }

  obj.objects = []
  return obj
}

function createAmfParser (src, pxPmm) {
  // create a parser for the XML
  const parser = sax.parser(false, {trim: true, lowercase: false, position: true})

  parser.onerror = function (e) {
    console.log('error: line ' + e.line + ', column ' + e.column + ', bad character [' + e.c + ']')
  }
  parser.onopentag = function (node) {
    const objMap = {
      AMF: amfAmf, // obj = amfAmf(node.attributes)
      OBJECT: (attributes) => {
        const tmp = amfObject(attributes)
        if (amfDefinition === 0) amfDefinition = 1 // OBJECT processing
        return tmp
      }, //
      MESH: amfMesh,
      VERTICES: amfVertices,
      VERTEX: amfVertex,
      EDGE: amfEdge,
      VOLUME: amfVolume,
      MATERIAL: attributes => {
        const tmp = amfMaterial(attributes)
        if (amfDefinition === 0) amfDefinition = 2 // MATERIAL processing
        return tmp
      },
      TEXTURE: node => {
        if (amfDefinition === 0) amfDefinition = 3 // TEXTURE processing
      },
      CONSTELLATION: node => {
        if (amfDefinition === 0) amfDefinition = 4 // CONSTELLATION processing
      },
      METADATA: attributes => {
        const tmp = amfMetadata(attributes)
        if (amfDefinition === 0) amfDefinition = 5 // METADATA processing
        return tmp
      },
      COORDINATES: amfCoordinates,
      NORMAL: amfNormal,
      NX: amfX,
      X: amfX,
      NY: amfY,
      Y: amfY,
      NZ: amfZ,
      Z: amfZ,
      TRIANGLE: amfTriangle,
      V1: amfV1,
      VTEX1: amfV1,
      V2: amfV2,
      VTEX2: amfV2,
      V3: amfV3,
      VTEX3: amfV3,
      COLOR: amfColor,
      R: amfR,
      G: amfG,
      B: amfB,
      A: amfA,
      MAP: amfMap,
      TEXMAP: amfMap,
      U1: amfU1,
      UTEX1: amfU1,
      WTEX1: amfU1,
      U2: amfU2,
      UTEX2: amfU2,
      WTEX2: amfU2,
      U3: amfU3,
      UTEX3: amfU3,
      WTEX3: amfU3,
      COMPOSITE: () => undefined, // ignored by design
      undefined: () => console.log('Warning: Unsupported AMF element: ' + node.name)
    }

    let obj = objMap[node.name] ? objMap[node.name](node.attributes, {amfObjects}) : null

    if (obj !== null) {
      switch (amfDefinition) {
        case 0: // definition of AMF
          if ('objects' in obj) {
            // console.log('push object ['+obj.type+']');
            amfObjects.push(obj)
          }
          break
        case 1: // definition of OBJECT
          if (amfObjects.length > 0) {
            let group = amfObjects.pop()
            // add the object to the active group if necessary
            if ('objects' in group) {
              // console.log('object '+group.type+' adding ['+obj.type+']');
              // console.log(JSON.stringify(obj));
              group.objects.push(obj)
            }
            amfObjects.push(group)
            // and push this object as a group object if necessary
            if ('objects' in obj) {
              // console.log('object group ['+obj.type+']');
              amfObjects.push(obj)
            }
          }
          break
        case 2: // definition of MATERIAL
          if (obj.type === 'material') {
            // console.log('push material ['+obj.type+']');
            amfMaterials.push(obj)
          } else {
            if (amfMaterials.length > 0) {
              let group = amfMaterials.pop()
              // add the object to the active group if necessary
              if ('objects' in group) {
                // console.log('material '+group.type+' adding ['+obj.type+']');
                // console.log(JSON.stringify(obj));
                group.objects.push(obj)
              }
              amfMaterials.push(group)
              // and push this object as a group object if necessary
              if ('objects' in obj) {
                // console.log('push material ['+obj.type+']');
                amfMaterials.push(obj)
              }
            }
          }
          break
        case 3: // definition of TEXTURE
          break
        case 4: // definition of CONSTELLATION
          break
        case 5: // definition of METADATA
          break
        default:
          console.log('ERROR: invalid AMF definition')
          break
      }
      amfLast = obj // retain this object in order to add values
    }
  }

  parser.onclosetag = function (node) {
    switch (node) {
      // list those which have objects
      case 'AMF':
      case 'OBJECT':
      case 'MESH':
      case 'VERTICES':
      case 'VERTEX':
      case 'EDGE':
      case 'COORDINATES':
      case 'NORMAL':
      case 'VOLUME':
      case 'TRIANGLE':
      case 'MATERIAL':
      case 'COLOR':
      case 'MAP':
      case 'TEXMAP':
        break
      case 'TEXTURE':
        if (amfDefinition === 3) { amfDefinition = 0 } // resume processing
        return
      case 'CONSTELLATION':
        if (amfDefinition === 4) { amfDefinition = 0 } // resume processing
        return
      case 'METADATA':
        if (amfDefinition === 5) { amfDefinition = 0 } // resume processing
        return
      default:
        // console.log('closetag: '+node);
        return
    }

    let obj = null
    switch (amfDefinition) {
      case 0: // definition of AMF
      case 1: // definition of OBJECT
        if (amfObjects.length > 0) {
          obj = amfObjects.pop()
          // console.log('pop object ['+obj.type+']');
          if (obj.type === 'object') {
            amfDefinition = 0 // AMF processing
          }
        }
        // check for completeness
        if (amfObjects.length === 0) {
          amfObj = obj
        }
        break
      case 2: // definition of MATERIAL
        if (amfMaterials.length > 0) {
          obj = amfMaterials.pop()
          // console.log('pop material ['+obj.type+']');
          if (obj.type === 'material') {
            amfMaterials.push(obj) // keep a list of materials
            amfDefinition = 0 // AMF processing
          }
        }
        break
      case 3: // definition of TEXTURE
        amfDefinition = 0 // AMF processing
        break
      case 4: // definition of CONSTELLATION
        amfDefinition = 0 // AMF processing
        break
      case 5: // definition of METADATA
        amfDefinition = 0 // AMF processing
        break
      default:
        break
    }
  }

  parser.ontext = function (value) {
    if (value !== null) {
      if (amfLast && amfDefinition !== 0) {
        amfLast.value = value
      }
    }
  }

  parser.onend = function () {
    // console.log('AMF parsing completed')
  }

  // start the parser
  parser.write(src).close()
}

const parse = (src, pxPmm) => {
  createAmfParser(src, pxPmm)
  return {amfObj, amfMaterials, amfTextures, amfConstels}
}

module.exports = parse
