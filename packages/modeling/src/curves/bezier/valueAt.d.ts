import Bezier from './type'

export default valueAt

declare function valueAt(t: number, bezier: Bezier): Array<number> | number
