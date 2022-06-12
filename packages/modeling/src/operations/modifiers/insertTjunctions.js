const constants = require('../../maths/constants')
const vec3 = require('../../maths/vec3')
const poly3 = require('../../geometries/poly3')

const assert = false

const getTag = (vertex) => `${vertex}`

const addSide = (sidemap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonindex) => {
  const starttag = getTag(vertex0)
  const endtag = getTag(vertex1)
  if (assert && starttag === endtag) throw new Error('assert failed')
  const newsidetag = `${starttag}/${endtag}`
  const reversesidetag = `${endtag}/${starttag}`
  if (sidemap.has(reversesidetag)) {
    // remove the opposing side from mappings
    deleteSide(sidemap, vertextag2sidestart, vertextag2sideend, vertex1, vertex0, null)
    return null
  }
  // add the side to the mappings
  const newsideobj = {
    vertex0: vertex0,
    vertex1: vertex1,
    polygonindex: polygonindex
  }
  if (!(sidemap.has(newsidetag))) {
    sidemap.set(newsidetag, [newsideobj])
  } else {
    sidemap.get(newsidetag).push(newsideobj)
  }
  if (vertextag2sidestart.has(starttag)) {
    vertextag2sidestart.get(starttag).push(newsidetag)
  } else {
    vertextag2sidestart.set(starttag, [newsidetag])
  }
  if (vertextag2sideend.has(endtag)) {
    vertextag2sideend.get(endtag).push(newsidetag)
  } else {
    vertextag2sideend.set(endtag, [newsidetag])
  }
  return newsidetag
}

const deleteSide = (sidemap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonindex) => {
  const starttag = getTag(vertex0)
  const endtag = getTag(vertex1)
  const sidetag = `${starttag}/${endtag}`
  if (assert && !(sidemap.has(sidetag))) throw new Error('assert failed')
  let idx = -1
  const sideobjs = sidemap.get(sidetag)
  for (let i = 0; i < sideobjs.length; i++) {
    const sideobj = sideobjs[i]
    let sidetag = getTag(sideobj.vertex0)
    if (sidetag !== starttag) continue
    sidetag = getTag(sideobj.vertex1)
    if (sidetag !== endtag) continue
    if (polygonindex !== null) {
      if (sideobj.polygonindex !== polygonindex) continue
    }
    idx = i
    break
  }
  if (assert && idx < 0) throw new Error('assert failed')
  sideobjs.splice(idx, 1)
  if (sideobjs.length === 0) {
    sidemap.delete(sidetag)
  }

  // adjust start and end lists
  idx = vertextag2sidestart.get(starttag).indexOf(sidetag)
  if (assert && idx < 0) throw new Error('assert failed')
  vertextag2sidestart.get(starttag).splice(idx, 1)
  if (vertextag2sidestart.get(starttag).length === 0) {
    vertextag2sidestart.delete(starttag)
  }

  idx = vertextag2sideend.get(endtag).indexOf(sidetag)
  if (assert && idx < 0) throw new Error('assert failed')
  vertextag2sideend.get(endtag).splice(idx, 1)
  if (vertextag2sideend.get(endtag).length === 0) {
    vertextag2sideend.delete(endtag)
  }
}

/*
  Suppose we have two polygons ACDB and EDGF:

   A-----B
   |     |
   |     E--F
   |     |  |
   C-----D--G

  Note that vertex E forms a T-junction on the side BD. In this case some STL slicers will complain
  that the solid is not watertight. This is because the watertightness check is done by checking if
  each side DE is matched by another side ED.

  This function will return a new solid with ACDB replaced by ACDEB

  Note that this can create polygons that are slightly non-convex (due to rounding errors). Therefore the result should
  not be used for further CSG operations!

  Note this function is meant to be used to preprocess geometries when triangulation is required, i.e. AMF, STL, etc.
  Do not use the results in other operations.
*/

/*
 * Insert missing vertices for T junctions, which creates polygons that can be triangulated.
 * @param {Array} polygons - the original polygons which may or may not have T junctions
 * @return original polygons (if no T junctions found) or new polygons with updated vertices
 */
const insertTjunctions = (polygons) => {
  // STEP 1 : build a map of 'unmatched' sides from the polygons
  // i.e. side AB in one polygon does not have a matching side BA in another polygon
  const sidemap = new Map()
  for (let polygonindex = 0; polygonindex < polygons.length; polygonindex++) {
    const polygon = polygons[polygonindex]
    const numvertices = polygon.vertices.length
    if (numvertices >= 3) {
      let vertex = polygon.vertices[0]
      let vertextag = getTag(vertex)
      for (let vertexindex = 0; vertexindex < numvertices; vertexindex++) {
        let nextvertexindex = vertexindex + 1
        if (nextvertexindex === numvertices) nextvertexindex = 0

        const nextvertex = polygon.vertices[nextvertexindex]
        const nextvertextag = getTag(nextvertex)

        const sidetag = `${vertextag}/${nextvertextag}`
        const reversesidetag = `${nextvertextag}/${vertextag}`
        if (sidemap.has(reversesidetag)) {
          // this side matches the same side in another polygon. Remove from sidemap
          // FIXME is this check necessary? there should only be ONE(1) opposing side
          // FIXME assert ?
          const ar = sidemap.get(reversesidetag)
          ar.splice(-1, 1)
          if (ar.length === 0) {
            sidemap.delete(reversesidetag)
          }
        } else {
          const sideobj = {
            vertex0: vertex,
            vertex1: nextvertex,
            polygonindex: polygonindex
          }
          if (!(sidemap.has(sidetag))) {
            sidemap.set(sidetag, [sideobj])
          } else {
            sidemap.get(sidetag).push(sideobj)
          }
        }
        vertex = nextvertex
        vertextag = nextvertextag
      }
    } else {
      console.warn('warning: invalid polygon found during insertTjunctions')
    }
  }

  if (sidemap.size > 0) {
    // STEP 2 : create a list of starting sides and ending sides
    const vertextag2sidestart = new Map()
    const vertextag2sideend = new Map()
    const sidesToCheck = new Map()
    for (const [sidetag, sideobjs] of sidemap) {
      sidesToCheck.set(sidetag, true)
      sideobjs.forEach((sideobj) => {
        const starttag = getTag(sideobj.vertex0)
        const endtag = getTag(sideobj.vertex1)
        if (vertextag2sidestart.has(starttag)) {
          vertextag2sidestart.get(starttag).push(sidetag)
        } else {
          vertextag2sidestart.set(starttag, [sidetag])
        }
        if (vertextag2sideend.has(endtag)) {
          vertextag2sideend.get(endtag).push(sidetag)
        } else {
          vertextag2sideend.set(endtag, [sidetag])
        }
      })
    }

    // STEP 3 : if sidemap is not empty
    const newpolygons = polygons.slice(0) // make a copy in order to replace polygons inline
    while (true) {
      if (sidemap.size === 0) break

      for (const sidetag of sidemap.keys()) {
        sidesToCheck.set(sidetag, true)
      }

      let donesomething = false
      while (true) {
        const sidetags = Array.from(sidesToCheck.keys())
        if (sidetags.length === 0) break // sidesToCheck is empty, we're done!
        const sidetagtocheck = sidetags[0]
        let donewithside = true
        if (sidemap.has(sidetagtocheck)) {
          const sideobjs = sidemap.get(sidetagtocheck)
          if (assert && sideobjs.length === 0) throw new Error('assert failed')
          const sideobj = sideobjs[0]
          for (let directionindex = 0; directionindex < 2; directionindex++) {
            const startvertex = (directionindex === 0) ? sideobj.vertex0 : sideobj.vertex1
            const endvertex = (directionindex === 0) ? sideobj.vertex1 : sideobj.vertex0
            const startvertextag = getTag(startvertex)
            const endvertextag = getTag(endvertex)
            let matchingsides = []
            if (directionindex === 0) {
              if (vertextag2sideend.has(startvertextag)) {
                matchingsides = vertextag2sideend.get(startvertextag)
              }
            } else {
              if (vertextag2sidestart.has(startvertextag)) {
                matchingsides = vertextag2sidestart.get(startvertextag)
              }
            }
            for (let matchingsideindex = 0; matchingsideindex < matchingsides.length; matchingsideindex++) {
              const matchingsidetag = matchingsides[matchingsideindex]
              const matchingside = sidemap.get(matchingsidetag)[0]
              const matchingsidestartvertex = (directionindex === 0) ? matchingside.vertex0 : matchingside.vertex1
              const matchingsideendvertex = (directionindex === 0) ? matchingside.vertex1 : matchingside.vertex0
              const matchingsidestartvertextag = getTag(matchingsidestartvertex)
              const matchingsideendvertextag = getTag(matchingsideendvertex)
              if (assert && matchingsideendvertextag !== startvertextag) throw new Error('assert failed')
              if (matchingsidestartvertextag === endvertextag) {
                // matchingside cancels sidetagtocheck
                deleteSide(sidemap, vertextag2sidestart, vertextag2sideend, startvertex, endvertex, null)
                deleteSide(sidemap, vertextag2sidestart, vertextag2sideend, endvertex, startvertex, null)
                donewithside = false
                directionindex = 2 // skip reverse direction check
                donesomething = true
                break
              } else {
                const startpos = startvertex
                const endpos = endvertex
                const checkpos = matchingsidestartvertex
                const direction = vec3.subtract(vec3.create(), checkpos, startpos)
                // Now we need to check if endpos is on the line startpos-checkpos:
                const t = vec3.dot(vec3.subtract(vec3.create(), endpos, startpos), direction) / vec3.dot(direction, direction)
                if ((t > 0) && (t < 1)) {
                  const closestpoint = vec3.scale(vec3.create(), direction, t)
                  vec3.add(closestpoint, closestpoint, startpos)
                  const distancesquared = vec3.squaredDistance(closestpoint, endpos)
                  if (distancesquared < (constants.EPS * constants.EPS)) {
                    // Yes it's a t-junction! We need to split matchingside in two:
                    const polygonindex = matchingside.polygonindex
                    const polygon = newpolygons[polygonindex]
                    // find the index of startvertextag in polygon:
                    const insertionvertextag = getTag(matchingside.vertex1)
                    let insertionvertextagindex = -1
                    for (let i = 0; i < polygon.vertices.length; i++) {
                      if (getTag(polygon.vertices[i]) === insertionvertextag) {
                        insertionvertextagindex = i
                        break
                      }
                    }
                    if (assert && insertionvertextagindex < 0) throw new Error('assert failed')
                    // split the side by inserting the vertex:
                    const newvertices = polygon.vertices.slice(0)
                    newvertices.splice(insertionvertextagindex, 0, endvertex)
                    const newpolygon = poly3.create(newvertices)

                    newpolygons[polygonindex] = newpolygon

                    // remove the original sides from our maps
                    deleteSide(sidemap, vertextag2sidestart, vertextag2sideend, matchingside.vertex0, matchingside.vertex1, polygonindex)
                    const newsidetag1 = addSide(sidemap, vertextag2sidestart, vertextag2sideend, matchingside.vertex0, endvertex, polygonindex)
                    const newsidetag2 = addSide(sidemap, vertextag2sidestart, vertextag2sideend, endvertex, matchingside.vertex1, polygonindex)
                    if (newsidetag1 !== null) sidesToCheck.set(newsidetag1, true)
                    if (newsidetag2 !== null) sidesToCheck.set(newsidetag2, true)
                    donewithside = false
                    directionindex = 2 // skip reverse direction check
                    donesomething = true
                    break
                  } // if(distancesquared < 1e-10)
                } // if( (t > 0) && (t < 1) )
              } // if(endingstidestartvertextag === endvertextag)
            } // for matchingsideindex
          } // for directionindex
        } // if(sidetagtocheck in sidemap)
        if (donewithside) {
          sidesToCheck.delete(sidetagtocheck)
        }
      }
      if (!donesomething) break
    }
    polygons = newpolygons
  }
  sidemap.clear()

  return polygons
}

module.exports = insertTjunctions
