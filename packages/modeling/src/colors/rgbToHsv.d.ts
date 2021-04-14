import { HSV, HSVA, RGB, RGBA } from './types'

export default rgbToHsv

declare function rgbToHsv(rgb: RGB): HSV
declare function rgbToHsv(rgb: RGBA): HSVA
declare function rgbToHsv(...rgb: RGB): HSV
declare function rgbToHsv(...rgb: RGBA): HSVA
