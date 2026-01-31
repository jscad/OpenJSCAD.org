/**
 * Color Cube
 * @category Colors
 * @skillLevel 2
 * @description looking at the different ways to specify a color
 * @tags rgb, hsl, hsv, color
 * @authors Simon Clark
 * @licence MIT License
 */

import { colorize, hslToRgb, hsvToRgb, cuboid, translate } from '@jscad/modeling'

const getTranslation = (x, y, z, steps) => {
  const spacing = 4
  return [
    (x - steps / 2) * spacing,
    (y - steps / 2) * spacing,
    (z - steps / 2) * spacing
  ]
}

const getColor = (a, b, c, method) => {
  if (method === 'hsl') return hslToRgb(a, b, c)
  else if (method === 'hsv') return hsvToRgb(a, b, c)
  else return [a, b, c]
}

/**
 * Creates a 9x9x9 cube showing color variations on the the 3 main spectra (rgb, hsv, hsl)
 * @param {String} params.method - The spectrum function to use: 'rgb'|'hsv'|'hsl'
 * @returns {[geometry]}
 */
export const main = (params) => {
  const o = []
  const rows = 8
  for (let ix = 0; ix <= rows; ix++) {
    for (let iy = 0; iy <= rows; iy++) {
      for (let iz = 0; iz <= rows; iz++) {
        const cube = translate(getTranslation(ix, iy, iz, rows), cuboid([1, 1, 1]))
        const color = getColor(ix / rows, iy / rows, iz / rows, params.method)
        o.push(colorize(color, cube))
      }
    }
  }
  return o
}

export const getParameterDefinitions = () => [
  {
    name: 'method',
    type: 'choice',
    caption: 'Colorize Method',
    values: ['rgb', 'hsv', 'hsl'],
    captions: ['(r,g,b) = (x,y,z)', '(h,s,v) = (x,y,z)', '(h,s,l) = (x,y,z)'],
    initial: 'hsl'
  }
]
