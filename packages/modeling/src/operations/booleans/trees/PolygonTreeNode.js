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
// getPolygons() retrieves the polygons from the node. If for PolygonTreeNode the polygon is split but
// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
// getPolygons() will return the original unsplit polygon instead of the fragments.
// remove() removes a polygon from the node. Once a polygon is removed, the parent polygons are invalidated
// since they are no longer intact.
export class PolygonTreeNode {
  // constructor creates the root node
  constructor (parent, polygon) {
    this.parent = parent
    this.polygon = polygon
    this.children = []
  }

  // fill the node with polygons. Should be called on the root node only; child nodes must
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
    this.polygon = null

    // remove ourselves from the parent's children list:
    const parentschildren = this.parent.children
    const i = parentschildren.indexOf(this)
    if (i < 0) throw new Error('PolyTreeNode02')
    parentschildren.splice(i, 1)

    // invalidate the parent's polygon, and of all parents above it:
    this.parent._recursivelyInvalidatePolygon()
  }

  /*
   * Can the node be split, either base polygon or children
   */
  canSplit () {
    return (this.polygon !== null) || (this.children.length !== 0)
  }

  isRootNode () {
    return !this.parent
  }

  // invert all polygons in the node. Call on the root node
  invert () {
    if (!this.isRootNode()) throw new Error('PolyTreeNode03')
    this._invertSub()
  }

  getPolygon () {
    if (!this.polygon) throw new Error('PolyTreeNode04')
    return this.polygon
  }

  /*
   * Get all polygons from the node, and add to the result
   */
  getPolygons (result) {
    if (this.polygon) {
      // the polygon hasn't been broken yet, so return the original polygon
      result.push(this.polygon)
    } else {
      // the polygon has been split, so gather all polygons from the children
      for (let i = 0; i < this.children.length; i++) {
        const node = this.children[i]
        node.getPolygons(result)
      }
    }
  }

  // split the node by a plane, adding the resulting nodes to the frontNodes and backNodes array
  // Also see canSplit()
  splitByPlane (plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    if (this.children.length) {
      // the polygon has been split, so split the children by the given plane
      for (let i = 0; i < this.children.length; i++) {
        const node = this.children[i]
        node.splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes)
      }
    } else {
      if (this.polygon) {
        // the polygon hasn't be split, so split this node by the given plane
        this._splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes)
      }
    }
  }

  // PRIVATE
  // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
  // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
  // and added to both arrays.
  // only to be called for nodes with no children
  _splitByPlane (splane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    const bound = poly3.measureBoundingSphere(this.polygon)
    const sphereRadius = bound[3] + EPS // ensure radius is LARGER then polygon
    const d = vec3.dot(splane, bound) - splane[3]
    if (d > sphereRadius) {
      frontNodes.push(this)
    } else if (d < -sphereRadius) {
      backNodes.push(this)
    } else {
      splitPolygonByPlane(splitResult, splane, this.polygon)
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

  // add child to a node
  // this should be called whenever the polygon is split
  // a child should be created for every fragment of the split polygon
  // returns the newly created child
  addChild (polygon) {
    const newChild = new PolygonTreeNode(this, polygon)
    this.children.push(newChild)
    return newChild
  }

  // PRIVATE
  // See invert()
  _invertSub () {
    if (this.polygon) {
      this.polygon = poly3.invert(this.polygon)
    }
    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i]
      node._invertSub()
    }
  }

  // PRIVATE
  // remove the polygon from the node, and all parent nodes above it
  // called to invalidate parents of removed nodes
  _recursivelyInvalidatePolygon () {
    this.polygon = null
    if (this.parent) {
      this.parent._recursivelyInvalidatePolygon()
    }
  }

  clear () {
    // clear children
    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i]
      node.clear()
    }
    this.children.length = 0
    // unlink polygon
    if (this.polygon) {
      this.polygon = null
    }
    // unlink parent
    this.parent = null
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
