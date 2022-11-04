import {h, copyBinding } from '@jsx6/jsx6'

export default function Toggle (attr, children, parent) {
  if(!children?.length) children = <span/>

  const valueBinding = copyBinding(attr,'selected', {keep:true, required: true})
  const out = <button {...attr}>{children}</button>

  out.onclick = e => {
    valueBinding(!valueBinding())
  }

  return out
}
