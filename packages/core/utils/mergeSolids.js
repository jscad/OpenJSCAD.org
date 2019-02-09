const { CSG, CAG, isCSG, isCAG } = require('@jscad/csg')
const {toArray} = require('./arrays')

/**
 * convert objects to a single solid
 * @param {Array} objects the list of objects
 * @return {Object} solid : the single CSG object
 */
function mergeSolids (objects, params) {
  if (objects.length === undefined) {
    if (isCAG(objects) || isCSG(objects)) {
      var obj = objects
      objects = [obj]
    } else {
      throw new Error('Cannot convert object (' + typeof (objects) + ') to solid')
    }
  }

  var solid = null
  for (var i = 0; i < objects.length; i++) {
    let obj = objects[i]
    if (isCAG(obj)) {
      obj = obj.extrude({offset: [0, 0, 0.1]}) // convert CAG to a thin solid CSG
    }
    if (solid !== null) {
      solid = solid.unionForNonIntersecting(obj)
    } else {
      solid = obj
    }
  }
  return solid
}
/** combine/ merge multiple 2d & 3D solids into
 * a single 3d (CSG)  or CAG output:
 * if there is even a single 3D solid in the input,
 * all other input 2D shapes get extruded and unioned
 * with the 3D solid
 * @param  {Array} objects
 * @param  {} params
 * @returns {CSG} a single CSG/CAG object
 */
function mergeSolids2 (objects, params) {
  const {convertCSG, convertCAG} = params

  let object
  objects = toArray(objects)
  // review the given objects
  let foundCSG = false
  let foundCAG = false
  for (let i = 0; i < objects.length; i++) {
    if (isCSG(objects[i])) { foundCSG = true }
    if (isCAG(objects[i])) { foundCAG = true }
  }

  // convert based on the given format
  foundCSG = foundCSG && convertCSG
  foundCAG = foundCAG && convertCAG

  if (foundCSG && foundCAG) { foundCAG = false } // use 3D conversion

  object = !foundCSG ? new CAG() : new CSG()

  for (let i = 0; i < objects.length; i++) {
    if (foundCSG === true && isCAG(objects[i])) {
      object = object.union(objects[i].extrude({offset: [0, 0, 0.1]})) // convert CAG to a thin solid CSG
      continue
    }
    if (foundCAG === true && isCSG(objects[i])) {
      continue
    }
    object = object.union(objects[i])
  }

  return object
}

module.exports = {
  mergeSolids,
  mergeSolids2
}
