import type { HSL, HSLA, RGB, RGBA } from './types.d.ts'

export function hslToRgb(hsl:  HSL): RGB
export function hslToRgb(hsl:  HSLA): RGBA
export function hslToRgb(...hsl:  HSL): RGB
export function hslToRgb(...hsl:  HSLA): RGBA
