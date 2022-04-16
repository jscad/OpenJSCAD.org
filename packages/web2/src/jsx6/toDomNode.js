export function toDomNode (n) {
  return n && n.isJsx6 ? n.el : n
}
