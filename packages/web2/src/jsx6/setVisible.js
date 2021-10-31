import setAttrBoolean from './setAttrBoolean'

export default function setVisible (obj, sel) {
  setAttrBoolean(obj, 'hidden', !sel)
}
