const ellipsoid = (params) => {
  return Object.assign({}, params, { type: 'ellipsoid' })
}

const sphere = (params) => {
  return Object.assign({}, params, { type: 'sphere' })
}

module.exports = { sphere, ellipsoid }
