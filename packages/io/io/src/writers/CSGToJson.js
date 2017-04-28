export const mimeType = 'application/json'

export function write () {
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
