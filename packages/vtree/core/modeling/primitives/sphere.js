const sphere = params => {
  /* const defaults = {
      size: 1,
      center: [true, true, true]
    } */
  return Object.assign({}, params, { type: 'sphere' })
}

module.exports = { sphere }
