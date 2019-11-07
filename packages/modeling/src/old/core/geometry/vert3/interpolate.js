const vec3 = require('../../math/vec3')
// Create a new vertex between this vertex and `other` by linearly
// interpolating all properties using a parameter of `t`. Subclasses should
// override this to interpolate additional properties.
const interpolate = (t, first, other) => {
  const newpos = vec3.lerp(t, first.pos, other.pos)
  return new Vertex(newpos)
}

module.exports = interpolate
