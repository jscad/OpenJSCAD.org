
const path = require('path')

/** load an npm module from a string
 * @param  {String} src the source code of the module
 * @param  {String} filename the filename of the module
 */
const requireFromString = (src, filename) => {
  // completely ripped out of https://github.com/floatdrop/require-from-string
  // shamefully
  const Module = require('module')
  const paths = Module._nodeModulePaths(path.dirname(filename))
  const otherPaths = [path.resolve(__dirname, '../../../node_modules/')]
  const parent = module.parent
  const m = new Module(filename, parent)
  m.filename = filename
  m.paths = [].concat(otherPaths).concat(paths)
  m._compile(src, filename)

  const exports = m.exports
  parent.children && parent.children.splice(parent.children.indexOf(m), 1)

  return exports
  /* var Module = module.constructor
  var m = new Module()
  m._compile(src, filename)
  return m.exports */
}

module.exports = requireFromString
