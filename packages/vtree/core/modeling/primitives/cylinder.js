const cylinder = params => {
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'cylinder' })
}

module.exports = cylinder
