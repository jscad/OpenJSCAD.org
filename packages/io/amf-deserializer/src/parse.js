const saxes = require('saxes')

const {
  amfMesh, amfVertices, amfCoordinates,
  amfX, amfY, amfZ, amfNormal,
  amfVolume, amfTriangle, amfV1,
  amfV2, amfV3, amfVertex, amfEdge,
  amfMetadata, amfMaterial, amfColor,
  amfR, amfG, amfB, amfA, amfMap,
  amfU1, amfU2, amfU3
} = require('./helpers')
const { inchMM } = require('./constants')

let amfLast = null // last object found
let amfDefinition = 0 // definitions beinging created
// 0-AMF, 1-object, 2-material, 3-texture, 4-constellation, 5-metadata
// high level elements / definitions
const amfObjects = [] // list of objects
const amfMaterials = [] // list of materials
const amfTextures = [] // list of textures
const amfConstels = [] // list of constellations
// let amfMetadata = [] // list of metadata
let amfObj = null // amf in object form

const amfAmf = (element) => {
  // default AMF with no objects
  const obj = { type: 'amf', unit: 'mm', scale: 1.0 }

  if (element.unit) { obj.unit = element.unit.toLowerCase() }
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

const amfObject = (element) => {
  const obj = { type: 'object', id: `JSCAD${amfObjects.length}` } // default ID

  if (element.id) { obj.id = element.id }

  obj.objects = []
  return obj
}

const createAmfParser = (src, pxPmm) => {
  // create a parser for the XML
  const parser = new saxes.SaxesParser()

  parser.on('error', (e) => {
    console.log(`ERROR: AMF file line ${e.line}, column ${e.column}, bad character [${e.c}]`)
  })

  parser.on('opentag', (node) => {
    const objMap = {
      AMF: amfAmf,
      OBJECT: (node) => {
        const tmp = amfObject(node)
        if (amfDefinition === 0) amfDefinition = 1 // OBJECT processing
        return tmp
      }, //
      MESH: amfMesh,
      VERTICES: amfVertices,
      VERTEX: amfVertex,
      EDGE: amfEdge,
      VOLUME: amfVolume,
      MATERIAL: (node) => {
        const tmp = amfMaterial(node)
        if (amfDefinition === 0) amfDefinition = 2 // MATERIAL processing
        return tmp
      },
      TEXTURE: (node) => {
        if (amfDefinition === 0) amfDefinition = 3 // TEXTURE processing
      },
      CONSTELLATION: (node) => {
        if (amfDefinition === 0) amfDefinition = 4 // CONSTELLATION processing
      },
      METADATA: (node) => {
        const tmp = amfMetadata(node)
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
      undefined: () => console.log(`WARNING: unsupported AMF element: ${node.name}`)
    }

    const elementName = node.name.toUpperCase()
    const obj = objMap[elementName] ? objMap[elementName](node.attributes, { amfObjects }) : null

    if (obj) {
      switch (amfDefinition) {
        case 0: // definition of AMF
          if ('objects' in obj) {
            amfObjects.push(obj)
          }
          break
        case 1: // definition of OBJECT
          if (amfObjects.length > 0) {
            const group = amfObjects.pop()
            // add the object to the active group if necessary
            if ('objects' in group) {
              group.objects.push(obj)
            }
            amfObjects.push(group)
            // and push this object as a group object if necessary
            if ('objects' in obj) {
              amfObjects.push(obj)
            }
          }
          break
        case 2: // definition of MATERIAL
          if (obj.type === 'material') {
            amfMaterials.push(obj)
          } else {
            if (amfMaterials.length > 0) {
              const group = amfMaterials.pop()
              // add the object to the active group if necessary
              if ('objects' in group) {
                group.objects.push(obj)
              }
              amfMaterials.push(group)
              // and push this object as a group object if necessary
              if ('objects' in obj) {
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
          console.log('WARNING: invalid AMF definition')
          break
      }
      amfLast = obj // retain this object in order to add values
    }
  })

  parser.on('closetag', (node) => {
    const elementName = node.name.toUpperCase()
    switch (elementName) {
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
        return
    }

    let obj = null
    switch (amfDefinition) {
      case 0: // definition of AMF
      case 1: // definition of OBJECT
        if (amfObjects.length > 0) {
          obj = amfObjects.pop()
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
  })

  parser.on('text', (value) => {
    if (value !== null) {
      value = value.trim()
      if (value.length > 0 && amfLast && amfDefinition !== 0) {
        amfLast.value = value
        amfLast = null
      }
    }
  })

  parser.on('end', () => {
    // console.log('AMF parsing completed')
  })

  // start the parser
  parser.write(src).close()
}

const parse = (src, pxPmm) => {
  createAmfParser(src, pxPmm)
  return { amfObj, amfMaterials, amfTextures, amfConstels }
}

module.exports = parse
