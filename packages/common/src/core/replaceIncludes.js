const esprima = require('esprima')
const estraverse = require('estraverse')
const astring = require('astring')

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * but is still just a temporary solution until using actual modules & loaders (commonjs , es6 etc)
 * @param {String} source the original script (with include statements)
 * @param {String} basePath base path, for xhr resolution
 * @param {String} relPath relative path for include hierarchies
 * @param {String} memFs memFs cache object
 * @returns {String} the full script, with inlined
 */
function replaceIncludes (source, basePath, relPath, {memFs, includeResolver}) {
  return new Promise(function (resolve, reject) {
    const moduleAst = astFromSource(source)
    const foundIncludes = findIncludes(moduleAst).map(x => x.value)

    const modulePromises = foundIncludes.map(function (uri, index) {
      return includeResolver(basePath, uri, memFs)
        .then(
          includedScript => replaceIncludes(includedScript, basePath, `${relPath}/${uri}`, {memFs, includeResolver})
        )
        .then(data => {
          data.moduleCache[uri] = data.source
          return data
        })

    })
    Promise.all(modulePromises).then(function (resolvedModules) {
      let resolvedScript = source
      const moduleCache = resolvedModules.reduce((acc, cur) => {
        Object.keys(cur.moduleCache).forEach(key => { acc[key] = cur.moduleCache[key] })
        return acc
      }, {})
      // we are the root level
      if (relPath === '') {
        const moduleSources = Object.keys(moduleCache).map(function (uri) {
          return `globals['includesSource']['${uri}'] = function() {${moduleCache[uri]}}`
        }).join('\n')

        resolvedScript = `globals['includedFiles'] || (globals['includedFiles'] = {})
globals['includesSource'] || (globals['includesSource'] = {})
if (!globals['originalIncludeFunction']) {
  globals['originalIncludeFunction'] = include
  include = function(file) {
    if (!globals['includedFiles'][file]) {
      globals['includesSource'][file]()
      globals['includedFiles'][file] = true
    }
  }
}
${moduleSources}
${resolvedScript}
`
      }
      resolve({source: resolvedScript, moduleCache})
    })
    .catch(reject)
  })
}

function isInclude (node) {
  return (node.type === 'CallExpression' && node.callee && node.callee.name && node.callee.name === 'include')
}

function astFromSource (source, options) {
  const defaults = {
    loc: true, range: true, tolerant: true
  }
  options = Object.assign({}, defaults, options)

  let ast
  try {
    ast = esprima.parse(source, options)
    // console.log("ast",ast,"scope", scope);
  } catch (error) {
    console.error('failed to generate ast:', error)
    ast = {}
  }
  return ast
}

function findIncludes (ast) {
  let includes = []
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (isInclude(node)) {
        if (node.arguments && arguments.length > 0) {
          const includePath = node.arguments[0]
          const {raw, value} = includePath
          includes.push({raw, value})
        }
        return estraverse.VisitorOption.Skip
      }
    }
  })
  return includes
}

function replaceIncludesInAst (ast, replacement = '') {
  const result = estraverse.replace(ast, {
    enter: function (node, parent) {
      if (isInclude(node)) {
        if (node.arguments && arguments.length > 0) {
          return {type: 'Literal', value: replacement}
        }
        return estraverse.VisitorOption.Skip
      }
    }
  })

  return astring.generate(result, {indent: '  ', lineEnd: '\n'})
}

module.exports = {
  replaceIncludes
}
