import { HSL, HSLA, RGB, RGBA } from './types'

export default hslToRgb

declare function hslToRgb(hsl:  HSL): RGB
declare function hslToRgb(hsl:  HSLA): RGBA
declare function hslToRgb(...hsl:  HSL): RGB
declare function hslToRgb(...hsl:  HSLA): RGBA
