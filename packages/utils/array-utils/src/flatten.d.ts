import RecursiveArray from './recursiveArray'

export default flatten

declare function flatten<T>(arr: RecursiveArray<T>): Array<T>
