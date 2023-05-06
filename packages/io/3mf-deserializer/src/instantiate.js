import { flatten } from '@jscad/array-utils'
import { geometries, transforms, primitives } from '@jscad/modeling'

import { parseModel } from './model.js'

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

const instantiateProperties = (options, properties, materials, colorgroups) => {
  const displaycolors = []
  for (let i = 0; i < properties.length; i++) {
    const displaycolor = getDisplayColor(properties[i], materials, colorgroups)
    if (displaycolor) {
      displaycolors.push(displaycolor)
    }
  }
  if (displaycolors.length === properties.length) return displaycolors
  return null
}

const instantiateObject = (options, object, materials, colorgroups) => {
  if (object.mesh) {
    const mesh = object.mesh
    const displaycolors = instantiateProperties(options, mesh.properties, materials, colorgroups)
    const shape = primitives.polyhedron({ points: mesh.vertices, faces: mesh.triangles, colors: displaycolors })
    // add properties from the object to the shape
    shape.id = object.id
    shape.type = object.otype
    if (object.name) shape.name = object.name

    const displayColor = getDisplayColor(object, materials, colorgroups)
    if (!displaycolors && displayColor) shape.color = displayColor

    return shape
  }
  return geometries.geom3.create()
}

/*
 * Instantiate the given model into a list of shapes (JSCAD geometries).
 */
const instantiateModel = (options, model) => {
  const { includedType } = options

  // parse the 3MF model contents (XML)
  let { buildItems, objects, materials, colorgroups } = parseModel(options, model)

  if (includedType !== 'all') {
    // only include the desired types
    buildItems = buildItems.filter((item) => item.mesh.type === includedType)
  }

  // instantiate each object found in the model
  const instantiatedObjects = {}
  objects.forEach((object) => {
    const instantiatedObject = instantiateObject(options, object, materials, colorgroups)
    instantiatedObjects[object.id] = instantiatedObject
  })

  // but include only those objects which are part of the build items
  const instantiatedItems = buildItems.map((item) => {
    const object = instantiatedObjects[item.oid]
    return transforms.transform(item.transform, object)
  })
  return instantiatedItems
}

/*
 * Instantiate each of the given models into a list of shapes (JSCAD geometries).
 */
export const instantiateModels = (options, models) => {
  const shapeLists = models.map((model) => instantiateModel(options, model))
  return flatten(shapeLists)
}
