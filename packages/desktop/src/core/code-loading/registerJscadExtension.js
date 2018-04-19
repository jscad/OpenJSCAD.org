const fs = require('fs')
const stripBom = require('strip-bom')

const registerJscadExtension = () => {
  require.extensions['.jscad'] = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}

module.exports = registerJscadExtension
