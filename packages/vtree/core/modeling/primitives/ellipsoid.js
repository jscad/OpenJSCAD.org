const ellipsoid = (params) => Object.assign({}, params, { type: 'ellipsoid' })

const sphere = (params) => Object.assign({}, params, { type: 'sphere' })

module.exports = { ellipsoid, sphere }
