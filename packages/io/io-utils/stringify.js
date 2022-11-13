/*
 * Originally from OMNL library by @drom
 * License MIT
 */
const isObject = (o) => o && Object.prototype.toString.call(o) === '[object Object]'

const indenter = (indentation) => {
  if (!(indentation > 0)) {
    return (txt) => txt
  }
  const space = ' '.repeat(indentation)
  return (txt) => {
    if (typeof txt !== 'string') {
      return txt
    }

    const arr = txt.split('\n')

    if (arr.length === 1) {
      return space + txt
    }

    return arr
      .map((e) => (e.trim() === '') ? e : space + e)
      .join('\n')
  }
}

const clean = (txt) => txt
  .split('\n')
  .filter((e) => e.trim() !== '')
  .join('\n')

export const stringify = (a, indentation) => {
  const cr = (indentation > 0) ? '\n' : ''
  const indent = indenter(indentation)

  const rec = (a) => {
    let body = ''
    let isFlat = true

    let res
    const isEmpty = a.some((e, i, arr) => {
      if (i === 0) {
        res = '<' + e
        return (arr.length === 1)
      }

      if (i === 1) {
        if (isObject(e)) {
          Object.keys(e).forEach((key) => {
            let val = e[key]
            if (Array.isArray(val)) {
              val = val.join(' ')
            }
            res += ' ' + key + '="' + val + '"'
          })
          if (arr.length === 2) {
            return true
          }
          res += '>'
          return false
        }
        res += '>'
      }

      switch (typeof e) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'undefined':
          body += e + cr
          return false
      }

      isFlat = false
      body += rec(e)
      return false
    })

    if (isEmpty) {
      return res + '/>' + cr // short form
    }

    return isFlat
      ? res + clean(body) + '</' + a[0] + '>' + cr
      : res + cr + indent(body) + '</' + a[0] + '>' + cr
  }

  return rec(a)
}

export default stringify
