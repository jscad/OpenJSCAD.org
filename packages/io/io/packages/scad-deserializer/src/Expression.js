var Range = require('./Range')
var Sylvester = require('sylvester')
var _ = require('lodash')

function Expression (value) {
  this.children = []
  this.const_value = value
  this.var_name
  this.call_funcname
  this.call_argnames = []
  this.type = 'C'
};

function isMatrix (x) {
  return _.isArray(x) && _.isArray(x[0])
}

function isVector (x) {
  return _.isArray(x) && !_.isArray(x[0])
}

function getValueObject (x) {
  if (isMatrix(x)) {
    return Sylvester.$M(x)
  } else if (isVector(x)) {
    return Sylvester.$V(x)
  } else {
    return x
  }
}

Sylvester.Matrix.prototype.toString = function () {
  var x = _.map(this.elements, function (y) { return '[' + y.join(',') + ']' })
  return '[' + x.join(',') + ']'
}

Sylvester.Vector.prototype.toString = function () {
  return '[' + this.elements.join(',') + ']'
}

Expression.prototype.evaluate = function (context) {
  switch (this.type) {
    case '!':
      return !this.children[0].evaluate(context)
      break
    case '&&':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return false
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return true
      }

      return c1 && c2
      break
    case '||':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return true
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return true
      }
      return c1 || c2
      break
    case '*':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return undefined
      }
      if (_.isArray(c1) || _.isArray(c2)) {
        var v1 = getValueObject(c1)
        var v2 = getValueObject(c2)

        if (isVector(c1) && isVector(c2)) {
          return v1.dot(v2)
        }

        if (isVector(c1) && isMatrix(c2)) {
          return [v1.dot(v2.col(1)),
            v1.dot(v2.col(2)),
            v1.dot(v2.col(3))]
        }

        if (_.isNumber(c1)) {
          return v2.multiply(v1)
        }

        return (v1.multiply(v2))
      }

      return c1 * c2

      break
    case '/':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return undefined
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        var v1 = getValueObject(c1)
        var v2 = getValueObject(c2)

        if (_.isArray(c1) && _.isArray(c2)) {
          return undefined
        }

        if (isMatrix(c1) && _.isNumber(c2)) {
          return v1.multiply(1 / v2)
        }

        if (_.isNumber(c1) && isMatrix(c2)) {
          var result = []

          for (var i = 0; i < c2.length; i++) {
            var a1 = []
            for (var j = 0; j < c2[i].length; j++) {
              a1[j] = c1 / c2[i][j]
            }
            result.push(a1)
          }
          return result
        }

        if (isVector(c1) && _.isNumber(c2)) {
          return v1.multiply(1 / v2)
        }

        if (_.isNumber(c1) && isVector(c2)) {
          return v2.multiply(1 / v1)
        }
      }

      return c1 / c2

      break
    case '%':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return undefined
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return undefined
      }

      return c1 % c2
      break
    case '+':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return undefined
      }

      if (_.isArray(c1) && _.isArray(c2)) {
        // matrices
        if (isMatrix(c1) && isMatrix(c2)) {
          var minLength = Math.min(c1.length, c2.length)
          var result = []

          for (var i = 0; i < minLength; i++) {
            var a1 = []
            for (var j = 0; j < c1[i].length; j++) {
              a1[j] = c1[i][j] + c2[i][j]
            }
            result.push(a1)
          }
          return result
        } else if (isMatrix(c1) || isMatrix(c2)) {
          return undefined
        }
        return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]]
      } else if (_.isArray(c1) || _.isArray(c2)) {
        return undefined
      } else {
        return c1 + c2
      }
      break
    case '-':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return undefined
      }

      if (_.isArray(c1) && _.isArray(c2)) {
        // matrices
        if (_.isArray(c1[0]) && _.isArray(c2[0])) {
          var minLength = Math.min(c1.length, c2.length)
          var result = []

          for (var i = 0; i < minLength; i++) {
            var a1 = []
            for (var j = 0; j < c1[i].length; j++) {
              a1[j] = c1[i][j] - c2[i][j]
            }
            result.push(a1)
          }
          return result
        }

        return [c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]]
      } else if (_.isArray(c1) || _.isArray(c2)) {
        return undefined
      } else {
        return c1 - c2
      }
      break
    case '<':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return false
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return false
      }
      return c1 < c2
      break
    case '<=':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return true
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return true
      }
      return c1 <= c2
      break
    case '==':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return false
      }

      if ((isVector(c1) && isVector(c2)) ||
              (isMatrix(c1) && isMatrix(c2))) {
        var v1 = getValueObject(c1)
        var v2 = getValueObject(c2)
        return v1.eql(v2)
      }
      if (_.isArray(c1) || _.isArray(c2)) {
        return false
      }
      return c1 == c2
      break
    case '!=':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return false
      }

      if ((isVector(c1) && isVector(c2)) ||
              (isMatrix(c1) && isMatrix(c2))) {
        var v1 = getValueObject(c1)
        var v2 = getValueObject(c2)
        return !v1.eql(v2)
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return true
      }
      return c1 != c2
      break
    case '>=':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return true
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return true
      }

      return c1 >= c2
      break
    case '>':
      var c1 = this.children[0].evaluate(context)
      var c2 = this.children[1].evaluate(context)

      if (_.isUndefined(c1) || _.isUndefined(c2) || _.isNaN(c1) || _.isNaN(c2)) {
        return false
      }

      if (_.isArray(c1) || _.isArray(c2)) {
        return false
      }

      return c1 > c2
      break
    case '?:':
      var v = this.children[0].evaluate(context)
      return this.children[v ? 1 : 2].evaluate(context)
      break
    case 'I':

      var c1 = this.children[0].evaluate(context)

      if (_.isArray(c1)) {
        return _.map(c1, function (x) { return -x })
      }

      return -c1
      break
    case 'C':
      return this.const_value
      break
    case 'R':
      var v1 = this.children[0].evaluate(context)
      var v2 = this.children[1].evaluate(context)
      var v3 = this.children[2].evaluate(context)
      if (_.isNumber(v1) && _.isNumber(v2) && _.isNumber(v3)) {
        return new Range(v1, v2, v3)
      }
      return undefined
      break
    case 'V':
      var vec = []
      for (var i = 0; i < this.children.length; i++) {
        vec.push(this.children[i].evaluate(context))
      };
      return vec
      break
    case 'L':
      return context.lookupVariable(this.var_name)
      break
    case '[]':
      return this.children[0].evaluate(context)[this.children[1].evaluate(context)]
      break
    case 'F':
      var argvalues = []
      for (var i = 0; i < this.children.length; i++) {
        argvalues.push(this.children[i].evaluate(context))
      }

      return context.evaluateFunction(this.call_funcname, this.call_argnames, argvalues)
      break
    default:
      console.log('todo - evaluate expression', this)
  }
}
module.exports = Expression
