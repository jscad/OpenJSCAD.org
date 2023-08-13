import type { HSV, HSVA, RGB, RGBA } from './types.d.ts'

export function rgbToHsv(rgb: RGB): HSV
export function rgbToHsv(rgb: RGBA): HSVA
export function rgbToHsv(...rgb: RGB): HSV
export function rgbToHsv(...rgb: RGBA): HSVA
