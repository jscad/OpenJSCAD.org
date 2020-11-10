import { RGB, RGBA } from './types'

export default rgbToHex

declare function rgbToHex(rgb: RGB | RGBA): string
declare function rgbToHex(...rgb: RGB | RGBA): string
