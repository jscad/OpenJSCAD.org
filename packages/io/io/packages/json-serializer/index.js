const { ensureManifoldness } = require('@jscad/io-utils')

const mimeType = 'application/json'

function fromCAG (CAG) {
  let str = '{ "type": "cag","sides": ['
  let comma = ''
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
  let str = '{ "type": "csg","polygons": ['
  let comma = ''
  CSG.polygons.map(
    function (polygon) {
      str += comma
      str += JSON.stringify(polygon)
      comma = ','
    }
  )
  str += '],'
  str += '"isCanonicalized": ' + JSON.stringify(CSG.isCanonicalized) + ','
  str += '"isRetesselated": ' + JSON.stringify(CSG.isRetesselated)
  str += '}'
  return [str]
}

function serialize (data, options) {
  return 'sides' in data ? fromCAG(data) : fromCSG(ensureManifoldness(data))
}

module.exports = {
  serialize,
  mimeType
}
