var OpenjscadSolidFactory = require('./OpenjscadSolidFactory')
var factory = new OpenjscadSolidFactory()

module.exports = {
  getInstance: function () {
    return factory
  }
}
