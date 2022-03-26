const { area } = require('../../../maths/utils')
const { toOutlines } = require('../../../geometries/geom2')
const { arePointsInside } = require('../../../geometries/poly2')

/*
 * Constructs a polygon hierarchy of solids and holes.
 * The hierarchy is represented as a forest of trees. All trees shall be depth at most 2.
 * If a solid exists inside the hole of another solid, it will be split out as its own root.
 *
 * @param {geom2} geometry
 * @returns {Array} an array of polygons with associated holes
 * @alias module:modeling/geometries/geom2.toTree
 *
 * @example
 * const geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * console.log(assignHoles(geometry))
 * [{
 *   "solid": [[-2.5,-2.5],[2.5,-2.5],[2.5,2.5],[-2.5,2.5]],
 *   "holes": [[[-1.5,1.5],[1.5,1.5],[1.5,-1.5],[-1.5,-1.5]]]
 * }]
 */
const assignHoles = (geometry) => {
  const outlines = toOutlines(geometry)
  const solids = [] // solid indices
  const holes = [] // hole indices
  outlines.forEach((outline, i) => {
    const a = area(outline)
    if (a < 0) {
      holes.push(i)
    } else if (a > 0) {
      solids.push(i)
    }
  })

  // for each hole, determine what solids it is inside of
  const children = [] // child holes of solid[i]
  const parents = [] // parent solids of hole[i]
  solids.forEach((s, i) => {
    const solid = outlines[s]
    children[i] = []
    holes.forEach((h, j) => {
      const hole = outlines[h]
      // check if a point of hole j is inside solid i
      if (arePointsInside([hole[0]], { vertices: solid })) {
        children[i].push(h)
        if (!parents[j]) parents[j] = []
        parents[j].push(i)
      }
    })
  })

  // check if holes have multiple parents and choose one with fewest children
  holes.forEach((h, j) => {
    // ensure at least one parent exists
    if (parents[j] && parents[j].length > 1) {
      // the solid directly containing this hole
      const directParent = minIndex(parents[j], (p) => children[p].length)
      parents[j].forEach((p, i) => {
        if (i !== directParent) {
          // Remove hole from skip level parents
          children[p] = children[p].filter((c) => c !== h)
        }
      })
    }
  })

  // map indices back to points
  return children.map((holes, i) => ({
    solid: outlines[solids[i]],
    holes: holes.map((h) => outlines[h])
  }))
}

/*
 * Find the item in the list with smallest score(item).
 * If the list is empty, return undefined.
 */
const minIndex = (list, score) => {
  let bestIndex
  let best
  list.forEach((item, index) => {
    const value = score(item)
    if (best === undefined || value < best) {
      bestIndex = index
      best = value
    }
  })
  return bestIndex
}

module.exports = assignHoles
