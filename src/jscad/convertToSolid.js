import { CSG, CAG } from '../csg'

// FIXME: is there not too much overlap with convertToBlob ?
export default function convertToSolid (objs) {
  if (objs.length === undefined) {
    if ((objs instanceof CAG) || (objs instanceof CSG)) {
      var obj = objs
      objs = [obj]
    } else {
      throw new Error('Cannot convert object (' + typeof (objs) + ') to solid')
    }
  }

  var solid = null
  for (var i = 0; i < objs.length; i++) {
    let obj = objs[i]
    if (obj instanceof CAG) {
      obj = obj.extrude({offset: [0, 0, 0.1]}) // convert CAG to a thin solid CSG
    }
    if (solid !== null) {
      solid = solid.unionForNonIntersecting(obj)
    } else {
      solid = obj
    }
  }
  return solid
}
