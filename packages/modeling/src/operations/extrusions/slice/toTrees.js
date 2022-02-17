const { area } = require('../../../maths/utils')
const { toOutlines } = require('../../../geometries/geom2')
const { arePointsInside } = require('../../../geometries/poly2')

/**
 * Constructs a polygon hierarchy of solids and holes.
 * The hierarchy is represented as a forest of trees. All trees shall be depth at most 2.
 * If a solid exists inside the hole of another solid, it will be split out as its own root.
 * @param  {geom2} geometry
 * @returns {Array} an array of polygons with associated holes
 * @alias module:modeling/geometries/geom2.toTree
 *
 * @example
 * const geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * console.log(toTrees(geometry))
 * [{
 *   "solid": [[-2.5,-2.5],[2.5,-2.5],[2.5,2.5],[-2.5,2.5]],
 *   "holes": [[[-1.5,1.5],[1.5,1.5],[1.5,-1.5],[-1.5,-1.5]]]
 * }]
 */
const toTrees = (geometry) => {
  const outlines = toOutlines(geometry)
  const areas = outlines.map(area)
  const solids = [] // solid indices
  const holes = [] // hole indices
  areas.forEach((a, i) => {
    if (a < 0) {
      holes.push(i)
    } else if (a > 0) {
      solids.push(i)
    }
  })
  // For each hole, determine what solids it is inside of
  const children = [] // child holes of solid[i]
  const parents = [] // parent solids of hole[i]
  solids.forEach((s, i) => {
    const solid = outlines[s]
    children[i] = []
    holes.forEach((h, j) => {
      const hole = outlines[h]
      // Check if a point of hole j is inside solid i
      if (arePointsInside([hole[0]], {vertices: solid})) {
        children[i].push(h)
        if (!parents[j]) parents[j] = []
        parents[j].push(i)
      }
    })
  })
  // Check if holes have multiple parents and choose one with fewest children
  holes.forEach((h, j) => {
    if (parents[j].length > 1) {
      const parent = minIndex(parents[j], (p) => p.length)
      parents[j].forEach((p, i) => {
        if (i !== parent) {
          // Remove hole from skip level parents
          children[p] = children[p].filter((c) => c !== j)
        }
      })
    }
  })
  // Map indices back to points
  return children.map((holes, i) => ({
    solid: outlines[solids[i]],
    holes: holes.map((h) => outlines[h])
  }))
}

/**
 * Find the item in the list with smallest fn(item)
 */
const minIndex = (list, fn) => {
  let bestIndex
  let best
  list.forEach((item, index) => {
    const value = fn(item)
    if (best === undefined || value < best) {
      bestIndex = index
      best = value
    }
  })
  return bestIndex
}

module.exports = toTrees
