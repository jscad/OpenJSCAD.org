const esprima = require('esprima')
const estraverse = require('estraverse')
const astring = require('astring')

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * but is still just a temporary solution until using actual modules & loaders (commonjs , es6 etc)
 * @param {String} text the original script (with include statements)
 * @param {String} relpath relative path, for xhr resolution
 * @param {String} memFs memFs cache object
 * @returns {String} the full script, with inlined
 */
export function replaceIncludes (text, relpath, memFs, includeResolver) {
  return new Promise(function (resolve, reject) {
    const moduleAst = astFromSource(text)
    const foundIncludes = findIncludes(moduleAst).map(x => x.value)
    const withoutIncludes = replaceIncludesInAst(moduleAst)

    const modulePromises = foundIncludes.map(function (uri, index) {
      return includeResolver(relpath, uri, memFs)
        .then(
          includedScript => replaceIncludes(includedScript, relpath, memFs, includeResolver),
          err => console.error('fail', err))
    })
    Promise.all(modulePromises).then(function (resolvedModules) {
      const resolvedScript = resolvedModules.concat(withoutIncludes).join('\n')
      resolve(resolvedScript)
    })
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
