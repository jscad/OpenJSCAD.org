import { Jsx6 } from './core'

export function toDomNode (n) {
  return (n && n instanceof Jsx6) ? n.el : n
}
