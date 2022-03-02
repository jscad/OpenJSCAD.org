
const addParents = (ast, key) => {
  walk(ast, key || '$parent')
  return ast
}

const walk = (node, keyname, parent) => {
  if (parent) {
    Object.defineProperty(node, keyname, {
      value: parent,
      configurable: true,
      enumerable: false,
      writable: true
    })
  }

  for (const key in node) {
    if (key === 'parent') continue
    if (!Object.prototype.hasOwnProperty.call(node, key)) continue

    const child = node[key]
    if (Array.isArray(child)) {
      const l = child.length

      for (let i = 0; i < l; i++) {
        if (child[i] && child[i].type) { walk(child[i], keyname, node) }
      }
    } else
    if (child && child.type) {
      walk(child, keyname, node)
    }
  }
}

module.exports = addParents
