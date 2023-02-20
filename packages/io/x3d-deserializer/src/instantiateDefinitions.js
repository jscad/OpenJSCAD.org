import { colors, transforms } from '@jscad/modeling'

import { createTransform } from './createTransform.js'

import { x3dTypes } from './objects.js'
import { findColor } from './translateHelpers.js'

import { instantiatePrimitive } from './instantiatePrimitive.js'
import { instantiateLine } from './instantiateLine.js'
import { instantiateMesh } from './instantiateMesh.js'

const instantiatedList = new Map()

const instantiateTransform = (options, object) => {
  // instantiate all sub-objects into geometry
  const geometries = object.objects.map((object) => instantiateDefinition(options, object)).filter((g) => g != null)
  if (geometries.length === 0) return null

  // and transform (retaining color)
  const matrix = createTransform(object.center, object.rotation, object.scale, object.scaleOrientation, object.translation)

  return geometries.map((geometry) => {
    const color = geometry.color
    geometry = transforms.transform(matrix, geometry)
    if (color) geometry.color = color
    return geometry
  })
}

const instantiateShape = (options, object) => {
  // look for the color
  const objects = object.objects
  const color = findColor(objects, options)

  let geometry = instantiatePrimitive(options, objects)
  if (!geometry) geometry = instantiateMesh(options, objects)
  if (!geometry) geometry = instantiateLine(options, objects)
  if (!geometry) geometry = null

  if (geometry && color) {
    geometry = colors.colorize(color, geometry)
  }
  return geometry
}

const instantiateGroup = (options, object) => {
  // instantiate all sub-objects into geometry
  const geometries = object.objects.map((object) => instantiateDefinition(options, object)).filter((g) => g != null)
  if (geometries.length === 0) return null
  return geometries
}

const instantiateDefinition = (options, object) => {
  let geometry
  switch (object.definition) {
    case x3dTypes.TRANSFORM:
      geometry = instantiateTransform(options, object)
      break
    case x3dTypes.SHAPE:
      geometry = instantiateShape(options, object)
      break
    case x3dTypes.GROUP:
      geometry = instantiateGroup(options, object)
      break
    default:
      console.log('WARNING: unknown definition: ' + object.definition)
      break
  }
  return geometry
}

export const instantiateDefinitions = (options, objects) => {
  const geometries = objects.map((object) => instantiateDefinition(options, object)).filter((g) => g != null)

  instantiatedList.clear()

  return geometries
}
