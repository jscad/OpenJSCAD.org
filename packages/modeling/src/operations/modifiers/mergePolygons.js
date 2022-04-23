const aboutEqualNormals = require('../../maths/utils/aboutEqualNormals')
const vec3 = require('../../maths/vec3')

const poly3 = require('../../geometries/poly3')

// create a set of edges from the given polygon, and link the edges as well
const createEdges = (polygon) => {
  const points = poly3.toPoints(polygon)
  const edges = []
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    const edge = {
      v1: points[i],
      v2: points[j]
    }
    edges.push(edge)
  }
  // link the edges together
  for (let i = 0; i < edges.length; i++) {
    const j = (i + 1) % points.length
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
  const angle1 = calculateAngle(v0, v1, v2, normal)

  v0 = opposite.prev.v1
  v1 = opposite.prev.v2
  v2 = current.next.v2
  const angle2 = calculateAngle(v0, v1, v2, normal)

  return [angle1, angle2]
}

const v1 = vec3.create()
const v2 = vec3.create()

const calculateAngle = (prevpoint, point, nextpoint, normal) => {
  const d0 = vec3.subtract(v1, point, prevpoint)
  const d1 = vec3.subtract(v2, nextpoint, point)
  vec3.cross(d0, d0, d1)
  return vec3.dot(d0, normal)
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
  if (points.length > 0) polygon = poly3.create(points)
  return polygon
}

/*
 * Merge COPLANAR polygons that share common edges.
 * @param {poly3[]} sourcepolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const mergeCoplanarPolygons = (sourcepolygons) => {
  if (sourcepolygons.length < 2) return sourcepolygons

  const normal = sourcepolygons[0].plane
  const polygons = sourcepolygons.slice()
  const edgeList = new Map()

  while (polygons.length > 0) { // NOTE: the length of polygons WILL change
    const polygon = polygons.shift()
    const edges = createEdges(polygon)
    for (let i = 0; i < edges.length; i++) {
      const current = edges[i]
      const opposite = findOppositeEdge(edgeList, current)
      if (opposite) {
        const angles = calculateAnglesBetween(current, opposite, normal)
        if (angles[0] >= 0 && angles[1] >= 0) {
          const edge1 = opposite.next
          const edge2 = current.next
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
            const newedge = {
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
            mergeEdges(edgeList, edge1, edge1.prev)
          }
          if (angles[1] === 0.0) {
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

  edgeList.clear()

  return destpolygons
}

const coplanar = (plane1, plane2) => {
  // expect the same distance from the origin, within tolerance
  if (Math.abs(plane1[3] - plane2[3]) < 0.00000015) {
    return aboutEqualNormals(plane1, plane2)
  }
  return false
}

const mergePolygons = (epsilon, polygons) => {
  const polygonsPerPlane = [] // elements: [plane, [poly3...]]
  polygons.forEach((polygon) => {
    const mapping = polygonsPerPlane.find((element) => coplanar(element[0], poly3.plane(polygon)))
    if (mapping) {
      const polygons = mapping[1]
      polygons.push(polygon)
    } else {
      polygonsPerPlane.push([poly3.plane(polygon), [polygon]])
    }
  })

  let destpolygons = []
  polygonsPerPlane.forEach((mapping) => {
    const sourcepolygons = mapping[1]
    const retesselayedpolygons = mergeCoplanarPolygons(sourcepolygons)
    destpolygons = destpolygons.concat(retesselayedpolygons)
  })
  return destpolygons
}

module.exports = mergePolygons
