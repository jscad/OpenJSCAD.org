const sphere = params => {
  /* const defaults = {
      size: 1,
      center: [true, true, true]
    } */
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'sphere' })
}

module.exports = { sphere }
