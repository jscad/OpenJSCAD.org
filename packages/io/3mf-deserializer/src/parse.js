import { maths } from '@jscad/modeling'

import saxes from 'saxes'

let objLast = null // last object found
let objList = []

let model = null
let items = [] // build items list
let materials = [] // materials list
let objects = [] // objects list

const convertTransform = (text) => {
  // convert the list of values (string) to mat4
  const values = text.split(/ +/).map((s) => parseFloat(s))
  return maths.mat4.fromValues(
    values[0], values[1], values[2], 0.0,
    values[3], values[4], values[5], 0.0,
    values[6], values[7], values[8], 0.0,
    values[9], values[10], values[11], 1.0
  )
}


const parseModel = (attributes) => {
  const obj = { type: 'model', unit: 'millimeter' }

  if (attributes.unit) { obj.unit = attributes.unit }

  // each model has resources and build items

  return obj
}

const parseMesh = (attributes) => {
  const obj = { type: 'mesh' }

  // mesh have vertices and triangles
  obj.vertices = []
  obj.triangles = []

  return obj
}

const parseVertex = (attributes) => {
  const obj = { type: 'vertex' }

  obj.vertex = [
    parseFloat(attributes.x),
    parseFloat(attributes.y),
    parseFloat(attributes.z),
  ]

  return obj
}

const parseTriangle = (attributes) => {
  const obj = { type: 'triangle' }

  obj.indices = [
    parseFloat(attributes.v1),
    parseFloat(attributes.v2),
    parseFloat(attributes.v3),
  ]
  if (attributes.p1) { obj.p1 = attributes.p1 }
  if (attributes.p2) { obj.p2 = attributes.p2 }
  if (attributes.p3) { obj.p3 = attributes.p3 }
  if (attributes.pid) { obj.pid = attributes.pid }

  return obj
}

// parse the build item, which specifies the contents of the model
const parseItem = (attributes) => {
  const obj = { type: 'item', transform: maths.mat4.create() }

  obj.objectid = attributes.objectid

  if (attributes.transform) { obj.transform = convertTransform(attributes.transform) }

  return obj
}

const parseObject = (attributes) => {
  const obj = { type: 'object', otype: 'model' }

  obj.id = attributes.id

  if (attributes.type) { obj.otype = attributes.type }

  if (attributes.partnumber) { obj.partnumber = attributes.partnumber }
  if (attributes.name) { obj.name = attributes.name }
  if (attributes.pid) { obj.pid = attributes.pid }
  if (attributes.pindex) { obj.pindex = attributes.pindex }

  return obj
}

const parseComponents = (attributes) => {
  const obj = { type: 'components' }

  return obj
}

const parseComponent = (attributes) => {
  const obj = { type: 'component', transform: maths.mat4.create() }

  obj.objectid = attributes.objectid

  if (attributes.transform) { obj.transform = convertTransform(attributes.transform) }

  return obj
}



const createAmfParser = (src) => {
  // create a parser for the XML
  const parser = new saxes.SaxesParser()

  parser.on('error', (e) => {
    console.log(e)
    // console.log(`ERROR: AMF file line ${e.line}, column ${e.column}, bad character [${e.c}]`)
  })

  parser.on('opentag', (node) => {
    const objMap = {
      MODEL: parseModel,
      ITEM: parseItem,
      OBJECT: parseObject,
      MESH: parseMesh,
      VERTEX: parseVertex,
      TRIANGLE: parseTriangle,
      COMPONENTS: parseComponents,
      COMPONENT: parseComponent,
      undefined: () => console.log(`WARNING: unsupported AMF element: ${node.name}`)
    }

    const elementName = node.name.toUpperCase()

    const obj = objMap[elementName] ? objMap[elementName](node.attributes, { objList }) : null

    let object = null
    if (obj) {
// console.log(obj)
      switch (obj.type) {
        case 'model':
          model = obj
          break
        case 'item':
          items.push(obj)
          break
        case 'object':
          objects.push(obj)
          break
        case 'mesh':
          object = objects.at(-1)
          object.mesh = obj
          break
        case 'vertex':
          object = objects.at(-1)
          object.mesh.vertices.push(obj.vertex)
          break
        case 'triangle':
          object = objects.at(-1)
          object.mesh.triangles.push(obj.indices)
          break
        case 'components':
          object = objects.at(-1)
          object.components = []
          break
        case 'component':
          object = objects.at(-1)
          object.components.push(obj)
          break
        default:
          console.log('WARNING: unknown object type', obj.type)
          break
      }
      objLast = obj // retain this object in order to add values
    }
  })

  parser.on('closetag', (node) => {
    const elementName = node.name.toUpperCase()
    // console.log('close',elementName)
    switch (elementName) {
      default:
        return
    }

  })

  parser.on('text', (value) => {
    if (value !== null) {
      value = value.trim()
      if (value.length > 0 && objLast) {
        objLast.value = value
        objLast = null
      }
    }
  })

  parser.on('end', () => {
    console.log('AMF parsing completed')
  })

  // start the parser
  parser.write(src).close()
}

export const parse = (src) => {
  createAmfParser(src)
  return { model, objects, materials, items }
}
