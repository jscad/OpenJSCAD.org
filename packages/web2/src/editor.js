import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { insertHtml } from './jsx6'

export function JscadEditor (parent, parentNode, beforeSibling, attr, children) {
  const el = insertHtml(parentNode, beforeSibling, { tag: 'DIV', attr, children }, parent)
  console.log('creating editor', el)
  const startState = EditorState.create({
    doc: 'Hello World',
    extensions: [keymap.of(defaultKeymap)]
  })

  const view = new EditorView({
    state: startState,
    parent: el
  })

  return { view, startState, el }
}
