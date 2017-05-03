const {CSG} = require('@jscad/csg')

const mimeType = 'application/json'

function fromCAG (CAG) {
  var str = '{ "type": "cag","sides": ['
  var comma = ''
  CAG.sides.map(
    function (side) {
      str += comma
      str += JSON.stringify(side)
      comma = ','
    }
  )
  str += '] }'
  return [str]
}

function fromCSG (CSG) {
  var str = '{ "type": "csg","polygons": ['
  var comma = ''
  CSG.polygons.map(
    function (polygon) {
      str += comma
      str += JSON.stringify(polygon)
      comma = ','
    }
  )
  str += '],'
  str += '"isCanonicalized": ' + JSON.stringify(this.isCanonicalized) + ','
  str += '"isRetesselated": ' + JSON.stringify(this.isRetesselated)
  str += '}'
  return [str]
}

function serialize (data, options) {
  return typeof data === CSG ? fromCSG(data) : fromCAG(data)
}

module.exports = {
  serialize,
  mimeType
}
