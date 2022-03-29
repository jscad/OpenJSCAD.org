const vec3 = require('../../maths/vec3')
const line3 = require('../../maths/line3')

const poly3 = require('../../geometries/poly3')

/*
 * Add a unique edge to the given list of edges.
 * Each edge has a list of associated polygons.
 * Edges with two polygons are complete, while edges with one polygon are open, i.e hole or t-junction.
 */
const addEdge = (edges, edge, polygon) => {
  const ei = edges.findIndex((element) => {
    if (element) {
      if (vec3.equals(element[0], edge[0]) && vec3.equals(element[1], edge[1])) return true
      if (vec3.equals(element[0], edge[1]) && vec3.equals(element[1], edge[0])) return true
    }
    return false
  })
  if (ei >= 0) {
    edge = edges[ei]
    edge.polygons.push(polygon)
  } else {
    edge.polygons = [polygon]
    edges.push(edge)
  }
}

/*
 * Remove the edge from the given list of edges.
 */
const removeEdge = (edges, edge) => {
  const ei = edges.findIndex((element) => {
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

/*
 * Add all edges of the polygon to the given list of edges.
 */
const addPolygon = (edges, polygon) => {
  const vertices = polygon.vertices
  const nv = vertices.length

  let edge = [vertices[nv - 1], vertices[0]]
  addEdge(edges, edge, polygon)

  for (let i = 0; i < (nv - 1); i++) {
    edge = [vertices[i], vertices[i + 1]]
    addEdge(edges, edge, polygon)
  }
}

/*
 * Remove all polygons associated with the old edge from the given list of edges.
 */
const removePolygons = (edges, oldEdge) => {
  oldEdge.polygons.forEach((polygon) => {
    const vertices = polygon.vertices
    const nv = vertices.length

    let edge = [vertices[nv - 1], vertices[0]]
    removeEdge(edges, edge)

    for (let i = 0; i < (nv - 1); i++) {
      edge = [vertices[i], vertices[i + 1]]
      removeEdge(edges, edge)
    }
  })
}

/*
 * Split the polygon, ensuring one polygon includes the open edge.
 */
const splitPolygon = (openEdge, polygon, eps) => {
  const vertices = polygon.vertices
  const i = vertices.findIndex((point) => almostEquals(eps, point, openEdge[0]))
  const polygon1 = poly3.fromPoints([vertices[(i + 0) % 3], vertices[(i + 1) % 3], openEdge[1]])
  const polygon2 = poly3.fromPoints([openEdge[1], vertices[(i + 1) % 3], vertices[(i + 2) % 3]])
  if (polygon.color) {
    polygon1.color = polygon.color
    polygon2.color = polygon.color
  }
  return [polygon1, polygon2]
}

/*
 * TBD This should be part of vec3.
 */
const almostEquals = (eps, v1, v2) => (Math.abs(v1[0] - v2[0]) <= eps && Math.abs(v1[1] - v2[1]) <= eps && Math.abs(v1[2] - v2[2]) <= eps)

/*
 * Find edges which are enclosed by a given edge: nearby, parallel, opposed.
 */
const enclosedEdge = (openEdge, edge, eps) => {
  if (openEdge.distance < edge.distance) {
    // only look for opposing edges
    if (vec3.equals(openEdge[0], edge[1])) {
      // only opposing open edges enclosed by the edge
      const distanceE0O0 = vec3.squaredDistance(openEdge[0], edge[0])
      const distanceE0O1 = vec3.squaredDistance(openEdge[1], edge[0])
      const distanceE1O0 = vec3.squaredDistance(openEdge[0], edge[1])
      const distanceE1O1 = vec3.squaredDistance(openEdge[1], edge[1])
      if (distanceE0O0 <= edge.distance && distanceE0O1 < edge.distance && distanceE1O0 < edge.distance && distanceE1O1 < edge.distance) {
        // only look for parallel open edges
        const line3d = line3.fromPoints(line3.create(), edge[0], edge[1])
        const closest0 = vec3.snap(vec3.create(), eps, line3.closestPoint(line3d, openEdge[0]))
        const closest1 = vec3.snap(vec3.create(), eps, line3.closestPoint(line3d, openEdge[1]))
        if (almostEquals(eps, closest0, openEdge[0]) && almostEquals(eps, closest1, openEdge[1])) {
          return true
        }
      }
    }
  }
  return false
}

/*
 * Split the edge if possible from the list of open edges.
 * Return a list of new polygons, or null if not possible.
 */
const splitEdge = (openEdges, edge, eps) => {
  openEdges.forEach((openEdge) => {
    if (openEdge) {
      if (enclosedEdge(openEdge, edge, eps)) {
        // spit the polygon associated with the edge
        const polygon = edge.polygons[0]
        return splitPolygon(openEdge, polygon, eps)
      }
    }
  })
  return null
}

/*
 * Cull a list of open edges (see above) from the list of edges.
 */
const cullOpenEdges = (edges) => {
  const openEdges = []
  edges.forEach((edge) => {
    const polygons = edge.polygons
    if (polygons.length === 1) {
      edge.distance = vec3.squaredDistance(edge[0], edge[1])
      openEdges.push(edge)
    }
  })
  return openEdges
}

/*
 * Convert the list of edges into a list of polygons.
 */
const edgesToPolygons = (edges) => {
  const polygons = []
  edges.forEach((edge) => {
    if (edge && edge.polygons) {
      edge.polygons.forEach((polygon) => {
        if (polygon.visited) return
        polygon.visited = true
        polygons.push(polygon)
      })
    }
  })
  return polygons
}

/*
 * Convert the given list of polygons to a list of edges.
 */
const polygonsToEdges = (polygons) => {
  const edges = []
  polygons.forEach((polygon) => {
    addPolygon(edges, polygon)
  })
  return edges
}

module.exports = { polygonsToEdges, edgesToPolygons, cullOpenEdges, splitEdge, removePolygons, addPolygon }
