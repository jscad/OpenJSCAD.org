
const countSpaces = (l) => {
  let count = 0
  for (let i = 0; i < l.length; i++) {
    if (l[i] === ' ') count++
    else if (l[i] === '\t') count += 2
    else break
  }
  return count
}

export function parseParams (script) {
  if (!script.includes('@jscad-params')) return []

  const lines = []
  script.split('\n').forEach((l, i) => {
    const trim = l.trim()
    if (trim) {
      lines.push({ code: trim, line: l, lineNum: i + 1, indent: countSpaces(l) })
    }
  })

  let i = 0; let line; let lineNum; let code; let prev; let prevIndent
  while (i < lines.length) {
    line = lines[i].code.trim()
    i++
    if (line.length > 12 && line.indexOf('@jscad-params') !== -1) break
  }

  let groupIndex = 1
  const defs = []

  while (i < lines.length) {
    code = lines[i].code
    line = lines[i].line
    lineNum = lines[i].lineNum
    if (code[0] === '}') break

    const isGroup = code[0] === '/'
    if (isGroup && prev) {
      const isHint = prev.type === 'group' || prevIndent + prev.name.length <= lines[i].indent
      if (isHint) {
        prev.hint = prev.hint ? prev.hint + '\n' : ''
        prev.hint += extractTextFromComment(code)
        i++
        continue
      }
    }

    prevIndent = lines[i].indent
    if (isGroup) {
      // group
      let name = '_group_' + (groupIndex++)
      const def = parseComment(code, lineNum, name)
      let caption = def.caption

      const idx = caption.lastIndexOf(':')
      if (idx !== -1) {
        name = caption.substring(idx + 1).trim()
        caption = caption.substring(0, idx).trim()
      }
      defs.push(prev = { name, type: 'group', caption, ...def.options })
    } else {
      const idx = code.indexOf('/')
      if (idx === -1) {
        const def = parseDef(code, lineNum)
        def.caption = def.name
        defs.push(prev = def)
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

export const parseOne = (comment, code, line1, line2) => {
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

export const extractTextFromComment = (c) => {
  const prefix = c.substring(0, 2)
  if (prefix === '//') c = c.substring(2)
  if (prefix === '/*') c = c.substring(2, c.length - 2)

  return c.trim()
}

export const parseComment = (comment, line, paramName) => {
  comment = extractTextFromComment(comment)

  const ret = {}
  const idx = comment.indexOf('{')
  if (idx !== -1) {
    try {
      // eslint-disable-next-line
      ret.options = Function('return ' + comment.substring(idx)).call()
    } catch (e) {
      throw new EvalError(`${e.message}, parameter:${paramName}, line:${line}: ${comment.substring(idx)}`, 'code', line)
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
        // eslint-disable-next-line
        ret.initial = Function('return ' + initial).bind({}).call()
      } catch (e) {
        throw new EvalError('Error in initial value definition for"' + code + '".' + e.message, 'code', line)
      }
    }

    return ret
  }
}

export const combineParameterDefinitions = (paramDefFromSource, extraDef) => {
  const def = [...paramDefFromSource]
  if (extraDef) {
    if (typeof extraDef === 'function') extraDef = extraDef()
    extraDef.forEach((param) => {
      const idx = def.findIndex((p) => p.name === param.name)
      if (idx !== -1) def[idx] = param
      else def.push(param)
    })
  }
  return def
}
