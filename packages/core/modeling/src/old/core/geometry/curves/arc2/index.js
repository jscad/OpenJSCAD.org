const create = (params) => {
  let radius
  let origin = [0, 0]
  if ('radius' in params) {
    radius = params.radius
  }
  if ('diameter' in params) {
    radius = params.diameter * 0.5
  }

  return {
    type: 'arc',
    origin,
    radius
  }
}

module.exports = create