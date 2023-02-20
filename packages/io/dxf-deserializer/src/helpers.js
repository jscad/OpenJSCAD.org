import { BYBLOCK, BYLAYER } from './autocad.js'

//
// find the layer referenced by the given object
//
export const findLayer = (obj, layers) => {
  const lname = obj.lnam || '0'
  for (const layer of layers) {
    if (layer.name === lname) {
      return layer
    }
  }
  return null
}

//
// get the color number of the object, possibly looking at layer
// returns -1 if a color number was not found
//
export const getColorNumber = (obj, layers) => {
  let cn = obj.cnmb || -1
  if (cn === BYLAYER) {
    // use the color number from the layer
    cn = -1
    const layer = findLayer(obj, layers)
    if (layer !== null) {
      cn = layer.cnmb || -1
    }
  } else
  if (cn === BYBLOCK) {
    // use the color number from the block
  }
  return cn
}

const mod = (num, mod) => {
  const remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}

//
// instantiate color using the given index into the given color index
// Note: 0 > index <= length of colorindex
export const getColor = (index, colorindex) => {
  if (index < 1) { return null }

  index = mod(index, colorindex.length)
  const color = colorindex[index]
  const rgba = [color[0] / 255, color[1] / 255, color[2] / 255, color[3] / 255]
  return rgba
}
