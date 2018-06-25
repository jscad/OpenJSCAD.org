/*const Side = function (vertex0, vertex1) {
  if (!(vertex0 instanceof Vertex)) throw new Error('Assertion failed')
  if (!(vertex1 instanceof Vertex)) throw new Error('Assertion failed')
  this.vertex0 = vertex0
  this.vertex1 = vertex1
}
getTag: function () {
  var result = this.tag
  if (!result) {
    result = getTag()
    this.tag = result
  }
  return result
} */

const vert3 = require('../vert3')
const create = () => {
  return {
    vertex0: vert3.create(),
    vertex1: vert3.create()
  }
}

module.exports = create
