const cylinder = params => Object.assign({}, params, { type: 'cylinder' })

const cylinderElliptic = params => Object.assign({}, params, { type: 'cylinderElliptic' })

module.exports = { cylinder, cylinderElliptic }
