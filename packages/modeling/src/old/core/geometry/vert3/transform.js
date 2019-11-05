  // Affine transformation of vertex. Returns a new Vertex
  const transform = (matrix) => {
    var newpos = this.pos.multiply4x4(matrix)
    return new Vertex(newpos)
  }
  module.exports = transform
