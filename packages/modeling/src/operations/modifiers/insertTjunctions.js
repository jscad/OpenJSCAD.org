import { EPS } from '../../maths/constants.js'
import * as vec3 from '../../maths/vec3/index.js'

import * as poly3 from '../../geometries/poly3/index.js'

const assert = false

const getTag = (vertex) => `${vertex}`

const addSide = (sideMap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonIndex) => {
  const startTag = getTag(vertex0)
  const endTag = getTag(vertex1)
  if (assert && startTag === endTag) throw new Error('assert failed')
  const newSideTag = `${startTag}/${endTag}`
  const reverseSideTag = `${endTag}/${startTag}`
  if (sideMap.has(reverseSideTag)) {
    // remove the opposing side from mappings
    deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, vertex1, vertex0, null)
    return null
  }
  // add the side to the mappings
  const newSideObj = {
    vertex0: vertex0,
    vertex1: vertex1,
    polygonIndex
  }
  if (!(sideMap.has(newSideTag))) {
    sideMap.set(newSideTag, [newSideObj])
  } else {
    sideMap.get(newSideTag).push(newSideObj)
  }
  if (vertextag2sidestart.has(startTag)) {
    vertextag2sidestart.get(startTag).push(newSideTag)
  } else {
    vertextag2sidestart.set(startTag, [newSideTag])
  }
  if (vertextag2sideend.has(endTag)) {
    vertextag2sideend.get(endTag).push(newSideTag)
  } else {
    vertextag2sideend.set(endTag, [newSideTag])
  }
  return newSideTag
}

const deleteSide = (sidemap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonIndex) => {
  const startTag = getTag(vertex0)
  const endTag = getTag(vertex1)
  const sideTag = `${startTag}/${endTag}`
  if (assert && !(sidemap.has(sideTag))) throw new Error('assert failed')
  let idx = -1
  const sideObjs = sidemap.get(sideTag)
  for (let i = 0; i < sideObjs.length; i++) {
    const sideObj = sideObjs[i]
    let sideTag = getTag(sideObj.vertex0)
    if (sideTag !== startTag) continue
    sideTag = getTag(sideObj.vertex1)
    if (sideTag !== endTag) continue
    if (polygonIndex !== null) {
      if (sideObj.polygonIndex !== polygonIndex) continue
    }
    idx = i
    break
  }
  if (assert && idx < 0) throw new Error('assert failed')
  sideObjs.splice(idx, 1)
  if (sideObjs.length === 0) {
    sidemap.delete(sideTag)
  }

  // adjust start and end lists
  idx = vertextag2sidestart.get(startTag).indexOf(sideTag)
  if (assert && idx < 0) throw new Error('assert failed')
  vertextag2sidestart.get(startTag).splice(idx, 1)
  if (vertextag2sidestart.get(startTag).length === 0) {
    vertextag2sidestart.delete(startTag)
  }

  idx = vertextag2sideend.get(endTag).indexOf(sideTag)
  if (assert && idx < 0) throw new Error('assert failed')
  vertextag2sideend.get(endTag).splice(idx, 1)
  if (vertextag2sideend.get(endTag).length === 0) {
    vertextag2sideend.delete(endTag)
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

  Note that this can create polygons that are slightly non-convex (due to rounding errors).
  Therefore, the result should not be used for further CSG operations!

  Note this function is meant to be used to preprocess geometries when triangulation is required, i.e. AMF, STL, etc.
  Do not use the results in other operations.
*/

/*
 * Insert missing vertices for T-junctions, which creates polygons that can be triangulated.
 * @param {Array} polygons - the original polygons which may or may not have T-junctions
 * @return original polygons (if no T-junctions found) or new polygons with updated vertices
 */
export const insertTjunctions = (polygons) => {
  // STEP 1 : build a map of 'unmatched' sides from the polygons
  // i.e. side AB in one polygon does not have a matching side BA in another polygon
  const sideMap = new Map()
  for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex++) {
    const polygon = polygons[polygonIndex]
    const numVertices = polygon.vertices.length
    if (numVertices >= 3) {
      let vertex = polygon.vertices[0]
      let vertexTag = getTag(vertex)
      for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
        let nextVertexIndex = vertexIndex + 1
        if (nextVertexIndex === numVertices) nextVertexIndex = 0

        const nextVertex = polygon.vertices[nextVertexIndex]
        const nextVertexTag = getTag(nextVertex)

        const sideTag = `${vertexTag}/${nextVertexTag}`
        const reverseSideTag = `${nextVertexTag}/${vertexTag}`
        if (sideMap.has(reverseSideTag)) {
          // this side matches the same side in another polygon. Remove from sidemap
          // FIXME is this check necessary? there should only be ONE(1) opposing side
          // FIXME assert ?
          const ar = sideMap.get(reverseSideTag)
          ar.splice(-1, 1)
          if (ar.length === 0) {
            sideMap.delete(reverseSideTag)
          }
        } else {
          const sideobj = {
            vertex0: vertex,
            vertex1: nextVertex,
            polygonIndex
          }
          if (!(sideMap.has(sideTag))) {
            sideMap.set(sideTag, [sideobj])
          } else {
            sideMap.get(sideTag).push(sideobj)
          }
        }
        vertex = nextVertex
        vertexTag = nextVertexTag
      }
    } else {
      console.warn('warning: invalid polygon found during insertTjunctions')
    }
  }

  if (sideMap.size > 0) {
    // STEP 2 : create a list of starting sides and ending sides
    const vertextag2sidestart = new Map()
    const vertextag2sideend = new Map()
    const sidesToCheck = new Map()
    for (const [sidetag, sideObjs] of sideMap) {
      sidesToCheck.set(sidetag, true)
      sideObjs.forEach((sideObj) => {
        const starttag = getTag(sideObj.vertex0)
        const endtag = getTag(sideObj.vertex1)
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

    // STEP 3 : if sideMap is not empty
    const newPolygons = polygons.slice(0) // make a copy in order to replace polygons inline
    while (true) {
      if (sideMap.size === 0) break

      for (const sideTag of sideMap.keys()) {
        sidesToCheck.set(sideTag, true)
      }

      let doneSomething = false
      while (true) {
        const sideTags = Array.from(sidesToCheck.keys())
        if (sideTags.length === 0) break // sidesToCheck is empty, we're done!
        const sideTagToCheck = sideTags[0]
        let doneWithSide = true
        if (sideMap.has(sideTagToCheck)) {
          const sideObjs = sideMap.get(sideTagToCheck)
          if (assert && sideObjs.length === 0) throw new Error('assert failed')
          const sideObj = sideObjs[0]
          for (let directionIndex = 0; directionIndex < 2; directionIndex++) {
            const startVertex = (directionIndex === 0) ? sideObj.vertex0 : sideObj.vertex1
            const endVertex = (directionIndex === 0) ? sideObj.vertex1 : sideObj.vertex0
            const startVertexTag = getTag(startVertex)
            const endVertexTag = getTag(endVertex)
            let matchingSides = []
            if (directionIndex === 0) {
              if (vertextag2sideend.has(startVertexTag)) {
                matchingSides = vertextag2sideend.get(startVertexTag)
              }
            } else {
              if (vertextag2sidestart.has(startVertexTag)) {
                matchingSides = vertextag2sidestart.get(startVertexTag)
              }
            }
            for (let matchingSideIndex = 0; matchingSideIndex < matchingSides.length; matchingSideIndex++) {
              const matchingSideTag = matchingSides[matchingSideIndex]
              const matchingSide = sideMap.get(matchingSideTag)[0]
              const matchingSideStartVertex = (directionIndex === 0) ? matchingSide.vertex0 : matchingSide.vertex1
              const matchingSideEndVertex = (directionIndex === 0) ? matchingSide.vertex1 : matchingSide.vertex0
              const matchingSideStartVertexTag = getTag(matchingSideStartVertex)
              const matchingSideEndVertexTag = getTag(matchingSideEndVertex)
              if (assert && matchingSideEndVertexTag !== startVertexTag) throw new Error('assert failed')
              if (matchingSideStartVertexTag === endVertexTag) {
                // matchingSide cancels sideTagToCheck
                deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, startVertex, endVertex, null)
                deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, endVertex, startVertex, null)
                doneWithSide = false
                directionIndex = 2 // skip reverse direction check
                doneSomething = true
                break
              } else {
                const startPos = startVertex
                const endPos = endVertex
                const checkPos = matchingSideStartVertex
                const direction = vec3.subtract(vec3.create(), checkPos, startPos)
                // Now we need to check if endPos is on the line startPos-checkPos:
                const t = vec3.dot(vec3.subtract(vec3.create(), endPos, startPos), direction) / vec3.dot(direction, direction)
                if ((t > 0) && (t < 1)) {
                  const closestPoint = vec3.scale(vec3.create(), direction, t)
                  vec3.add(closestPoint, closestPoint, startPos)
                  const distanceSquared = vec3.squaredDistance(closestPoint, endPos)
                  if (distanceSquared < (EPS * EPS)) {
                    // Yes it's a t-junction! We need to split matchingSide in two:
                    const polygonIndex = matchingSide.polygonIndex
                    const polygon = newPolygons[polygonIndex]
                    // find the index of startVertexTag in polygon:
                    const insertionVertexTag = getTag(matchingSide.vertex1)
                    let insertionVertexTagIndex = -1
                    for (let i = 0; i < polygon.vertices.length; i++) {
                      if (getTag(polygon.vertices[i]) === insertionVertexTag) {
                        insertionVertexTagIndex = i
                        break
                      }
                    }
                    if (assert && insertionVertexTagIndex < 0) throw new Error('assert failed')
                    // split the side by inserting the vertex:
                    const newVertices = polygon.vertices.slice(0)
                    newVertices.splice(insertionVertexTagIndex, 0, endVertex)
                    const newPolygon = poly3.create(newVertices)

                    newPolygons[polygonIndex] = newPolygon

                    // remove the original sides from our maps
                    deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, matchingSide.vertex0, matchingSide.vertex1, polygonIndex)
                    const newSideTag1 = addSide(sideMap, vertextag2sidestart, vertextag2sideend, matchingSide.vertex0, endVertex, polygonIndex)
                    const newSideTag2 = addSide(sideMap, vertextag2sidestart, vertextag2sideend, endVertex, matchingSide.vertex1, polygonIndex)
                    if (newSideTag1 !== null) sidesToCheck.set(newSideTag1, true)
                    if (newSideTag2 !== null) sidesToCheck.set(newSideTag2, true)
                    doneWithSide = false
                    directionIndex = 2 // skip reverse direction check
                    doneSomething = true
                    break
                  } // if(distanceSquared < 1e-10)
                } // if( (t > 0) && (t < 1) )
              } // if(endingSideStartVertexTag === endVertexTag)
            } // for matchingSideIndex
          } // for directionIndex
        } // if(sideTagToCheck in sideMap)
        if (doneWithSide) {
          sidesToCheck.delete(sideTagToCheck)
        }
      }
      if (!doneSomething) break
    }
    polygons = newPolygons
  }
  sideMap.clear()

  return polygons
}
