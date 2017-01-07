import { CAG } from 'csg'

// -- 3D operations (OpenSCAD like notion)
export function union () {
  var o,i = 0,a = arguments
  if (a[0].length) a = a[0]

  o = a[i++]
  if (0) { // we leave to code for now, perhaps later we allow mixed CAG/CSG union
    if ((typeof (a[i]) == 'object') && (a[i] instanceof CAG)) {
      o = a[i].extrude({offset: [0, 0, 0.1]}) // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
    } else {
      o = a[i++]
    }
  }
  for (; i < a.length; i++) {
    var obj = a[i]

    // for now disabled, later perhaps allow mixed union of CAG/CSG
    if (0 && (typeof (a[i]) == 'object') && (a[i] instanceof CAG)) {
      obj = a[i].extrude({offset: [0, 0, 0.1]}) // -- convert a 2D shape to a thin solid:
    }
    o = o.union(obj)
  }
  return o
}

export function difference () {
  var o,i = 0,a = arguments
  if (a[0].length) a = a[0]
  for (o = a[i++]; i < a.length; i++) {
    if (a[i] instanceof CAG) {
      o = o.subtract(a[i])
    } else {
      o = o.subtract(a[i].setColor(1, 1, 0)) // -- color the cuts
    }
  }
  return o
}

export function intersection () {
  var o,i = 0,a = arguments
  if (a[0].length) a = a[0]
  for (o = a[i++]; i < a.length; i++) {
    if (a[i] instanceof CAG) {
      o = o.intersect(a[i])
    } else {
      o = o.intersect(a[i].setColor(1, 1, 0)) // -- color the cuts
    }
  }
  return o
}
