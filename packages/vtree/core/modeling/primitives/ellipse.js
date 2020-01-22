const ellipse = (params) => {
  const _params = params
  return Object.assign({}, _params, { type: 'ellipse' })
}

module.exports = ellipse
