export const mimeType = 'application/json'
export function write (CAG) {
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
