const { EPS } = require('../../constants')

const FuzzyFactory = require('./FuzzyFactory')

const FuzzyFactory2d = function () {
  this.vertexfactory = new FuzzyFactory(2, EPS)
}

FuzzyFactory2d.prototype = {
  getVertex: function (sourcevertex) {
    let elements = [sourcevertex[0], sourcevertex[1]]
    // FIXME: oh blimey, this actually never did anything : returns the SOURCE VERTEX!!
    return this.vertexfactory.lookupOrCreate(elements, function (els) {
      return sourcevertex
    })
  },

  getSide: function (sourceside) {
    const vertex0 = this.getVertex(sourceside[0])
    const vertex1 = this.getVertex(sourceside[1])
    return [vertex0, vertex1]
  }
}

module.exports = FuzzyFactory2d
