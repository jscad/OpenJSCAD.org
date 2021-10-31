export default function setAttrBoolean (obj, attr, sel) {
  if(obj){
    if (obj.setAttribute) {
      if (sel) 
        obj.setAttribute(attr, attr)
      else 
        obj.removeAttribute(attr)
    } else if (typeof obj === 'object') {
      for (const p in obj) {
        setAttrBoolean(obj[p], attr, p === sel)
      }
    }
  }
}
