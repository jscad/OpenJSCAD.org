const rectangle = params => Object.assign({}, params, { type: 'rectangle' })

const square = (params) => Object.assign({}, params, { type: 'square' })

module.exports = { rectangle, square }
