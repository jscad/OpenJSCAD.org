import { Node } from './Node.js'
import { PolygonTreeNode } from './PolygonTreeNode.js'

// # class Tree
// This is the root of a BSP tree.
// This separate class for the root of the tree in order to hold the PolygonTreeNode root.
// The actual tree is kept in this.rootnode
export class Tree {
  constructor (polygons) {
    this.polygonTree = new PolygonTreeNode(null, null)
    this.rootnode = new Node(null)
    if (polygons) this.addPolygons(polygons)
  }

  invert () {
    this.polygonTree.invert()
    this.rootnode.invert()
  }

  // Remove all polygons in this tree that are inside the given tree
  clipTo (tree, alsoRemoveCoplanarFront = false) {
    this.rootnode.clipTo(tree.rootnode, alsoRemoveCoplanarFront)
  }

  allPolygons () {
    const result = []
    this.polygonTree.getPolygons(result)
    return result
  }

  addPolygons (polygons) {
    this.polygonTree.addPolygons(polygons)
    this.rootnode.addPolygonTreeNodes(this.polygonTree.children)
  }

  clear () {
    this.polygonTree.clear()
  }

  toString () {
    return 'Tree: ' + this.polygonTree.toString('')
  }
}
