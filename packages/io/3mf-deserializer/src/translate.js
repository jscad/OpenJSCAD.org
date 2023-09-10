import { parseModel } from './model.js'

//
// convert the internal repreentation into JSCAD code
//

const getDisplayColor = (property, materials, colorgroups) => {
  if ('pid' in property && 'pindex' in property) {
    const material = materials.find((m) => property.pid === m.id)
    if (material) {
      const base = material.bases[property.pindex]
      return base.displaycolor
    }
    const colorgroup = colorgroups.find((g) => property.pid === g.id)
    if (colorgroup) {
      const color = colorgroup.colors[property.pindex]
      return color.color
    }
  }
  return null
}

const translateVertices = (options, vertices) => {
  let code = 'const vertices = [\n'
  for (let i = 0; i < vertices.length; i++) {
    code += `    [${vertices[i]}],\n`
  }
  code += '  ]'
  return code
}

const translateTriangles = (options, triangles) => {
  let code = 'const triangles = [\n'
  for (let i = 0; i < triangles.length; i++) {
    code += `    [${triangles[i]}],\n`
  }
  code += '  ]'
  return code
}

const translateProperties = (options, properties, materials, colorgroups) => {
  const colors = []
  for (let i = 0; i < properties.length; i++) {
    const displaycolor = getDisplayColor(properties[i], materials, colorgroups)
    if (displaycolor) {
      colors.push(displaycolor)
    }
  }
  let code = null
  if (colors.length === properties.length) {
    code = 'const displaycolors = [\n'
    for (let i = 0; i < colors.length; i++) {
      code += `    [${colors[i]}],\n`
    }
    code += '  ]'
  }
  return code
}

const translateTransform = (options, transform) => `const transform = [${transform}]`

const translateBuildItem = (options, item) => {
  let code = `
// Build Item ${item.sequence}
// Object:
//   ID: ${item.oid}
//   Type: ${item.otype}`
  if (item.name) {
    code += `\n//   Name: ${item.oname}`
  }
  code += `
const createBuildItem${item.sequence} = () => {
  const object = objects["${item.oid}"]
  ${translateTransform(options, item.transform)}
  return transform(transform, object)
}

builditems.push(createBuildItem${item.sequence}())
`
  return code
}

const translateObjectColor = (object, materials, colorgroups) => {
  const displayColor = getDisplayColor(object, materials, colorgroups)
  if (displayColor) {
    return `shape.color = [${displayColor}]`
  }
  return ''
}

const translateObject = (options, object, materials, colorgroups) => {
  let code = `
// Object ID: ${object.id}
// Object Type: ${object.otype}`
  if (object.name) {
    code += `\n// Object Name: ${object.name}`
  }
  if (object.mesh) {
    let displaycolors = 'const displaycolors = null'
    let shapecolor = translateObjectColor(object, materials, colorgroups)

    const properties = translateProperties(options, object.mesh.properties, materials, colorgroups)
    if (properties) {
      displaycolors = properties
      shapecolor = ''
    }

    code += `
const createObject${object.id} = () => {
  ${translateVertices(options, object.mesh.vertices)}
  ${translateTriangles(options, object.mesh.triangles)}
  ${displaycolors}
  const shape = polyhedron({points: vertices, faces: triangles, colors: displaycolors})
  // add properties from the object to the shape
  shape.id = ${object.id}
  shape.type = "${object.otype}"
  ${shapecolor}
  return shape
}

objects["${object.id}"] = createObject${object.id}()
`
  }
  return code
}

const translateModel = (options, source) => {
  const { includedType } = options

  // parse the 3MF model contents (XML)
  let { buildItems, objects, materials, colorgroups } = parseModel(options, source)

  if (includedType !== 'all') {
    // only include the desired types
    buildItems = buildItems.filter((item) => item.mesh.type === includedType)
  }

  const translatedObjects = objects.map((object, index) => translateObject(options, object, materials, colorgroups))
  const translatedItems = buildItems.map((item, index) => translateBuildItem(options, item))
  return translatedObjects.join('') + translatedItems.join('')
}

export const translateModels = (options, models) => {
  const { version, addMetaData, filename } = options

  // translate the models into blocks of source code
  const translatedModels = models.map((source) => translateModel(options, source))
  // FIXME flatten the array of arrays

  // finally, accumulate the models, and add the main entry point
  const metacode = addMetaData
    ? `
//
// Produced by JSCAD IO Library : 3MF Deserializer
// Version: ${version}
// Date: ${new Date()}
// Source: ${filename}
//
`
    : ''

  let bodycode = ''
  for (let i = 0; i < translatedModels.length; i++) {
    bodycode += translatedModels[i]
  }

  const code = 'import * from \'@jscad/modeling\'' +
    metacode +
    `
const objects = {} // list of objects by ID
const builditems = []
` + bodycode +
`
export const main = () => {
  return builditems
}
`
  return code
}
