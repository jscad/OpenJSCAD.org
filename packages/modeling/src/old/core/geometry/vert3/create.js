const vec3 = require('../../math/vec3')
const {getTag} = require('../../constants')

// # class Vertex
// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property
// `flipped()`, and `interpolate()` methods that behave analogous to the ones
// FIXME: And a lot MORE (see plane.fromVector3Ds for ex) ! This is fragile code
// defined by `Vertex`.
/* const Vertex = function (pos) {
  this.pos = pos
}

Vertex.prototype = {

  getTag: function () {
    var result = this.tag
    if (!result) {
      result = getTag()
      this.tag = result
    }
    return result
  }
} */
const create = () => {
  return {
    pos: vec3.create()
  }
}
module.exports = create
