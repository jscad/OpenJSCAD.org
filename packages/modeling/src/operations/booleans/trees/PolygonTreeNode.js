const { EPS } = require('../../../maths/constants')

const vec3 = require('../../../maths/vec3')

const poly3 = require('../../../geometries/poly3')

const splitPolygonByPlane = require('./splitPolygonByPlane')

// # class PolygonTreeNode
// This class manages hierarchical splits of polygons.
// At the top is a root node which does not hold a polygon, only child PolygonTreeNodes.
// Below that are zero or more 'top' nodes; each holds a polygon.
// The polygons can be in different planes.
// splitByPlane() splits a node by a plane. If the plane intersects the polygon, two new child nodes
// are created holding the splitted polygon.
// getPolygons() retrieves the polygons from the tree. If for PolygonTreeNode the polygon is split but
// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
// getPolygons() will return the original unsplit polygon instead of the fragments.
// remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
// since they are no longer intact.
class PolygonTreeNode {
  // constructor creates the root node
  constructor (parent, polygon) {
    this.parent = parent
    this.children = []
    this.polygon = polygon
    this.removed = false // state of branch or leaf
  }

  // fill the tree with polygons. Should be called on the root node only; child nodes must
  // always be a derivate (split) of the parent node.
  addPolygons (polygons) {
    // new polygons can only be added to root node; children can only be splitted polygons
    if (!this.isRootNode()) {
      throw new Error('Assertion failed')
    }
    const _this = this
    polygons.forEach((polygon) => {
      _this.addChild(polygon)
    })
  }

  // remove a node
  // - the siblings become toplevel nodes
  // - the parent is removed recursively
  remove () {
    if (!this.removed) {
      this.removed = true
      this.polygon = null

      // remove ourselves from the parent's children list:
      const parentschildren = this.parent.children
      const i = parentschildren.indexOf(this)
      if (i < 0) throw new Error('Assertion failed')
      parentschildren.splice(i, 1)

      // invalidate the parent's polygon, and of all parents above it:
      this.parent.recursivelyInvalidatePolygon()
    }
  }

  isRemoved () {
    return this.removed
  }

  isRootNode () {
    return !this.parent
  }

  // invert all polygons in the tree. Call on the root node
  invert () {
    if (!this.isRootNode()) throw new Error('Assertion failed') // can only call this on the root node
    this.invertSub()
  }

  getPolygon () {
    if (!this.polygon) throw new Error('Assertion failed') // doesn't have a polygon, which means that it has been broken down
    return this.polygon
  }

  getPolygons (result) {
    let children = [this]
    const queue = [children]
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
  }

  // split the node by a plane; add the resulting nodes to the frontnodes and backnodes array
  // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
  // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
  //  and added to both arrays.
  splitByPlane (plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
    if (this.children.length) {
      const queue = [this.children]
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
  }

  // only to be called for nodes with no children
  _splitByPlane (splane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
    const polygon = this.polygon
    if (polygon) {
      const bound = poly3.measureBoundingSphere(polygon)
      const sphereradius = bound[3] + EPS // ensure radius is LARGER then polygon
      const spherecenter = bound
      const d = vec3.dot(splane, spherecenter) - splane[3]
      if (d > sphereradius) {
        frontnodes.push(this)
      } else if (d < -sphereradius) {
        backnodes.push(this)
      } else {
        const splitresult = splitPolygonByPlane(splane, polygon)
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
              const frontnode = this.addChild(splitresult.front)
              frontnodes.push(frontnode)
            }
            if (splitresult.back) {
              const backnode = this.addChild(splitresult.back)
              backnodes.push(backnode)
            }
            break
        }
      }
    }
  }

  // PRIVATE methods from here:
  // add child to a node
  // this should be called whenever the polygon is split
  // a child should be created for every fragment of the split polygon
  // returns the newly created child
  addChild (polygon) {
    const newchild = new PolygonTreeNode(this, polygon)
    this.children.push(newchild)
    return newchild
  }

  invertSub () {
    let children = [this]
    const queue = [children]
    let i, j, l, node
    for (i = 0; i < queue.length; i++) {
      children = queue[i]
      for (j = 0, l = children.length; j < l; j++) {
        node = children[j]
        if (node.polygon) {
          node.polygon = poly3.invert(node.polygon)
        }
        if (node.children.length > 0) queue.push(node.children)
      }
    }
  }

  // private method
  // remove the polygon from the node, and all parent nodes above it
  // called to invalidate parents of removed nodes
  recursivelyInvalidatePolygon () {
    this.polygon = null
    if (this.parent) {
      this.parent.recursivelyInvalidatePolygon()
    }
  }

  clear () {
    let children = [this]
    const queue = [children]
    for (let i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i]
      const l = children.length
      for (let j = 0; j < l; j++) {
        const node = children[j]
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
  }

  toString () {
    let result = ''
    let children = [this]
    const queue = [children]
    let i, j, l, node
    for (i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i]
      const prefix = ' '.repeat(i)
      for (j = 0, l = children.length; j < l; j++) { // ok to cache length
        node = children[j]
        result += `${prefix}PolygonTreeNode (${node.isRootNode()}): ${node.children.length}`
        if (node.polygon) {
          result += `\n ${prefix}polygon: ${node.polygon.vertices}\n`
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
