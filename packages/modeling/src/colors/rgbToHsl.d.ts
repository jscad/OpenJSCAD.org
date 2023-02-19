import { HSL, HSLA, RGB, RGBA } from './types'

export function rgbToHsl(rgb: RGB): HSL
export function rgbToHsl(rgb: RGBA): HSLA
export function rgbToHsl(...rgb: RGB): HSL
export function rgbToHsl(...rgb: RGBA): HSLA
