import * as plane from '../../../maths/plane/index.js'

import * as poly3 from '../../../geometries/poly3/index.js'

// # class Node
// Holds a node in a BSP tree.
// A BSP tree is built from a collection of polygons by picking a polygon to split along.
// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in this.polygontreenodes.
// Those PolygonTreeNodes are children of the owning Tree.polygonTree.
// This is not a leafy BSP tree since there is no distinction between internal and leaf nodes.
export class Node {
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
  clipPolygons (polygonTreeNodes, alsoRemoveCoplanarFront) {
    let current = { node: this, polygonTreeNodes }
    let node
    const stack = []

    do {
      node = current.node
      polygonTreeNodes = current.polygonTreeNodes

      if (node.plane) {
        const plane = node.plane

        const backNodes = []
        const frontNodes = []
        const coplanarFrontNodes = alsoRemoveCoplanarFront ? backNodes : frontNodes
        polygonTreeNodes.forEach((treeNode) => {
          if (treeNode.canSplit()) {
            // split this polygon tree node using the plane
            // NOTE: children are added to the tree if there are spanning polygons
            treeNode.splitByPlane(plane, coplanarFrontNodes, backNodes, frontNodes, backNodes)
          }
        })

        if (node.front && (frontNodes.length > 0)) {
          // add front node for further splitting
          stack.push({ node: node.front, polygonTreeNodes: frontNodes })
        }
        const numBackNodes = backNodes.length
        if (node.back && (numBackNodes > 0)) {
          // add back node for further splitting
          stack.push({ node: node.back, polygonTreeNodes: backNodes })
        } else {
          // remove all back nodes from processing
          for (let i = 0; i < numBackNodes; i++) {
            backNodes[i].remove()
          }
        }
      }
      current = stack.pop()
    } while (current !== undefined)
  }

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo (tree, alsoRemoveCoplanarFront) {
    let node = this
    const stack = []
    do {
      if (node.polygontreenodes.length > 0) {
        tree.rootnode.clipPolygons(node.polygontreenodes, alsoRemoveCoplanarFront)
      }
      if (node.front) stack.push(node.front)
      if (node.back) stack.push(node.back)
      node = stack.pop()
    } while (node !== undefined)
  }

  addPolygonTreeNodes (newPolygonTreeNodes) {
    let current = { node: this, polygonTreeNodes: newPolygonTreeNodes }
    const stack = []
    do {
      const node = current.node
      const polygonTreeNodes = current.polygonTreeNodes
      const len = polygonTreeNodes.length

      if (len === 0) {
        current = stack.pop()
        continue
      }
      if (!node.plane) {
        let index = 0 // default
        index = Math.floor(len / 2)
        // index = len >> 1
        // index = Math.floor(Math.random() * len)
        const bestPoly = polygonTreeNodes[index].getPolygon()
        node.plane = poly3.plane(bestPoly)
      }
      const frontNodes = []
      const backNodes = []
      for (let i = 0; i < len; ++i) {
        polygonTreeNodes[i].splitByPlane(node.plane, node.polygontreenodes, backNodes, frontNodes, backNodes)
      }

      if (frontNodes.length > 0) {
        if (!node.front) node.front = new Node(node)

        // unable to split by any of the current nodes
        const stopCondition = len === frontNodes.length && backNodes.length === 0

        if (stopCondition) node.front.polygontreenodes = frontNodes
        else stack.push({ node: node.front, polygonTreeNodes: frontNodes })
      }
      if (backNodes.length > 0) {
        if (!node.back) node.back = new Node(node)

        // unable to split by any of the current nodes
        const stopCondition = len === backNodes.length && frontNodes.length === 0

        if (stopCondition) node.back.polygontreenodes = backNodes
        else stack.push({ node: node.back, polygonTreeNodes: backNodes })
      }

      current = stack.pop()
    } while (current !== undefined)
  }
}
