const cuboid = params => {
  /* const defaults = {
      size: [1, 1, 1],
      center: [true, true, true]
    } */
  const _params = Object.assign({}, params)

  return Object.assign({}, _params, { type: 'cuboid' })
}

module.exports = cuboid
