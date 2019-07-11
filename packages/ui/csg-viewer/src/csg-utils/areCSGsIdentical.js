const areCSGsIdentical = (csg, otherCsg) => {
  if ((!csg & otherCsg) || (csg && !otherCsg)) {
    return false
  }
  if (!csg && !otherCsg) {
    return true
  }
  if ('uid' in csg.properties && 'uid' in otherCsg.properties) {
    if (csg.properties.uid === otherCsg.properties.uid) {
      return true
    }
  }
  if (csg.isCanonicalized !== otherCsg.isCanonicalized) {
    return false
  }
  if (csg.isRetesselated !== otherCsg.isRetesselated) {
    return false
  }
  if (csg.polygons.length !== otherCsg.polygons.length) {
    return false
  }

  let polygons = csg.polygons
  let otherPolygons = otherCsg.polygons

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

  for (let i = 0; i < polygons.length; i++) {
    const polygonA = polygons[i]// .toString()
    const polygonB = otherPolygons[i]// .toString()

    const polyAPlane = polygonA.plane
    const polyAPlaneData = [polyAPlane.normal._x, polyAPlane.normal._y, polyAPlane.normal._z, polyAPlane.w]
    const polyAPoints = polygonA.vertices.map(x => [x.pos._x, x.pos._y])

    const polyBPlane = polygonB.plane
    const polyBPlaneData = [polyBPlane.normal._x, polyBPlane.normal._y, polyBPlane.normal._z, polyBPlane.w]
    const polyBPoints = polygonB.vertices.map(x => [x.pos._x, x.pos._y])

    if (compareArrays(polyAPlaneData, polyBPlaneData) === false) {
      return false
    }
    if (compareArrays(polyAPoints, polyBPoints) === false) {
      return false
    }

    // console.log('polygon', polygon, otherPolygon)
  }
  return true
}

module.exports = areCSGsIdentical
