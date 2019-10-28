function CubicBezierP0 (t, p) {
  var k = 1 - t
  return k * k * k * p
}

function CubicBezierP1 (t, p) {
  var k = 1 - t
  return 3 * k * k * t * p
}

function CubicBezierP2 (t, p) {
  return 3 * (1 - t) * t * t * p
}

function CubicBezierP3 (t, p) {
  return t * t * t * p
}

function CubicBezier (t, p0, p1, p2, p3) {
  return CubicBezierP0(t, p0) + CubicBezierP1(t, p1) + CubicBezierP2(t, p2) +
		CubicBezierP3(t, p3)
}

module.exports = { CubicBezier }
