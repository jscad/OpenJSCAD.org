function isCAG (object) {
  // objects[i] instanceof CAG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('sides' in object)) {
    return false
  }
  if (!object.sides.length) {
    return false
  }

  return true
}

function isCSG (object) {
  // objects[i] instanceof CSG => NOT RELIABLE
  // 'instanceof' causes huge issues when using objects from
  // two different versions of CSG.js as they are not reckonized as one and the same
  // so DO NOT use instanceof to detect matching types for CSG/CAG
  if (!('polygons' in object)) {
    return false
  }
  if (!object.polygons.length) {
    return false
  }
  return true
}

module.exports = {
  isCSG,
  isCAG
}
