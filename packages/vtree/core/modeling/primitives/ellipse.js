const ellipse = (params) => {
  return Object.assign({}, params, { type: 'ellipse' })
}

const circle = (params) => {
  return Object.assign({}, params, { type: 'circle' })
}

module.exports = { circle, ellipse }
