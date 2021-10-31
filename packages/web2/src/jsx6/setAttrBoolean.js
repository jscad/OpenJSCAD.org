export default function setAttrBoolean (obj, attr, sel) {
  if (obj instanceof HTMLElement) {
    if (sel) obj.setAttribute(attr, attr)
    else obj.removeAttribute(attr)
  } else if (obj && typeof obj === 'object') {
    for (const p in obj) {
      setAttrBoolean(obj[p], attr, p === sel)
    }
  }
}
