import { Node } from './Node.js'
import { PolygonTreeNode } from './PolygonTreeNode.js'

// # class Tree
// This is the root of a BSP tree.
// This separate class for the root of the tree in order to hold the PolygonTreeNode root.
// The actual tree is kept in this.rootnode
export class Tree {
  constructor (polygons) {
    this.polygonTree = new PolygonTreeNode()
    this.rootnode = new Node(null)
    if (polygons) this.addPolygons(polygons)
  }

  invert () {
    this.polygonTree.invert()
    this.rootnode.invert()
  }

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo (tree, alsoRemoveCoplanarFront = false) {
    this.rootnode.clipTo(tree, alsoRemoveCoplanarFront)
  }

  allPolygons () {
    const result = []
    this.polygonTree.getPolygons(result)
    return result
  }

  addPolygons (polygons) {
    const polygonTreeNodes = new Array(polygons.length)
    for (let i = 0; i < polygons.length; i++) {
      polygonTreeNodes[i] = this.polygonTree.addChild(polygons[i])
    }
    this.rootnode.addPolygonTreeNodes(polygonTreeNodes)
  }

  clear () {
    this.polygonTree.clear()
  }

  toString () {
    return 'Tree: ' + this.polygonTree.toString('')
  }
}
