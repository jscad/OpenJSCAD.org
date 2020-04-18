const { EPS } = require('../../../math/constants')

const vec3 = require('../../../math/vec3')

const poly3 = require('../../../geometry/poly3')

const splitPolygonByPlane = require('./splitPolygonByPlane')

// # class PolygonTreeNode
// This class manages hierarchical splits of polygons
// At the top is a root node which doesn hold a polygon, only child PolygonTreeNodes
// Below that are zero or more 'top' nodes; each holds a polygon. The polygons can be in different planes
// splitByPlane() splits a node by a plane. If the plane intersects the polygon, two new child nodes
// are created holding the splitted polygon.
// getPolygons() retrieves the polygon from the tree. If for PolygonTreeNode the polygon is split but
// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
//  getPolygons() will return the original unsplit polygon instead of the fragments.
// remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
// since they are no longer intact.
// constructor creates the root node:
const PolygonTreeNode = function () {
  this.parent = null
  this.children = []
  this.polygon = null
  this.removed = false
}

PolygonTreeNode.prototype = {
  // fill the tree with polygons. Should be called on the root node only; child nodes must
  // always be a derivate (split) of the parent node.
  addPolygons: function (polygons) {
    // new polygons can only be added to root node; children can only be splitted polygons
    if (!this.isRootNode()) {
      throw new Error('Assertion failed')
    }
    let _this = this
    polygons.forEach(function (polygon) {
      _this.addChild(polygon)
    })
  },

  // remove a node
  // - the siblings become toplevel nodes
  // - the parent is removed recursively
  remove: function () {
    if (!this.removed) {
      this.removed = true

      // remove ourselves from the parent's children list:
      let parentschildren = this.parent.children
      let i = parentschildren.indexOf(this)
      if (i < 0) throw new Error('Assertion failed')
      parentschildren.splice(i, 1)

      // invalidate the parent's polygon, and of all parents above it:
      this.parent.recursivelyInvalidatePolygon()
    }
  },

  isRemoved: function () {
    return this.removed
  },

  isRootNode: function () {
    return !this.parent
  },

  // invert all polygons in the tree. Call on the root node
  invert: function () {
    if (!this.isRootNode()) throw new Error('Assertion failed') // can only call this on the root node
    this.invertSub()
  },

  getPolygon: function () {
    if (!this.polygon) throw new Error('Assertion failed') // doesn't have a polygon, which means that it has been broken down
    return this.polygon
  },

  getPolygons: function (result) {
    let children = [this]
    let queue = [children]
    let i, j, l, node
    for (i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i]
      for (j = 0, l = children.length; j < l; j++) { // ok to cache length
        node = children[j]
        if (node.polygon) {
          // the polygon hasn't been broken yet. We can ignore the children and return our polygon:
          result.push(node.polygon)
        } else {
          // our polygon has been split up and broken, so gather all subpolygons from the children
          if (node.children.length > 0) queue.push(node.children)
        }
      }
    }
  },

  // split the node by a plane; add the resulting nodes to the frontnodes and backnodes array
  // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
  // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
  //  and added to both arrays.
  splitByPlane: function (plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
    if (this.children.length) {
      let queue = [this.children]
      let i
      let j
      let l
      let node
      let nodes
      for (i = 0; i < queue.length; i++) { // queue.length can increase, do not cache
        nodes = queue[i]
        for (j = 0, l = nodes.length; j < l; j++) { // ok to cache length
          node = nodes[j]
          if (node.children.length > 0) {
            queue.push(node.children)
          } else {
            // no children. Split the polygon:
            node._splitByPlane(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes)
          }
        }
      }
    } else {
      this._splitByPlane(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes)
    }
  },

  // only to be called for nodes with no children
  _splitByPlane: function (splane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
    let polygon = this.polygon
    if (polygon) {
      let bound = poly3.measureBoundingSphere(polygon)
      let sphereradius = bound[1] + EPS // ensure radius is LARGER then polygon
      let spherecenter = bound[0]
      let d = vec3.dot(splane, spherecenter) - splane[3]
      if (d > sphereradius) {
        frontnodes.push(this)
      } else if (d < -sphereradius) {
        backnodes.push(this)
      } else {
        let splitresult = splitPolygonByPlane(splane, polygon)
        switch (splitresult.type) {
          case 0:
            // coplanar front:
            coplanarfrontnodes.push(this)
            break

          case 1:
            // coplanar back:
            coplanarbacknodes.push(this)
            break

          case 2:
            // front:
            frontnodes.push(this)
            break

          case 3:
            // back:
            backnodes.push(this)
            break

          case 4:
            // spanning:
            if (splitresult.front) {
              let frontnode = this.addChild(splitresult.front)
              frontnodes.push(frontnode)
            }
            if (splitresult.back) {
              let backnode = this.addChild(splitresult.back)
              backnodes.push(backnode)
            }
            break
        }
      }
    }
  },

  // PRIVATE methods from here:
  // add child to a node
  // this should be called whenever the polygon is split
  // a child should be created for every fragment of the split polygon
  // returns the newly created child
  addChild: function (polygon) {
    let newchild = new PolygonTreeNode()
    newchild.parent = this
    newchild.polygon = polygon
    this.children.push(newchild)
    return newchild
  },

  invertSub: function () {
    let children = [this]
    let queue = [children]
    let i, j, l, node
    for (i = 0; i < queue.length; i++) {
      children = queue[i]
      for (j = 0, l = children.length; j < l; j++) {
        node = children[j]
        if (node.polygon) {
          node.polygon = poly3.flip(node.polygon)
        }
        if (node.children.length > 0) queue.push(node.children)
      }
    }
  },

  recursivelyInvalidatePolygon: function () {
    let node = this
    while (node.polygon) {
      node.polygon = null
      if (node.parent) {
        node = node.parent
      }
    }
  },

  clear: function () {
    let children = [this]
    let queue = [children]
    let l
    for (let i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i]
      let l = children.length
      for (let j = 0; j < l; j++) {
        let node = children[j]
        if (node.polygon) {
          node.polygon = null
        }
        if (node.parent) {
          node.parent = null
        }
        if (node.children.length > 0) queue.push(node.children)
        node.children = []
      }
    }
  },

  toString: function () {
    let result = ''
    let children = [this]
    let queue = [children]
    let i, j, l, node
    for (i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i]
      let prefix = ' '.repeat(i)
      for (j = 0, l = children.length; j < l; j++) { // ok to cache length
        node = children[j]
        result += `${prefix}PolygonTreeNode (${node.isRootNode()}): ${node.children.length}`
        if (node.polygon) {
          result += `\n ${prefix}poly3\n`
        } else {
          result += '\n'
        }
        if (node.children.length > 0) queue.push(node.children)
      }
    }
    return result
  }
}

module.exports = PolygonTreeNode
