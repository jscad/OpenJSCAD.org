/**
 * Create an function for processing the JSCAD script into CSG/CAG objects
 * @param {String} script the script
 * @param {Object} globals the globals to use when evaluating the script: these are not ..
 * ...ACTUAL globals, merely functions/ variable accessible AS IF they were globals !
 */
function createJscadFunction (script, globals) {
  // console.log('globals', globals)
  // not a fan of this, we have way too many explicit api elements
  let globalsList = ''
  // each top key is a library ie : openscad helpers etc
  // one level below that is the list of libs
  // last level is the actual function we want to export to 'local' scope
  Object.keys(globals).forEach(function (libKey) {
    const lib = globals[libKey]
    // console.log(`lib:${libKey}: ${lib}`)
    Object.keys(lib).forEach(function (libItemKey) {
      const libItems = lib[libItemKey]
      // console.log('libItems', libItems)
      Object.keys(libItems).forEach(function (toExposeKey) {
        // console.log('toExpose',toExpose )
        const text = `const ${toExposeKey} = globals['${libKey}']['${libItemKey}']['${toExposeKey}']
`
        globalsList += text
      })
    })
  })

  const source = `// SYNC WORKER
    ${globalsList}

    //user defined script(s)
    ${script}

    if (typeof (main) !== 'function') {
      throw new Error('The JSCAD script must contain a function main() which returns one or more CSG or CAG solids.')
    }

    return main(params)
  `

  var f = new Function('params', 'include', 'globals', source)
  return f
}

module.exports = createJscadFunction
