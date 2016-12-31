import makeBlob from '../../utils/Blob'
const Blob = makeBlob()

export function toJSON () {
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
  return new Blob([str], {
    type: 'application/json'
  })
}
