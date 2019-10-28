const {EPS} = require('../../constants')

const vec3 = require('../../../math/vec3')

const poly3 = require('../poly3')

const FuzzyFactory = require('./FuzzyFactory')

// ////////////////////////////////////
const FuzzyFactory3 = function () {
  this.vertexfactory = new FuzzyFactory(3, EPS)
  this.planefactory = new FuzzyFactory(4, EPS)
  this.polygonsharedfactory = {}
}

FuzzyFactory3.prototype = {
  getPolygonShared: function (sourceshared) {
    // TODO : correct this nonsense when color is supported in poly3
    let hash = 'null'
    if (sourceshared && (color in sourceshare)) {
      hash = shared.color.join('/')
    }
    if (hash in this.polygonsharedfactory) {
      return this.polygonsharedfactory[hash]
    } else {
      this.polygonsharedfactory[hash] = sourceshared
      return sourceshared
    }
  },

  getVertex: function (sourcevertex) {
    let elements = [sourcevertex[0], sourcevertex[1], sourcevertex[2]]
    let result = this.vertexfactory.lookupOrCreate(elements, () => sourcevertex)
    return result
  },

  getPlane: function (sourceplane) {
    let elements = [sourceplane[0], sourceplane[1], sourceplane[2], sourceplane[3]]
    let result = this.planefactory.lookupOrCreate(elements, () => sourceplane)
    return result
  },

  getPolygon: function (sourcepolygon) {
    let newplane = this.getPlane(sourcepolygon.plane)
    let newshared = this.getPolygonShared(sourcepolygon.shared)
    let _this = this
    let newvertices = sourcepolygon.vertices.map((vertex) => _this.getVertex(vertex))
    // two vertices that were originally very close may now have become
    // truly identical (referring to the same Vertex object).
    // Remove duplicate vertices:
    let distinctVertices = []
    if (newvertices.length > 0) {
      let prevvertex = newvertices[newvertices.length - 1]
      newvertices.forEach((vertex) => {
        if (!vec3.equals(prevvertex, vertex)) {
          distinctVertices.push(vertex)
        }
        prevvertex = vertex
      })
    }
    // If it's degenerate, remove all vertices:
    if (distinctVertices.length < 3) {
      distinctVertices = []
    }
    return poly3.fromPoints(distinctVertices, newplane)
    // TODO return poly3.fromPoints(newverticesDedup, newplane, newshared)
  }
}

module.exports = FuzzyFactory3
