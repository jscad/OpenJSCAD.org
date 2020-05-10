const { IsFloat } = require('../utils')

/*
 * @example
 * new CSG.Vector2D(1, 2);
 * new CSG.Vector2D([1, 2]);
 * new CSG.Vector2D({ x: 1, y: 2});
 */
const fromVarious = function (...params) {
  if (params.length === 2) {
    this._x = parseFloat(params[0])
    this._y = parseFloat(params[1])
  } else {
    var ok = true
    if (params.length === 1) {
      if (typeof params === 'object') {
        if (params instanceof Array) {
          this._x = parseFloat(params[0])
          this._y = parseFloat(params[1])
        } else if (('x' in params) && ('y' in params)) {
          this._x = parseFloat(params.x)
          this._y = parseFloat(params.y)
        } else ok = false
      } else {
        var v = parseFloat(params)
        this._x = v
        this._y = v
      }
    } else ok = false
    if (ok) {
      if ((!IsFloat(this._x)) || (!IsFloat(this._y))) ok = false
    }
    if (!ok) {
      throw new Error('wrong arguments')
    }
  }
}

module.exports = fromVarious
