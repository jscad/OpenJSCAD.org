import { hexToRgb, mat4 } from '@jscad/modeling'

import saxes from 'saxes'

const convertTransform = (text) => {
  // convert the list of values (string) to mat4
  const values = text.split(/ +/).map((s) => parseFloat(s))
  return mat4.fromValues(
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

  // mesh have vertices, triangles, and properties
  obj.vertices = []
  obj.triangles = []
  obj.properties = []

  return obj
}

const parseVertex = (attributes) => {
  const obj = { type: 'vertex' }

  obj.vertex = [
    parseFloat(attributes.x),
    parseFloat(attributes.y),
    parseFloat(attributes.z)
  ]

  return obj
}

const parseTriangle = (attributes) => {
  const obj = { type: 'triangle' }

  obj.indices = [
    parseFloat(attributes.v1),
    parseFloat(attributes.v2),
    parseFloat(attributes.v3)
  ]
  if (attributes.p1) { obj.p1 = parseFloat(attributes.p1) }
  if (attributes.p2) { obj.p2 = parseFloat(attributes.p2) }
  if (attributes.p3) { obj.p3 = parseFloat(attributes.p3) }
  if (attributes.pid) { obj.pid = attributes.pid }

  return obj
}

// parse the build item, which specifies the contents of the model
const parseItem = (attributes) => {
  const obj = { type: 'item', transform: mat4.create() }

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
  if (attributes.pindex) { obj.pindex = parseFloat(attributes.pindex) }

  return obj
}

const parseComponents = (attributes) => {
  const obj = { type: 'components' }

  return obj
}

const parseComponent = (attributes) => {
  const obj = { type: 'component', transform: mat4.create() }

  obj.objectid = attributes.objectid

  if (attributes.transform) { obj.transform = convertTransform(attributes.transform) }

  return obj
}

const parseBaseMaterials = (attributes) => {
  const obj = { type: 'basematerials', bases: [] }

  obj.id = attributes.id

  return obj
}

const parseBase = (attributes) => {
  const obj = { type: 'base' }

  obj.name = attributes.name

  let color = hexToRgb(attributes.displaycolor)
  if (color.length === 3) color = [color[0], color[1], color[2], 1.0] // add alpha
  obj.displaycolor = color

  return obj
}

const parseColorGroup = (attributes) => {
  const obj = { type: 'colorgroup', colors: [] }

  obj.id = attributes.id

  return obj
}

const parseColor = (attributes) => {
  const obj = { type: 'color' }

  let color = hexToRgb(attributes.color)
  if (color.length === 3) color = [color[0], color[1], color[2], 1.0] // add alpha
  obj.color = color

  return obj
}

// get the associated property for the given triangle
const getProperty = (object, triangle) => {
  const property = {}
  // determine the pid (material)
  if (object.pid) property.pid = object.pid
  if (triangle.pid) property.pid = triangle.pid

  // determine the base (index) into the material
  // only consider p1 as gradient colors are not supported
  if ('p1' in triangle) {
    property.pindex = triangle.p1
  } else {
    if ('pindex' in object) property.pindex = object.pindex
  }
  return property
}

const create3mfParser = (src, storage) => {
  const { items, materials, colorgroups, objects } = storage

  let model = null
  let objLast = null // last object found

  // create a parser for the XML
  const parser = new saxes.SaxesParser()

  parser.on('error', (e) => {
    console.log(e)
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
      BASEMATERIALS: parseBaseMaterials,
      BASE: parseBase,
      MCOLORGROUP: parseColorGroup,
      MCOLOR: parseColor,
      undefined: () => console.log(`WARNING: unsupported 3MF element: ${node.name}`)
    }

    const elementName = node.name.toUpperCase().replace(':', '')

    const obj = objMap[elementName] ? objMap[elementName](node.attributes) : null

    let object = null
    let material = null
    let colorgroup = null
    if (obj) {
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
          object.mesh.properties.push(getProperty(object, obj))
          break
        case 'components':
          object = objects.at(-1)
          object.components = []
          break
        case 'component':
          object = objects.at(-1)
          object.components.push(obj)
          break
        case 'basematerials':
          materials.push(obj)
          break
        case 'base':
          material = materials.at(-1)
          material.bases.push(obj)
          break
        case 'colorgroup':
          colorgroups.push(obj)
          break
        case 'color':
          colorgroup = colorgroups.at(-1)
          colorgroup.colors.push(obj)
          break
        default:
          console.log('WARNING: unknown object type', obj.type)
          break
      }
      objLast = obj // retain this object in order to add values
    }
  })

  parser.on('closetag', (node) => {
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
  })

  // start the parser
  parser.write(src).close()
}

export const parse = (src) => {
  const items = [] // build items list
  const materials = [] // materials list
  const colorgroups = [] // colorgroups list
  const objects = [] // objects list

  create3mfParser(src, { items, materials, colorgroups, objects })
  return { items, materials, colorgroups, objects }
}
