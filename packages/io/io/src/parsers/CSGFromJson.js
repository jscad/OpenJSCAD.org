import { CSG } from '@jscad/csg'

// convert the given (anonymous JSON) object into CSG
// Note: Any issues during conversion will result in exceptions
function CSGfromJSON (o) {
  // verify the object IS convertable
  if (o.type == 'csg') {
    Object.setPrototypeOf(o, CSG.prototype)
    o.polygons.map(function (p) {
      Object.setPrototypeOf(p, CSG.Polygon.prototype)
      p.vertices.map(function (v) {
        Object.setPrototypeOf(v, CSG.Vertex.prototype)
        Object.setPrototypeOf(v.pos, CSG.Vector3D.prototype)
      })
      Object.setPrototypeOf(p.shared, CSG.Polygon.Shared.prototype)
      Object.setPrototypeOf(p.plane, CSG.Plane.prototype)
      Object.setPrototypeOf(p.plane.normal, CSG.Vector3D.prototype)
    })
    o.properties = new CSG.Properties()
  }
  return o
}
