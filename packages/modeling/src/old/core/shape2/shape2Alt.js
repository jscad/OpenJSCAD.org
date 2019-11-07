
const line = ({ start, end }) => {
  return {
    type: 'line',
    start,
    end
  }
}

const ellipse = (params) => {
  // { position, radius }
  let radius
  let position
  if ('radius' in params) {
    radius = params.radius
  }
  if ('diameter' in params) {
    radius = params.diameter * 0.5
  }
  if ('center' in params) {
    position = params.center
  }
  return {
    type: 'ellipse',
    origin: position,
    radius: radius
  }
}





const myShape = shape2.fromData(
  [line({ start: [0, 2], end: [10, 0] }), ellipse({ diameter: 10 })]
)

const myShape2 = shape2.fromData(
  [
    line({ start: [0, 2], end: [10, 0] }),
    line({ start: [10, 0], end: [15, 20] }),
    line({ start: [15, 20], end: [0, 2] })
  ]
)

const myShape3 = shape2.fromPoints([
  [0, 2], [10, 0], [0.2]
])

const myShape = shape2.fromData(
  [line({ start: [0, 2], end: [10, 0] }), bezierCurve([10, 0]...)]
)


// curves or paths or something else ?