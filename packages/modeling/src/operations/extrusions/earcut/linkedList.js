const sortLinked = require('./linkedListSort')

class Node {
  constructor (i, x, y) {
    // vertex index in coordinates array
    this.i = i

    // vertex coordinates
    this.x = x
    this.y = y

    // previous and next vertex nodes in a polygon ring
    this.prev = null
    this.next = null

    // z-order curve value
    this.z = null

    // previous and next nodes in z-order
    this.prevZ = null
    this.nextZ = null

    // indicates whether this is a steiner point
    this.steiner = false
  }
}

/*
 * create a node and optionally link it with previous one (in a circular doubly linked list)
 */
const insertNode = (i, x, y, last) => {
  const p = new Node(i, x, y)

  if (!last) {
    p.prev = p
    p.next = p
  } else {
    p.next = last.next
    p.prev = last
    last.next.prev = p
    last.next = p
  }

  return p
}

/*
 * remove a node and join prev with next nodes
 */
const removeNode = (p) => {
  p.next.prev = p.prev
  p.prev.next = p.next

  if (p.prevZ) p.prevZ.nextZ = p.nextZ
  if (p.nextZ) p.nextZ.prevZ = p.prevZ
}

module.exports = { Node, insertNode, removeNode, sortLinked }
