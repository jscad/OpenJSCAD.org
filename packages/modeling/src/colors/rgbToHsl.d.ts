import { HSL, HSLA, RGB, RGBA } from './types'

export default rgbToHsl

declare function rgbToHsl(rgb: RGB): HSL
declare function rgbToHsl(rgb: RGBA): HSLA
declare function rgbToHsl(...rgb: RGB): HSL
declare function rgbToHsl(...rgb: RGBA): HSLA
