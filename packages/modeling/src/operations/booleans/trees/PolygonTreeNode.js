import { EPS } from '../../../maths/constants.js'

import * as vec3 from '../../../maths/vec3/index.js'

import * as poly3 from '../../../geometries/poly3/index.js'

import { splitPolygonByPlane } from './splitPolygonByPlane.js'

// cached values to boost performance
const splitResult = { type: 0, front: null, back: null }

// # class PolygonTreeNode
// This class manages hierarchical splits of polygons.
// At the top is a root node which does not hold a polygon, only child PolygonTreeNodes.
// Below that are zero or more 'top' nodes; each holds a polygon.
// The polygons can be in different planes.
// splitByPlane() splits a node by a plane. If the plane intersects the polygon,
// two new child nodes are created holding the split polygon.
// getPolygons() retrieves the polygons from the tree. If for PolygonTreeNode the polygon is split but
// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
// getPolygons() will return the original unsplit polygon instead of the fragments.
// remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
// since they are no longer intact.
export class PolygonTreeNode {
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
    // new polygons can only be added to root node; children can only be split polygons
    if (!this.isRootNode()) throw new Error('PolygonTreeNode01')
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
      if (i < 0) throw new Error('PolyTreeNode02')
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
    if (!this.isRootNode()) throw new Error('PolyTreeNode03')
    this.invertSub()
  }

  getPolygon () {
    if (!this.polygon) throw new Error('PolyTreeNode04')
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
          // the polygon hasn't been broken yet. We can ignore the children and return our polygon
          result.push(node.polygon)
        } else {
          // our polygon has been split up and broken, so gather all subpolygons from the children
          if (node.children.length > 0) queue.push(node.children)
        }
      }
    }
  }

  // split the node by a plane; add the resulting nodes to the frontNodes and backNodes array
  // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
  // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
  //  and added to both arrays.
  splitByPlane (plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    if (this.children.length) {
      const queue = [this.children]
      let i
      let j
      let l
      let node
      for (i = 0; i < queue.length; i++) { // queue.length can increase, do not cache
        const children = queue[i]
        for (j = 0, l = children.length; j < l; j++) { // ok to cache length
          node = children[j]
          if (node.children.length) {
            // more children so add to the queue
            queue.push(node.children)
          } else {
            // no children so split the current node (leaf) by the given plane
            node._splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes)
          }
        }
      }
    } else {
      // no children, so split this node (leaf) by the given plane
      this._splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes)
    }
  }

  // only to be called for nodes with no children
  _splitByPlane (splane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    const polygon = this.polygon
    if (polygon) {
      const bound = poly3.measureBoundingSphere(polygon)
      const sphereRadius = bound[3] + EPS // ensure radius is LARGER then polygon
      const d = vec3.dot(splane, bound) - splane[3]
      if (d > sphereRadius) {
        frontNodes.push(this)
      } else if (d < -sphereRadius) {
        backNodes.push(this)
      } else {
        splitPolygonByPlane(splitResult, splane, polygon)
        switch (splitResult.type) {
          case 0:
            // coplanar front:
            coplanarFrontNodes.push(this)
            break

          case 1:
            // coplanar back:
            coplanarBackNodes.push(this)
            break

          case 2:
            // front:
            frontNodes.push(this)
            break

          case 3:
            // back:
            backNodes.push(this)
            break

          case 4:
            // spanning:
            if (splitResult.front) {
              const frontNode = this.addChild(splitResult.front)
              frontNodes.push(frontNode)
            }
            if (splitResult.back) {
              const backNode = this.addChild(splitResult.back)
              backNodes.push(backNode)
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
    const newChild = new PolygonTreeNode(this, polygon)
    this.children.push(newChild)
    return newChild
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
