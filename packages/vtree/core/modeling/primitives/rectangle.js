
// TODO: FORMAL DEFINITION VS IMPLEMENTATION
// GEOM: implementation
// anything before that: formal

const rectangle = (options) => {

}

// FIXME: FROM V1
const square = (params) => {
  return Object.assign({}, params, { type: 'square' })
}

module.exports = { rectangle, square }
