/* follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 */

const DEFAULT_COMPARE = (a, b) => a > b ? 1 : a < b ? -1 : 0

class Node {
  constructor (key, data) {
    this.key = key
    this.data = data
    this.left = null
    this.right = null
    this.next = null
  }
}

/**
 * Simple top down splay, not requiring i to be in the tree t.
 */
const splay = (i, t, comparator) => {
  const N = new Node(null, null)
  let l = N
  let r = N

  while (true) {
    const cmp = comparator(i, t.key)
    // if (i < t.key) {
    if (cmp < 0) {
      if (t.left === null) break
      // if (i < t.left.key) {
      if (comparator(i, t.left.key) < 0) {
        const y = t.left /* rotate right */
        t.left = y.right
        y.right = t
        t = y
        if (t.left === null) break
      }
      r.left = t /* link right */
      r = t
      t = t.left
    // } else if (i > t.key) {
    } else if (cmp > 0) {
      if (t.right === null) break
      // if (i > t.right.key) {
      if (comparator(i, t.right.key) > 0) {
        const y = t.right /* rotate left */
        t.right = y.left
        y.left = t
        t = y
        if (t.right === null) break
      }
      l.right = t /* link left */
      l = t
      t = t.right
    } else break
  }
  /* assemble */
  l.right = t.left
  r.left = t.right
  t.left = N.right
  t.right = N.left
  return t
}

const insert = (i, data, t, comparator) => {
  const node = new Node(i, data)

  if (t === null) {
    node.left = node.right = null
    return node
  }

  t = splay(i, t, comparator)
  const cmp = comparator(i, t.key)
  if (cmp < 0) {
    node.left = t.left
    node.right = t
    t.left = null
  } else if (cmp >= 0) {
    node.right = t.right
    node.left = t
    t.right = null
  }
  return node
}

const split = (key, v, comparator) => {
  let left = null
  let right = null
  if (v) {
    v = splay(key, v, comparator)

    const cmp = comparator(v.key, key)
    if (cmp === 0) {
      left = v.left
      right = v.right
    } else if (cmp < 0) {
      right = v.right
      v.right = null
      left = v
    } else {
      left = v.left
      v.left = null
      right = v
    }
  }
  return { left, right }
}

const merge = (left, right, comparator) => {
  if (right === null) return left
  if (left === null) return right

  right = splay(left.key, right, comparator)
  right.left = left
  return right
}

/**
 * Prints level of the tree
 */
const printRow = (root, prefix, isTail, out, printNode) => {
  if (root) {
    out(`${prefix}${isTail ? '└── ' : '├── '}${printNode(root)}\n`)
    const indent = prefix + (isTail ? '    ' : '│   ')
    if (root.left) printRow(root.left, indent, false, out, printNode)
    if (root.right) printRow(root.right, indent, true, out, printNode)
  }
}

export default class Tree {
  constructor (comparator = DEFAULT_COMPARE) {
    this._comparator = comparator
    this._root = null
    this._size = 0
  }

  /**
   * Inserts a key, allows duplicates
   */
  insert (key, data) {
    this._size++
    return this._root = insert(key, data, this._root, this._comparator)
  }

  /**
   * Adds a key, if it is not present in the tree
   */
  add (key, data) {
    const node = new Node(key, data)

    if (this._root === null) {
      node.left = node.right = null
      this._size++
      this._root = node
    }

    const comparator = this._comparator
    const t = splay(key, this._root, comparator)
    const cmp = comparator(key, t.key)
    if (cmp === 0) this._root = t
    else {
      if (cmp < 0) {
        node.left = t.left
        node.right = t
        t.left = null
      } else if (cmp > 0) {
        node.right = t.right
        node.left = t
        t.right = null
      }
      this._size++
      this._root = node
    }

    return this._root
  }

  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  remove (key) {
    this._root = this._remove(key, this._root, this._comparator)
  }

  /**
   * Deletes i from the tree if it's there
   */
  _remove (i, t, comparator) {
    let x
    if (t === null) return null
    t = splay(i, t, comparator)
    const cmp = comparator(i, t.key)
    if (cmp === 0) { /* found it */
      if (t.left === null) {
        x = t.right
      } else {
        x = splay(i, t.left, comparator)
        x.right = t.right
      }
      this._size--
      return x
    }
    return t /* It wasn't there */
  }

  /**
   * Removes and returns the node with smallest key
   */
  pop () {
    let node = this._root
    if (node) {
      while (node.left) node = node.left
      this._root = splay(node.key, this._root, this._comparator)
      this._root = this._remove(node.key, this._root, this._comparator)
      return { key: node.key, data: node.data }
    }
    return null
  }

  /**
   * Find without splaying
   */
  findStatic (key) {
    let current = this._root
    const compare = this._comparator
    while (current) {
      const cmp = compare(key, current.key)
      if (cmp === 0) return current
      else if (cmp < 0) current = current.left
      else current = current.right
    }
    return null
  }

  find (key) {
    if (this._root) {
      this._root = splay(key, this._root, this._comparator)
      if (this._comparator(key, this._root.key) !== 0) return null
    }
    return this._root
  }

  contains (key) {
    let current = this._root
    const compare = this._comparator
    while (current) {
      const cmp = compare(key, current.key)
      if (cmp === 0) return true
      else if (cmp < 0) current = current.left
      else current = current.right
    }
    return false
  }

  forEach (visitor, ctx) {
    let current = this._root
    const Q = [] /* Initialize stack s */
    let done = false

    while (!done) {
      if (current !== null) {
        Q.push(current)
        current = current.left
      } else {
        if (Q.length !== 0) {
          current = Q.pop()
          visitor.call(ctx, current)

          current = current.right
        } else done = true
      }
    }
    return this
  }

  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   */
  range (low, high, fn, ctx) {
    const Q = []
    const compare = this._comparator
    let node = this._root
    let cmp

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node)
        node = node.left
      } else {
        node = Q.pop()
        cmp = compare(node.key, high)
        if (cmp > 0) {
          break
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) return this // stop if smth is returned
        }
        node = node.right
      }
    }
    return this
  }

  /**
   * Returns array of keys
   */
  keys () {
    const keys = []
    this.forEach(({ key }) => keys.push(key))
    return keys
  }

  /**
   * Returns array of all the data in the nodes
   */
  values () {
    const values = []
    this.forEach(({ data }) => values.push(data))
    return values
  }

  min () {
    if (this._root) return this.minNode(this._root).key
    return null
  }

  max () {
    if (this._root) return this.maxNode(this._root).key
    return null
  }

  minNode (t = this._root) {
    if (t) while (t.left) t = t.left
    return t
  }

  maxNode (t = this._root) {
    if (t) while (t.right) t = t.right
    return t
  }

  /**
   * Returns node at given index
   */
  at (index) {
    let current = this._root
    let done = false
    let i = 0
    const Q = []

    while (!done) {
      if (current) {
        Q.push(current)
        current = current.left
      } else {
        if (Q.length > 0) {
          current = Q.pop()
          if (i === index) return current
          i++
          current = current.right
        } else done = true
      }
    }
    return null
  }

  next (d) {
    let root = this._root
    let successor = null

    if (d.right) {
      successor = d.right
      while (successor.left) successor = successor.left
      return successor
    }

    const comparator = this._comparator
    while (root) {
      const cmp = comparator(d.key, root.key)
      if (cmp === 0) break
      else if (cmp < 0) {
        successor = root
        root = root.left
      } else root = root.right
    }

    return successor
  }

  prev (d) {
    let root = this._root
    let predecessor = null

    if (d.left !== null) {
      predecessor = d.left
      while (predecessor.right) predecessor = predecessor.right
      return predecessor
    }

    const comparator = this._comparator
    while (root) {
      const cmp = comparator(d.key, root.key)
      if (cmp === 0) break
      else if (cmp < 0) root = root.left
      else {
        predecessor = root
        root = root.right
      }
    }
    return predecessor
  }

  clear () {
    this._root = null
    this._size = 0
    return this
  }

  toList () {
    return toList(this._root)
  }

  /**
   * Bulk-load items. Both array have to be same size
   */
  load (keys, values = [], presort = false) {
    let size = keys.length
    const comparator = this._comparator

    // sort if needed
    if (presort) sort(keys, values, 0, size - 1, comparator)

    if (this._root === null) { // empty tree
      this._root = loadRecursive(keys, values, 0, size)
      this._size = size
    } else { // that re-builds the whole tree from two in-order traversals
      const mergedList = mergeLists(this.toList(), createList(keys, values), comparator)
      size = this._size + size
      this._root = sortedListToBST({ head: mergedList }, 0, size)
    }
    return this
  }

  isEmpty () { return this._root === null }

  size () { return this._size }
  root () { return this._root }

  toString (printNode = (n) => String(n.key)) {
    const out = []
    printRow(this._root, '', true, (v) => out.push(v), printNode)
    return out.join('')
  }

  update (key, newKey, newData) {
    const comparator = this._comparator
    let { left, right } = split(key, this._root, comparator)
    if (comparator(key, newKey) < 0) {
      right = insert(newKey, newData, right, comparator)
    } else {
      left = insert(newKey, newData, left, comparator)
    }
    this._root = merge(left, right, comparator)
  }

  split (key) {
    return split(key, this._root, this._comparator)
  }

  * [Symbol.iterator] () {
    let n = this.minNode()
    while (n) {
      yield n
      n = this.next(n)
    }
  }
}

const loadRecursive = (keys, values, start, end) => {
  const size = end - start
  if (size > 0) {
    const middle = start + Math.floor(size / 2)
    const key = keys[middle]
    const data = values[middle]
    const node = new Node(key, data)
    node.left = loadRecursive(keys, values, start, middle)
    node.right = loadRecursive(keys, values, middle + 1, end)
    return node
  }
  return null
}

const createList = (keys, values) => {
  const head = new Node(null, null)
  let p = head
  for (let i = 0; i < keys.length; i++) {
    p = p.next = new Node(keys[i], values[i])
  }
  p.next = null
  return head.next
}

const toList = (root) => {
  let current = root
  const Q = []
  let done = false

  const head = new Node(null, null)
  let p = head

  while (!done) {
    if (current) {
      Q.push(current)
      current = current.left
    } else {
      if (Q.length > 0) {
        current = p = p.next = Q.pop()
        current = current.right
      } else done = true
    }
  }
  p.next = null // that'll work even if the tree was empty
  return head.next
}

const sortedListToBST = (list, start, end) => {
  const size = end - start
  if (size > 0) {
    const middle = start + Math.floor(size / 2)
    const left = sortedListToBST(list, start, middle)

    const root = list.head
    root.left = left

    list.head = list.head.next

    root.right = sortedListToBST(list, middle + 1, end)
    return root
  }
  return null
}

const mergeLists = (l1, l2, compare) => {
  const head = new Node(null, null) // dummy
  let p = head

  let p1 = l1
  let p2 = l2

  while (p1 !== null && p2 !== null) {
    if (compare(p1.key, p2.key) < 0) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }

  if (p1 !== null) {
    p.next = p1
  } else if (p2 !== null) {
    p.next = p2
  }

  return head.next
}

const sort = (keys, values, left, right, compare) => {
  if (left >= right) return

  const pivot = keys[(left + right) >> 1]
  let i = left - 1
  let j = right + 1

  while (true) {
    do i++; while (compare(keys[i], pivot) < 0)
    do j--; while (compare(keys[j], pivot) > 0)
    if (i >= j) break

    let tmp = keys[i]
    keys[i] = keys[j]
    keys[j] = tmp

    tmp = values[i]
    values[i] = values[j]
    values[j] = tmp
  }

  sort(keys, values, left, j, compare)
  sort(keys, values, j + 1, right, compare)
}
