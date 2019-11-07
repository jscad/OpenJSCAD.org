const {CAG} = require('@jscad/csg')

// FIXME : is this used anywhere ?
function group () { // experimental
  let o
  let i = 0
  let a = arguments
  if (a[0].length) a = a[0]

  if ((typeof (a[i]) === 'object') && (a[i] instanceof CAG)) {
    o = a[i].extrude({offset: [0, 0, 0.1]}) // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
  } else {
    o = a[i++]
  }
  for (; i < a.length; i++) {
    let obj = a[i]
    if ((typeof (a[i]) === 'object') && (a[i] instanceof CAG)) {
      obj = a[i].extrude({offset: [0, 0, 0.1]}) // -- convert a 2D shape to a thin solid:
    }
    o = o.unionForNonIntersecting(obj)
  }
  return o
}

module.exports = group
