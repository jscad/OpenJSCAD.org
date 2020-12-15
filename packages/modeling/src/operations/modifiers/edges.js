const vec3 = require('../../maths/vec3')
const line3 = require('../../maths/line3')

const poly3 = require('../../geometries/poly3')

// an edge is an array of two vertices
const addEdge = (edges, edge, polygon) => {
  let ei = edges.findIndex((element) => {
    if (element) {
      if (vec3.equals(element[0], edge[0]) && vec3.equals(element[1], edge[1])) return true
      if (vec3.equals(element[0], edge[1]) && vec3.equals(element[1], edge[0])) return true
    }
    return false
  })

  if (ei < 0) {
    edge.polygons = [polygon]
    edges.push(edge)
  } else {
    edge = edges[ei]
    edge.polygons.push(polygon)
  }
}

const removeEdge = (edges, edge) => {
  let ei = edges.findIndex((element) => {
    if (element) {
      if (vec3.equals(element[0], edge[0]) && vec3.equals(element[1], edge[1])) return true
      if (vec3.equals(element[0], edge[1]) && vec3.equals(element[1], edge[0])) return true
    }
    return false
  })
  if (ei >= 0) {
    edges[ei].polygons = []
    edges[ei] = null
  }
}

const addPolygon = (edges, polygon) => {
  let vertices = polygon.vertices
  let nv = vertices.length

  let edge = [vertices[nv-1], vertices[0]]
  addEdge(edges, edge, polygon)

  for (let i = 0; i < (nv - 1); i++) {
    edge = [vertices[i], vertices[i + 1]]
    addEdge(edges, edge, polygon)
  }
}

const removePolygons = (edges, oldedge) => {
//console.log('removePolygons',oldedge)
  const polygons = oldedge.polygons
  polygons.forEach((polygon) => {
    let vertices = polygon.vertices
    let nv = vertices.length

    let edge = [vertices[nv-1], vertices[0]]
    removeEdge(edges, edge)

    for (let i = 0; i < (nv - 1); i++) {
      edge = [vertices[i], vertices[i + 1]]
      removeEdge(edges, edge)
    }
  })
}

const splitPolygon = (openedge, polygon, eps) => {
//console.log('splitPolygon',openedge,polygon)
  const vertices = polygon.vertices
  const i = vertices.findIndex((point) => almostEquals(eps, point, openedge[0]))
  const polygon1 = poly3.fromPoints([vertices[(i + 0) % 3], vertices[(i + 1) % 3], openedge[1]])
  const polygon2 = poly3.fromPoints([openedge[1], vertices[(i + 1) % 3], vertices[(i + 2) % 3]])
  if (polygon.color) {
    polygon1.color = polygon.color
    polygon2.color = polygon.color
  }
//console.log('polygon1',polygon1)
//console.log('polygon2',polygon2)
  return [polygon1, polygon2]
}

//const NEPS = 1e-13
const NEPS = 1e-5

const almostEquals = (eps, v1, v2) => {
  return (Math.abs(v1[0] - v2[0]) <= eps && Math.abs(v1[1] - v2[1]) <= eps && Math.abs(v1[2] - v2[2]) <= eps)
}

const enclosedEdge0 = (openedge, edge, eps) => {
  if (openedge.distance < edge.distance) {
    // only look for opposing edges
    if (vec3.equals(openedge[0], edge[1])) {
      const line3d = line3.fromPoints(edge[0], edge[1])
      const closest = line3.closestPoint(openedge[1], line3d)
//if (vec3.equals(edge[0], [-3.0000006060444453,-3.0000006060444453,0]) && vec3.equals(edge[1], [3.0000006060444453,-3.0000006060444453,0])) {
//console.log('closest',closest,openedge[1])
//}
      // only look for paralell open edges
      if (almostEquals(eps, closest, openedge[1])) {
        // only look for open edges inside the edge
        const distance = vec3.squaredDistance(openedge[1], edge[0])
//if (vec3.equals(edge[0], [-3.0000006060444453,-3.0000006060444453,0]) && vec3.equals(edge[1], [3.0000006060444453,-3.0000006060444453,0])) {
//console.log('distance',distance,edge.distance)
//}
        return (distance < edge.distance)
      }
    }
  }
  return false
}

const enclosedEdge = (openedge, edge, eps) => {
  if (openedge.distance < edge.distance) {
    // only look for opposing edges
    if (vec3.equals(openedge[0], edge[1])) {
      // only opposing open edges enclosed by the edge
      const distanceE0O0 = vec3.squaredDistance(openedge[0], edge[0])
      const distanceE0O1 = vec3.squaredDistance(openedge[1], edge[0])
      const distanceE1O0 = vec3.squaredDistance(openedge[0], edge[1])
      const distanceE1O1 = vec3.squaredDistance(openedge[1], edge[1])
      if (distanceE0O0 <= edge.distance && distanceE0O1 < edge.distance && distanceE1O0 < edge.distance && distanceE1O1 < edge.distance) {
        // only look for paralell open edges
        const line3d = line3.fromPoints(edge[0], edge[1])
        const closest0 = vec3.snap(vec3.create(), eps, line3.closestPoint(openedge[0], line3d))
        const closest1 = vec3.snap(vec3.create(), eps, line3.closestPoint(openedge[1], line3d))

//if (vec3.equals(edge[0], [3.0000006060444453, 0.577354732977778, 9.999977575644447]) && vec3.equals(edge[1], [-3.0000006060444453, -2.8867003313777784, 9.999977575644447])) {
//console.log('openedge',openedge)
//console.log('closest',closest0,closest1)
//}
        if (almostEquals(eps, closest0, openedge[0]) && almostEquals(eps, closest1, openedge[1])) {
          return true
        }
      }
    }
  }
  return false
}

const splitEdge = (openedges, edge, eps) => {
//console.log('splitEdge',edge)
  let didSplit = false
  for (let i = 0; i < openedges.length; i++) {
    let openedge = openedges[i]
    if (openedge) {
      if (enclosedEdge(openedge, edge, eps)) {
//console.log('openedge',i,openedge)
//console.log('closest 1',closest)
        // spit the polygon associated with the edge
        const polygon = edge.polygons[0]
        const newpolygons = splitPolygon(openedge, polygon, eps)
//console.log('new polygons',newpolygons)
//console.log('new edges',edge0,edge1)
        return newpolygons
      }
    }
  }
  return null
}

const cullOpenEdges = (edges) => {
  let openedges = []
  edges.forEach((edge, i) => {
    let polygons = edge.polygons
    if (polygons.length === 1) {
      //console.log('open edge: ',edge[0],'<-->',edge[1])
      edge.distance = vec3.squaredDistance(edge[0], edge[1])
      openedges.push(edge)
    }
  })
//console.log('**********OPEN*********')
//console.log(openedges)
//console.log('**********OPEN*********')
console.log('open edges:',openedges.length)
  return openedges
}

const edgesToPolygons = (edges) => {
  let polygons = []
  edges.forEach((edge) => {
    if (edge && edge.polygons) {
//if (edge.polygons.length === 1) console.log('UG')
      edge.polygons.forEach((polygon) => {
        if (polygon.visited) return
        polygon.visited = true
        polygons.push(polygon)
      })
    }
  })
  return polygons
}

const polygonsToEdges = (polygons) => {
  let edges = []
  polygons.forEach((polygon) => {
    addPolygon(edges, polygon)
  })
console.log('edges:',edges.length)
  return edges
}

module.exports = { polygonsToEdges, edgesToPolygons, cullOpenEdges, splitEdge, removePolygons, addPolygon }
