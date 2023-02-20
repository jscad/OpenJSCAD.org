import { HSL, HSLA, RGB, RGBA } from './types'

export function hslToRgb(hsl:  HSL): RGB
export function hslToRgb(hsl:  HSLA): RGBA
export function hslToRgb(...hsl:  HSL): RGB
export function hslToRgb(...hsl:  HSLA): RGBA
