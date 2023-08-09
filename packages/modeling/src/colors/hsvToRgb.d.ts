import type { HSV, HSVA, RGB, RGBA } from './types.d.ts'

export function hsvToRgb(hsv:  HSV): RGB
export function hsvToRgb(hsv:  HSVA): RGBA
export function hsvToRgb(...hsv:  HSV): RGB
export function hsvToRgb(...hsv:  HSVA): RGBA
