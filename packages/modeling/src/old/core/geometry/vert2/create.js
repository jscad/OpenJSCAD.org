const vec2 = require('../../math/vec2')

const create = () => {
  return {
    pos: vec2.create(),
    tag: 0
  }
  /*
  getTag: function () {
    var result = this.tag
    if (!result) {
      result = getTag()
      this.tag = result
    }
    return result
  } */
}

module.exports = create
