const expandedShellOfCAG = function (_cag, radius, resolution) {
  resolution = resolution || 8
  if (resolution < 4) resolution = 4
  let cags = []
  let pointmap = {}
  let cag = canonicalize(_cag)
  cag.sides.map(function (side) {
    let d = side.vertex1.pos.minus(side.vertex0.pos)
    let dl = d.length()
    if (dl > EPS) {
      d = d.times(1.0 / dl)
      let normal = d.normal().times(radius)
      let shellpoints = [
        side.vertex1.pos.plus(normal),
        side.vertex1.pos.minus(normal),
        side.vertex0.pos.minus(normal),
        side.vertex0.pos.plus(normal)
      ]
      //      let newcag = fromPointsNoCheck(shellpoints);
      let newcag = fromPoints(shellpoints)
      cags.push(newcag)
      for (let step = 0; step < 2; step++) {
        let p1 = (step === 0) ? side.vertex0.pos : side.vertex1.pos
        let p2 = (step === 0) ? side.vertex1.pos : side.vertex0.pos
        let tag = p1.x + ' ' + p1.y
        if (!(tag in pointmap)) {
          pointmap[tag] = []
        }
        pointmap[tag].push({
          'p1': p1,
          'p2': p2
        })
      }
    }
  })
  for (let tag in pointmap) {
    let m = pointmap[tag]
    let angle1, angle2
    let pcenter = m[0].p1
    if (m.length === 2) {
      let end1 = m[0].p2
      let end2 = m[1].p2
      angle1 = end1.minus(pcenter).angleDegrees()
      angle2 = end2.minus(pcenter).angleDegrees()
      if (angle2 < angle1) angle2 += 360
      if (angle2 >= (angle1 + 360)) angle2 -= 360
      if (angle2 < angle1 + 180) {
        let t = angle2
        angle2 = angle1 + 360
        angle1 = t
      }
      angle1 += 90
      angle2 -= 90
    } else {
      angle1 = 0
      angle2 = 360
    }
    let fullcircle = (angle2 > angle1 + 359.999)
    if (fullcircle) {
      angle1 = 0
      angle2 = 360
    }
    if (angle2 > (angle1 + angleEPS)) {
      let points = []
      if (!fullcircle) {
        points.push(pcenter)
      }
      let numsteps = Math.round(resolution * (angle2 - angle1) / 360)
      if (numsteps < 1) numsteps = 1
      for (let step = 0; step <= numsteps; step++) {
        let angle = angle1 + step / numsteps * (angle2 - angle1)
        if (step === numsteps) angle = angle2 // prevent rounding errors
        let point = pcenter.plus(Vector2D.fromAngleDegrees(angle).times(radius))
        if ((!fullcircle) || (step > 0)) {
          points.push(point)
        }
      }
      let newcag = fromPointsNoCheck(points)
      cags.push(newcag)
    }
  }
  let result = new CAG()
  result = union(result, cags)// FIXME: Not quite sure how to deal with this: union(cags.concat([result])) ?
  return result
}
