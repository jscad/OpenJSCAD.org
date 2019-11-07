const isArray = val => Array.isArray(val)
const isNumber = value => typeof value === 'number' && isFinite(value)
const IsFloat = function (n) {
  return (!isNaN(n)) || (n === Infinity) || (n === -Infinity)
}
const isBoolean = val => typeof val === 'boolean'
const isShape2 = object => {
  // objects[i] instanceof CAG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('sides' in object)) {
    return false
  }
  if (!('length' in object.sides)) {
    return false
  }

  return true
}

const isShape3 = object => {
  // objects[i] instanceof CSG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('polygons' in object)) {
    return false
  }
  if (!('length' in object.polygons)) {
    return false
  }
  return true
}

const areAllShapesTheSameType = shapes => {
  let previousType
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i]
    let currentType = isShape2(shape) ? '2d' : '3d'
    if (previousType) {
      if (currentType !== previousType) {
        return false
      }
    }
    previousType = currentType
  }
  return true
}

module.exports = {
  IsFloat,
  isArray,
  isNumber,
  isBoolean,
  isShape2,
  isShape3,
  areAllShapesTheSameType
}
