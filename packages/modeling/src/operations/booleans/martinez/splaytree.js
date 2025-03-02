/*
 * Follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 *
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/splay-tree
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
const splay = (key, t, comparator) => {
  const N = new Node(null, null)
  let left = N
  let right = N

  while (true) {
    const cmp = comparator(key, t.key)
    if (cmp < 0) {
      if (t.left === null) break
      if (comparator(key, t.left.key) < 0) {
        const y = t.left /* rotate right */
        t.left = y.right
        y.right = t
        t = y
        if (t.left === null) break
      }
      right.left = t /* link right */
      right = t
      t = t.left
    } else if (cmp > 0) {
      if (t.right === null) break
      if (comparator(key, t.right.key) > 0) {
        const y = t.right /* rotate left */
        t.right = y.left
        y.left = t
        t = y
        if (t.right === null) break
      }
      left.right = t /* link left */
      left = t
      t = t.right
    } else break
  }
  /* assemble */
  left.right = t.left
  right.left = t.right

  t.left = N.right
  t.right = N.left
  return t
}

const insert = (key, data, root, comparator) => {
  const node = new Node(key, data)

  if (root === null) {
    return node
  }

  root = splay(key, root, comparator)
  const cmp = comparator(key, root.key)
  if (cmp < 0) {
    node.left = root.left
    node.right = root
    root.left = null
  } else if (cmp >= 0) {
    node.right = root.right
    node.left = root
    root.right = null
  }
  return node
}

export class Tree {
  constructor (comparator = DEFAULT_COMPARE) {
    this.comparator = comparator
    this._root = null
  }

  /**
   * Inserts a key, allows duplicates
   */
  insert (key, data) {
    this._root = insert(key, data, this._root, this.comparator)
    return this._root
  }

  /**
   * @param {Key} key
   * @return {Node|null}
   */
  remove (key) {
    this._root = this._remove(key)
  }

  /**
   * Deletes i from the tree if it's there
   */
  _remove (key) {
    if (this._root === null) return null

    let x
    const t = splay(key, this._root, this.comparator)
    const cmp = this.comparator(key, t.key)
    if (cmp === 0) { /* found it */
      if (t.left === null) {
        x = t.right
      } else {
        x = splay(key, t.left, this.comparator)
        x.right = t.right
      }
      return x
    }
    return t /* It wasn't there */
  }

  find (key) {
    if (this._root) {
      this._root = splay(key, this._root, this.comparator)
      if (this.comparator(key, this._root.key) !== 0) return null
    }
    return this._root
  }

  minNode (t = this._root) {
    if (t) while (t.left) t = t.left
    return t
  }

  maxNode (t = this._root) {
    if (t) while (t.right) t = t.right
    return t
  }

  /*
   * Return next node from the given.
   */
  next (node) {
    let successor = null

    if (node.right) {
      successor = node.right
      while (successor.left) successor = successor.left
      return successor
    }

    let root = this._root
    while (root) {
      const cmp = this.comparator(node.key, root.key)
      if (cmp === 0) break

      if (cmp < 0) {
        successor = root
        root = root.left
      } else {
        root = root.right
      }
    }
    return successor
  }

  /*
   * Return previous node from the given.
   */
  prev (node) {
    let predecessor = null

    if (node.left) {
      predecessor = node.left
      while (predecessor.right) predecessor = predecessor.right
      return predecessor
    }

    let root = this._root
    while (root) {
      const cmp = this.comparator(node.key, root.key)
      if (cmp === 0) break

      if (cmp < 0) {
        root = root.left
      } else {
        predecessor = root
        root = root.right
      }
    }
    return predecessor
  }
}
