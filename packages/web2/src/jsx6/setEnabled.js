import setAttrBoolean from './setAttrBoolean'

export default function setEnabled (obj, sel) {
  setAttrBoolean(obj, 'disabled', !sel)
}
