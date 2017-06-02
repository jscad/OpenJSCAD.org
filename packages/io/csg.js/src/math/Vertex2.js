const Vector2D = require('./Vector2')
const {getTag} = require('../constants')

const Vertex = function (pos) {
  this.pos = pos
}

Vertex.fromObject = function (obj) {
  return new Vertex(new Vector2D(obj.pos._x, obj.pos._y))
}

Vertex.prototype = {
  toString: function () {
    return '(' + this.pos.x.toFixed(5) + ',' + this.pos.y.toFixed(5) + ')'
  },
  getTag: function () {
    var result = this.tag
    if (!result) {
      result = getTag()
      this.tag = result
    }
    return result
  }
}

module.exports = Vertex
