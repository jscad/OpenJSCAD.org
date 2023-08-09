import type { HSL, HSLA, RGB, RGBA } from './types.d.ts'

export function rgbToHsl(rgb: RGB): HSL
export function rgbToHsl(rgb: RGBA): HSLA
export function rgbToHsl(...rgb: RGB): HSL
export function rgbToHsl(...rgb: RGBA): HSLA
