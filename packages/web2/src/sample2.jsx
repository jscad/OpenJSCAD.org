import { h, Jsx6 } from './jsx6'

let seq = 1
class Editor extends Jsx6 {
  tpl () {
    return 'editor'+seq++
  }
}

function toArray(obj){
  let out = []
  if(obj){
    for(let p in obj) out.push(obj[p])
  }

  return out
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
    this.editor.setAttribute('name', 'jozo1')
    this.editorsGroup.a.setAttribute('name', 'jozo2')
    this.editorsGroup.b.setAttribute('name', 'jozo3')
    this.editor4.setAttribute('name', 'jozo4')
    this.editor5.setAttribute('name', 'jozo5')
    this.editor6.setAttribute('name', 'jozo6')
  }

  tpl (h, state, $) {
    return <b onclick={() => state.counter++}>
      Sample {() => state.counter} / 
      {this.editor}
      {toArray(this.editorsGroup)}
      <Editor p='editor4' tag-name='SPAN' />
      {this.editor5 = new Editor()}
      {this.editor6 = new Editor(<b class='bla'/>)}
      </b>
  }
}
