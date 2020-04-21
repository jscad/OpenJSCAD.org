const cylinder = params => {
  return Object.assign({}, params, { type: 'cylinder' })
}

const cylinderElliptic = params => {
  return Object.assign({}, params, { type: 'cylinderElliptic' })
}

module.exports = { cylinder, cylinderElliptic }
