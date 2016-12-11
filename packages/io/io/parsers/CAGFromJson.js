// convert the given (anonymous JSON) object into CAG
// Note: Any issues during conversion will result in exceptions
function CAGfromJSON  (o) {
  // verify the object IS convertable
  if (o.type == 'cag') {
    Object.setPrototypeOf(o, CAG.prototype)
    o.sides.map(function (side) {
      Object.setPrototypeOf(side, CAG.Side.prototype)
      Object.setPrototypeOf(side.vertex0, CAG.Vertex.prototype)
      Object.setPrototypeOf(side.vertex1, CAG.Vertex.prototype)
      Object.setPrototypeOf(side.vertex0.pos, CSG.Vector2D.prototype)
      Object.setPrototypeOf(side.vertex1.pos, CSG.Vector2D.prototype)
    }
    )
  }
  return o
}
