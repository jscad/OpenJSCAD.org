import { HSV, HSVA, RGB, RGBA } from './types'

export function rgbToHsv(rgb: RGB): HSV
export function rgbToHsv(rgb: RGBA): HSVA
export function rgbToHsv(...rgb: RGB): HSV
export function rgbToHsv(...rgb: RGBA): HSVA
