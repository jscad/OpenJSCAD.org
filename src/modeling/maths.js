// -- Math functions (360 deg based vs 2pi)

export function sin (a) {
  return Math.sin(a / 360 * Math.PI * 2)
}
export function cos (a) {
  return Math.cos(a / 360 * Math.PI * 2)
}
export function asin (a) {
  return Math.asin(a) / (Math.PI * 2) * 360
}
export function acos (a) {
  return Math.acos(a) / (Math.PI * 2) * 360
}
export function tan (a) {
  return Math.tan(a / 360 * Math.PI * 2)
}
export function atan (a) {
  return Math.atan(a) / (Math.PI * 2) * 360
}
export function atan2 (a, b) {
  return Math.atan2(a, b) / (Math.PI * 2) * 360
}
export function ceil (a) {
  return Math.ceil(a)
}
export function floor (a) {
  return Math.floor(a)
}
export function abs (a) {
  return Math.abs(a)
}
export function min (a, b) {
  return a < b ? a : b
}
export function max (a, b) {
  return a > b ? a : b
}
export function rands (min, max, vn, seed) {
  // -- seed is ignored for now, FIX IT (requires reimplementation of random())
  //    see http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
  var v = new Array(vn)
  for (var i = 0; i < vn; i++) {
    v[i] = Math.random() * (max - min) + min
  }
}
export function log (a) {
  return Math.log(a)
}
export function lookup (ix, v) {
  var r = 0
  for (var i = 0; i < v.length; i++) {
    var a0 = v[i]
    if (a0[0] >= ix) {
      i--
      a0 = v[i]
      var a1 = v[i + 1]
      var m = 0
      if (a0[0] !== a1[0]) {
        m = abs((ix - a0[0]) / (a1[0] - a0[0]))
      }
      // echo(">>",i,ix,a0[0],a1[0],";",m,a0[1],a1[1])
      if (m > 0) {
        r = a0[1] * (1 - m) + a1[1] * m
      } else {
        r = a0[1]
      }
      return r
    }
  }
  return r
}

export function pow (a, b) {
  return Math.pow(a, b)
}

export function sign (a) {
  return a < 0 ? -1 : (a > 1 ? 1 : 0)
}

export function sqrt (a) {
  return Math.sqrt(a)
}

export function round (a) {
  return floor(a + 0.5)
}
