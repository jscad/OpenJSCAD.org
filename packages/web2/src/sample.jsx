import { h, t, setTranslations, insertHtml } from './jsxxx'

export default function test(){
    return <Button/>
}

function Button(parent, parentNode, before, attr, children) {
    let state = {count:0}
    let node = insertHtml(parentNode, before, <div {...attr} onclick={()=>state.count++}> {staet.count}</div>) 
}
