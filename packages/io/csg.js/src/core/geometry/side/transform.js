transform: function (matrix4x4) {
  var newp1 = this.vertex0.pos.transform(matrix4x4)
  var newp2 = this.vertex1.pos.transform(matrix4x4)
  return new Side(new Vertex(newp1), new Vertex(newp2))
},