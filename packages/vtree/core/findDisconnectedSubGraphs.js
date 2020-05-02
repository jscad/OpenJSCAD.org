/** finds all the disconnected sub graphs inside of a tree: ie if
 * the script on which the tree is based returns arrays of data will return those
 * @param  {} root 'findDisconnectedSubGraphs'
 */
const findDisconnectedSubGraphs = root => {
  // console.log('findDisconnectedSubGraphs')
  if (Array.isArray(root)) {
    root = { children: root, type: 'root' }
  }

  let stack = []
  let leafs = []
  let subTrees = []
  dfs(root, stack, leafs, subTrees)

  // const independantSubtree = root.children
  // console.log('results subTrees', JSON.stringify(subTrees[0]))
  return subTrees[0]
}

const dfs = (node, stack = [], leafs = [], subTrees, depth = 0) => {
  // console.log('visiting DOWN', node)
  // node.visited = true
  stack.push(node)
  if (!node.children || node.children.length === 0) {
    stack.pop(node)
    leafs.push(node)
  }
  if (node.children) {
    node.children.forEach(function (childNode) {
      // childNode.parent = node
      dfs(childNode, stack, leafs)
    })
  }
  // going up
  node.visited = true
  // essential !
  if (node.children && (node.type === 'root' || !node.type)) {
    subTrees.push(node.children)
  }

  // subTrees[node.type].parent =
  // console.log('visiting UP', node)
}

module.exports = findDisconnectedSubGraphs
