import Slice from './type'

export default clone

declare function clone(slice: Slice): Slice
declare function clone(out: Slice, slice: Slice): Slice
