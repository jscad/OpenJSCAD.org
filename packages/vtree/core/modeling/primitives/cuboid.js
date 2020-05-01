const cuboid = params => {
  /* const defaults = {
      size: [1, 1, 1],
      center: [true, true, true]
    } */
  return Object.assign({}, params, { type: 'cuboid' })
}
const cube = params => Object.assign({}, params, { type: 'cube' })

module.exports = { cuboid, cube }
