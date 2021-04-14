const Node = require('./Node')
const PolygonTreeNode = require('./PolygonTreeNode')

// # class Tree
// This is the root of a BSP tree
// We are using this separate class for the root of the tree, to hold the PolygonTreeNode root
// The actual tree is kept in this.rootnode
const Tree = function (polygons) {
  this.polygonTree = new PolygonTreeNode()
  this.rootnode = new Node(null)
  if (polygons) this.addPolygons(polygons)
}

Tree.prototype = {
  invert: function () {
    this.polygonTree.invert()
    this.rootnode.invert()
  },

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo: function (tree, alsoRemovecoplanarFront) {
    alsoRemovecoplanarFront = !!alsoRemovecoplanarFront
    this.rootnode.clipTo(tree, alsoRemovecoplanarFront)
  },

  allPolygons: function () {
    const result = []
    this.polygonTree.getPolygons(result)
    return result
  },

  addPolygons: function (polygons) {
    const polygontreenodes = new Array(polygons.length)
    for (let i = 0; i < polygons.length; i++) {
      polygontreenodes[i] = this.polygonTree.addChild(polygons[i])
    }
    this.rootnode.addPolygonTreeNodes(polygontreenodes)
  },

  clear: function () {
    this.polygonTree.clear()
  },

  toString: function () {
    const result = 'Tree: ' + this.polygonTree.toString('')
    return result
  }
}

module.exports = Tree
