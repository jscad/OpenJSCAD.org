const circle = (params) => Object.assign({}, params, { type: 'circle' })

const ellipse = (params) => Object.assign({}, params, { type: 'ellipse' })

module.exports = { circle, ellipse }
