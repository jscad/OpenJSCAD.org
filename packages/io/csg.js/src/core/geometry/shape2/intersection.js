const intersect = function (otherCag, cag) {
  let cags
  if (cag instanceof Array) {
    cags = cag
  } else {
    cags = [cag]
  }
  let r = toCSGWall(otherCag, -1, 1)
  cags.map(function (cag) {
    r = intersectSub(r, toCSGWall(cag, -1, 1), false, false)
  })
  r = retesselate(r)
  r = canonicalize(r)
  r = fromFakeCSG(r)
  r = canonicalize(r)
  return r
}