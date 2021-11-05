import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { Jsx6 } from './jsx6'

export class JscadEditor extends Jsx6 {
  init () {
    const startState = EditorState.create({
      doc: 'Hello World',
      extensions: [keymap.of(defaultKeymap)]
    })
    this.view = new EditorView({
      state: startState,
      parent: this.el
    })
  }
}
