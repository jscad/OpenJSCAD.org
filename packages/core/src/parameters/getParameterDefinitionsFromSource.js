'use strict'

const getParameterDefinitionsFromSource = function (script) {
  let lines = script.split('\n').map((l) => l.trim())

  lines = lines.map((l, i) => ({ code: l, line: i + 1, group: l[0] === '/' && !lines[i + 1] })).filter((l) => l.code)

  let i = 0; let line; let lineNum
  while (i < lines.length) {
    line = lines[i].code.trim()
    i++
    if (line.length > 12 && line.indexOf('@jscad-params') !== -1) break
  }

  let groupIndex = 1
  const defs = []

  while (i < lines.length) {
    line = lines[i].code
    lineNum = lines[i].line
    if (line[0] === '}') break

    if (line[0] === '/') {
      // group
      let name = '_group_' + (groupIndex++)
      const def = parseComment(line, lineNum, name)
      let caption = def.caption

      const idx = caption.lastIndexOf(':')
      if (idx !== -1) {
        name = caption.substring(idx + 1).trim()
        caption = caption.substring(0, idx).trim()
      }
      defs.push({ name, type: 'group', caption, ...def.options })
    } else {
      const idx = line.indexOf('/')
      if (idx === -1) {
        const def = parseDef(line, lineNum)
        def.caption = def.name
        defs.push(def)
      } else {
        defs.push(parseOne(
          line.substring(idx).trim(),
          line.substring(0, idx).trim(),
          lineNum, lineNum
        ))
      }
    }
    i++
  }

  return defs
}

const parseOne = function (comment, code, line1, line2) {
  let def = parseDef(code, line2)
  const { caption, options } = parseComment(comment, line1, def.name)
  def.caption = caption || def.name
  if (options) {
    def = { ...def, ...options }
    if (def.type === 'checkbox' && 'initial' in def) def.checked = true
    if (def.type === 'slider') {
      if (def.min === undefined) {
        def.min = 0
      }
      if (def.max === undefined) {
        def.max = def.initial * 2 || 100
      }
    }
  }

  return def
}

const parseComment = function (comment, line, paramName) {
  const prefix = comment.substring(0, 2)
  if (prefix === '//') comment = comment.substring(2)
  if (prefix === '/*') comment = comment.substring(2, comment.length - 2)

  comment = comment.trim()

  const ret = {}
  const idx = comment.indexOf('{')
  if (idx !== -1) {
    try {
      ret.options = Function('return ' + comment.substring(idx)).call()
    } catch (e) {
      throw new EvalError(`${e.message}, parameter:${paramName}, line:${line}: ${comment.substring(idx)}`, 'code', line)
    }
    comment = comment.substring(0, idx).trim()
  }

  ret.caption = comment

  return ret
}

const parseDef = function (code, line) {
  if (code[code.length - 1] === ',') code = code.substring(0, code.length - 1).trim()
  let idx = code.indexOf('=')

  if (idx === -1) idx = code.indexOf(':')

  if (idx === -1) {
    return { name: code, type: 'text' }
  } else {
    const initial = code.substring(idx + 1).trim()

    const ret = { type: 'text', name: code.substring(0, idx).trim() }

    if (initial === 'true' || initial === 'false') {
      ret.type = 'checkbox'
      ret.checked = initial === 'true'
    } else if (/^[0-9]+$/.test(initial)) {
      ret.type = 'int'
      ret.initial = parseFloat(initial)
    } else if (/^[0-9]+\.[0-9]+$/.test(initial)) {
      ret.type = 'number'
      ret.initial = parseFloat(initial)
    } else {
      try {
        ret.initial = Function('return ' + initial).bind({}).call()
      } catch (e) {
        throw new EvalError('Error in initial value definition for"' + code + '".' + e.message, 'code', line)
      }
    }

    return ret
  }
}

const combineParameterDefinitions = function (paramDefFromSource, extraDef) {
  console.log('combineParameterDefinitions', paramDefFromSource, extraDef)
  const def = [...paramDefFromSource]
  if (extraDef) {
    extraDef.forEach((param) => {
      const idx = def.findIndex((p) => p.name === param.name)
      if (idx !== -1) def[idx] = param
      else def.push(param)
    })
  }
  return def
}

module.exports = { getParameterDefinitionsFromSource, parseOne, parseComment, parseDef, combineParameterDefinitions }