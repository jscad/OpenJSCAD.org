const areCSGsIdentical = (cag, otherCag) => {
  if ((!cag & otherCag) || (cag && !otherCag)) {
    return false
  }
  if (!cag && !otherCag) {
    return true
  }
  if ('uid' in cag.properties && 'uid' in otherCag.properties) {
    if (cag.properties.uid === otherCag.properties.uid) {
      return true
    }
  }
  if (cag.isCanonicalized !== otherCag.isCanonicalized) {
    return false
  }
  if (cag.isRetesselated !== otherCag.isRetesselated) {
    return false
  }
  if (cag.sides.length !== otherCag.sides.length) {
    return false
  }

  let sides = cag.sides
  let otherSides = otherCag.sides

  const compareArrays = (a, b) => {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      // nested array

      if (a[i].length) {
        if (!compareArrays(a[i], b[i])) {
          return false
        }
      } else {
        if (a[i] !== b[i]) {
          return false
        }
      }
    }
    return true
  }

  for (let i = 0; i < sides.length; i++) {
    const sideA = sides[i]// .toString()
    const sideB = otherSides[i]// .toString()

    const polyAPlane = sideA.plane
    const polyAPlaneData = [polyAPlane.normal._x, polyAPlane.normal._y, polyAPlane.normal._z, polyAPlane.w]
    const polyAPoints = sideA.vertices.map(x => [x.pos._x, x.pos._y])

    const polyBPlane = sideB.plane
    const polyBPlaneData = [polyBPlane.normal._x, polyBPlane.normal._y, polyBPlane.normal._z, polyBPlane.w]
    const polyBPoints = sideB.vertices.map(x => [x.pos._x, x.pos._y])

    if (compareArrays(polyAPlaneData, polyBPlaneData) === false) {
      return false
    }
    if (compareArrays(polyAPoints, polyBPoints) === false) {
      return false
    }

    // console.log('side', side, otherPolygon)
  }
  return true
}

module.exports = areCSGsIdentical
