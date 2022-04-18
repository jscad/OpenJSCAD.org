const plane = require('../../../maths/plane')
const poly3 = require('../../../geometries/poly3')

// # class Node
// Holds a node in a BSP tree.
// A BSP tree is built from a collection of polygons by picking a polygon to split along.
// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in this.polygontreenodes.
// Those PolygonTreeNodes are children of the owning Tree.polygonTree.
// This is not a leafy BSP tree since there is no distinction between internal and leaf nodes.
class Node {
  constructor (parent) {
    this.plane = null
    this.front = null
    this.back = null
    this.polygontreenodes = []
    this.parent = parent
  }

  // Convert solid space to empty space and empty space to solid space.
  invert () {
    const queue = [this]
    let node
    for (let i = 0; i < queue.length; i++) {
      node = queue[i]
      if (node.plane) node.plane = plane.flip(plane.create(), node.plane)
      if (node.front) queue.push(node.front)
      if (node.back) queue.push(node.back)
      const temp = node.front
      node.front = node.back
      node.back = temp
    }
  }

  // clip polygontreenodes to our plane
  // calls remove() for all clipped PolygonTreeNodes
  clipPolygons (polygontreenodes, alsoRemovecoplanarFront) {
    let current = { node: this, polygontreenodes: polygontreenodes }
    let node
    const stack = []

    do {
      node = current.node
      polygontreenodes = current.polygontreenodes

      if (node.plane) {
        const plane = node.plane

        const backnodes = []
        const frontnodes = []
        const coplanarfrontnodes = alsoRemovecoplanarFront ? backnodes : frontnodes
        const numpolygontreenodes = polygontreenodes.length
        for (let i = 0; i < numpolygontreenodes; i++) {
          const treenode = polygontreenodes[i]
          if (!treenode.isRemoved()) {
            // split this polygon tree node using the plane
            // NOTE: children are added to the tree if there are spanning polygons
            treenode.splitByPlane(plane, coplanarfrontnodes, backnodes, frontnodes, backnodes)
          }
        }

        if (node.front && (frontnodes.length > 0)) {
          // add front node for further splitting
          stack.push({ node: node.front, polygontreenodes: frontnodes })
        }
        const numbacknodes = backnodes.length
        if (node.back && (numbacknodes > 0)) {
          // add back node for further splitting
          stack.push({ node: node.back, polygontreenodes: backnodes })
        } else {
          // remove all back nodes from processing
          for (let i = 0; i < numbacknodes; i++) {
            backnodes[i].remove()
          }
        }
      }
      current = stack.pop()
    } while (current !== undefined)
  }

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo (tree, alsoRemovecoplanarFront) {
    let node = this
    const stack = []
    do {
      if (node.polygontreenodes.length > 0) {
        tree.rootnode.clipPolygons(node.polygontreenodes, alsoRemovecoplanarFront)
      }
      if (node.front) stack.push(node.front)
      if (node.back) stack.push(node.back)
      node = stack.pop()
    } while (node !== undefined)
  }

  addPolygonTreeNodes (newpolygontreenodes) {
    let current = { node: this, polygontreenodes: newpolygontreenodes }
    const stack = []
    do {
      const node = current.node
      const polygontreenodes = current.polygontreenodes

      if (polygontreenodes.length === 0) {
        current = stack.pop()
        continue
      }
      if (!node.plane) {
        let index = 0 // default
        index = Math.floor(polygontreenodes.length / 2)
        // index = polygontreenodes.length >> 1
        // index = Math.floor(Math.random()*polygontreenodes.length)
        const bestpoly = polygontreenodes[index].getPolygon()
        node.plane = poly3.plane(bestpoly)
      }
      const frontnodes = []
      const backnodes = []
      const n = polygontreenodes.length
      for (let i = 0; i < n; ++i) {
        polygontreenodes[i].splitByPlane(node.plane, node.polygontreenodes, backnodes, frontnodes, backnodes)
      }

      if (frontnodes.length > 0) {
        if (!node.front) node.front = new Node(node)

        // unable to split by any of the current nodes
        const stopCondition = n === frontnodes.length && backnodes.length === 0
        if (stopCondition) node.front.polygontreenodes = frontnodes
        else stack.push({ node: node.front, polygontreenodes: frontnodes })
      }
      if (backnodes.length > 0) {
        if (!node.back) node.back = new Node(node)

        // unable to split by any of the current nodes
        const stopCondition = n === backnodes.length && frontnodes.length === 0

        if (stopCondition) node.back.polygontreenodes = backnodes
        else stack.push({ node: node.back, polygontreenodes: backnodes })
      }

      current = stack.pop()
    } while (current !== undefined)
  }
}

module.exports = Node
