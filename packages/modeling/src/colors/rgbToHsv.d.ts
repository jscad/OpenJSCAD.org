import { HSV, HSVA, RGB, RGBA } from './types'

export default rgbToHsv

declare function rgbToHsv(rgb: RGB | RGBA): HSV | HSVA
