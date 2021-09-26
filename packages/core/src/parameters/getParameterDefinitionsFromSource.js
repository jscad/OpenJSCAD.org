const JSON5 = require('json5')

/* Count leading spaces in a line.
This helps provide more descriptive comments after the parameter.

When comment is foundm the number of spaces can be compared with previous parameter definition.
When comment line is indented more than parameter(incl. parameter name)
it is considered as description of previous parameter and not a group definition.

*/
const countSpaces = (l) => {
  let count = 0
  for (let i = 0; i < l.length; i++) {
    if (l[i] === ' ') count++
    else if (l[i] === '\t') count += 2
    else break
  }
  return count
}

const getParameterDefinitionsFromSource = (script) => {
  const lines = []
  script.split('\n').forEach((l, i) => {
    const trim = l.trim()
    if (trim) {
      lines.push({ code: trim, line: l, lineNum: i + 1, indent: countSpaces(l) })
    }
  })

  let i = 0; let lineNum; let code; let prev; let prevIndent
  while (i < lines.length) {
    code = lines[i].code
    i++
    if (code.length > 12 && code.indexOf('@jscad-params') !== -1) break
  }

  let groupIndex = 1
  const defs = []

  while (i < lines.length) {
    code = lines[i].code
    lineNum = lines[i].lineNum
    if (code[0] === '}') break

    const isGroup = code[0] === '/'
    if (isGroup && prev) {
      const isHint = prev.type === 'group' || prevIndent + prev.name.length <= lines[i].indent
      if (isHint) {
        prev.hint = prev.hint ? prev.hint + '\n' : ''
        prev.hint += extractTextFromComment(code, lineNum)
        i++
        continue
      }
    }

    prevIndent = lines[i].indent
    if (isGroup) {
      // group
      const name = '_group_' + (groupIndex++)
      const def = parseComment(code, lineNum, name)
      let caption = def.caption
      if (caption[0] === '>') {
        caption = caption.substring(1).trim()
        if (!def.options) def.options = {}
        def.options.initial = 'closed'
      }

      defs.push(prev = { name, type: 'group', caption, ...def.options })
    } else {
      const idx = code.indexOf('/')
      if (idx === -1) {
        // also handle case when closing bracket is in same line as last parameter
        //   width=11}
        // it is not an exhaustive check but covers aditional case to simplify it for users
        const bracketIdx = code.indexOf('}')
        if (bracketIdx !== -1) code = code.substring(0, bracketIdx)

        const def = parseDef(code, lineNum)
        def.caption = def.name
        defs.push(prev = def)

        if (bracketIdx !== -1) break
      } else {
        defs.push(prev = parseOne(
          code.substring(idx).trim(),
          code.substring(0, idx).trim(),
          lineNum, lineNum
        ))
      }
    }
    i++
  }

  return defs
}

const parseOne = (comment, code, line1, line2) => {
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
        def.max = 100
      }
    }
  }

  return def
}

const extractTextFromComment = (c, lineNum) => {
  const prefix = c.substring(0, 2)
  // after cutting-out the comment marker, there could be more spaces to trim
  if (prefix === '//') c = c.substring(2).trim()
  if (prefix === '/*') {
    if (c.substring(c.length - 2) !== '*/') throw new EvalError(`Multi-line comments not supported in parsed parameter definitions, line:${lineNum}`, 'code', lineNum)
    c = c.substring(2, c.length - 2).trim()
  }

  return c
}

const parseComment = (comment, lineNum, paramName) => {
  comment = extractTextFromComment(comment, lineNum)

  const ret = {}
  const idx = comment.indexOf('{')
  if (idx !== -1) {
    try {
      ret.options = JSON5.parse(comment.substring(idx))
    } catch (e) {
      throw new EvalError(`${e.message}, parameter:${paramName}, line:${lineNum}: ${comment.substring(idx)}`, 'code', lineNum)
    }
    comment = comment.substring(0, idx).trim()
  }

  ret.caption = comment

  return ret
}

const parseDef = (code, line) => {
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
        ret.initial = JSON5.parse(initial)
      } catch (e) {
        throw new EvalError(`Error in the initial value definition for ${code}  ${e.message}, line:${line}`, 'code', line)
      }
    }

    return ret
  }
}

const combineParameterDefinitions = (paramDefFromSource, extraDef) => {
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
