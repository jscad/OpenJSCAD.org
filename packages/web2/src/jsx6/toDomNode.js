export function toDomNode (n) {
  return (n && n instanceof Element) ? n : n.el
}
