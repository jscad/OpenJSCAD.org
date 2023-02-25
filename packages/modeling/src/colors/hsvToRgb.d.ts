import { HSV, HSVA, RGB, RGBA } from './types'

export function hsvToRgb(hsv:  HSV): RGB
export function hsvToRgb(hsv:  HSVA): RGBA
export function hsvToRgb(...hsv:  HSV): RGB
export function hsvToRgb(...hsv:  HSVA): RGBA
