/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

class VertexList {
  constructor () {
    this.head = null
    this.tail = null
  }

  clear () {
    this.head = this.tail = null
  }

  /**
   * Inserts a `node` before `target`, it's assumed that
   * `target` belongs to this doubly linked list
   *
   * @param {*} target
   * @param {*} node
   */
  insertBefore (target, node) {
    node.prev = target.prev
    node.next = target
    if (!node.prev) {
      this.head = node
    } else {
      node.prev.next = node
    }
    target.prev = node
  }

  /**
   * Inserts a `node` after `target`, it's assumed that
   * `target` belongs to this doubly linked list
   *
   * @param {Vertex} target
   * @param {Vertex} node
   */
  insertAfter (target, node) {
    node.prev = target
    node.next = target.next
    if (!node.next) {
      this.tail = node
    } else {
      node.next.prev = node
    }
    target.next = node
  }

  /**
   * Appends a `node` to the end of this doubly linked list
   * Note: `node.next` will be unlinked from `node`
   * Note: if `node` is part of another linked list call `addAll` instead
   *
   * @param {*} node
   */
  add (node) {
    if (!this.head) {
      this.head = node
    } else {
      this.tail.next = node
    }
    node.prev = this.tail
    // since node is the new end it doesn't have a next node
    node.next = null
    this.tail = node
  }

  /**
   * Appends a chain of nodes where `node` is the head,
   * the difference with `add` is that it correctly sets the position
   * of the node list `tail` property
   *
   * @param {*} node
   */
  addAll (node) {
    if (!this.head) {
      this.head = node
    } else {
      this.tail.next = node
    }
    node.prev = this.tail

    // find the end of the list
    while (node.next) {
      node = node.next
    }
    this.tail = node
  }

  /**
   * Deletes a `node` from this linked list, it's assumed that `node` is a
   * member of this linked list
   *
   * @param {*} node
   */
  remove (node) {
    if (!node.prev) {
      this.head = node.next
    } else {
      node.prev.next = node.next
    }

    if (!node.next) {
      this.tail = node.prev
    } else {
      node.next.prev = node.prev
    }
  }

  /**
   * Removes a chain of nodes whose head is `a` and whose tail is `b`,
   * it's assumed that `a` and `b` belong to this list and also that `a`
   * comes before `b` in the linked list
   *
   * @param {*} a
   * @param {*} b
   */
  removeChain (a, b) {
    if (!a.prev) {
      this.head = b.next
    } else {
      a.prev.next = b.next
    }

    if (!b.next) {
      this.tail = a.prev
    } else {
      b.next.prev = a.prev
    }
  }

  first () {
    return this.head
  }

  isEmpty () {
    return !this.head
  }
}

module.exports = VertexList
