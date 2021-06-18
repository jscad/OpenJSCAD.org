const saxes = require('saxes')

const {
  x3dTypes,

  x3dX3D,
  x3dUnit,
  x3dMeta,
  x3dScene,
  x3dTransform,
  x3dShape,
  x3dGroup,

  x3dBox,
  x3dCone,
  x3dCylinder,
  x3dSphere,
  x3dExtrusion,

  x3dArc2D,
  x3dArcClose2D,
  x3dCircle2D,
  x3dDisk2D,
  x3dPolyline2D,
  x3dRectangle2D,
  x3dTriangleSet2D,

  x3dColor,
  x3dCoordinate,
  x3dTriangleSet,
  x3dTriangleFanSet,
  x3dTriangleStripSet,
  x3dQuadSet,
  x3dIndexedTriangleSet,
  x3dIndexedTriangleFanSet,
  x3dIndexedTriangleStripSet,
  x3dIndexedQuadSet,
  x3dIndexedFaceSet,
  x3dElevationGrid,

  x3dLineSet,
  x3dIndexedLineSet,

  x3dAppearance,
  x3dMaterial
} = require('./objects')

let x3dLast = null // last object found
let x3dDefinition = x3dTypes.X3D // what kind of object beinging created

// high level elements / definitions
const x3dObjects = [] // list of objects
const x3dDefs = new Map() // list of named objects

const x3dMaterials = [] // list of materials
const x3dTextures = [] // list of textures

const x3dLength = { factor: 1.0, name: 'meters' }
const x3dAngle = { factor: 1.0, name: 'radians' }

let x3dObj = null // x3d in object form

const nodeToObjectMap = {
  X3D: x3dX3D,
  UNIT: x3dUnit,
  META: x3dMeta,
  SCENE: x3dScene,
  TRANSFORM: x3dTransform,
  SHAPE: x3dShape,
  GROUP: x3dGroup,
  STATICGROUP: x3dGroup,

  BOX: x3dBox,
  CONE: x3dCone,
  CYLINDER: x3dCylinder,
  SPHERE: x3dSphere,
  EXTRUSION: x3dExtrusion,

  ARC2D: x3dArc2D,
  ARCCLOSE2D: x3dArcClose2D,
  CIRCLE2D: x3dCircle2D,
  DISK2D: x3dDisk2D,
  POLYLINE2D: x3dPolyline2D,
  RECTANGLE2D: x3dRectangle2D,
  TRIANGLESET2D: x3dTriangleSet2D,

  COLOR: x3dColor,
  COORDINATE: x3dCoordinate,
  TRIANGLESET: x3dTriangleSet,
  TRIANGLEFANSET: x3dTriangleFanSet,
  TRIANGLESTRIPSET: x3dTriangleStripSet,
  QUADSET: x3dQuadSet,
  INDEXEDTRIANGLESET: x3dIndexedTriangleSet,
  INDEXEDTRIANGLEFANSET: x3dIndexedTriangleFanSet,
  INDEXEDTRIANGLESTRIPSET: x3dIndexedTriangleStripSet,
  INDEXEDQUADSET: x3dIndexedQuadSet,
  INDEXEDFACESET: x3dIndexedFaceSet,
  ELEVATIONGRID: x3dElevationGrid,

  LINESET: x3dLineSet,
  INDEXEDLINESET: x3dIndexedLineSet,

  APPEARANCE: x3dAppearance,
  MATERIAL: x3dMaterial
}

let objectId = 1
const getObjectId = () => ('0000' + objectId++).slice(-4)

const createX3DParser = (src, pxPmm) => {
  // create a parser for the XML
  const parser = new saxes.SaxesParser()

  parser.on('error', (e) => {
    console.log(`error: line ${e.line}, column ${e.column}, bad character [${e.c}]`)
  })

  parser.on('opentag', (node) => {
    // convert known XML tags to objects
    const elementname = node.name.toUpperCase()
    let obj = nodeToObjectMap[elementname] ? nodeToObjectMap[elementname](node.attributes, { x3dObjects }) : null

    if (obj) {
      obj.id = getObjectId()

      // handle named objects (DEF/USE)
      if (node.attributes.USE) {
        const objectname = node.attributes.USE
        if (x3dDefs.has(objectname)) {
          const def = x3dDefs.get(objectname)
          if (def.definition !== obj.definition) {
            console.log(`WARNING: using a definition "${objectname}" of a different type; ${obj.definition} vs ${def.definition}`)
          }
          obj = def
        } else {
          console.log(`WARNING: definition "${objectname}" does not exist, using default for ${obj.definition}`)
        }
      } else {
        if (node.attributes.DEF) {
          const objectname = node.attributes.DEF
          if (x3dDefs.has(objectname)) {
            console.log(`WARNING: redefintion of ${objectname} has been ignored`)
          } else {
            x3dDefs.set(objectname, obj)
          }
        }
      }

      // start a new definition

      switch (obj.definition) {
        case x3dTypes.SCENE:
        case x3dTypes.TRANSFORM:
        case x3dTypes.SHAPE:
        case x3dTypes.APPEARANCE:
        case x3dTypes.TRIANGLESET:
        case x3dTypes.TRIANGLEFANSET:
        case x3dTypes.TRIANGLESTRIPSET:
        case x3dTypes.QUADSET:
        case x3dTypes.INDEXEDTRIANGLESET:
        case x3dTypes.INDEXEDTRIANGLEFANSET:
        case x3dTypes.INDEXEDTRIANGLESTRIPSET:
        case x3dTypes.INDEXEDQUADSET:
        case x3dTypes.INDEXEDFACESET:
        case x3dTypes.ELEVATIONGRID:
        case x3dTypes.LINESET:
        case x3dTypes.INDEXEDLINESET:
        case x3dTypes.GROUP:
          x3dDefinition = obj.definition
          break
        default:
          break
      }

      // console.log('definition',x3dDefinition)

      // adjust the current definition mode if necessary

      switch (x3dDefinition) {
        case x3dTypes.X3D: // definition of X3D
          if ('objects' in obj) {
            // console.log('object group ['+obj.definition+']')
            x3dObjects.push(obj)
          }
          // handle special meta and unit nodes
          if (obj.definition === x3dTypes.UNIT) {
            if (obj.category === 'length') {
              x3dLength.factor = obj.conversionFactor
              x3dLength.name = obj.name
            }
            if (obj.category === 'angle') {
              x3dAngle.factor = obj.conversionFactor
              x3dAngle.name = obj.name
            }
          }
          break
        case x3dTypes.SCENE:
        case x3dTypes.TRANSFORM:
        case x3dTypes.SHAPE:
        case x3dTypes.GROUP:
        case x3dTypes.APPEARANCE:
        case x3dTypes.TRIANGLESET:
        case x3dTypes.TRIANGLEFANSET:
        case x3dTypes.TRIANGLESTRIPSET:
        case x3dTypes.QUADSET:
        case x3dTypes.INDEXEDTRIANGLESET:
        case x3dTypes.INDEXEDTRIANGLEFANSET:
        case x3dTypes.INDEXEDTRIANGLESTRIPSET:
        case x3dTypes.INDEXEDQUADSET:
        case x3dTypes.INDEXEDFACESET:
        case x3dTypes.ELEVATIONGRID:
        case x3dTypes.LINESET:
        case x3dTypes.INDEXEDLINESET:
          if (x3dObjects.length > 0) {
            const group = x3dObjects.pop()
            // add the object to the active group if necessary
            if ('objects' in group) {
              // console.log('object '+group.definition+' adding ['+obj.definition+']')
              group.objects.push(obj)
            }
            x3dObjects.push(group)
            // and push this object as a group object if necessary
            if ('objects' in obj) {
              // console.log('object group ['+obj.definition+']')
              x3dObjects.push(obj)
            }
          }
          break
        default:
          console.log('WARNING: invalid X3D definition')
          break
      }
      x3dLast = obj // retain this object in order to add values
    }
  })

  parser.on('closetag', (node) => {
    const elementname = node.name.toUpperCase()
    switch (elementname) {
      // list those which have a list of objects
      case 'X3D':
      case 'SCENE':
      case 'TRANSFORM':
      case 'SHAPE':
      case 'GROUP':
      case 'STATICGROUP':
      case 'APPEARANCE':
      case 'TRIANGLESET':
      case 'TRIANGLEFANSET':
      case 'TRIANGLESTRIPSET':
      case 'QUADSET':
      case 'INDEXEDTRIANGLESET':
      case 'INDEXEDTRIANGLEFANSET':
      case 'INDEXEDTRIANGLESTRIPSET':
      case 'INDEXEDQUADSET':
      case 'INDEXEDFACESET':
      case 'ELEVATIONGRID':
      case 'LINESET':
      case 'INDEXEDLINESET':
        break
      default:
        // console.log('closetag: '+node)
        return
    }

    const popDefinition = () => {
      if (x3dObjects.length > 0) {
        x3dDefinition = x3dObjects[x3dObjects.length - 1].definition
      }
    }

    // complete the definition

    let obj = null
    switch (x3dDefinition) {
      case x3dTypes.X3D:
        if (x3dObjects.length > 0) {
          obj = x3dObjects.pop()
          // console.log('pop object ['+obj.definition+']')
          popDefinition()
        }
        // check for completeness
        if (x3dObjects.length === 0) {
          // console.log('completed',obj)
          obj.length = x3dLength
          obj.angle = x3dAngle
          x3dObj = obj
        }
        break
      case x3dTypes.SCENE:
      case x3dTypes.TRANSFORM:
      case x3dTypes.SHAPE:
      case x3dTypes.GROUP:
      case x3dTypes.APPEARANCE:
      case x3dTypes.TRIANGLESET:
      case x3dTypes.TRIANGLEFANSET:
      case x3dTypes.TRIANGLESTRIPSET:
      case x3dTypes.QUADSET:
      case x3dTypes.INDEXEDTRIANGLESET:
      case x3dTypes.INDEXEDTRIANGLEFANSET:
      case x3dTypes.INDEXEDTRIANGLESTRIPSET:
      case x3dTypes.INDEXEDQUADSET:
      case x3dTypes.INDEXEDFACESET:
      case x3dTypes.ELEVATIONGRID:
      case x3dTypes.LINESET:
      case x3dTypes.INDEXEDLINESET:
        if (x3dObjects.length > 0) {
          obj = x3dObjects.pop()
          // console.log('pop object ['+obj.definition+']')
          popDefinition()
        }
        break
      default:
        console.log('WARNING: unhandled definition', x3dDefinition)
        break
    }
  })

  parser.on('text', (value) => {
    if (value !== null) {
      value = value.trim()
      if (value.length > 0 && x3dLast && x3dDefinition !== 0) {
        x3dLast.value = value
      }
    }
  })

  parser.on('end', () => {
    // console.log('X3D parsing completed')
  })

  // start the parser
  parser.write(src).close()
}

const parse = (src, pxPmm) => {
  createX3DParser(src, pxPmm)
  // console.log(JSON.stringify(x3dObj))
  return { x3dObj, x3dMaterials, x3dTextures }
}

module.exports = parse
