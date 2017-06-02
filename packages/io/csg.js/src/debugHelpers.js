const CSG = require('./CSG')
const {cube} = require('./primitives3d')

// For debugging
// Creates a new solid with a tiny cube at every vertex of the source solid
// this is seperated from the CSG class itself because of the dependency on cube
const toPointCloud = function (csg, cuberadius) {
  csg = csg.reTesselated()

  let result = new CSG()

    // make a list of all unique vertices
    // For each vertex we also collect the list of normals of the planes touching the vertices
  let vertexmap = {}
  csg.polygons.map(function (polygon) {
    polygon.vertices.map(function (vertex) {
      vertexmap[vertex.getTag()] = vertex.pos
    })
  })

  for (let vertextag in vertexmap) {
    let pos = vertexmap[vertextag]
    let _cube = cube({
      center: pos,
      radius: cuberadius
    })
    result = result.unionSub(_cube, false, false)
  }
  result = result.reTesselated()
  return result
}

module.exports = {toPointCloud}
