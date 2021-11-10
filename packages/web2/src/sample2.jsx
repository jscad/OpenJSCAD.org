import { Jsx6 } from './jsx6'

class Editor extends Jsx6 {
  tpl () {
    return 'editor'
  }
}

export class Comp extends Jsx6 {
  editor = new Editor(<div class='editor' />)
  editorsGroup = { 
    a: new Editor(<div class='editor' />) ,
    b: new Editor(<div class='editor' />) ,
  }
  /** @type {Editor} */
  editor4

  init (){
    // works with intellisense
    this.editor.setAttribute('name', 'jozo')
    this.editorsGroup.a.setAttribute('name', 'jozo')
    this.editorsGroup.b.setAttribute('name', 'jozo')
    this.editor2.setAttribute('name', 'jozo')
    this.editor3.setAttribute('name', 'jozo')
    this.editor4.setAttribute('name', 'jozo')
  }

  tpl (h, state, $) {
    return <b onclick={() => state.counter++}>
      Sample {() => state.counter} / 
      {this.editor}
      {toArray(this.editorsGroup)}
      {this.editor2 = new Editor()}
      {this.editor3 = new Editor(<div class='bla'/>)}
      <Editor p='editor4'/>
      </b>
  }
}
