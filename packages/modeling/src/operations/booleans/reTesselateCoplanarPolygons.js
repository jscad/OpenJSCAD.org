const { EPS } = require('../../math/constants')

const { vec3 } = require('../../math')

const { poly3 } = require('../../geometry')

// create a set of edges from the given polygon, and link the edges as well
const createEdges = (polygon) => {
  const points = poly3.toPoints(polygon)
  let edges = []
  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length
    let edge = {
        v1: points[i],
        v2: points[j]
    }
    edges.push(edge)
  }
  // link the edges together
  for (let i = 0; i < edges.length; i++) {
    let j = (i + 1) % points.length
    edges[i].next = edges[j]
    edges[j].prev = edges[i]
  }
  return edges
}

const insertEdge = (edges, edge) => {
  const key = `${edge.v1}:${edge.v2}`
  edges.set(key, edge)
}

const deleteEdge = (edges, edge) => {
  const key = `${edge.v1}:${edge.v2}`
  edges.delete(key)
}

const findOppositeEdge = (edges, edge) => {
  const key = `${edge.v2}:${edge.v1}` // NOTE: OPPOSITE OF INSERT KEY
  return edges.get(key)
}

// calculate the two adjoining angles between the opposing edges
const calculateAnglesBetween = (current, opposite, normal) => {
  let v0 = current.prev.v1
  let v1 = current.prev.v2
  let v2 = opposite.next.v2
  let angle1 = calculateAngle(v0, v1, v2, normal)

  v0 = opposite.prev.v1
  v1 = opposite.prev.v2
  v2 = current.next.v2
  let angle2 = calculateAngle(v0, v1, v2, normal)

  return [angle1, angle2]
}

const calculateAngle = (prevpoint, point, nextpoint, normal) => {
  const crossproduct = vec3.cross(
    vec3.subtract(point, prevpoint),
    vec3.subtract(nextpoint, point)
  )
  return vec3.dot(crossproduct, normal)
}

// create a polygon starting from the given edge (if possible)
const createPolygonAnd = (edge) => {
  let polygon
  const points = []
  while (edge.next) {
    const next = edge.next

    points.push(edge.v1)

    edge.v1 = null
    edge.v2 = null
    edge.next = null
    edge.prev = null

    edge = next
  }
  if (points.length > 0) polygon = poly3.fromPoints(points)
  return polygon
}

/*
 * Retesselation for a set of COPLANAR polygons.
 * @param {poly3[]} sourcepolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const reTesselateCoplanarPolygons = (sourcepolygons, eps = EPS) => {
  if (sourcepolygons.length < 2) return sourcepolygons

  let normal = sourcepolygons[0].plane
  let polygons = sourcepolygons.slice()
  let edgeList = new Map()

  let count = 0
  while (polygons.length > 0) { // NOTE: the length of polygons WILL change
    const polygon = polygons.shift()
    const edges = createEdges(polygon)
    count += 1
    for (let i = 0; i < edges.length; i++) {
      const current = edges[i]
      const opposite = findOppositeEdge(edgeList, current)
      if (opposite) {
        const angles = calculateAnglesBetween(current, opposite, normal)
console.log(angles)
        if (angles[0] >= 0 && angles[1] >= 0) {
console.log('merge of polygons')
//console.log('current',current)
//console.log('opposite',opposite)

          let edge1 = opposite.next
          let edge2 = current.next
          // adjust the edges, linking together opposing polygons
          current.prev.next = opposite.next
          current.next.prev = opposite.prev

          opposite.prev.next = current.next
          opposite.next.prev = current.prev

          // remove the opposing edges
          current.v1 = null
          current.v2 = null
          current.next = null
          current.prev = null

          deleteEdge(edgeList, opposite)

          opposite.v1 = null
          opposite.v2 = null
          opposite.next = null
          opposite.prev = null

          const mergeEdges = (list, e1, e2) => {
            let newedge = {
              v1: e2.v1,
              v2: e1.v2,
              next: e1.next,
              prev: e2.prev
            }
            // link in newedge
            e2.prev.next = newedge
            e1.next.prev = newedge
            // remove old edges
            deleteEdge(list, e1)
            e1.v1 = null
            e1.v2 = null
            e1.next = null
            e1.prev = null

            deleteEdge(list, e2)
            e2.v1 = null
            e2.v2 = null
            e2.next = null
            e2.prev = null
          }

          if (angles[0] === 0.0) {
console.log('merge of edge1')
            mergeEdges(edgeList, edge1, edge1.prev)
          }
          if (angles[1] === 0.0) {
console.log('merge of edge2')
            mergeEdges(edgeList, edge2, edge2.prev)
          }
        }
      } else {
        if (current.next) insertEdge(edgeList, current)
      }
    }
  }

  // build a set of polygons from the remaining edges
  const destpolygons = []
  edgeList.forEach((edge) => {
    const polygon = createPolygonAnd(edge)
    if (polygon) destpolygons.push(polygon)
  })

  return destpolygons
}

module.exports = reTesselateCoplanarPolygons
