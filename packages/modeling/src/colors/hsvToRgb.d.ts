import { HSV, HSVA, RGB, RGBA } from './types'

export default hsvToRgb

declare function hsvToRgb(hsv:  HSV): RGB
declare function hsvToRgb(hsv:  HSVA): RGBA
declare function hsvToRgb(...hsv:  HSV): RGB
declare function hsvToRgb(...hsv:  HSVA): RGBA
