import { HSL, HSLA, RGB, RGBA } from './types'

export default rgbToHsl

declare function rgbToHsl(rgb: RGB | RGBA): HSL | HSLA
